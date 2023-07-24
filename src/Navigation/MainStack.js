import React from 'react';
import VideoSdk from '../../VideoSdk';
import MessengerCom from '../Components/GLOBAL/MessengerCom/MessengerCom';

import navigationStrings from '../Constants/navigationStrings';
import ImgCrop from '../ImageCrop/ImgCrop';
import Flash from '../Screen/Auth/Flash';
import FlashLoader from '../Screen/Auth/FlashLoader';
import SearchPage from '../Screen/Home/SearchPage/SearchPage';
import StoryPromo from '../Screen/Home/StarPromoVideo/StoryPromo';
// import LiveChatSdk from '../LiveChatSdk/LiveChatSdk';
import Message from '../Screen/Message/Message';
import MessageStar from '../Screen/Message/MessageStar';
import QnaMessages from '../Screen/Message/QnaMessages';
import PromoView from '../Screen/PromoSection/PromoView';
import ChatWithStar from '../Screen/StarProfile/Greetings/ChatWithStar/ChatWithStar';
import Greetings from '../Screen/StarProfile/Greetings/Greetings';
import GreetingsHome from '../Screen/StarProfile/Greetings/GreetingsHome/GreetingsHome';
import PaymentInfo from '../Screen/StarProfile/Greetings/PaymentInfo/PaymentInfo';
import Ipay88 from '../Screen/TakePayment/Ipay88';
import PocketPay from '../Screen/TakePayment/PocketPay';
import PocketTxt from '../Screen/TakePayment/PocketTxt';
import ShujoyPay from '../Screen/TakePayment/ShujoyPay';
import TabRoutes from './TabRoutes';

import StoryPromoV1 from '../Screen/Home/StarPromoVideo/StoryPromoV1';


const MainStack = (Stack, loactionStatus) => {
  return (
    <>
      {!loactionStatus && (
        <Stack.Screen name="FlashLoader" component={FlashLoader} />
      )}

      <Stack.Screen name="Tabs" component={TabRoutes} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="MessageStar" component={MessageStar} />

      <Stack.Screen name={navigationStrings.POCKETPAY} component={PocketPay} />
      <Stack.Screen name={navigationStrings.POCKETTXT} component={PocketTxt} />

      <Stack.Screen name="QnaMessages" component={QnaMessages} />

      <Stack.Screen name="Messenger" component={MessengerCom} />
      <Stack.Screen name="Greetings" component={Greetings} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
      <Stack.Screen name="GreetingsHome" component={GreetingsHome} />
      <Stack.Screen name="ChatWithStar" component={ChatWithStar} />
      <Stack.Screen name={navigationStrings.PROMOSHOW} component={PromoView} />
      <Stack.Screen name={'VideoSdk'} component={VideoSdk} />
      {/* <Stack.Screen name={'LiveChatSdk'} component={LiveChatSdk} /> */}
      <Stack.Screen name={'ImgCrop'} component={ImgCrop} />
      <Stack.Screen name={'SearchPage'} component={SearchPage} />
      <Stack.Screen name={navigationStrings.SHURJOPAY} component={ShujoyPay} />

      <Stack.Screen name={'StoryPromo'} component={StoryPromo} />

      <Stack.Screen name={'StoryPromov1'} component={StoryPromoV1} />


      <Stack.Screen name={navigationStrings.IPAY88PAY} component={Ipay88} />
    </>
  );
};

export default MainStack;
