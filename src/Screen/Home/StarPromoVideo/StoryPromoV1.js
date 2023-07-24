import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import styles from '../../../Components/HOME/PromoVideoSlider/Styles2';
import colorCode from '../../../Constants/colorCode';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';

const StoryPromoV1 = ({route}) => {
  const {data} = route.params;
  //console.log('filter video is 2 ===> ', data);
  const vedioRef = useRef(null);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [isMuted, setIsMuted] = useState(true);
  const Navigation = useNavigation();

  const [Play, setPlay] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  const onBuffer = buffer => {
    console.log('buffering ', buffer);
  };

  const onError = error => {
    console.log('error', error);
  };

  const loadVideo = () => {
    setVideoLoad(true);
  };

  //   const onShare = async () => {
  //     try {
  //       const result = await Share.share({
  //         title: 'Video Link',
  //         message: `${filterVideo[0].videoURl}`,
  //         url: `${filterVideo[0].videoURl}`,
  //       });
  //       if (result.action === Share.sharedAction) {
  //         if (result.activityType) {
  //         } else {
  //         }
  //       } else if (result.action === Share.dismissedAction) {
  //       }
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   };

  function handleOnProgress(progress) {
    // console.log('video progress is ',progress)
  }

  //handle mute
  const handleMutePress = () => {
    if (isMuted) {
      setIsMuted(false);
      //setVolume(0);
    } else {
      setIsMuted(true);
      //setVolume(1);
    }
  };

  return (
    <SafeAreaView>
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
            //   source={{uri: `${AppUrl.MediaBaseUrl + filterVideo[0]?.video_url}`}}
            source={{uri: AppUrl.videoCdn + data?.video_url}}
            ref={vedioRef}
            onBuffer={onBuffer}
            onError={onError}
            resizeMode={'contain'}
            onLoad={loadVideo}
            onEnd={() => console.log('end')}
            onProgress={handleOnProgress}
            pictureInPicture
            paused={Play ? true : false}
            repeat={true}
            muted={!isMuted}
            style={{
              height: windowHight,
              width: windowWidth,
              position: 'absolute',
            }}
          />
          {/* mute press */}
          {!Play && (
            <TouchableWithoutFeedback onPress={handleMutePress}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  right: 15,
                  position: 'absolute',
                  bottom: 20,
                  zIndex: 111,
                }}>
                <Ionicons
                  name={isMuted ? 'volume-medium-sharp' : 'volume-mute'}
                  size={30}
                  color={colorCode.whiteText}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
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

        <View style={styles.RightSideBar}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              animation="pulse"
              iterationCount="infinite"
              source={{
                uri: AppUrl.imageCdn + data?.star?.image,
              }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                borderColor: '#ffaa00',
                borderWidth: 1,
                resizeMode: 'stretch',
                // marginRight: 10
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#ffffff',
                marginTop: 9,
              }}>
              {data?.star?.first_name + ' ' + data?.star?.last_name}
            </Text>
          </View>
        </View>

        <View style={styles.promoVideoHader}>
          <View>
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <Icon color={'#fff'} name="left" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20, color: '#ffaa00'}}></Text>
          <View>
            <Image source={imagePath.logo} style={{height: 35, width: 35}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoryPromoV1;
