//import liraries

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from 'react-native-youtube-iframe';
import { GOLD } from '../../Constants/HssColors';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// create a component
const VirtualTour = () => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);

  const [youtubeId, setYoutubeID] = useState(null);
  const [localVideo, setLocalVideo] = useState(null);
  useEffect(() => {

    axios
      .get(AppUrl.virtualTour)
      .then(res => {
        if (res.data.status == 200) {
          console.log('link', res?.data?.videoInfo?.link);
          console.log('video', res?.data?.videoInfo?.video);
          if (res?.data?.videoInfo.link !== null) {
            return setYoutubeID(YouTubeGetID(res?.data?.videoInfo?.link));
          }
          setLocalVideo(res?.data?.videoInfo?.video);
          console.log(res?.data?.videoInfo?.video);
        }
        console.log('link', res?.data?.videoInfo?.link);
        console.log('video', res?.data?.videoInfo?.video);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //get video id for mobile
  function YouTubeGetID(url) {
    var ID = '';
    url = url
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = url;
      console.log(ID);
    }

    return ID;
  }

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <ImageBackground
      source={imagePath.background}
      resizeMode="cover"
      style={styles.container}>


      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image
          source={imagePath.logo}
          style={{
            height: responsiveHeight(15),
            width: responsiveWidth(30),
            resizeMode: 'contain'
          }
          }
        />
      </View>

      <View
        style={styles.videoContainer}>
        <View style={{ padding: 5 }}>



          {!localVideo && youtubeId ? (
            <YoutubePlayer
              height={windowWidth > 600 ? responsiveHeight(56) : responsiveHeight(35)}
              play={true}
              videoId={youtubeId}
              onChangeState={onStateChange}
            />
          ) : !youtubeId && localVideo ? (
            <VideoPlayer
              video={{
                uri: `${AppUrl.MediaBaseUrl}${localVideo}`,
              }}
              videoWidth={windowWidth > 600 ? responsiveHeight(56) : responsiveHeight(35)}
              videoHeight={162}
              thumbnail={{
                uri: `${imagePath.logo}`,
              }}
            />
          ) : (
            <YoutubePlayer
              height={windowWidth > 600 ? responsiveHeight(56) : responsiveHeight(35)}
              play={true}
              videoId={'ZbsYZ1K7xKc'}
              onChangeState={onStateChange}
            />
          )}

          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{
                width: '20%',
              }}
              onPress={() => navigation.navigate('Login')}>
              <LinearGradient
                style={{ borderRadius: 20, marginTop: -30 }}
                colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 3,
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Skip
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// define your styles
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  // linearGradient: {

  container: {
    flex: 1,
  },
  videoContainer: {
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 5,
    margin: 13,
    marginTop: 100,
  }
});

//make this component available to the app
export default VirtualTour;
