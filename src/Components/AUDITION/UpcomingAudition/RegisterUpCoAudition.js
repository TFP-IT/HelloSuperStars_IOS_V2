import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RegistrationComp from '../../QnA/RegistrationComp/Registration';
import {ScrollView} from 'react-native-gesture-handler';
import AppUrl from '../../../RestApi/AppUrl';
import HeaderComp from '../../HeaderComp';
import {useNavigation} from '@react-navigation/native';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';
import axios from 'axios';
import {AuthContext} from '../../../Constants/context';
import useAsyncGet from '../../../CustomHooks/useAsyncGet';
import JustVideoPlayer from '../../VideoPlayer/JustVideoPlayer';
import LoaderCompV1 from '../../LoaderCompV1';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import AlreadyRegistered from '../../GLOBAL/Others/AlreadyRegistered';
import he from 'he';
import InstructionCompV1 from '../../GLOBAL/InstructionComp/InstructionCompV1';
import CostCompV1 from '../../GLOBAL/CostComp/CostCompV1';

const RegisterUpCoAuditionV1 = ({route}) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const {data} = route.params;
  const auditionId = data?.audition?.id;
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState({});
  const {axiosConfig, currency} = useContext(AuthContext);
  const {themeBacground, themeCardColor} = useThemeColor();
  const navigation = useNavigation();
  const {response, loading} = useAsyncGet(
    AppUrl.auditionDetails + data?.audition?.id,
  );
  const audition = response?.data?.audition;
  const insText = audition?.instruction ? audition?.instruction : '';
  const insDetailsText = he.decode(insText).replace(/<[^>]+>/g, '');
  const Navigation = useNavigation();
  useEffect(() => {
    const getData = async () => {
      try {
        axios
          .get(AppUrl.auditionRegisterCheck + `${auditionId}`, axiosConfig)
          .then(res => {
            if (res.data.status === 200) {
              //console.log(res.data.participant);
              setIsAlreadyRegistered(res.data.participant);
            }
          });
      } catch (error) {
        console.log('Audition Registered', error);
      }
    };
    getData();

    return () => {
      setIsAlreadyRegistered({});
      console.log('Registered Audition Cleanup function worked!!');
    };
  }, [response]);

  const stars = audition?.assigned_judges;

  return (
    <>
      {loading ? (
        <LoaderCompV1 />
      ) : (
        <SafeAreaView>
          <View style={[styles.container, themeBacground]}>
            <HeaderComp backFunc={() => Navigation.goBack()} />

            <ScrollView
              style={{backgroundColor: 'black'}}
              showsVerticalScrollIndicator={false}>
              <View style={[styles.topCard, themeCardColor]}>
                <JustVideoPlayer videoUrl={AppUrl.videoCdn + audition?.video} />
              </View>
              {/* content view */}
              <InstructionCompV1
                title={audition?.title}
                instruction={audition?.instruction}
              />
              <CostCompV1 title={'With'} stars={audition?.assigned_judges} />
              <CostCompV1
                title={'Cost for audition:'}
                amount={audition?.fees == 0 ? 'FREE' : audition?.fees}
              />
              {isAlreadyRegistered ? (
                <AlreadyRegistered />
              ) : (
                <>
                  <RegistrationComp
                    post={audition}
                    event_type="audition"
                    eventId={audition?.id}
                    modelName="auditionRegistration"
                    passChildData={setIsShowPaymentComp}
                    setParentData={setParentData}
                    fee={audition?.fees}
                  />
                  {isShowPaymentComp ? (
                    <RegisPaymentModal
                      eventType="auditionRegistration"
                      eventId={audition.id}
                      modelName="audition"
                      isShowPaymentComp={isShowPaymentComp}
                      setIsShowPaymentComp={setIsShowPaymentComp}
                      parentData={parentData}
                      fee={audition?.fees}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default RegisterUpCoAuditionV1;

const styles = StyleSheet.create({
  topCard: {
    margin: 8,
    borderRadius: 5,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
  },
});
