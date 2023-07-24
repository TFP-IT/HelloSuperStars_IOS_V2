import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Menu from '../../Screen/Menu/Menu';

import LearningSessionNav from '../../Components/LEARNINGSESSION/LearningSessionNav/LearningSessionNav';
import ResultLearningSession from '../../Components/LEARNINGSESSION/ResultLearningSession/ResultLearningSession';
import VideoUploadLearningSession from '../../Components/LEARNINGSESSION/VideoUploadLearningSession/VideoUploadLearningSession';
import navigationStrings from '../../Constants/navigationStrings';
import Instuction from '../../Screen/Audition/Instruciton/Instuction';
import Judges from '../../Screen/Audition/Judges/Judges';
import Learning from '../../Screen/Audition/Learning/Learning';
import MarkDistribution from '../../Screen/Audition/MarkDistribution/MarkDistribution';
import Participation from '../../Screen/Audition/Participation/Participation';
import Result from '../../Screen/Audition/Result/Result';
import Round1 from '../../Screen/Audition/Round1/Round1';
import TotalAuditions from '../../Screen/Audition/TotalAuditons/TotalAuditions';
// import VideoView from '../../Screen/GallaryVideoView/VideoView';
import UserProfile from '../../Screen/Menu/MenuProfile/UserProfile/UserProfile';
import Wallet from '../../Screen/Menu/Wallet/Wallet';

import ApplyForCertificate from '../../Components/LEARNINGSESSION/ApplyForCertificate';
import VideoView from '../../Components/GREETINGS/GallaryVideoView/VideoView';
import SouvenirInvoice from '../../Components/STAR_SHOWCASE/Souviner/SouvenirInvoice';
import OrderStatus from '../../Components/GLOBAL/Reuseable/OrderStatus';
import SouvenirOrderStatus from '../../Components/GLOBAL/Reuseable/SouvenirOrderStatus';
import UpCommingPost from '../../Screen/Menu/UpCommingPost';
import About from '../../Screen/Menu/Privacy/About';
import Policy from '../../Screen/Menu/Privacy/Policy';
import ProductPurse from '../../Screen/Menu/Privacy/ProductPurse';
import Condition from '../../Screen/Menu/Privacy/Condition';
import Refund from '../../Screen/Menu/Privacy/Refund';
import FaQ from '../../Screen/Menu/Privacy/FaQ';
import Greeting from '../../Screen/Greetings/Greeting';
import Settings from '../../Screen/Menu/Settings/Settings';
import PersonalInfo from '../../Screen/Menu/Settings/PersonalInfo';
import EducationInfo from '../../Screen/Menu/Settings/EducationInfo';
import AuctionDetails from '../../Screen/Auction/AuctionDetails';
import Employment from '../../Screen/Menu/Settings/Employment';
import InterestInfo from '../../Screen/Menu/Settings/InterestInfo';
import SecurityInfo from '../../Screen/Menu/Settings/SecurityInfo';
import ReportInfo from '../../Screen/Menu/Settings/ReportInfo';
import ShujoyPay from '../../Screen/TakePayment/ShujoyPay';
import UserProfileV1 from '../../Screen/Menu/MenuProfile/UserProfile/UserProfileV1';

const MenuStack = createNativeStackNavigator();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name={navigationStrings.MENU} component={Menu} />

      {/* <MenuStack.Screen
        name={navigationStrings.USERPROFILE}
        component={UserProfile}
      /> */}
      <MenuStack.Screen
        name={navigationStrings.USERPROFILE}
        component={UserProfile}
      />
      <MenuStack.Screen
        name={navigationStrings.GALLARYIDEOVIEW}
        component={VideoView}
      />
      <MenuStack.Screen name={navigationStrings.WALLET} component={Wallet} />

      {/* Learning Session */}
      <MenuStack.Screen
        name={navigationStrings.LEARNINGSESSIONNAV}
        component={LearningSessionNav}
      />
      <MenuStack.Screen
        name={navigationStrings.ORDERSTATUS}
        component={OrderStatus}
      />
      <MenuStack.Screen
        name={navigationStrings.SOUVENIRSTATUS}
        component={SouvenirOrderStatus}
      />
      <MenuStack.Screen
        name={navigationStrings.VIDEOUPLOADLEARNINGSESSION}
        component={VideoUploadLearningSession}
      />
      <MenuStack.Screen
        name={navigationStrings.RESULTLEARNINGSESSION}
        component={ResultLearningSession}
      />

      <MenuStack.Screen
        name={navigationStrings.APPLYFORCERLEARNINGSESSION}
        component={ApplyForCertificate}
      />
      {/* Greetings  */}

      <MenuStack.Screen
        name={navigationStrings.GREETINGS}
        component={Greeting}
      />

      <MenuStack.Screen
        name={navigationStrings.AUCTIONDETAILS}
        component={AuctionDetails}
      />

      {/* Audition */}
      <MenuStack.Screen
        name={navigationStrings.LEARNING}
        component={Learning}
      />
      <MenuStack.Screen
        name={navigationStrings.TOTALAUDITION}
        component={TotalAuditions}
      />
      <MenuStack.Screen name={navigationStrings.ROUND1} component={Round1} />
      <MenuStack.Screen
        name={navigationStrings.INSTRUCTION}
        component={Instuction}
      />
      <MenuStack.Screen name={navigationStrings.JUDGES} component={Judges} />
      <MenuStack.Screen
        name={navigationStrings.MARKDISTIBUTION}
        component={MarkDistribution}
      />
      <MenuStack.Screen
        name={navigationStrings.PARTICIPATION}
        component={Participation}
      />
      <MenuStack.Screen name={navigationStrings.RESULT} component={Result} />
      <MenuStack.Screen
        name={navigationStrings.POSTSHOWBYTYPE}
        component={UpCommingPost}
      />

      <MenuStack.Screen
        name={navigationStrings.ABOUTPOLICY}
        component={About}
      />
      <MenuStack.Screen
        name={navigationStrings.PRIVACYPOLICY}
        component={Policy}
      />
      <MenuStack.Screen
        name={navigationStrings.PRODUCTPOLICY}
        component={ProductPurse}
      />
      <MenuStack.Screen
        name={navigationStrings.CONDITIONPOLICY}
        component={Condition}
      />
      <MenuStack.Screen
        name={navigationStrings.REFUNDPOLICY}
        component={Refund}
      />
      <MenuStack.Screen name={navigationStrings.FAQPOLICY} component={FaQ} />

      <MenuStack.Screen
        name={navigationStrings.SETTINGS}
        component={Settings}
      />
      <MenuStack.Screen
        name={navigationStrings.PERSONALINFO}
        component={PersonalInfo}
      />
      <MenuStack.Screen
        name={navigationStrings.EDUCATIONINFO}
        component={EducationInfo}
      />
      <MenuStack.Screen
        name={navigationStrings.EMPLOYMENTINFO}
        component={Employment}
      />
      <MenuStack.Screen
        name={navigationStrings.INTERESTINFO}
        component={InterestInfo}
      />
      <MenuStack.Screen
        name={navigationStrings.SECURITYINFO}
        component={SecurityInfo}
      />

      <MenuStack.Screen
        name={navigationStrings.REPORTINFO}
        component={ReportInfo}
      />
    </MenuStack.Navigator>
  );
};

export default MenuStackScreen;

const styles = StyleSheet.create({});
