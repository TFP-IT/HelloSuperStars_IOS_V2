import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import NotificationContent from './NotificationContent';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
import colorCode from '../../Constants/colorCode';
import Icon from 'react-native-vector-icons/AntDesign';

import RenderHtml from 'react-native-render-html';
import PromoModal from '../../Components/MODAL/PromoModal';
import PromoNotification from './PromoNotification';
import { useThemeColor } from '../../CustomHooks/useThemeColor';
import NoDataComp from '../../Components/NoDataComp';

const Notification = ({ navigation }) => {
  const {
    notification,
    axiosConfig,
    totalNotification,
    updateNotification,
    socketData,
    useInfo,
    setPromoNotification,
    promoNotification,
    signInPromo,
    currency,
  } = useContext(AuthContext);
  // const { socketData, axiosConfig } = useContext(AuthContext);

  // console.log('notification is ===> ', notification);
  const Navigation = useNavigation();
  const [eventData, setEventData] = useState();
  const [buffer, setBuffer] = useState(false);
  const { themeBacground } = useThemeColor();

  // useEffect(() => {
  //   updateNotification();
  //   getUserWinStatus()

  // }, [totalNotification, promoNotification]);

  useEffect(() => {
    let data = 'got new notification';
    socketData.emit('notification', data);
    // console.log('dada___', useInfo)
    setPromoNotification(0);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateNotification();
      getUserWinStatus();
    }, [totalNotification, promoNotification]),
  );

  const getUserWinStatus = () => {
    if (currency.eventMode) {

      setBuffer(true);
      axios
        .get(AppUrl.raffalDrowStatus, axiosConfig)
        .then(res => {
          console.log('my data', res.data);
          setBuffer(false);
          if (res.data.status == 200) {
            setEventData(res.data);
          }
        })
        .catch(err => {
          setBuffer(false);
          console.log('notification faild', err.message);
        });
    }
  };

  const titleSource = {
    html: `<div style='color:#e6e6e6;font-size:17px;'>${eventData?.body?.message ? eventData?.body?.message : ''
      }</div>`,
  };

  // console.log('notification------------', notification);
  return (
    <View style={[styles.container, themeBacground]}>
      <SafeAreaView>
        <ScrollView>
          {/*.............. custom header start .............. */}
          <HeaderComp
            text="Notification"
            backFunc={() => navigation.goBack()}
          />

          <View style={{ paddingBottom: 200 }}>
            {buffer ? (
              <View
                style={{
                  height: 600,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: colorCode.formBg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    zIndex: 9,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  <ActivityIndicator color={colorCode.gold} size="large" />
                  <Text
                    style={{
                      color: colorCode.gold,
                      marginLeft: 10,
                      fontWeight: '900',
                    }}>
                    Please wait....
                  </Text>
                </View>
              </View>
            ) : (
              <>
                {notification?.length === 0 &&
                  !eventData &&
                  !currency.eventMode && <NoDataComp />}
              </>
            )}

            {/* event notifications start */}
            {currency.eventMode && eventData && (
              <>
                {eventData.notificationStatus && (
                  <ImageBackground
                    source={imagePath.cardBg}
                    style={{
                      width: '100%',
                      minHeight: 200,
                      borderRadius: 10,
                      overflow: 'hidden',
                      alignItems: 'center',
                      paddingTop: 15,
                      marginTop: 5,
                    }}>
                    <View style={{ padding: 10, marginHorizontal: 20 }}>
                      <View
                        style={{
                          backgroundColor: colorCode.transparentBlack,
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          borderRadius: 50,
                          marginBottom: 10,
                        }}>
                        {eventData?.isWin == true ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <Icon
                              name="checkcircle"
                              color={colorCode.gold}
                              size={20}
                            />
                            <Text
                              style={{
                                marginLeft: 7,
                                color: colorCode.gold,
                                fontSize: 20,
                                marginTop: -5,
                              }}>
                              অভিনন্দন। Congratulations
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <Icon
                              name="exclamationcircle"
                              color={colorCode.gold}
                              size={20}
                            />
                            <Text
                              style={{
                                marginLeft: 7,
                                color: colorCode.gold,
                                fontSize: 20,
                                marginTop: -5,
                              }}>
                              {' '}
                              দুঃখিত
                            </Text>
                          </View>
                        )}
                      </View>
                      <RenderHtml contentWidth={'100%'} source={titleSource} />
                      {/* <Text style={{ color: colorCode.whiteText, fontSize: 17, marginVertical: 15 }}>
                    {eventData?.body?.message}
                  </Text> */}
                    </View>

                    {eventData?.isWin == true && (
                      <View
                        style={{
                          backgroundColor: '#fff',
                          width: 220,
                          height: 220,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                          marginTop: 10,
                        }}>
                        <QRCode
                          value={eventData.qr_code}
                          logo={imagePath.logo}
                          logoSize={30}
                          logoBackgroundColor={'#fff'}
                          size={200}
                        // backgroundColor={"#ffffff00"}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: colorCode.gold,
                        justifyContent: 'center',
                        height: 30,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          color: colorCode.transparentBlackDark,
                          fontWeight: '900',
                          fontSize: 15,
                        }}>
                        www.hellosuperstars.com
                      </Text>
                    </View>
                  </ImageBackground>
                )}

                <PromoNotification data={eventData?.promoMessage} />
              </>
            )}

            {/* event notifications end */}
            {notification?.map((data, index) => (
              <NotificationContent data={data} index={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Notification;
