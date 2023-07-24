import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppUrl from '../../../RestApi/AppUrl';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import VideoPlayer from 'react-native-video-player';
import HeaderComp from '../../../Components/HeaderComp';
// import InformationComp from '../../../GLOBAL/Components/InformationComp/InformationComp';
// import InstructionComp from '../../../GLOBAL/Components/InstructionComp/InstructionComp';

import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
// import RegistrationComp from '../../../Components/GLOBAL/RegistrationComp/Registration';

import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles2';
import InformationComp from '../../../Components/GLOBAL/InformationComp/InformationComp';
import InstructionComp from '../../../Components/GLOBAL/InstructionComp/InstructionComp';
import RegistrationComp from '../../../Components/QnA/RegistrationComp/Registration';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
// import InformationComp from '../../../Components/GLOBAL/InformationComp/InformationComp';
// import InformationComp from '../../../Components/GLOBAL/InformationComp/InformationComp';

const GreetingRegistration = ({ route }) => {
  const navigation = useNavigation();
  const [post, setPost] = useState({});
  const [postRegistration, setPostRegistration] = useState({});
  const [buffer, setBuffer] = useState(true);
  const [notificationId, setNotificationId] = useState(
    route.params.notification_id,
  );
  const { themeBacground } = useThemeColor();
  // const { notification_id } = route.params.notification_id;
  const { axiosConfig } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });

  const getPrimaryData = greeting_id => {
    axios
      .get(AppUrl.GreetingInfoToRegistration + greeting_id, axiosConfig)

      .then(res => {
        console.log('greeting initial info', res);
        setPost(res.data.greeting);
        setPostRegistration(res.data.greetingsRegistration);
        setBuffer(false);
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const greeting_id = route.params.greeting_id;
    getPrimaryData(greeting_id);
  }, [route.params.greeting_id]);

  const onSubmit = data => {
    let aditionalData = {
      ...data,
      greeting_registration_id: postRegistration?.id,
    };

    //  console.log('aditionalData-----------', aditionalData);

    axios
      .post(AppUrl.GreetingRegistrationUpdate, aditionalData, axiosConfig)
      .then(res => {
        reset(data);
        setBuffer(false);

        if (res.data.status === 200) {
          getPrimaryData(route.params.greeting_id);
        } else if (res.data.status === 422) {
          // setInputData({
          //     ...inputData,
          //     error_list: res.data.validation_errors,
          // });
        } else {
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        }
      })
      .catch(err => {
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };

  const modalButtonPress = () => { };
  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {buffer ? (
        <LoaderComp />
      ) : (
        <>
          <ScrollView>
            <HeaderComp
              backFunc={() => navigation.goBack()}
              text="Greeting Registration"
            />
            <View style={[styles.greetingsBody, themeBacground]}>
              <View
                style={{
                  backgroundColor: '#282828',
                  margin: 10,
                  borderRadius: 5,
                  fontSize: 20,
                  height: 40,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFAD00',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  {post?.title}
                </Text>
              </View>
              <View style={styles.greetingsRequest}>
                <Heading heading="Greetings Request" />
                <UnderlineImage />
                <View style={{}}>
                  {post?.video != null ? (
                    <VideoPlayer
                      video={{ uri: `${AppUrl.MediaBaseUrl + post?.video}` }}
                      videoWidth={120}
                      videoHeight={100}
                      thumbnail={{
                        uri: AppUrl.MediaBaseUrl + post.banner,
                      }}
                      resizeMode={'stretch'}
                    />
                  ) : (
                    <>
                      <Image
                        style={styles.requestImg}
                        source={imagePath.greetingStar}
                        resizeMode="stretch"
                      />
                      <Image
                        style={{ position: 'absolute', left: '48%', top: '40%' }}
                        source={imagePath.greetingsPauseCircle}
                      />
                    </>
                  )}
                </View>
              </View>

              {/* information  */}
              <View
                style={{
                  backgroundColor: '#282828',
                  margin: 8,
                  marginBottom: -15,
                  borderRadius: 5,
                  fontSize: 20,
                  height: 50,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Heading heading="Information" />
                <UnderlineImage />
              </View>
              <InformationComp data={postRegistration} type="greeting" />

              {/* instruction  */}
              <InstructionComp
                title="Greetings Instructions"
                instruction={post?.instruction}
              />

              <View
                style={{
                  backgroundColor: '#282828',
                  margin: 10,
                  borderRadius: 5,
                  fontSize: 20,
                  height:
                    postRegistration?.payment_status === null ? '40%' : 70,
                }}>
                {postRegistration?.name === null ||
                  postRegistration?.greeting_context === null ? (
                  <>
                    <Heading heading="Registration Information" />
                    <UnderlineImage />
                    <View style={{ margin: 13, color: 'white' }}>
                      <View style={{ marginTop: 10, marginBottom: 10 }}></View>
                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginBottom: 8, color: 'white' }}>
                          Name of Person
                        </Text>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              multiline
                              placeholderTextColor="#9e9e9e"
                              placeholder="Name of Person"
                              style={styles.textInput}
                            />
                          )}
                          name="name"
                        />
                        {errors.name && (
                          <Text
                            style={{
                              color: 'red',
                              marginLeft: 8,
                              marginBottom: -15,
                            }}>
                            This field is required !
                          </Text>
                        )}
                      </View>
                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginBottom: 8, color: 'white' }}>
                          Greeting context
                        </Text>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              multiline
                              placeholderTextColor="#9e9e9e"
                              placeholder="Text something what do you want to showing in your video"
                              style={styles.textInput}
                            />
                          )}
                          name="greeting_context"
                        />
                        {errors.greeting_context && (
                          <Text
                            style={{
                              color: 'red',
                              marginLeft: 8,
                              marginBottom: -15,
                            }}>
                            This field is required !
                          </Text>
                        )}
                      </View>
                      <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ marginBottom: 8, color: 'white' }}>
                          Additional message (Optional)
                        </Text>
                        <Controller
                          control={control}
                          rules={{
                            required: false,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              multiline
                              placeholderTextColor="#9e9e9e"
                              placeholder="Text something what do you want to showing in your video"
                              style={styles.textInput}
                            />
                          )}
                          name="additional_message"
                        />
                        {errors.additional_message && (
                          <Text
                            style={{
                              color: 'red',
                              marginLeft: 8,
                              marginBottom: -15,
                            }}>
                            This field is required !
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={handleSubmit(onSubmit)}
                          style={[
                            {
                              backgroundColor: '#ffad00',
                              borderRadius: 10,
                            },
                            styles.button,
                          ]}>
                          <Text
                            style={{
                              textAlign: 'center',
                              padding: 8,
                              fontWeight: 'bold',
                            }}>
                            Save
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {postRegistration?.payment_status === null ? (
                      <RegistrationComp
                        post={post}
                        event_type="greeting"
                        postRegistration={postRegistration}
                        eventId={post?.id}
                        modelName="GreetingsRegistration"
                        passChildData={setIsShowPaymentComp}
                        setParentData={setParentData}
                      />
                    ) : (
                      <View
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#ffad00',
                            fontSize: 20,
                            marginVertical: 10,
                          }}>
                          Already Registered
                        </Text>
                        <UnderlineImage />
                      </View>
                    )}

                    <RegisPaymentModal
                      eventType="greeting"
                      eventId={post?.id}
                      event_id={postRegistration?.id}
                      modelName="greeting"
                      isShowPaymentComp={isShowPaymentComp}
                      setIsShowPaymentComp={setIsShowPaymentComp}
                      parentData={parentData}
                      event_registration_id={
                        postRegistration && postRegistration?.id
                      }
                      notification_id={notificationId}
                      greetingId={postRegistration?.id}
                      fee={post?.cost}
                    />
                  </>
                )}
                {/* <RegisterNowPay post={post} event_type="greeting" postRegistration={postRegistration} notification_id={parseInt(props.match.params.notification_id)} /> */}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default GreetingRegistration;
