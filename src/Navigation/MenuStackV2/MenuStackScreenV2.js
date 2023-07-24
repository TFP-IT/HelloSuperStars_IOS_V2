/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationStrings from '../../Constants/navigationStrings';
import MenuV2 from '../../Screen/MenuV2/MenuV2';
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
import Wallet from '../../Screen/Menu/Wallet/Wallet';
import MenuFollowers from '../../Screen/Menu/Content/MenuFollowers';
import MenuActivities from '../../Screen/Menu/Content/MenuActivities';
import LearningSessionNav from '../../Components/LEARNINGSESSION/LearningSessionNav/LearningSessionNav';
import Learning from '../../Screen/Audition/Learning/Learning';
import TotalAuditions from '../../Screen/Audition/TotalAuditons/TotalAuditions';
import Instuction from '../../Screen/Audition/Instruciton/Instuction';
import Judges from '../../Screen/Audition/Judges/Judges';
import MarkDistribution from '../../Screen/Audition/MarkDistribution/MarkDistribution';
import Participation from '../../Screen/Audition/Participation/Participation';
import Result from '../../Screen/Audition/Result/Result';
import Round1 from '../../Screen/Audition/Round1/Round1';
import ActivitiesCard from '../../Components/GLOBAL/Reuseable/ActivitiesCard';
import UserProfile from '../../Screen/Menu/MenuProfile/UserProfile/UserProfile';
import UpCommingPost from '../../Screen/Menu/UpCommingPost';
import VideoUploadLearningSession from '../../Components/LEARNINGSESSION/VideoUploadLearningSession/VideoUploadLearningSession';
import ResultLearningSession from '../../Components/LEARNINGSESSION/ResultLearningSession/ResultLearningSession';
import ApplyForCertificate from '../../Components/LEARNINGSESSION/ApplyForCertificate';
import SouvenirOrderStatus from '../../Components/GLOBAL/Reuseable/SouvenirOrderStatus';
import DeleteWarning from '../../Screen/Menu/Settings/DeleteWarning';
import AuctionParticipateNow from '../../Screen/MarketPlace/AuctionParticipateNow/AuctionParticipateNow';
import OrderStatus from '../../Components/GLOBAL/Reuseable/OrderStatus';
import UserProfileV1 from '../../Screen/Menu/MenuProfile/UserProfile/UserProfileV1';
import EventActivites from '../../Screen/MenuV2/Pages/EventActivites';
import MenuActivitiesV1 from '../../Screen/Menu/Content/MenuActivitiesV1';
import ModalComp from '../../Components/ModalComp';

const MenuStackV2 = createNativeStackNavigator();
const MenuStackScreenV2 = () => {
  return (
    <MenuStackV2.Navigator screenOptions={{headerShown: false}}>
      <MenuStackV2.Screen name={navigationStrings.MENUV2} component={MenuV2} />

      <MenuStackV2.Screen
        name={navigationStrings.LEARNINGSESSIONNAV}
        component={LearningSessionNav}
      />

      <MenuStackV2.Screen
        name={navigationStrings.VIDEOUPLOADLEARNINGSESSION}
        component={VideoUploadLearningSession}
      />

      <MenuStackV2.Screen
        name={navigationStrings.RESULTLEARNINGSESSION}
        component={ResultLearningSession}
      />

      <MenuStackV2.Screen
        name={navigationStrings.APPLYFORCERLEARNINGSESSION}
        component={ApplyForCertificate}
      />

      <MenuStackV2.Screen
        name={navigationStrings.SOUVENIRSTATUS}
        component={SouvenirOrderStatus}
      />

      <MenuStackV2.Screen
        name={navigationStrings.ABOUTPOLICY}
        component={About}
      />
      <MenuStackV2.Screen
        name={navigationStrings.PRIVACYPOLICY}
        component={Policy}
      />
      <MenuStackV2.Screen
        name={navigationStrings.PRODUCTPOLICY}
        component={ProductPurse}
      />
      <MenuStackV2.Screen
        name={navigationStrings.CONDITIONPOLICY}
        component={Condition}
      />
      <MenuStackV2.Screen
        name={navigationStrings.REFUNDPOLICY}
        component={Refund}
      />
      <MenuStackV2.Screen name={navigationStrings.FAQPOLICY} component={FaQ} />

      <MenuStackV2.Screen
        name={navigationStrings.SETTINGS}
        component={Settings}
      />
      <MenuStackV2.Screen
        name={navigationStrings.ORDERSTATUS}
        component={OrderStatus}
      />
      <MenuStackV2.Screen
        name={navigationStrings.PERSONALINFO}
        component={PersonalInfo}
      />
      <MenuStackV2.Screen
        name={navigationStrings.EDUCATIONINFO}
        component={EducationInfo}
      />
      <MenuStackV2.Screen
        name={navigationStrings.EMPLOYMENTINFO}
        component={Employment}
      />
      <MenuStackV2.Screen
        name={navigationStrings.INTERESTINFO}
        component={InterestInfo}
      />
      <MenuStackV2.Screen
        name={navigationStrings.SECURITYINFO}
        component={SecurityInfo}
      />

      <MenuStackV2.Screen
        name={navigationStrings.REPORTINFO}
        component={ReportInfo}
      />

      <MenuStackV2.Screen
        name={navigationStrings.DELETEWARNING}
        component={DeleteWarning}
      />

      <MenuStackV2.Screen
        name={navigationStrings.ENDUSERLICENCE}
        component={ModalComp}
      />

      <MenuStackV2.Screen name={navigationStrings.WALLET} component={Wallet} />
      <MenuStackV2.Screen
        name={navigationStrings.MENUFOLLOWERS}
        component={MenuFollowers}
      />
      <MenuStackV2.Screen
        name={navigationStrings.MENUACTIVITES}
        // component={MenuActivities}
        component={MenuActivitiesV1}
      />

      {/* Audition */}
      <MenuStackV2.Screen
        name={navigationStrings.LEARNING}
        component={Learning}
      />
      <MenuStackV2.Screen
        name={navigationStrings.TOTALAUDITION}
        component={TotalAuditions}
      />
      <MenuStackV2.Screen name={navigationStrings.ROUND1} component={Round1} />
      <MenuStackV2.Screen
        name={navigationStrings.INSTRUCTION}
        component={Instuction}
      />
      <MenuStackV2.Screen name={navigationStrings.JUDGES} component={Judges} />
      <MenuStackV2.Screen
        name={navigationStrings.MARKDISTIBUTION}
        component={MarkDistribution}
      />
      <MenuStackV2.Screen
        name={navigationStrings.PARTICIPATION}
        component={Participation}
      />
      <MenuStackV2.Screen name={navigationStrings.RESULT} component={Result} />
      <MenuStackV2.Screen
        name={navigationStrings.ACTIVITESCARD}
        component={ActivitiesCard}
      />
      <MenuStackV2.Screen
        name={navigationStrings.GREETINGS}
        component={Greeting}
      />

      {/* <MenuStackV2.Screen
        name={navigationStrings.USERPROFILE}
        component={UserProfile}
      /> */}

      <MenuStackV2.Screen
        name={navigationStrings.USERPROFILE}
        component={UserProfile}
      />

      <MenuStackV2.Screen
        name={navigationStrings.POSTSHOWBYTYPE}
        component={UpCommingPost}
      />
      <MenuStackV2.Screen
        name={navigationStrings.AUCTIONPARTICIOATENOW}
        component={AuctionParticipateNow}
      />

      <MenuStackV2.Screen
        name={navigationStrings.EVENTACTIVITY}
        component={EventActivites}
      />
    </MenuStackV2.Navigator>
  );
};

export default MenuStackScreenV2;

const styles = StyleSheet.create({});
