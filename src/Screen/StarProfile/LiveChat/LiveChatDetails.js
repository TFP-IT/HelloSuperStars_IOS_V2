import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import PaymentComp from '../../../Components/GLOBAL/PaymentComp/PaymentComp';
import RegistrationComp from '../../../Components/QnA/RegistrationComp/Registration';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles';
const LiveChatDetails = ({data}) => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('success');
  const [payment, setPayment] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* <PaymentModal modal={modal} setModal={setModal} /> */}
      {/* <AlertModal modalType={modalType} modal={modal} buttonTitle="Apply now" message="Slot is available" setModal={setModal}/> */}
      <ScrollView style={{paddingBottom: '15%'}}>
        <View style={styles.topCard}>
          <Text style={styles.fonts}>Live chat demo and time </Text>
          <View style={styles.lineImgView}>
            <Image style={styles.lineImg} source={imagePath.lineMeetup} />
          </View>

          <View style={styles.bannerRow}>
            <Image style={styles.imgRow} source={imagePath.LiveChatImage} />
            <Image style={styles.imgRow2} source={imagePath.meetupvideoIcon} />
          </View>
        </View>

        <View style={styles.topCard}>
          <Text style={styles.fonts}>Live Chat Instructions</Text>
          <View style={styles.lineImgView}>
            <Image style={styles.lineImg} source={imagePath.lineMeetup} />
          </View>

          <View>
            <Text style={styles.fontInstruction}>
              1. User can only chat with the superstar for minimum 1 minute to
              maximum 5 minutes. 2. User should not insult superstar or speak
              about their personal topics. There should be no insults or
              blasphemy with a superstar. 3. User should proofread the chat to
              superstar before sending it to superstar 4. User should be
              friendly and cheerful with the star to maintain the conversation
              positive. 5. User should maintain the basic Grammar, Spelling, and
              Use of Language with the superstar. 6. User should be proactive
              but not intrusive.
            </Text>
          </View>
        </View>
        {payment ? (
          <PaymentComp
            eventType="LiveChat"
            eventId={data.id}
            modelName="livechat"
          />
        ) : (
          <RegistrationComp
            post={data}
            eventType="livechat"
            eventId={data.id}
            modelName="LiveChatRegistration"
            passChildData={setPayment}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveChatDetails;
