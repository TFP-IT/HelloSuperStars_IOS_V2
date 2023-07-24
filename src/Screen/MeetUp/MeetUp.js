import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp';
import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration';

// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl';
import styles from './Styles';
import Video from '../../Components/VIDEO/Video';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration';
import useAsyncGet from '../../CustomHooks/useAsyncGet';
import LoaderComp from '../../Components/LoaderComp';

const MeetUp = ({route, navigation}) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const {data} = route.params;
  const {sendGetRequest, response, error, loading} = useAsyncGet(
    AppUrl.MeetupDetails + data?.event_id,
  );
  const meetUpData = response?.data?.event;

  return (
    <>
      {loading && <LoaderComp />}
      <SafeAreaView style={styles.container}>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <ScrollView>
          <Video
            image={`${AppUrl.imageCdn + data?.banner}`}
            title={meetUpData?.title + ` (${meetUpData?.meetup_type})`}
          />
          <InformationComp data={meetUpData} />
          <InstructionComp
            title="Meetup Instruction"
            instruction={meetUpData?.instruction}
          />
          <RegistrationComp
            post={meetUpData}
            event_type="meetup"
            eventId={meetUpData?.id}
            modelName="MeetupEventRegistration"
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
            fee={meetUpData?.fee}
          />
          {isShowPaymentComp ? (
            <RegisPaymentModal
              eventType="meetup"
              eventId={meetUpData?.id}
              modelName="meetup"
              isShowPaymentComp={isShowPaymentComp}
              setIsShowPaymentComp={setIsShowPaymentComp}
              parentData={parentData}
              fee={meetUpData?.fee}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default MeetUp;
