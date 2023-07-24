import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Share,
} from 'react-native';
import Toast from 'react-native-root-toast';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../../Constants/imagePath';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Styles2';
import AppUrl from '../../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';

const PromoVideoSlide = ({currentIndex, index, item}) => {
  console.log(index);
  const vedioRef = useRef(null);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  let halfWidth = windowWidth / 2 - 20;
  const Navigation = useNavigation();

  const [Play, setPlay] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  useEffect(() => {
    // setPlay(false)
    PlayStatus();
  }, []);

  const PlayStatus = () => {
    if (currentIndex == index) {
      setPlay(false);
      // setVideoLoad(true)
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
        message: `${item.videoURl}`,
        url: `${item.videoURl}`,
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
            source={{uri: `${AppUrl.MediaBaseUrl + item.video_url}`}}
            ref={vedioRef} // Store reference
            onBuffer={onBuffer}
            onError={onError} // Callback when video cannot be loaded
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

        {/* <View style={styles.LeftSideBar}>
                <Text style={{ color: '#FFFFFF' }}>Gift</Text>
                <View style={{ height: 50, marginTop: 5 }}>
                    <Image source={imagePath.GiftIcon1} height={50} width={50} />
                    <Text style={{ color: '#FFFFFF' }}>2.5 K</Text>
                </View>
                <View style={{ height: 50, marginTop: 15 }}>
                    <Image source={imagePath.GiftIcon2} height={50} width={50} />
                    <Text style={{ color: '#FFFFFF' }}>2.5 K</Text>
                </View>
                <View style={{ height: 50, marginTop: 15 }}>
                    <Image source={imagePath.GiftIcon3} height={50} width={50} />
                    <Text style={{ color: '#FFFFFF' }}>2.5 K</Text>
                </View>
            </View> */}

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
              source={{uri: `${AppUrl.MediaBaseUrl + item.star.image}`}}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
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
              {item.star.first_name}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 100,
              marginTop: 50,
              backgroundColor: 'rgba(31, 31, 31, 0.473)',
            }}
            onPress={onShare}>
            <FontAwesome name="paper-plane" size={40} color="#FFAD00" />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#ffffff',
                marginTop: 13,
              }}>
              1,594
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.CommentSection}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        animation="pulse"
                        iterationCount="infinite"
                        source={{ uri: `${item.proImage}` }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 100,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ fontSize: 20, color: '#FFFFFF' }}> {item.title}</Text>
                </View>
                <Text style={{ fontSize: 12, color: '#FFFFFF' }}>ng established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point </Text>
            </View> */}
        <View style={styles.promoVideoHader}>
          <View>
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <Icon color={'#ffaa00'} name="left" size={30} />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20, color: '#ffaa00'}}></Text>
          <View>
            <Image source={imagePath.logo} style={{height: 40, width: 40}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PromoVideoSlide;
