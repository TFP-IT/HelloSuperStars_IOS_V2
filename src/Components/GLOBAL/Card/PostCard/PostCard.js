import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';

import {
  Dimensions,
  Image,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../../../Constants/imagePath';
import navigationStrings from '../../../../Constants/navigationStrings';
import AppUrl from '../../../../RestApi/AppUrl';
// import noImage from '../../../Assets/Images/no-image.png';
import noImage from '../../../../Assets/Images/no-image.png';

import {AuthContext} from '../../../../Constants/context';

import LockPaymentModal from '../../../MODAL/LockPaymentModal';
import styles from './styles';
import UpcomingAuditionsCard from './UpcomingAuditionsCard';
import {timecoundFunc} from '../../../../CustomHelper/timecoundFunc';
import RegisPaymentModal from '../../../MODAL/RegisPaymentModal';
import {useRef} from 'react';
import Video from 'react-native-video';
import VideoPlayerComp from '../../../VIDEO/VideoPlayerComp';
import colorCode from '../../../../Constants/colorCode';

const PostCard = ({post, callform = null}) => {
  const {width} = useWindowDimensions();
  const [unlocked, setUnlocked] = useState(false);
  const {useInfo, axiosConfig, countryDateTime} = useContext(AuthContext);

  const Navigation = useNavigation();
  const [like, setlike] = useState(
    JSON.parse(post?.user_like_id).includes(useInfo?.id),
  );
  const [share, setShare] = useState(false);
  const [likeId, setLikeId] = useState(JSON.parse(post?.user_like_id));
  const [likeCount, setLikeCount] = useState(
    JSON.parse(post?.user_like_id).length,
  );
  const windowWidth = Dimensions.get('window').width;
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [post_id, setPostId] = useState(false);
  const [fee, setFee] = useState('');
  const [payment_status, setPaymentStatus] = useState([]);
  const [refresh, serRefresh] = useState(true);
  const videoRef = useRef(null);
  const makePayment = id => {
    setPostId(id);
    setIsShowPaymentComp(true);
  };

  const postLock = true;

  const handelLike = () => {
    setlike(!like);
    if (like) {
      setLikeCount(prev => {
        handelLikeUnlike(likeId.slice(0, likeId.length), 'Unlike');

        return prev - 1;
      });
    }
    if (!like) {
      setLikeCount(prev => {
        handelLikeUnlike([...likeId, useInfo.id], 'Like');

        return prev + 1;
      });
    }

    // console.log('fdjkgdg', userLikeIds + post?.id)
  };

  const handelLikeUnlike = (valu, mesg) => {
    let data = {
      showlike: JSON.stringify(valu),
    };

    axios
      .post(AppUrl.SubmitLike + post?.id, data, axiosConfig)
      .then(res => {
        //console.log(res.data);
        if (res.data.status === 200) {
          Toast.show(mesg, Toast.durations.SHORT);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  //got to profile
  function handleStarProfile(star = null) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: star,
    });
  }

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
  // redirect
  function handlePress(event) {
    console.log(event);
    if (event == 'meetup') {
      return Navigation.navigate(navigationStrings.MEETUP, {
        data: post,
      });
    }
    if (event == 'LearningSession') {
      return Navigation.navigate(navigationStrings.LEARNINGSESSION, {
        data: post,
      });
    }
    if (event == 'qna') {
      return Navigation.navigate(navigationStrings.QNA, {
        data: post,
      });
    }
    if (event == 'livechat') {
      return Navigation.navigate(navigationStrings.LIVECHAT, {
        data: post,
      });
    }
    if (event == 'audition') {
      return Navigation.navigate(navigationStrings.AUDITIONREGISTER, {
        data: post,
      });
    }
    if (event == 'fangroup') {
      return Navigation.navigate(navigationStrings.FANGROUP, {
        data: post,
      });
    }
  }
  let postContent = {};

  const [contentHeight, setContentHeight] = useState(true);
  switch (post?.type) {
    case 'learningSession':
      postContent = post?.learning_session;

      break;

    case 'greeting':
      postContent = post?.greeting;

      break;
    case 'general':
      postContent = post?.general;

      break;
    case 'qna':
      postContent = post?.qna;

      break;
    case 'meetup':
      postContent = post?.meetup;
      // console.log('postContent meetup_type', postContent?.meetup_type);

      break;
    case 'livechat':
      postContent = post?.livechat;
      break;
    case 'livechat':
      postContent = post?.livechat;
      break;
    case 'fangroup':
      postContent = post?.fangroup;
      break;
    case 'audition':
      postContent = post?.audition;
  }
  let timeIdentity = '';

  if (post?.type == 'meetup') {
    let dummyTime = '';
    // dummyTime = new Date(post?.meetup?.time);
    dummyTime = moment('2022-01-20 ' + post?.meetup?.time).format('HH');
    let currentHour = Number(dummyTime);

    // console.log('dummyTime----------', dummyTime);
    // console.log('currentHour----------', currentHour);

    if (currentHour >= 3 && currentHour < 12) {
      timeIdentity = 'Morning';
    }
    if (currentHour >= 12 && currentHour < 15) {
      timeIdentity = 'Afternoon';
    }
    if (currentHour >= 15 && currentHour < 20) {
      timeIdentity = 'Evening';
    }
    if (currentHour >= 20 || currentHour < 3) {
      timeIdentity = 'Night';
    }
    // console.log('timeIdentity----------', timeIdentity)
  }
  let A = '';
  let B = '';
  A = new Date(postContent?.registration_end_date);
  B = new Date();

  //post content
  const contentSource = {
    html: `<div style='color:#e6e6e6;font-size:15px'>${
      postContent?.description ? postContent?.description : ''
    }</div>`,
  };
  const titleSource = {
    html: `<div style='color:#e6e6e6;font-size:17px;font-weight: bold;'>${
      postContent?.title ? postContent?.title : ''
    }</div>`,
  };
  const titleAudition = {
    html: `<div style=color:#F6EA45;font-size:14px;font-weight: bold; '>${
      postContent?.title ? postContent?.title : ''
    }</div>`,
  };

  //discription text length count
  let textLength = '';
  if (postContent?.description) {
    textLength = postContent?.description.length;
  } else {
    textLength = 0;
  }
  const [postShare, setPostShare] = useState(post?.share_count);

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

  useEffect(() => {
    post?.type === 'general' &&
      axios
        .get(`${AppUrl.postPaymentCheck}${post.general?.id}`, axiosConfig)
        .then(res => {
          // console.log('paid post data', res.data);
          if (res.data.status === 200) {
            setPaymentStatus(res.data.payment_status);
          }
        })
        .catch(err => {
          console.log(err);
          setError(err);
        });
  }, [unlocked]);

  // console.log('post data', post)
  // console.log('post data', post?.star?.first_name + " " + post?.star?.last_name)

  return (
    <>
      <Animatable.View
        style={windowWidth > 700 ? styles.CardRowWidscreen : styles.CardRow}
        animation="slideInUp">
        <View style={styles.MainCard}>
          {post?.type === 'fangroup' ? (
            // for fangroup start
            <>
              <TouchableOpacity
                style={[
                  styles.cardImg,
                  {
                    borderColor: '#FFAD00',
                    borderWidth: 2,
                    borderRadius: 50,
                    padding: 1,
                    zIndex: 9,
                  },
                ]}
                onPress={() => handleStarProfile(postContent?.my_superstar)}>
                <Image
                  style={styles.starCardImg}
                  source={
                    post?.fangroup?.my_superstar?.image !== null
                      ? {
                          uri: `${
                            AppUrl.MediaBaseUrl +
                            post?.fangroup?.my_superstar?.image
                          }`,
                        }
                      : 'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc='
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.cardImg,
                  {
                    borderColor: '#FFAD00',
                    borderWidth: 2,
                    borderRadius: 50,
                    marginLeft: -15,
                    padding: 1,
                  },
                ]}
                onPress={() =>
                  handleStarProfile(postContent?.another_superstar)
                }>
                <Image
                  style={styles.starCardImg}
                  source={
                    post?.fangroup?.another_superstar?.image !== null
                      ? {
                          uri: `${
                            AppUrl.MediaBaseUrl +
                            post?.fangroup?.another_superstar?.image
                          }`,
                        }
                      : noImage
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.cardText}>{postContent?.group_name}</Text>
                <Text style={styles.time}>
                  {moment(postContent?.created_at).format('LLLL')}
                </Text>
              </TouchableOpacity>
            </>
          ) : post?.type == 'audition' ? (
            //audition card start here
            <>
              <View style={{position: 'relative', width: '100%'}}>
                <View style={styles.CardContent}>
                  <View>
                    <ImageBackground
                      imageStyle={{borderRadius: 2}}
                      source={imagePath.BannerAu}
                      resizeMode={'stretch'}
                      style={{
                        marginVertical: 0,
                        paddingVertical: 15,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <RenderHtml contentWidth={width} source={titleAudition} />
                    </ImageBackground>

                    {/* baler video player  */}

                    {/* <VideoPlayerComp url={`${AppUrl.MediaBaseUrl}${postContent?.video}`} thumbnail={`${AppUrl.MediaBaseUrl}${postContent?.banner}`} /> */}

                    <ImageBackground
                      source={{
                        uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
                      }}
                      style={{height: 200, width: '100%'}}>
                      <VideoPlayerComp
                        url={`${AppUrl.MediaBaseUrl}${postContent?.video}`}
                        thumbnail={`${AppUrl.MediaBaseUrl}${postContent?.banner}`}
                      />
                    </ImageBackground>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderColor: '#024E8C',
                        padding: 15,
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        backgroundColor: '#1A1A1A',
                      }}>
                      <View style={{marginRight: 5}}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 13,
                            paddingHorizontal: 3,
                            paddingTop: 2,
                          }}>
                          FROM {dateMonthConverter(postContent?.start_date)} -{' '}
                          {dateMonthConverter(postContent?.end_date)}
                        </Text>
                      </View>
                      <View style={{marginRight: 5}}>
                        <TouchableOpacity
                          onPress={() => handlePress('audition')}>
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
                              style={{
                                color: '#000',
                                fontSize: 12,
                                backgroundColor: '#fff',
                                opacity: 0.7,
                                paddingHorizontal: 2,
                                borderRadius: 10,
                              }}>
                              Register Now
                            </Animatable.Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* <View style={styles.BannerCse}>
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
                              FROM {dateMonthConverter(postContent?.start_date)}{' '}
                              - {dateMonthConverter(postContent?.end_date)}
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
                          onPress={() => handlePress('audition')}>
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
                              style={{
                                color: '#000',
                                fontSize: 12,
                                backgroundColor: '#fff',
                                opacity: 0.7,
                                paddingHorizontal: 2,
                                borderRadius: 10,
                              }}>
                              Register Now
                            </Animatable.Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View> */}
                  </View>
                </View>

                <View style={styles.BannerCse}>
                  <View>
                    <Text style={styles.BannerCseText}>With :</Text>
                  </View>
                  {postContent?.assigned_judges?.map(judge => {
                    return (
                      <>
                        <View style={styles.SText}>
                          <Image
                            style={styles.starCardImg}
                            source={{
                              uri: `${
                                AppUrl.MediaBaseUrl + judge?.user?.image
                              }`,
                            }}
                          />
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
            </>
          ) : (
            //for normal post
            <>
              <TouchableOpacity
                style={styles.cardImg}
                onPress={() => handleStarProfile(post?.star)}>
                <Image
                  style={styles.starCardImg}
                  source={
                    post?.star?.image !== null
                      ? {
                          uri: `${AppUrl.MediaBaseUrl + post?.star?.image}`,
                        }
                      : noImage
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleStarProfile(post?.star)}>
                <Text style={styles.cardText}>
                  {post?.star?.first_name} {post?.star?.last_name}
                </Text>
                <Text style={styles.time}>
                  {' '}
                  {countryDateTime(post?.created_at, 'Do MMMM  YYYY, h:mm a')}
                  {/* {moment(post?.created_at).format("Do MMMM  YYYY, h:mm a")} */}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.CardContent}>
          {post?.type == 'audition' ? (
            <></>
          ) : (
            <>
              <View
                style={
                  contentHeight && textLength > 300 ? styles.lessText : ''
                }>
                <RenderHtml contentWidth={width} source={titleSource} />
                <RenderHtml contentWidth={width} source={contentSource} />
              </View>
            </>
          )}

          {textLength > 300 && post?.type !== 'audition' ? (
            <TouchableOpacity onPress={() => setContentHeight(!contentHeight)}>
              <Text style={{color: '#FFAD00', marginTop: 5}}>
                {contentHeight ? `Read More . . . ` : `Read Less`}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <Text style={styles.cardContentText}></Text>

          <View style={{position: 'relative'}}>
            {post?.type !== 'audition' && (
              <View style={{position: 'absolute', zIndex: 1, bottom: '2%'}}>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 10,
                    fontSize: 20,
                  }}>
                  {post?.type == 'general'
                    ? null
                    : post?.type !== 'meetup' &&
                      post?.type !== 'qna' &&
                      post?.type !== 'livechat'
                    ? post?.type && post?.type !== 'learningSession'
                    : null}

                  {post?.type == 'qna' && 'Q & A'}
                  {post?.type == 'learningSession' && 'Learning Session'}
                  {post?.type == 'livechat' && 'Live Chat'}
                </Text>
              </View>
            )}
            {post?.type == 'general' ? (
              <View>
                {post?.general?.type == 'paid' && payment_status === null ? (
                  <View>
                    {post?.image ? (
                      <View>
                        <Image
                          style={
                            windowWidth > 700
                              ? styles.cardCoverImgWithScreen
                              : styles.cardCoverImg
                          }
                          source={{
                            uri: `${AppUrl.MediaBaseUrl}${post?.general?.image}`,
                          }}
                          blurRadius={10}
                        />
                        {/* For lock image */}
                        <TouchableOpacity
                          onPress={() => {
                            setFee(post?.fee);
                            makePayment(post?.id);
                          }}
                          style={styles.lockImageBtn}>
                          {payment_status === null ? (
                            <Image
                              source={imagePath.lock}
                              style={styles.lockImage}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        {/* <VideoPlayerComp url={`${AppUrl.MediaBaseUrl}${postContent?.video}`} thumbnail={postContent?.thumbnail
                              ? AppUrl.MediaBaseUrl + postContent?.thumbnail
                              : 'https://www.newagebd.com/files/records/news/202103/132871_199.jpg'}/> */}
                        <VideoPlayer
                          video={{
                            uri: `${AppUrl.MediaBaseUrl}${postContent?.video}`,
                          }}
                          videoWidth={1600}
                          videoHeight={900}
                          thumbnail={{
                            uri: post?.general?.thumbnail
                              ? AppUrl.MediaBaseUrl + post?.general?.thumbnail
                              : AppUrl.MediaBaseUrl + post?.general?.image,
                          }}
                          blurRadius={10}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setFee(post?.general?.fee);
                            console.log(post);
                            makePayment(post?.general?.id);
                          }}
                          style={styles.lockImageBtn}>
                          {payment_status === null ? (
                            <Image
                              source={imagePath.lock}
                              style={styles.lockImage}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                ) : (
                  <View style={{borderRadius: 10, overflow: 'hidden'}}>
                    {post?.type === 'general' ? (
                      <View
                        style={{
                          backgroundColor: colorCode.transparentBlackDark,
                        }}>
                        {postContent?.image ? (
                          <Image
                            style={
                              windowWidth > 700
                                ? styles.cardCoverImgWithScreen
                                : styles.cardCoverImg
                            }
                            source={{
                              uri: `${AppUrl.MediaBaseUrl}${postContent?.image}`,
                            }}
                          />
                        ) : (
                          //baler general

                          <ImageBackground
                            source={{
                              uri: `${AppUrl.MediaBaseUrl}${post?.banner}`,
                            }}
                            style={{height: 200, width: '100%'}}>
                            <VideoPlayerComp
                              url={`${AppUrl.MediaBaseUrl}${post?.video}`}
                              thumbnail={`${AppUrl.MediaBaseUrl}${post?.banner}`}
                            />

                            {/* <VideoPlayer
                            video={{
                              uri: `${AppUrl.MediaBaseUrl}${postContent?.video}`,
                            }}
                            videoWidth={1600}
                            videoHeight={900}
                            pauseOnPress
                            thumbnail={{
                              uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
                            }}
                       
                          /> */}
                          </ImageBackground>
                        )}
                      </View>
                    ) : (
                      <Image
                        style={
                          windowWidth > 700
                            ? styles.cardCoverImgWithScreen
                            : styles.cardCoverImg
                        }
                        source={{
                          uri: `${AppUrl.MediaBaseUrl}${postContent?.image}`,
                        }}
                      />
                    )}
                  </View>
                )}
              </View>
            ) : post?.type == 'greeting' ? (
              <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <VideoPlayerComp
                  url={`${AppUrl.MediaBaseUrl}${postContent?.video}`}
                  thumbnail={`${AppUrl.MediaBaseUrl}${postContent?.banner}`}
                />
                {/* <VideoPlayer
                  video={{
                    uri: `${AppUrl.MediaBaseUrl}${postContent?.video}`,
                  }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={{
                    uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
                  }}
         
                /> */}
              </View>
            ) : post?.type == 'audition' ? (
              <></>
            ) : post?.type === 'learningSession' ? (
              postContent?.video !== null ? (
                <>
                  <VideoPlayerComp
                    url={`${AppUrl.MediaBaseUrl}${postContent?.video}`}
                    thumbnail={`${AppUrl.MediaBaseUrl}${postContent?.banner}`}
                  />

                  {/* <VideoPlayer
                  style={styles.BannerCardImg}
                  video={{
                    uri: `${AppUrl.MediaBaseUrl}${postContent?.video}`,
                  }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={imagePath.Rectangle}
                  blurRadius={10}
                /> */}
                </>
              ) : (
                <View>
                  <Image
                    style={
                      windowWidth > 700
                        ? styles.cardCoverImgWithScreen
                        : styles.cardCoverImg
                    }
                    source={{
                      uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
                    }}
                  />
                </View>
              )
            ) : (
              <View>
                <Image
                  style={
                    windowWidth > 700
                      ? styles.cardCoverImgWithScreen
                      : styles.cardCoverImg
                  }
                  source={{
                    uri: `${AppUrl.MediaBaseUrl}${postContent?.banner}`,
                  }}
                />
              </View>
            )}

            {/* <Image
              style={
                windowWidth > 700
                  ? styles.cardCoverImgWithScreen
                  : styles.cardCoverImg
              }
              source={{
                uri: `${AppUrl.MediaBaseUrl}${post?.type == 'general'
                    ? postContent?.image
                    : postContent?.banner
                  }`,
              }}
            // blurRadius={10}
            />

            For lock image
            <TouchableOpacity   onPress={() => setLockModal(true)} style={styles.lockImageBtn}>
              <Image
              
                source={imagePath.lock}
                style={styles.lockImage}
              />
            </TouchableOpacity> */}
            {/* For lock image */}
            {/* <Image source={imagePath.lock} style={styles.lockImage} /> */}
            {/* pointerEvents="none" */}

            {callform === null ? (
              <>
                {post?.type == 'meetup' ? (
                  <View style={styles.mainMeetUpView}>
                    <View style={{paddingVertical: 2}}>
                      <Text style={{color: '#FFAD00', fontSize: 15}}>
                        {moment(postContent?.date).format('DD MMMM YYYY')}{' '}
                        {/* {timeIdentity} {postContent?.venue ? 'at' : null} */}
                      </Text>
                      <Text
                        style={{
                          color: '#FFAD00',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        Meetup ({postContent?.meetup_type})
                      </Text>
                    </View>

                    {true ? (
                      <>
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={() => handlePress('meetup')}>
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
                                style={{
                                  color: '#000',
                                  fontSize: 12,
                                  backgroundColor: '#fff',
                                  opacity: 0.7,
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                }}>
                                Book Now
                              </Animatable.Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
                {post?.type == 'learningSession' ? (
                  <View style={styles.mainMeetUpViewlearningSession}>
                    {true ? (
                      <>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            marginHorizontal: 10,
                            marginVertical: 5,
                          }}>
                          <TouchableOpacity
                            onPress={() => handlePress('LearningSession')}>
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
                                style={{
                                  color: '#000',
                                  fontSize: 12,
                                  backgroundColor: '#fff',
                                  opacity: 0.7,
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                }}>
                                Register Now
                              </Animatable.Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
                {post?.type == 'qna' ? (
                  <View style={styles.mainMeetUpViewlearningSession}>
                    {/* {A.getTime() > B.getTime() ? ( */}
                    {true ? (
                      <>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            marginHorizontal: 10,
                            marginVertical: 5,
                          }}>
                          <TouchableOpacity onPress={() => handlePress('qna')}>
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
                                style={{
                                  color: '#000',
                                  fontSize: 12,
                                  backgroundColor: '#fff',
                                  opacity: 0.7,
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                }}>
                                Register Now
                              </Animatable.Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
                {post?.type == 'audition' ? <></> : <></>}
                {post?.type == 'livechat' ? (
                  <View style={styles.mainMeetUpViewlearningSession}>
                    {/* {A.getTime() > B.getTime() ? ( */}
                    {true ? (
                      <>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            marginHorizontal: 10,
                            marginVertical: 5,
                            minHeight: 20,
                          }}>
                          <TouchableOpacity
                            onPress={() => handlePress('livechat')}>
                            {timecoundFunc(
                              postContent?.registration_end_date,
                            ) >= 0 && (
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
                                  style={{color: '#000', fontSize: 12}}>
                                  Register Now
                                </Animatable.Text>
                              </LinearGradient>
                            )}

                            {/* {timecoundFunc(
                              postContent?.registration_end_date,
                            ) >= 0 && (
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
                                  style={{color: '#000', fontSize: 12}}>
                                  Register Now
                                </Animatable.Text>
                              </LinearGradient>
                            )} */}
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
                {post?.type == 'fangroup' ? (
                  <View style={styles.mainMeetUpViewlearningSession}>
                    {/* {A.getTime() > B.getTime() ? ( */}
                    {true ? (
                      <>
                        <View
                          style={{
                            justifyContent: 'flex-end',
                            marginHorizontal: 10,
                            marginVertical: 5,
                          }}>
                          <TouchableOpacity
                            onPress={() => handlePress('fangroup')}>
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
                                style={{
                                  color: '#000',
                                  fontSize: 12,
                                  backgroundColor: '#fff',
                                  opacity: 0.7,
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                }}>
                                Join Now
                              </Animatable.Text>
                            </LinearGradient>
                            {/* </LinearGradient> */}
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <View
              style={{
                paddingVertical: 4,
                backgroundColor: '#1A1A1A',
                marginTop: -10,
              }}>
              {/* modify here alamin */}

              {post.type == 'general' ? (
                <Text style={{fontSize: 20, color: 'white', marginLeft: 5}}>
                  {post?.type}{' '}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.cardInfo}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text style={styles.infoText}>
                <Icon name="heart" color={'red'} size={12} />
              </Text>
              <Text style={{marginLeft: 4, color: '#d9d9d9'}}>{likeCount}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 7}}>
                <Icon name="paper-plane" color={'#03a5fc'} size={12} />
              </View>
              <View>
                <Text style={styles.infoText}>{postShare} Share</Text>
              </View>
            </View>
          </View>
          <View />
          <View style={styles.cardButtons}>
            <TouchableOpacity style={styles.likeBtn} onPress={handelLike}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <View>
                  {like ? (
                    <Icon name="heart" color={'red'} size={22} />
                  ) : (
                    <AntDesign name="hearto" color={'red'} size={22} />
                  )}
                </View>
                <Text style={{marginLeft: 8, marginTop: 1, color: '#d9d9d9'}}>
                  Like
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.likeBtn}
              onPress={() => {
                setShare(!share);
                onShare();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <View>
                  {share ? (
                    <Icon name="paper-plane" color={'#03a5fc'} size={21} />
                  ) : (
                    <Icon name="paper-plane-o" color={'#03a5fc'} size={21} />
                  )}
                </View>
                <Text style={{marginLeft: 8, marginTop: 1, color: '#d9d9d9'}}>
                  Share
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>

      {isShowPaymentComp ? (
        <RegisPaymentModal
          eventType="generalpost"
          modelName="generalpost"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          eventId={post_id}
          fee={fee}
          setUnlocked={setUnlocked}
        />
      ) : (
        <></>
      )}
      {/* <RegisPaymentModal lockModal={lockModal} setLockModal={setLockModal} /> */}
    </>
  );
};

export default PostCard;
