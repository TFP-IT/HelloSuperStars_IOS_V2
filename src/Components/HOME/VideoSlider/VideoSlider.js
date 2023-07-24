import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  default as AntDesign,
  default as Icon,
} from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Video from 'react-native-video';
import {androidCameraPermission} from '../../../../permission';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';
// import imagePath from '../../../Constants/imagePath';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './Styles';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
const VideoSlider = ({
  currentIndex,
  index,
  item,
  loadVideos,
  liked,
  setLiked,
  paidLoveReact,
}) => {
  const vedioRef = useRef(null);
  const [like, setLike] = useState(false);
  const [likeFlash, setLikeFlash] = useState(false);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [likeSpeed, setLikeSpeed] = useState(true);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [videoComment, setVideoComment] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const [videoUrl, setVideoUrl] = useState();

  const [videoUpload, setVideoUpload] = useState({
    uri: null,
    type: null,
    base64: null,
  });

  let halfWidth = windowWidth / 2 - 20;

  const [Play, setPlay] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  useEffect(() => {
    // setPlay(false)
    PlayStatus();
  }, []);

  const [modalPara, setModalPara] = useState([]);
  function handleModal(value) {
    setModalPara(value.array);
    setIsShowPaymentComp(value.checking ? false : true);
  }
  useEffect(() => {
    loadVideos();
  }, [liked, likeFlash, videoComment, pressLike]);

  const PlayStatus = () => {
    if (currentIndex == index) {
      setPlay(false);
      // setVideoLoad(true)
    }
  };

  const [paidLike, setPaidLike] = useState(false);
  const [gifPath, setGifPath] = useState();

  const pressLike = (time, likeNumber = null) => {
    if (likeNumber !== null) {
      //paid like
      if (likeNumber === 5) {
        setIsShowPaymentComp(true);
        setGifPath(imagePath.loveReact5);
        setPaidLike(true);
        clearInterval(gifInterval);
      }
      if (likeNumber === 10) {
        setIsShowPaymentComp(true);
        setGifPath(imagePath.loveReact10);
        setPaidLike(true);
        clearInterval(gifInterval);
      }
      if (likeNumber === 20) {
        setIsShowPaymentComp(true);
        setGifPath(imagePath.loveReact20);
        setPaidLike(true);
        clearInterval(gifInterval);
      }

      const gifInterval = setInterval(() => {
        setPaidLike(false);
        clearInterval(gifInterval);
      }, time);
    } else {
      //normal like
      setLike(!like);
      setLikeFlash(true);
      const intervalId = setInterval(() => {
        setLikeFlash(false);
        clearInterval(intervalId);
      }, time);
    }
  };

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  const loadVideo = () => {
    setVideoLoad(true);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Video Link',
        message: `${AppUrl.MediaBaseUrl + item.video}`,
        url: `${AppUrl.MediaBaseUrl + item.video}`,
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

  const {axiosConfig} = useContext(AuthContext);
  const handleReact = react_num => {
    let data = {
      videoId: react_num[0],
      reactNum: react_num[1],
    };

    axios.post(AppUrl.hitLoveReact, data, axiosConfig).then(res => {
      if (res.data.status === 200) {
        loadVideos();
      }
    });
  };

  //================ comment video upload functionality start here ===================
  async function handleUpload() {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Upload Video', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  }

  const onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(video => {
      console.log(video.path);
      setVideoComment(video.path);
      RNFS.readFile(video.path, 'base64').then(res => {
        const data = {
          base64: res,
          type: video.mime,
          oxy_audition_id: item.audition_id,
          oxy_round_info_id: item.round_info_id,
          oxy_video_id: item.id,
          oxy_user_id: item.user_id,
        };
        console.log(data);
        axios
          .post(AppUrl.OxygenReplyUpload, data, axiosConfig)
          .then(res => {
            //console.log(res);
            Toast.show('Comment uploaded', Toast.durations.SHORT);
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          });
      });
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      setVideoComment(video.path);
      RNFS.readFile(video.path, 'base64').then(res => {
        const data = {
          base64: res,
          type: video.mime,
          oxy_audition_id: item.audition_id,
          oxy_round_info_id: item.round_info_id,
          oxy_video_id: item.id,
          oxy_user_id: item.user_id,
        };
        console.log(data);
        axios
          .post(AppUrl.OxygenReplyUpload, data, axiosConfig)
          .then(res => {
            //console.log(res);
            if (res.status === 200) {
              //console.log(res);
              Toast.show('Comment uploaded', Toast.durations.SHORT);
            }
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
            console.log(err);
          });
      });
    });
  };

  //================ comment video upload functionality end here ===================

  return (
    <View style={styles.VideoContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setPlay(!Play)}
        style={styles.TouchAbleViedo}>
        {Play ? (
          <></>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: windowHight,
            }}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              source={imagePath.logo}
              style={{height: 150, width: 150}}
            />
          </View>
        )}

        <Video
          source={{uri: `${AppUrl.MediaBaseUrl + item.video}`}}
          // source={{uri:"https://tfpbackend.hellosuperstars.com/uploads/videos/auditions/167161601498990.ssstik.io_1671348257882.mp4"}}

          ref={vedioRef}
          onReadyForDisplay={() =>
            console.log('Video ready for display videoFeed')
          }
          onBuffer={onBuffer}
          onError={onError}
          resizeMode={windowWidth < 600 ? 'cover' : 'contain'}
          onLoad={loadVideo}
          onEnd={() => console.log('end')}
          // controls
          pictureInPicture
          paused={currentIndex != index || Play ? true : false}
          repeat={true}
          style={{
            height: windowHight,
            width: windowWidth,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>

      {videoLoad ? (
        <></>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: windowHight,
          }}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={imagePath.logo}
            style={{height: 150, width: 150}}
          />
        </View>
      )}
      {likeFlash ? (
        <Animatable.View
          animation="bounceIn"
          iterationCount="infinite"
          duration={1000}
          //
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
          }}>
          <Icon name="heart" size={200} color="red" />
        </Animatable.View>
      ) : (
        <></>
      )}
      {paidLike && paymentComplete && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <Image
            source={gifPath}
            style={{
              width: '100%',
              height: 400,
              position: 'absolute',
              bottom: 100,
            }}
          />
        </View>
      )}

      {/* Play icon */}
      {Play ? (
        <TouchableOpacity
          onPress={() => setPlay(!Play)}
          style={{
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="caretright" style={styles.PushImage} />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {!item.hasOwnProperty('status') && (
        <View
          style={
            paidLoveReact.length === 0
              ? {
                  top: '47%',
                  position: 'absolute',
                  backgroundColor: 'rgba(31, 31, 31, 0.473)',
                  transform: [{translateX: -halfWidth}],
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }
              : paidLoveReact.length === 1
              ? {
                  top: '43%',
                  position: 'absolute',
                  backgroundColor: 'rgba(31, 31, 31, 0.473)',
                  transform: [{translateX: -halfWidth}],
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }
              : styles.LeftSideBar
          }>
          {/* <Text style={{ color: '#FFFFFF' }}>Gift</Text> */}

          <TouchableOpacity
            style={{height: 50, marginTop: 5}}
            onPress={() => {
              pressLike(1000);
              console.log('free');
              handleReact([item?.id, 1]);
            }}>
            {/* <Image source={imagePath.GiftIcon1} height={50} width={50} /> */}

            {item?.total_react?.some(i => i.react_num == 1) ? (
              <Icon name="heart" size={30} color="red" />
            ) : (
              <AntDesign name="hearto" size={30} color="red" />
            )}
            {/* <Icon name="heart" size={30} color="red" /> */}
            <Text style={{color: '#FFFFFF', textAlign: 'center'}}>Free</Text>
          </TouchableOpacity>
          {paidLoveReact?.map(reactItem => {
            return (
              <TouchableOpacity
                style={{height: 50, marginTop: 5}}
                onPress={() => {
                  let array = [item?.id, reactItem?.loveReact, reactItem?.fee];
                  const checking = item?.total_react?.some(
                    item => item.react_num == reactItem?.loveReact,
                  );

                  var value = {
                    array,
                    checking,
                  };
                  handleModal(value);
                }}>
                {/* <Image source={imagePath.GiftIcon1} height={50} width={50} /> */}

                {item?.total_react?.some(
                  i => i.react_num == reactItem?.loveReact,
                ) ? (
                  <Icon name="heart" size={30} color="red" />
                ) : (
                  <AntDesign name="hearto" size={30} color="red" />
                )}

                <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                  {reactItem?.loveReact}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={styles.RightSideBar}>
        {!item.hasOwnProperty('status') && (
          <>
            <View
              style={{height: 50, marginTop: 10}}
              // onPress={() => pressLike(1000)}
            >
              {item?.total_react?.some(
                i =>
                  i.react_num == 1 ||
                  i.react_num == 5 ||
                  i.react_num == 10 ||
                  i.react_num == 20,
              ) ? (
                <Icon name="heart" size={30} color="red" />
              ) : (
                <AntDesign name="hearto" size={30} color="red" />
              )}
              <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                {item?.get_total_react?.reduce((prev, curr) => {
                  return prev + curr.react_num;
                }, 0)}
              </Text>
            </View>
            <TouchableOpacity
              style={{height: 50, marginTop: 30}}
              onPress={onShare}>
              <FontAwesome name="paper-plane" size={30} color="#1291f8" />
              <Text style={{color: '#FFFFFF', textAlign: 'center'}}>00</Text>
            </TouchableOpacity>
          </>
        )}
        {item.hasOwnProperty('status') && (
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={1000}>
            <TouchableOpacity
              style={{height: 50, marginTop: 0}}
              onPress={handleUpload}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Animatable.Text
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  style={{color: '#FFFFFF', fontSize: 12}}>
                  <Foundation name="comment-video" size={35} color="#ffaa00" />
                </Animatable.Text>
              </View>
              {/* <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{color: '#FFFFFF', fontSize: 12}}>
                Comment
              </Animatable.Text> */}
              <Text style={{color: '#FFFFFF', fontSize: 12}}>Oxygen</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>

      <View style={styles.CommentSection}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderColor: '#FFAD00',
              borderWidth: 2,
              borderRadius: 50,
              padding: 2,
            }}>
            <Image
              source={{uri: `${AppUrl.MediaBaseUrl + item.user.image}`}}
              style={{
                height: 30,
                width: 30,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#FFFFFF',
              marginTop: 3,
              marginLeft: 10,
            }}>
            {item.user?.first_name} {item.user?.last_name}
          </Text>
        </View>

        {item.hasOwnProperty('status') && (
          <View style={{marginBottom: 20, paddingTop: 3}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ffa825', '#ffce48', '#ab6616']}
              style={{
                marginTop: 10,
                borderRadius: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Animatable.Text
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite"
                  style={{color: '#FFFFFF', fontSize: 12}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'black',
                      marginTop: 3,
                    }}>
                    OXYGEN VIDEO
                  </Text>
                </Animatable.Text>
              </View>
            </LinearGradient>
          </View>
        )}
      </View>
      {isShowPaymentComp ? (
        <RegisPaymentModal
          eventType="videoFeed"
          modelName="videoFeed"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          modalPara={modalPara}
          fee={modalPara[2]}
          setLiked={setLiked}
          setPaymentComplete={setPaymentComplete}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default VideoSlider;
