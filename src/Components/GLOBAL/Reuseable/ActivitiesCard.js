import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Toast from 'react-native-root-toast';

// import AppUrl from '../../RestApi/AppUrl';
import styles from './ActivitiesCardStyle';
import {BackHandler} from 'react-native';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import MenuNavigator from '../../../Screen/Menu/MenuNavigator';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import {AuthContext} from '../../../Constants/context';

import Icon from 'react-native-vector-icons/Entypo';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';
import HeaderComp from '../../HeaderComp';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleHeader from '../../TitleHeader';
import ActivitiesCardBody from './ActivitiesCardBody';

const ActivitiesCard = ({route}) => {
  const {childActivityEventList, childActivityEventType} = route.params;

  const [roomId, setRoomId] = useState();
  const navigation = useNavigation();
  const {axiosConfig} = useContext(AuthContext);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);

  let title = '';
  switch (childActivityEventType) {
    case 'learningSession':
      title = 'Learning Session';
      break;
    case 'general':
      title = 'General';
      break;
    case 'souviner':
      title = 'Souvenir';
      break;
    case 'auction':
      title = 'Auction';
      break;
    case 'marketplace':
      title = 'Marketplace';
      break;
    case 'meetup':
      title = 'Meetup';
      break;
    case 'liveChat':
      title = 'Live Chat';
      break;
    case 'qna':
      title = 'Question & Answer';
      break;
  }

  // const width = Dimensions.get('window').width;
  const renderEventItem = ({item}) => {
    let event = {};
    let eventRegistration = {};
    let eventType = '';
    let paymentStatus;
    let fee = 0;

    let bidEnd;
    let result_date;
    let current_date = new Date().getTime();

    // const [bidEndingTime, setBidEndingTime] = useState(null);
    // const [resultTime, setResultTime] = useState(null);
    // const [currentTime, setCurrentTime] = useState(null);

    // const getTime = async () => {
    //   setBidEndingTime(await new Date(event?.bid_to).getTime());
    //   setResultTime(await new Date(event?.result_date).getTime());
    //   setCurrentTime(await new Date().getTime());
    // };

    switch (childActivityEventType) {
      case 'learningSession':
        paymentStatus = true;
        event = item.learning_session;
        eventType = 'learningSession';
        item?.learning_session_registration?.publish_status
          ? (paymentStatus = true)
          : (paymentStatus = false);
        fee = item?.learning_session?.fee;
        //.learning_session', item.learning_session);
        break;

      case 'general':
        paymentStatus = true;
        event = item.general;
        break;

      case 'meetup':
        eventType = 'meetup';
        item?.meetup_registration?.payment_status
          ? (paymentStatus = true)
          : (paymentStatus = false);
        event = item.meetup;
        fee = item?.meetup?.fee;
        console.log('meetup is ...........', item?.meetup);
        console.log('meetup reg value', item?.meetup_registration);
        break;

      case 'liveChat':
        eventType = 'livechat';
        item?.livechat_registration?.publish_status
          ? (paymentStatus = true)
          : (paymentStatus = false);
        event = item.livechat;
        eventRegistration = item.livechat_registration;
        fee = item?.livechat_registration?.amount;
        break;

      case 'qna':
        eventType = 'qna';
        item?.qna_registration?.publish_status
          ? (paymentStatus = true)
          : (paymentStatus = false);
        event = item.qna;
        eventRegistration = item.qna_registration;
        fee = item?.qna_registration?.amount;
        console.log('qna event------------------->>>>>>>>>>>>>', item.qna);

        break;

      case 'marketplace':
        paymentStatus = true;
        eventType = 'marketplace';
        event = item.market_place_order;
        console.log('event all----------', event);
        break;
      case 'souviner':
        paymentStatus = true;
        eventType = 'souvenir';
        event = item.souvenir_apply;
        break;
      case 'auction':
        paymentStatus = true;
        eventType = 'auction';
        event = item.auction;
        bidEnd = new Date(event?.bid_to).getTime();
        result_date = new Date(event?.result_date).getTime();
        break;
    }

    let ActualEventDate = moment(
      event?.date ? event?.date : event?.event_date,
    ).format('YYYY-MM-DD');

    // console.log('my status', event);
    // console.log('ActualEventDate------------', ActualEventDate);
    let EndTime = '';
    let StartTime = '';
    if (childActivityEventType == 'liveChat') {
      EndTime = moment(
        '2022-01-20 ' + eventRegistration?.live_chat_end_time,
      ).format('HH:mm:ss');
      StartTime = moment(
        '2022-01-20 ' + eventRegistration?.live_chat_start_time,
      ).format('HH:mm:ss');
    } else if (childActivityEventType == 'qna') {
      EndTime = moment('2022-01-20 ' + eventRegistration?.qna_end_time).format(
        'HH:mm:ss',
      );
      StartTime = moment(
        '2022-01-20 ' + eventRegistration?.qna_start_time,
      ).format('HH:mm:ss');
    } else if (childActivityEventType == 'marketplace') {
    } else {
      EndTime = moment('2022-01-20 ' + event?.end_time).format('HH:mm:ss');
      StartTime = moment('2022-01-20 ' + event?.start_time).format('HH:mm:ss');
    }

    let EventDateWithEndTime = new Date(
      moment(ActualEventDate + ' ' + EndTime),
    );
    let EventDateWithStartTime = new Date(
      moment(ActualEventDate + ' ' + StartTime),
    );

    let CurrentDateWithTime = new Date();

    let days = parseInt(
      (EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60 * 24),
    );
    let hours = parseInt(
      ((EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60)) % 24,
    );
    let minutes = parseInt(
      (Math.abs(
        EventDateWithStartTime.getTime() - CurrentDateWithTime.getTime(),
      ) /
        (1000 * 60)) %
        60,
    );

    let seconds = Math.floor(
      (Math.abs(
        EventDateWithStartTime.getTime() - CurrentDateWithTime.getTime(),
      ) %
        (1000 * 60)) /
        1000,
    );

    const handleJoinNow = () => {
      // console.log('jdshfgjs', event);

      if (childActivityEventType == 'liveChat') {
        navigation.navigate('VideoSdk', {
          meetingId: item?.livechat_registration?.room_id,
          type: 'videoChat',
        });
      } else if (childActivityEventType == 'qna') {
        // alert('under devolpment');
        navigation.navigate('Message');
      } else if (childActivityEventType == 'meetup') {
        if (event?.meetup_type == 'Offline') {
          alert('offline');
        } else {
          navigation.navigate('VideoSdk', {
            meetingId: event?.event_link,
            type: 'meetup',
          });
        }
      } else if (childActivityEventType == 'learningSession') {
        console.log('learning session');
        navigation.navigate('VideoSdk', {
          meetingId: 'a3en-kih1-ls2r',
          type: 'learningSession',
        });
      } else {
      }
    };

    //video upload
    const videoUpload = () => {
      console.log('i hit');
      return navigation.navigate(navigationStrings.LEARNINGSESSIONNAV, {
        event: event,
      });
    };
    const showDetails = () => {
      return navigation.navigate(navigationStrings.ORDERSTATUS, {
        event: event,
      });
    };
    const showSouvinorDetails = () => {
      return navigation.navigate(navigationStrings.SOUVENIRSTATUS, {
        event: event,
      });
    };

    const downlodeTicket = () => {
      Toast.show('Please wait downloading...', Toast.durations.SHORT);

      axios
        .get(AppUrl.DownlodMeetUpTicket + event?.id, axiosConfig)
        .then(res => {
          return Linking.openURL(
            `${AppUrl.MediaBaseUrl}${res.data.certificateURL}`,
          );
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * for qna timing calculation
     */

    const event_start_time =
      moment(event?.event_date).format('LL') +
      ' ' +
      eventRegistration?.qna_start_time;
    const event_end_time =
      moment(event?.event_date).format('LL') +
      ' ' +
      eventRegistration?.qna_end_time;

    const event_start = new Date(event_start_time).getTime();
    const event_end = new Date(event_end_time).getTime();

    /**
     * for qna timing calculation
     */

    /**
     * calculating Time
     */
    const event_start_time_all =
      moment(event?.event_date).format('LL') + ' ' + event?.start_time;
    const event_end_time_all =
      moment(event?.event_date).format('LL') + ' ' + event?.end_time;

    const event_start_all = new Date(event_start_time_all).getTime();
    const event_end_all = new Date(event_end_time_all).getTime();

    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.Container}>
            {event?.banner == null && eventType == '' ? (
              <>
                <Image
                  source={imagePath.AuditionTitle}
                  style={styles.ImgBanner}
                />
              </>
            ) : eventType == 'marketplace' ? ( //for marketplace image is return as image not banner
              <>
                <TouchableOpacity onPress={showDetails}>
                  <Image
                    source={{
                      uri: `${AppUrl.MediaBaseUrl + event?.marketplace?.image}`,
                    }}
                    style={styles.ImgBanner}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={showDetails}>
                  <Text style={styles.Title}>{event?.marketplace?.title}</Text>
                </TouchableOpacity>
              </>
            ) : eventType == 'souvenir' ? ( //for souvenir
              <>
                <TouchableOpacity onPress={showSouvinorDetails}>
                  <Image
                    source={{
                      uri: `${AppUrl.MediaBaseUrl + event?.image}`,
                    }}
                    style={styles.ImgBanner}
                  />
                  <Text style={styles.Title}>{event?.souvenir?.title}</Text>
                  <Text style={styles.Title}>{event?.souvenir?.status}</Text>
                  <View style={styles.DateBox}>
                    <View style={styles.Join}>
                      <Text style={styles.JoinText}>
                        {event?.status == 0 ? (
                          <> Pending</>
                        ) : event?.status == 1 ? (
                          <>Payment pending</>
                        ) : event?.status == 2 ? (
                          <> Payment Complete</>
                        ) : event?.status == 3 ? (
                          <> Processing</>
                        ) : event?.status == 4 ? (
                          <> Product Received</>
                        ) : event?.status == 5 ? (
                          <> Processing</>
                        ) : event?.status == 6 ? (
                          <> Out for Delivery</>
                        ) : (
                          <> Delivered</>
                        )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            ) : eventType == 'auction' ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(
                      navigationStrings.AUCTIONPARTICIPATENOW,
                      {
                        product: event,
                      },
                    );
                  }}>
                  <Image
                    source={{
                      uri: `${AppUrl.MediaBaseUrl + event?.banner}`,
                    }}
                    style={styles.ImgBanner}
                  />
                  <Text style={styles.Title}>{event?.title}</Text>
                  <View style={styles.DateBox}>
                    <View style={styles.Join}>
                      <Text style={styles.JoinTextAuction}>
                        {bidEnd < current_date && result_date > current_date
                          ? 'Acquired Application'
                          : result_date < current_date
                          ? 'Show Result'
                          : ''}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={{
                    uri: `${AppUrl.MediaBaseUrl + event?.banner}`,
                  }}
                  style={styles.ImgBanner}
                />
                <Text style={styles.Title}>{event?.title}</Text>
                {/* <Text style={styles.Title}>{event}</Text> */}
              </>
            )}
            {/* <Image source={imagePath.BgLane1} style={styles.ImgBanner} /> */}

            <View style={styles.DateBox}>
              {eventType == 'marketplace' ? (
                <>
                  {event?.status == 1 ? (
                    <View style={styles.Join}>
                      <TouchableOpacity onPress={showDetails}>
                        <Text style={styles.JoinText}>Ordered</Text>
                      </TouchableOpacity>
                    </View>
                  ) : event?.status == 2 ? (
                    <View style={styles.Join}>
                      <TouchableOpacity onPress={showDetails}>
                        <Text style={styles.JoinText}>Received</Text>
                      </TouchableOpacity>
                    </View>
                  ) : event?.status == 3 ? (
                    <View style={styles.Join}>
                      <TouchableOpacity onPress={showDetails}>
                        <Text style={styles.JoinText}>Out for Delivery</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <View style={styles.Join}>
                        <TouchableOpacity onPress={showDetails}>
                          <Text style={styles.JoinText}>Delivered</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* <Text style={{color: 'white'}}>I am date Box</Text> */}
                  {EventDateWithEndTime.getTime() <
                  CurrentDateWithTime.getTime() ? (
                    <>{/* completed  */}</>
                  ) : (
                    <>
                      {EventDateWithStartTime.getTime() >
                      CurrentDateWithTime.getTime() ? (
                        <>
                          {/* <View style={styles.DateColor}>
                            <Text style={styles.textDay}>{days}</Text>
                            <Text style={styles.textSec}>DAYS</Text>
                          </View>

                          <View style={styles.DateColor}>
                            <Text style={styles.textDay}>{hours}</Text>
                            <Text style={styles.textSec}>HOURS</Text>
                          </View>

                          <View style={styles.DateColor}>
                            <Text style={styles.textDay}>{minutes}</Text>
                            <Text style={styles.textSec}>MIN</Text>
                          </View>
                          <View style={styles.DateColor}>
                            <Text style={styles.textDay}>{seconds}</Text>
                            <Text style={styles.textSec}>SEC</Text>
                          </View> */}
                        </>
                      ) : (
                        <>
                          {EventDateWithStartTime.getTime() <
                            CurrentDateWithTime.getTime() ||
                          EventDateWithEndTime.getTime() >
                            CurrentDateWithTime.getTime() ? (
                            <>
                              {paymentStatus && (
                                <TouchableOpacity onPress={handleJoinNow}>
                                  {event?.meetup_type == 'Offline' &&
                                  eventType === 'meetup' ? null : (
                                    <Text style={styles.JoinNowColor}>
                                      Join Now
                                    </Text>
                                  )}
                                </TouchableOpacity>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {eventType === 'qna' && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        top: 0,
                        backgroundColor: '#ffaa00',
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 14,
                        borderBottomLeftRadius: 20,
                      }}>
                      {event_start < new Date().getTime() &&
                      event_end > new Date().getTime() ? (
                        <TouchableOpacity onPress={handleJoinNow}>
                          <Text style={styles.JoinTextQNA}>Running </Text>
                        </TouchableOpacity>
                      ) : event_start >= new Date().getTime() ? (
                        eventRegistration.publish_status ? (
                          <TouchableOpacity
                            onPress={() => {
                              Toast.show(
                                'Please wait for your session',
                                Toast.SHORT,
                              );
                            }}>
                            <Text style={styles.JoinTextQNA}>Waiting </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setIsShowPaymentComp(true)}>
                            <Text style={styles.JoinTextQNA}>
                              Payment Pending
                            </Text>
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            Toast.show('Your Session expired', Toast.SHORT);
                          }}>
                          <Text style={styles.JoinTextQNA}>Expired </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  {eventType === 'livechat' && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 12,
                        top: 0,
                        backgroundColor: '#ffaa00',
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 14,
                        borderBottomLeftRadius: 20,
                      }}>
                      {EventDateWithStartTime >= new Date().getTime() ? (
                        !paymentStatus ? (
                          <TouchableOpacity
                            onPress={() => setIsShowPaymentComp(true)}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 'auto',
                                padding: 15,
                                color: 'black',
                                textAlign: 'center',
                                paddingVertical: 3,
                                zIndex: 12,
                              }}>
                              Payment Pending{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity>
                            <Text style={styles.JoinTextQNA}>Waiting </Text>
                          </TouchableOpacity>
                        )
                      ) : EventDateWithStartTime < new Date().getTime() &&
                        EventDateWithEndTime > new Date().getTime() ? (
                        !paymentStatus ? (
                          <TouchableOpacity
                            onPress={() => setIsShowPaymentComp(true)}>
                            <Icon name="warning" size={20} color="red" />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 'auto',
                                padding: 15,
                                color: 'black',
                                textAlign: 'center',
                                paddingVertical: 3,
                                zIndex: 12,
                              }}>
                              Payment Pending{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={handleJoinNow}>
                            <Text style={styles.JoinTextQNA}>Running...</Text>
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity>
                          <Text style={styles.JoinTextQNA}>Expired</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  {eventType === 'meetup' && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 12,
                        top: 0,
                        backgroundColor: '#ffaa00',
                        right: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopRightRadius: 14,
                        borderBottomLeftRadius: 20,
                      }}>
                      {EventDateWithStartTime >= new Date().getTime() ? (
                        !paymentStatus ? (
                          <TouchableOpacity
                            onPress={() => setIsShowPaymentComp(true)}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 'auto',
                                padding: 15,
                                color: 'black',
                                textAlign: 'center',
                                paddingVertical: 3,
                                zIndex: 12,
                              }}>
                              Payment {paymentStatus} Pending
                            </Text>
                          </TouchableOpacity>
                        ) : event?.meetup_type === 'Offline' ? (
                          <TouchableOpacity onPress={downlodeTicket}>
                            <Text style={styles.JoinTextQNA}>
                              Download Ticket{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : null
                      ) : EventDateWithStartTime < new Date().getTime() &&
                        EventDateWithEndTime > new Date().getTime() ? (
                        !paymentStatus ? (
                          <TouchableOpacity
                            onPress={() => setIsShowPaymentComp(true)}>
                            <Icon name="warning" size={20} color="red" />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                width: 'auto',
                                padding: 15,
                                color: 'black',
                                textAlign: 'center',
                                paddingVertical: 3,
                                zIndex: 12,
                              }}>
                              Payment Pending{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : event?.meetup_type === 'Offline' ? (
                          <TouchableOpacity onPress={downlodeTicket}>
                            <Text style={styles.JoinTextQNA}>
                              Download Ticket{' '}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={handleJoinNow}>
                            <Text style={styles.JoinTextQNA}>Running...</Text>
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity>
                          <Text style={styles.JoinTextQNA}>Expired</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  {event?.assignment === 1 && event?.status === 5 ? (
                    <View style={styles.Join}>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('wait');
                          videoUpload();
                        }}>
                        <Text style={styles.JoinText}>Assignment</Text>
                      </TouchableOpacity>
                    </View>
                  ) : event?.assignment === 1 && event?.status === 9 ? (
                    <View style={styles.Join}>
                      <TouchableOpacity
                        onPress={() => {
                          return navigation.navigate(
                            navigationStrings.RESULTLEARNINGSESSION,
                            {
                              event: event,
                            },
                          );
                        }}>
                        <Text style={styles.JoinText}>Show Result</Text>
                      </TouchableOpacity>
                    </View>
                  ) : event?.assignment === 1 &&
                    event?.status > 1 &&
                    event?.status < 5 ? (
                    <View style={styles.Join}>
                      {EventDateWithStartTime.getTime() <
                        CurrentDateWithTime.getTime() ||
                      EventDateWithEndTime.getTime() >
                        CurrentDateWithTime.getTime() ? (
                        EventDateWithEndTime.getTime() <
                        CurrentDateWithTime.getTime() ? (
                          <View style={styles.Join}>
                            <TouchableOpacity>
                              <Text style={styles.JoinText}>
                                Assignment Pending
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : EventDateWithStartTime.getTime() <
                          CurrentDateWithTime.getTime() ? (
                          <View style={styles.Join}>
                            <TouchableOpacity onPress={handleJoinNow}>
                              <Text style={styles.JoinText}>Running...</Text>
                            </TouchableOpacity>
                          </View>
                        ) : EventDateWithEndTime.getTime() >
                          CurrentDateWithTime.getTime() ? (
                          <View style={styles.Join}>
                            <TouchableOpacity>
                              <Text style={styles.JoinText}>Waiting</Text>
                            </TouchableOpacity>
                          </View>
                        ) : null
                      ) : EventDateWithStartTime.getTime() >
                        CurrentDateWithTime.getTime() ? (
                        <View style={styles.Join}>
                          <TouchableOpacity>
                            <Text style={styles.JoinText}>Upcomming</Text>
                          </TouchableOpacity>
                        </View>
                      ) : event?.assignment === 1 && event?.status === 2 ? (
                        <View style={styles.Join}>
                          <TouchableOpacity>
                            <Text style={styles.JoinText}>Waiting</Text>
                          </TouchableOpacity>
                        </View>
                      ) : EventDateWithEndTime.getTime() <
                        CurrentDateWithTime.getTime() ? (
                        <View style={styles.Join}>
                          <TouchableOpacity>
                            <Text style={styles.JoinText}>Expired</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity>
                          <Text style={styles.JoinText}>
                            Assignment Pending
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <>
                      {EventDateWithStartTime.getTime() >
                      CurrentDateWithTime.getTime() ? (
                        <View style={styles.Join}>
                          {childActivityEventType == 'meetup' &&
                          event?.meetup_type == 'Offline' ? (
                            <>
                              {paymentStatus ? (
                                <TouchableOpacity
                                  onPress={() => downlodeTicket()}>
                                  <Text style={styles.JoinText}>
                                    {/* Download Ticket */}
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                  }}
                                  onPress={() => setIsShowPaymentComp(true)}>
                                  <Icon name="warning" size={20} color="red" />
                                  <Text style={styles.JoinText}>
                                    Payment pending
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </>
                          ) : (
                            <>
                              {paymentStatus ? (
                                <TouchableOpacity>
                                  <Text style={styles.JoinText}>Upcoming</Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={{
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                  }}
                                  onPress={() => setIsShowPaymentComp(true)}>
                                  <Icon name="warning" size={20} color="red" />
                                  <Text style={styles.JoinText}>
                                    Payment pending
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </>
                          )}
                        </View>
                      ) : (
                        <>
                          {item.days === '00' && item.hours === '00' ? (
                            <View style={styles.Join}>
                              <TouchableOpacity onPress={handleJoinNow}>
                                <Text style={styles.JoinText}>Running</Text>
                              </TouchableOpacity>
                            </View>
                          ) : CurrentDateWithTime.getTime() <
                            EventDateWithStartTime.getTime() ? (
                            <View style={styles.Join}>
                              <TouchableOpacity onPress={handleJoinNow}>
                                <Text style={styles.JoinText}>Upcoming</Text>
                              </TouchableOpacity>
                            </View>
                          ) : CurrentDateWithTime.getTime() >
                            EventDateWithStartTime.getTime() ? (
                            <View style={styles.Join}>
                              <TouchableOpacity onPress={handleJoinNow}>
                                <Text style={styles.JoinText}>Expired ..</Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </View>

            <View style={styles.bannerTag}>
              <Image
                source={eventType === 'auction' ? null : imagePath.BgTag}
              />
            </View>

            {item.days === '00' && item.hours === '00' ? (
              <View style={styles.Join}>
                {paymentStatus && (
                  <TouchableOpacity>
                    <Text style={styles.JoinText}>Join Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>
        </View>
        <RegisPaymentModal
          eventType={eventType}
          eventId={event?.id}
          modelName={eventType}
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          fee={fee}
          job="pay-again"
        />
      </>
    );
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <SafeAreaView>
          <HeaderComp backFunc={() => navigation.goBack()} />

          {/* <View style={styles.Header}>
        <Image source={imagePath.BgLane} style={styles.HeaderImg} />
        <Text style={styles.HeaderText}>{title}</Text>
      </View> */}

          <TitleHeader title={title} />

          <FlatGrid
            itemDimension={150}
            data={childActivityEventList}
            renderItem={({item}) => (
              <ActivitiesCardBody
                item={item}
                childActivityEventType={childActivityEventType}
                setIsShowPaymentComp={setIsShowPaymentComp}
                isShowPaymentComp={isShowPaymentComp}
                navigation={navigation}
              />
            )}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default ActivitiesCard;
