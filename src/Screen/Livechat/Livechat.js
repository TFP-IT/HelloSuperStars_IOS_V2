import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CheckSlot from '../../Components/GLOBAL/CheckSlot/CheckSlot';
import InformationComp from '../../Components/GLOBAL/InformationComp/InformationComp';
import HeaderComp from '../../Components/HeaderComp';
// import InformationComp from '../../Components/InformationComp/InformationComp.js';
import InstructionComp from '../../Components/GLOBAL/InstructionComp/InstructionComp.js';
import LoaderComp from '../../Components/LoaderComp.js';
import RegisPaymentModal from '../../Components/MODAL/RegisPaymentModal.js';
import RegistrationComp from '../../Components/QnA/RegistrationComp/Registration.js';
// import Video from '../../Components/VIDEO/Video';
import AppUrl from '../../RestApi/AppUrl.js';
import styles from '../MeetUp/Styles.js';
import Video from '../../Components/VIDEO/Video';
import useAsyncGet from '../../CustomHooks/useAsyncGet';

const Livechat = ({ route, navigation }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [isShowRegComp, setIsShowRegComp] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [feeCount, setFeeCount] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [takeTime, setTakeTime] = useState('1');
  const [parentData, setParentData] = useState({});
  const { data } = route.params;
  const { response, loading } = useAsyncGet(AppUrl.LiveChatDetails + data?.event_id)
  const liveChatData = response?.data?.event




  useEffect(() => {
    console.log('feeCount', feeCount);
  }, [takeTime, feeCount]);
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoaderComp />}
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <Video
          image={`${AppUrl.imageCdn + data?.banner}`}
          title={data?.title}
        />
        <InformationComp data={liveChatData} takeTime={takeTime} />
        <InstructionComp
          title="Livechat Instruction"
          instruction={liveChatData?.instruction}
        />

        {isShowRegComp ? (
          <RegistrationComp
            takeTime={takeTime}
            post={liveChatData}
            event_type="livechat"
            fee={feeCount}
            start_time={startTime}
            end_time={endTime}
            eventId={liveChatData?.id}
            modelName="LiveChatRegistration"
            passChildData={setIsShowPaymentComp}
            setParentData={setParentData}
          />
        ) : (
          <>
            <CheckSlot
              data={liveChatData}
              charge={liveChatData?.fee}
              setBuffer={setBuffer}
              setTakeTimeParent={setTakeTime}
              setIsShowRegComp={setIsShowRegComp}
              setFeeCount={setFeeCount}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              apiInPoint={AppUrl.LiveChatSlotChecking}
            />
          </>
        )}

        {isShowPaymentComp &&
          <RegisPaymentModal
            eventType="livechat"
            eventId={data?.event_id}
            modelName="livechat"
            isShowPaymentComp={isShowPaymentComp}
            setIsShowPaymentComp={setIsShowPaymentComp}
            parentData={parentData}
            event_type="livechat"
            start_time={startTime}
            end_time={endTime}
            fee={feeCount}
          />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Livechat;
