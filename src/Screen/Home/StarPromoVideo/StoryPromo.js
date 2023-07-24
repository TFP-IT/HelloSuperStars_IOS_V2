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
import React, {Fragment, useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import * as Animatable from 'react-native-animatable';
import imagePath from '../../../Constants/imagePath';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../../Components/HOME/PromoVideoSlider/Styles2';
import AppUrl from '../../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';
var url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
var thumb =
  'https://i.pinimg.com/474x/2a/39/44/2a39441a7e96aad42ead1f56811d916f.jpg';

const StoryPromo = ({route}) => {
  const {index, filterVideo} = route.params;
  // console.log('filter video is ===> ',filterVideo)
  const vedioRef = useRef(null);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Video Link',
        message: `${filterVideo[0].videoURl}`,
        url: `${filterVideo[0].videoURl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  function handleOnProgress(progress) {
    // console.log('video progress is ',progress)
  }

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
            source={{uri: `${AppUrl.MediaBaseUrl + filterVideo[0]?.video_url}`}}
            ref={vedioRef}
            onBuffer={onBuffer}
            onError={onError}
            resizeMode={'contain'}
            onLoad={loadVideo}
            onEnd={() => console.log('end')}
            // controls
            onProgress={handleOnProgress}
            pictureInPicture
            paused={Play ? true : false}
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
                uri: `${AppUrl.MediaBaseUrl + filterVideo[0]?.star?.image}`,
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
              {filterVideo[0]?.star?.first_name +
                ' ' +
                filterVideo[0]?.star?.last_name}
            </Text>
          </View>
          {/* <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 100, marginTop: 40, backgroundColor: 'rgba(31, 31, 31, 0.473)', justifyContent: 'center', alignItems: 'center' }} onPress={onShare}>
          <FontAwesome name='paper-plane' size={23} color="#FFAD00" />
          <Text style={{ textAlign: 'center', fontSize: 11, color: '#ffffff', }}>1,594</Text>
        </TouchableOpacity> */}
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

export default StoryPromo;
