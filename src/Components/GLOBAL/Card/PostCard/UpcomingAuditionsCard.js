import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import imagePath from '../../../../Constants/imagePath';
import RenderHtml from 'react-native-render-html';
import VideoPlayer from 'react-native-video-player';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import navigationStrings from '../../../../Constants/navigationStrings';
import { useNavigation } from '@react-navigation/native';
import AppUrl from '../../../../RestApi/AppUrl';
import NoDataComp from '../../../NoDataComp';
export default function UpcomingAuditionsCard(props) {
  const { width } = useWindowDimensions();
  const post = props.post;
  console.log(post);
  const Navigation = useNavigation();
  const [share, setShare] = useState(false);
  const [like, setlike] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [postShare, setPostShare] = useState(0);
  const onShare = async () => {
    axios
      .get(AppUrl.PostShare + post.id, axiosConfig)
      .then(res => {
        //console.log(res);
        setPostShare(post?.share_count + 1);
      })
      .catch(err => {
        console.log(err.message);
      });

    try {
      const result = await Share.share({
        title: 'app Link',
        message: `https://www.hellosuperstars.com/ `,
        url: `https://www.hellosuperstars.com`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const dateMonthConverter = (date = null) => {
    const d = new Date(date);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = months[d.getMonth()];
    const day = d.getDate();
    return monthName + ' ' + day;
  };

  return (
    <View>
      {post.length > 0 ? (
        post.map((item, index) => {
          return (
            <View>
              <View style={styles.CardRow}>
                <View style={styles.CardContent}>
                  <View style={{ position: 'relative' }}>
                    <ImageBackground
                      source={imagePath.BannerAu}
                      style={styles.BannerCardImg}>
                      <View style={styles.TextBanner}>
                        <RenderHtml
                          contentWidth={width}
                          source={{
                            html: `<div style='color:#F6EA45; display: inline; font-size: 18px; font-weight: 'bold'>${item?.audition?.title}</div>`,
                          }}
                          style={{ color: 'red' }}
                        />
                      </View>
                    </ImageBackground>
                    <VideoPlayer
                      style={styles.BannerCardImg}
                      video={{
                        uri: `${AppUrl.MediaBaseUrl}${item?.audition?.video}`,
                      }}
                      videoWidth={1600}
                      videoHeight={900}
                      thumbnail={{
                        uri: `${AppUrl.MediaBaseUrl}${item?.audition?.banner}`,
                      }}
                      blurRadius={10}
                    />
                    <View style={styles.BannerCse}>
                      <View style={{ paddingVertical: 2 }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 18,
                            paddingHorizontal: 3,
                            paddingTop: 2,
                          }}>
                          <View style={{ paddingVertical: 2 }}>
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 15,
                                paddingHorizontal: 3,
                                paddingTop: 2,
                              }}>
                              FROM{' '}
                              {dateMonthConverter(item.audition?.start_date)} -{' '}
                              {dateMonthConverter(item.audition?.end_date)}
                            </Text>
                          </View>
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'flex-end',
                          marginHorizontal: 10,
                          marginVertical: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            return Navigation.navigate(
                              navigationStrings.AUDITIONREGISTER,
                              {
                                data: item,
                              },
                            );
                          }}>
                          <LinearGradient
                            style={styles.meetupBtn}
                            colors={[
                              '#F1A817',
                              '#F5E67D',
                              '#FCB706',
                              '#DFC65C',
                            ]}>
                            <Animatable.Text
                              animation="pulse"
                              easing="ease-out"
                              iterationCount="infinite"
                              style={{ color: '#fff', fontSize: 12 }}>
                              Register Now
                            </Animatable.Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={styles.BannerCse}>
                    <View>
                      <Text style={styles.BannerCseText}>With :</Text>
                    </View>
                    {item.audition?.assigned_judges?.map(judge => {
                      return (
                        <>
                          <View style={styles.SText}>
                            <Image
                              style={styles.starCardImg}
                              source={{
                                uri: `${AppUrl.MediaBaseUrl + judge?.user?.image
                                  }`,
                              }}
                            />
                          </View>
                        </>
                      );
                    })}
                  </View>

                  <View style={styles.cardInfo}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <Text style={styles.infoText}>
                        <Icon name="heart" color={'red'} size={12} />
                      </Text>
                      <Text style={{ marginLeft: 4, color: '#d9d9d9' }}>
                        {likeCount}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ marginTop: 7 }}>
                        <Icon name="paper-plane" color={'#03a5fc'} size={12} />
                      </View>
                      <View>
                        <Text style={styles.infoText}>{postShare} Share</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <NoDataComp />
      )}
    </View>
  );
}
