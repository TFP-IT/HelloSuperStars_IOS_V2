import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Constants/context';
import PushNotification from 'react-native-push-notification';
import AppUrl from '../RestApi/AppUrl';
import moment from 'moment';

const NotificationRender = () => {
  const { activities, socketData, updateNotification, countryTimestamp } =
    useContext(AuthContext);
  const { useInfo } = useContext(AuthContext);

  // useEffect(() => {
  //   handelLearningSessionNotification();
  //   handelMeetupSessionNotification();
  //   handelQnaNotification();
  //   handelLiveChatNotification();

  useEffect(() => {
    // handelLearningSessionNotification();
    // handelMeetupSessionNotification();
    // handelQnaNotification();
    // handelLiveChatNotification();
    // PushNotification.localNotificationSchedule({
    //   channelId: 'test-channel',
    //   title: "nai",
    //   message: 'Get Ready, your learning session is live now',
    //   bigText:
    //     'Get ready for your register learning session with  start with sort time ',
    //   color: 'red',
    //   id: 4,
    //   playSound: true,
    //   soundName: 'sound.mp3',
    //   // bigPictureUrl: AppUrl.MediaBaseUrl + item?.learning_session?.banner,
    //   // importance: 4,
    //   vibrate: true,
    //   vibration: 1000,
    //   // date: new Date(1),
    // });
    // PushNotification.localNotification({
    //   channelId: 'test-channel',
    //   title: "nai",
    //   message: 'Get Ready, your learning session is live now'
    // })
  }, [activities]);

  useEffect(() => {
    socketData.on('greeting_data', data => {
      console.log('recive data', data);
      return handleGreetingNotification(data);
    });
    socketData.on('reRenderNotification', () => {
      return updateNotification();
    });
  }, [socketData]);

  /**
   * time left count
   */
  const timeCount = (date, time) => {
    // console.log('count date:', date + ' time:' + time);

    let StartTime = moment(date + ' ' + time);
    let timeCounts =
      StartTime.valueOf() - new Date(countryTimestamp()).getTime();

    return timeCounts - 5000;
  };

  /**
   * Notification for greeting with socket
   */
  const handleGreetingNotification = data => {
    console.log('push');
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Greetings',
      message: `Please Pay for Greetings`,
      bigText:
        'Get ready for your register learning session with  start with sort time ',
      color: 'red',
      playSound: true,
      soundName: 'sound.mp3',
      id: data.id,
      vibrate: true,
      vibration: 1000,
    });
  };

  /**
   * Notification for learning session
   */
  // const handelLearningSessionNotification = () => {
  //   activities?.learning_session_activities?.map(item => {
  //     let dateTime = item?.learning_session?.event_date.split(' ');
  //     let scheduleTime = timeCount(
  //       dateTime[0],
  //       item?.learning_session?.start_time,
  //     );

  //     if (scheduleTime >= 0) {
  //       PushNotification.localNotificationSchedule({
  //         channelId: 'test-channel',
  //         title: item?.learning_session?.title,
  //         message: 'Get Ready, your learning session is live now',
  //         bigText:
  //           'Get ready for your register learning session with  start with sort time ',
  //         color: 'red',
  //         id: item?.id,
  //         playSound: true,
  //         soundName: 'sound.mp3',
  //         bigPictureUrl: AppUrl.MediaBaseUrl + item?.learning_session?.banner,
  //         // importance: 4,
  //         vibrate: true,
  //         vibration: 1000,
  //         date: new Date(Date.now() + scheduleTime),
  //       });
  //     }
  //   });
  // };

  /**
   * Notifiacation for Meetup session
   */
  const handelMeetupSessionNotification = () => {
    activities?.meetup_activities?.map(item => {
      let scheduleTime = timeCount(
        item?.meetup?.event_date,
        item?.meetup?.start_time,
      );
      if (scheduleTime >= 0) {
        PushNotification.localNotificationSchedule({
          channelId: 'test-channel',
          title: item?.meetup?.title,
          message: 'Get Ready, your meetup session is live now',
          bigText:
            'Get ready for your register meetup session with  start with sort time ',
          color: 'red',
          id: item?.id,
          playSound: true,
          soundName: 'sound.mp3',
          bigPictureUrl: AppUrl.MediaBaseUrl + item?.meetup?.banner,
          // importance: 4,
          vibrate: true,
          vibration: 1000,
          date: new Date(Date.now() + scheduleTime),
        });
      }
    });
  };

  /**
   *notification for qna
   */
  const handelQnaNotification = () => {
    activities?.qna_activities?.map(item => {
      let dateTime = item?.qna_registration?.qna_date?.split(' ');
      let scheduleTime = timeCount(
        dateTime[0],
        item?.qna_registration?.qna_start_time,
      );

      if (scheduleTime >= 0) {
        PushNotification.localNotificationSchedule({
          channelId: 'test-channel',
          title: item?.qna?.title,
          message: 'Get Ready, your question and answer session is live now',
          bigText:
            'Get ready for your register question and answer session with  start with sort time ',
          color: 'red',
          id: item?.id,
          playSound: true,
          soundName: 'sound.mp3',
          bigPictureUrl: AppUrl.MediaBaseUrl + item?.qna?.banner,
          // importance: 4,
          vibrate: true,
          vibration: 1000,
          date: new Date(Date.now() + scheduleTime),
        });
      }
    });
  };

  /**
   * live chat notification
   */
  const handelLiveChatNotification = () => {
    activities?.live_chat_activities?.map(item => {
      // console.log('activety data', item)

      let scheduleTime = timeCount(
        item?.livechat?.event_date,
        item?.livechat_registration?.live_chat_start_time,
      );

      if (scheduleTime >= 0) {
        PushNotification.localNotificationSchedule({
          channelId: 'test-channel',
          title: item?.livechat?.title,
          message: 'Get Ready, your live chat is running',
          bigText:
            'Get ready for your register live chat session with  start with sort time ',
          color: 'red',
          id: item?.id,
          playSound: true,
          soundName: 'sound.mp3',
          bigPictureUrl: AppUrl.MediaBaseUrl + item?.livechat?.banner,
          // importance: 4,
          vibrate: true,
          vibration: 1000,
          date: new Date(Date.now() + scheduleTime),
        });
      }
    });
  };

  return <></>;
};

export default NotificationRender;
