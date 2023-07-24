import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp.js';
// import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp.js';

import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal.js';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration.js';

// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl.js';
import styles from '../MeetUp/Styles.js';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp';
import Video from '../../Components/VIDEO/Video';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration';
import useAsyncGet from '../../CustomHooks/useAsyncGet';
import LoaderComp from '../../Components/LoaderComp';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration';

const LearningSession = ({ route, navigation }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const { data } = route.params;

  const { sendGetRequest, response, error, loading } = useAsyncGet(AppUrl.LearningSessionDetails + data?.event_id)
  const lerningSessonData = response?.data?.learnigSession



  console.log('data------', data);
  return (
    <>
      {loading && <LoaderComp />}
      <SafeAreaView style={styles.container}>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <ScrollView>
          <Video
            image={`${AppUrl.imageCdn + data?.banner}`}
            title={data.title}
            videoSrc={data?.video}
          />
          <InformationComp data={lerningSessonData} />
          <InstructionComp
            title="Learning Session Instruction"
            instruction={lerningSessonData?.instruction}
          />
          <RegistrationComp
            post={lerningSessonData}
            event_type="learningSession"
            eventId={lerningSessonData?.id}
            modelName="LearningSessionRegistration"
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
            fee={lerningSessonData?.fee}
          />
          {/* {isShowPaymentComp ? <PaymentComp eventType="LearningSession" eventId={data.learning_session.id} modelName="learningSession" /> : <></>} */}
          {isShowPaymentComp ? (
            <RegisPaymentModal
              eventType="learningSession"
              eventId={lerningSessonData?.id}
              modelName="learningSession"
              isShowPaymentComp={isShowPaymentComp}
              setIsShowPaymentComp={setIsShowPaymentComp}
              parentData={parentData}
              fee={lerningSessonData?.fee}
              start_time={lerningSessonData?.start_time}
              end_time={lerningSessonData?.end_time}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LearningSession;
