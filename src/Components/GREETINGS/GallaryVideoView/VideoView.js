import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles4';

import { useNavigation } from '@react-navigation/native';

const VideoView = ({ route }) => {
  const vedioRef = useRef(null);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  let halfWidth = windowWidth / 2 - 20;
  const Navigation = useNavigation();
  const [videoUrl, setVideoUrl] = useState(
    route?.params?.VideoUrl ? route?.params?.VideoUrl : null,
  );

  const [Play, setPlay] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  useEffect(() => {
    // setPlay(false)
    // PlayStatus()
  }, []);

  // const PlayStatus = () => {
  //     if (currentIndex == index) {
  //         setPlay(false)
  //         // setVideoLoad(true)
  //     }
  // }

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  const loadVideo = () => {
    setVideoLoad(true);
  };

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
              style={{ height: 150, width: 150 }}
            />
          </View>
        )}
        <Video
          source={{
            uri:
              videoUrl !== null
                ? videoUrl
                : 'http:///backend.hellosuperstars.com/assets/video/mahajib.mp4',
          }}
          ref={vedioRef} // Store reference
          onBuffer={onBuffer}
          onError={onError} // Callback when video cannot be loaded
          resizeMode={windowWidth < 600 ? 'cover' : 'contain'}
          onLoad={loadVideo}
          onEnd={() => console.log('end')}
          // controls
          pictureInPicture
          // paused={currentIndex != index || Play ? true : false}
          paused={false}
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
            style={{ height: 150, width: 150 }}
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

      <View style={styles.promoVideoHader}>
        <View>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <Icon name="left" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, color: '#FFFFFF' }}></Text>
        <View>
          <Image source={imagePath.logo} style={{ height: 40, width: 40 }} />
        </View>
      </View>
    </View>
  );
};

export default VideoView;
