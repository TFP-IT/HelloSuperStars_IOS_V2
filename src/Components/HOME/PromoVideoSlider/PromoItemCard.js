import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import colorCode from '../../../Constants/colorCode';
import Video from 'react-native-video';
import { useRef } from 'react';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PromoItemCard = ({ item, index }) => {
  const { themeCardColor, themeTextColor } = useThemeColor();
  const videoPlayerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  //console.log('item', item);
  //star name
  const starName =
    item?.name?.length > 15 ? `${item?.name.slice(0, 15)}..` : item?.name;
  //star image
  const starImage = item?.image;
  //star video
  const startVideo = item?.uri;
  //handle load
  const handleLoad = () => {
    setIsLoading(false);
  };
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
  // handle end
  const handleEnd = () => {
    setIsLoading(true);
    setIsMuted(false);
    setCurrentItemIndex((currentItemIndex + 1) % item.length);
    videoPlayerRef.current.seek(0);
  };

  return (
    <View style={[{ flexDirection: 'row' }, themeCardColor]}>
      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          marginTop: 10,
          marginRight: 10,
          borderWidth: 1,
          borderColor: colorCode.transparentGold,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginVertical: 5,
          marginHorizontal: 5,
        }}>
        {/* main view */}
        <View
          style={{
            width: 124,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          {/* video container start */}

          <Video
            source={{ uri: startVideo }}
            ref={videoPlayerRef}
            onLoad={handleLoad}
            resizeMode="stretch"
            paused={index !== 0}
            muted={!isMuted}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            poster={'https://images.shrcreation.com/Others/poster.jpg'}
            posterResizeMode={'cover'}
          />
          {/* video container end */}
          {/* loading */}
          {isLoading && (
            <View style={styles.loading}>
              <Image
                source={{
                  uri: 'https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif',
                }}
                style={{ width: 30, height: 30 }}
                resizeMode={'contain'}
              />
            </View>
          )}
          {/* mute press */}
          {!isLoading && (
            <TouchableWithoutFeedback onPress={handleMutePress}>
              <View style={styles.volumeButtonOutside}>
                <Ionicons
                  name={isMuted ? 'volume-medium-sharp' : 'volume-mute'}
                  size={24}
                  color={colorCode.whiteText}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          {/* star image start */}
          {starImage && (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colorCode.transparentGold,
                position: 'absolute',
                top: 5,
                right: 5,
              }}>
              <Image
                source={starImage}
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
              />
            </View>
          )}
          {/* star image end */}
          {/* star name start */}
          {starName && (
            <Text
              style={[
                {
                  color: '#ffffff',
                  bottom: 0,
                  position: 'absolute',
                  textAlign: 'center',
                  backgroundColor: colorCode.transparentGold,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 15,
                },
                themeTextColor,
              ]}>
              {starName}
            </Text>
          )}
          {/* star name end */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PromoItemCard;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
  },
  volumeButtonOutside: {
    width: 24,
    height: 24,
    right: 5,
    position: 'absolute',
    bottom: 30,
    zIndex: 111,
  },
});
