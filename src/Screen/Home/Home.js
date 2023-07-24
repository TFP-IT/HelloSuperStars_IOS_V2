import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';

import PushNotification from 'react-native-push-notification';
import HeaderComp from '../../Components/HeaderComp';
import PromoModal from '../../Components/MODAL/PromoModal';
import {AuthContext, ThemeContext} from '../../Constants/context';
import navigationStrings from '../../Constants/navigationStrings';
import NotificationRender from '../../NotificationHandeler/NotificationRender';
import AppUrl from '../../RestApi/AppUrl';
import HomeOnlineStars from './HomeOnlineStars/HomeOnlineStars';
import PostContainer from './HomePostContainer/PostContainer';
import styles from './styles';
import {getUpdateDeviceId} from '../../CustomHelper/getUpdateDeviceId';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import PostCardContainer from './HomePostContainer/PostCardContainer';
import colorCode from '../../Constants/colorCode';
import {useThemeColor} from '../../CustomHooks/useThemeColor';
import OnlineStars from './HomeOnlineStars/OnlineStars';

function Home() {
  const navigation = useNavigation();
  const [postPage, setPostPage] = useState(1);

  const {
    authContext,
    setUserInfo,
    useInfo,
    setLoginStatus,
    activities,
    getActivity,
    axiosConfig,
    promoNotification,
    setPromoNotification,
  } = useContext(AuthContext);
  const [action, setAction] = useState();
  const windowHeight = Dimensions.get('window').height;

  const {themeBacground} = useThemeColor();

  useEffect(() => {
    console.log('my action', action);
  }, [action]);

  useEffect(() => {
    // console.log(postPage);
    createChannels();
    // console.log('status', useInfo.status)
    // if (useInfo.status == 0) {
    //   setLoginStatus(false)
    //   navigation.navigate('category')
    // }
    // getSaveDeviceID()
    getDeviceID();
  }, []);

  // cloude message start
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  /**
   * read device id
   */
  const getDeviceID = () => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(token => {
          // console.log("cloud messing application__helper___", token)
          updateDeviceId({device_id: token});
          // saveDevice_id(token)
        });
    } else {
      console.log('permission status faild');
    }
  };

  /**
   * save device id to phone loacl storage
   */
  const saveDevice_id = async value => {
    try {
      await AsyncStorage.setItem('device_id', value);
      // alert('its work')
    } catch (e) {
      // saving error
    }
  };

  /**
   * get device id form phone local storage
   */
  const getSaveDeviceID = async () => {
    try {
      const deviceId = await AsyncStorage.getItem('device_id');
      if (deviceId === null) {
        getDeviceID();
      } else {
        console.log('detect same device');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * device id save to database
   */
  const updateDeviceId = data => {
    axios
      .post(AppUrl.deviceIdUpdate, data, axiosConfig)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.status);
        if (err.response.status == 401) {
          authContext.signOut();
          Toast.show('Login expired !', Toast.durations.SHORT);
        } else {
          Toast.show('please check your internet', Toast.durations.SHORT);
        }
      });
  };

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:____', notification);
      activities.length;
      // || notification?.channelId == "fcm_fallback_notification_channel"
      if (notification?.data?.collapse_key == 'com.hellosuperstars') {
        navigation.navigate(navigationStrings.NOTIFICATIONSTACK);
      } else if (notification?.channelId == 'promo-notifaiction') {
        navigation.navigate(navigationStrings.NOTIFICATIONSTACK);
      } else if (
        notification?.channelId == 'fcm_fallback_notification_channel'
      ) {
        setPromoNotification(1);
      } else if (activities.length != 0) {
        navigation.navigate(navigationStrings.MENUSTACKSCREENV2, {
          screen: navigationStrings.MENUACTIVITES,
        });
      }
    },
    requestPermissions: Platform.OS === 'ios',
  });

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Test Channel',
        channelDescription: 'A channel for notification',
        playSound: true,
        soundName: 'sound.mp3',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`channel created ${created}`),
    );
    PushNotification.createChannel(
      {
        channelId: 'promo-notifaiction',
        channelName: 'Test Channel hello',
        channelDescription: 'A channel for notification',
        playSound: true,
        soundName: 'sound.mp3',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`channel created ${created}`),
    );
  };

  // const handleNotification = () => {

  //   PushNotification.cancelAllLocalNotifications();

  //   PushNotification.localNotification({
  //     channelId: "test-channel",
  //     title: "You clicked on ",
  //     message: "habijabi message here",
  //     bigText: " is one of the largest and most beatiful cities in ",
  //     color: "red",
  //     id: 1,
  //     playSound: true,
  //     soundName: 'sound.mp3',
  //     importance: 4,
  //     vibrate: true,
  //     vibration: 1000,
  //   });

  //   PushNotification.localNotificationSchedule({
  //     channelId: "test-channel",
  //     title: "Alarm",
  //     message: "You clicked on " + item.country + " 20 seconds ago",
  //     date: new Date(Date.now() + 20 * 1000),
  //     allowWhileIdle: true,
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[themeBacground, {minHeight: windowHeight}]}>
        {/* <LearningSessionNav /> */}
        {/* <VideoUploadLearningSession /> */}
        {/* <ResultLearningSession /> */}
        {/*.............. custom header start .............. */}
        <HeaderComp />
        <PromoModal />
        {/* ..........custom header end....................  */}

        {/* ...........online active stars................... */}
        <NotificationRender />

        <HomeOnlineStars action={action} />
        {/* <OnlineStars /> */}
        {/* ...........online active end................... */}

        {/* <OnlineStars /> */}

        {/* ...........online active end................... */}
        {/* ...........Home Page card start................... */}

        <PostCardContainer action={action} setAction={setAction} />
      </View>
    </SafeAreaView>
  );
}

export default Home;
