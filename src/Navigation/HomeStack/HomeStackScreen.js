import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuditionRoundStart from '../../Components/AUDITION/AuditionRoundStart/AuditionRoundStart';
import FangroupVoting from '../../Components/FANGROUP/FanGroupVotting/FangroupVoting';
// import FangroupVoting from '../../Components/FanGroupVotting/FangroupVoting';

import SouvenirInvoice from '../../Components/STAR_SHOWCASE/Souviner/SouvenirInvoice';
import AuditionTitle from '../../Components/AUDITION/UpcomingAudition/ActivityEventList';
import UploadedVideoRound from '../../Components/AUDITION/UpcomingAudition/UploadedVideoRound';
import navigationStrings from '../../Constants/navigationStrings';
import {Home} from '../../Screen';
import Fangroup from '../../Screen/Fangroup/Fangroup';
import LearningSession from '../../Screen/LearningSession/LearningSession';
import OnlineLearning from '../../Screen/LearningSession/OnlineLearning';
import Livechat from '../../Screen/Livechat/Livechat';
import MeetUp from '../../Screen/MeetUp/MeetUp';
import Qna from '../../Screen/Qna/Qna';
import Activities from '../../Screen/Setting/Content/Activities';
import StarShowCase from '../../Screen/StarCase/StarShowCase';
import StarProfile from '../../Screen/StarProfile/Profile/StarProfile';
import VoiceMessage from '../../Screen/VoiceMessage/VoiceMessage';
import Souvenir from './../../Screen/StarProfile/ShowCase/Souvenir';
import UpcomingAuditionsCard from '../../Components/GLOBAL/Card/PostCard/UpcomingAuditionsCard';
import RegisterUpCoAudition from '../../Components/AUDITION/UpcomingAudition/RegisterUpCoAudition';
import AuctionDetails from '../../Screen/Auction/AuctionDetails';
import ShowCase from '../../Screen/StarProfile/ShowCase/ShowCase';
import AuctionTab from '../../Screen/StarProfile/ShowCase/AuctionTab';
import Participate from '../../Screen/StarProfile/ShowCase/Participate';
import MarketPlaceShowcase from '../../Screen/StarProfile/ShowCase/MarketPlaceShowcase';
import StarProfileV1 from '../../Screen/StarProfile/Profile/StarProfileV1';
import ShowCaseV1 from '../../Screen/StarProfile/ShowCase/ShowCaseV1';
import FullScreenImage from '../../Screen/StarProfile/TopNav/FullScreenImage';
import FullScreenVideo from '../../Screen/StarProfile/TopNav/FullScreenVideo';
const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={navigationStrings.HOME} component={Home} />
      <HomeStack.Screen name={navigationStrings.MEETUP} component={MeetUp} />
      {/* <HomeStack.Screen
        name={navigationStrings.STARPROFILE}
        component={StarProfile}
      /> */}
      <HomeStack.Screen
        name={navigationStrings.STARPROFILE}
        component={StarProfileV1}
      />
      <HomeStack.Screen
        name={navigationStrings.FANGROUP}
        component={Fangroup}
      />

      {/* Learning Session */}
      <HomeStack.Screen
        name={navigationStrings.LEARNINGSESSION}
        component={LearningSession}
      />
      {/* Livechat */}
      <HomeStack.Screen
        name={navigationStrings.LIVECHAT}
        component={Livechat}
      />
      {/* Qna */}
      <HomeStack.Screen name={navigationStrings.QNA} component={Qna} />
      <HomeStack.Screen
        name={navigationStrings.ONLINELEARNINGSESSION}
        component={OnlineLearning}
      />

      {/* Settings */}
      <HomeStack.Screen
        name={navigationStrings.ACTIVITIES}
        component={Activities}
      />

      {/* Audition */}
      <HomeStack.Screen
        name={navigationStrings.AUDITIONROUND}
        component={AuditionRoundStart}
      />

      <HomeStack.Screen
        name={navigationStrings.AUDITIONS}
        component={AuditionTitle}
      />

      {/* fangroup voting */}
      <HomeStack.Screen
        name={navigationStrings.VOTING}
        component={FangroupVoting}
      />

      {/* voiceMessage  */}
      <HomeStack.Screen
        name={navigationStrings.VOICEMESSAGE}
        component={VoiceMessage}
      />

      <HomeStack.Screen
        name={navigationStrings.UPLOADVIDEOROUND}
        component={UploadedVideoRound}
      />

      <HomeStack.Screen name={'StarShowCase'} component={StarShowCase} />
      {/* <HomeStack.Screen name={'Audition'} component={RegisterUpCoAudition} /> */}
      <HomeStack.Screen
        name={navigationStrings.AUDITIONREGISTER}
        component={RegisterUpCoAudition}
      />
      <HomeStack.Screen name={'Souviner'} component={Souvenir} />
      <HomeStack.Screen name={'SouvinerInvoice'} component={SouvenirInvoice} />

      {/* <HomeStack.Screen
        name={navigationStrings.STARSHOWCASE}
        component={ShowCase}
      /> */}
      <HomeStack.Screen
        name={navigationStrings.STARSHOWCASE}
        component={ShowCaseV1}
      />

      <HomeStack.Screen
        name={navigationStrings.AUCTIONTAB}
        component={AuctionTab}
      />
      <HomeStack.Screen
        name={navigationStrings.PARTICIPATE}
        component={Participate}
      />
      <HomeStack.Screen
        name={navigationStrings.MARKETPLACESHOWCASE}
        component={MarketPlaceShowcase}
      />
      <HomeStack.Screen
        name={navigationStrings.SOUVENIR}
        component={Souvenir}
      />
      <HomeStack.Screen
        name={navigationStrings.FULLSCREENIMAGE}
        component={FullScreenImage}
      />
      <HomeStack.Screen
        name={navigationStrings.FULLSCREENVIDEO}
        component={FullScreenVideo}
      />
    </HomeStack.Navigator>
  );
}
