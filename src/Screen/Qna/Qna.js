import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CheckSlot from '../../Components/GLOBAL/CheckSlot/CheckSlot';
// import CheckSlot from '../../Components/CheckSlot/CheckSlot.js';
import HeaderComp from '../../Components/HeaderComp';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp.js';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp.js';
import LoaderComp from '../../Components/LoaderComp.js';
import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal.js';
// import RegistrationComp from '../../Components/GLOBAL/RegistrationComp/Registration.js';
// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl.js';
import styles from '../MeetUp/Styles.js';
import Video from '../../Components/VIDEO/Video';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration';
import useAsyncGet from '../../CustomHooks/useAsyncGet';


const Qna = ({ route, navigation }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [isShowRegComp, setIsShowRegComp] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [feeCount, setFeeCount] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [takeTime, setTakeTime] = useState('1');
  const [parentData, setParentData] = useState({});
  const { data } = route.params;
  const { response, loading } = useAsyncGet(AppUrl.QnaDetails + data?.event_id)
  const qnaData = response?.data?.event




  useEffect(() => {
    //  console.log('`${AppUrl.MediaBaseUrl + data.qna.banner}`',`${AppUrl.MediaBaseUrl + data.qna.banner}`);
  }, [takeTime]);


  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoaderComp />}
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <Video
          image={`${AppUrl.imageCdn + data?.banner}`}
          title={data?.title}
        />
        <InformationComp data={qnaData} takeTime={takeTime} />
        <InstructionComp
          title="QNA Instruction"
          instruction={qnaData?.instruction}
        />

        {isShowRegComp ? (
          <RegistrationComp
            takeTime={takeTime}
            post={qnaData}
            event_type="qna"
            fee={feeCount}
            start_time={startTime}
            end_time={endTime}
            eventId={qnaData?.id}
            modelName="QnaRegistration"
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
          />
        ) : (
          <>

            <CheckSlot
              data={qnaData}
              charge={qnaData?.fee}
              setBuffer={setBuffer}
              setTakeTimeParent={setTakeTime}
              setIsShowRegComp={setIsShowRegComp}
              setFeeCount={setFeeCount}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              apiInPoint={AppUrl.QnaSlotChecking}
            />

          </>
        )}

        {isShowPaymentComp ? (
          <RegisPaymentModal
            eventType="qna"
            eventId={qnaData?.id}
            modelName="qna"
            isShowPaymentComp={isShowPaymentComp}
            setIsShowPaymentComp={setIsShowPaymentComp}
            parentData={parentData}
            event_type="qna"
            start_time={startTime}
            end_time={endTime}
            fee={feeCount}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Qna;
