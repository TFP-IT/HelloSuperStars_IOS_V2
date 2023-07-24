/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { AuthContext } from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import styles from './Styles';
import Video from 'react-native-video';
import colorCode from '../../../Constants/colorCode';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ENTRIES1 = [
  {
    key: 0,
    title: 'Habib Wahid',
    illustration:
      'https://i.scdn.co/image/ab6761610000e5ebf0a1d189da0f9be0977123fe',
    proImage:
      'https://i1.sndcdn.com/artworks-RgyUz7GDrqqaKzTY-fnZkMQ-t500x500.jpg',
    videoURl:
      'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1680674980701.mp4',
  },
  {
    key: 2,
    title: 'Mahajib',
    illustration:
      'https://cdn.sharechat.com/mehjabinchowdhury_1e18298a_1628074025216_sc_cmprsd_40.jpg',
    proImage:
      'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg',
    videoURl:
      'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1680672090169.mp4',
  },
  {
    key: 3,
    title: 'Thasan',
    illustration:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Tahsan_Rahman_Khan_%2801%29.jpg',
    proImage: 'https://pbs.twimg.com/media/ExvL-TLVoAQ8L3Q.jpg',
    videoURl:
      'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1680674966473.mp4',
  },
  {
    key: 4,
    title: 'Mahajib',
    illustration:
      'https://cdn.sharechat.com/mehjabinchowdhury_1e18298a_1628074025216_sc_cmprsd_40.jpg',
    proImage:
      'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg',
    videoURl:
      'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1680674980701.mp4',
  },
];

const StarPromoVedio2 = props => {
  const [entries, setEntries] = useState([]);
  const { axiosConfig } = useContext(AuthContext);
  const [promoVideos, setPromoVideos] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [visibleView, setVisibleView] = useState();
  const { themeCardColor, themeTextColor } = useThemeColor();
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);
  const onBuffer = e => {
    console.log('buffering video promo', e);
  };
  const onError = e => {
    console.log('error raised', e);
  };
  const Navigation = useNavigation();
  useEffect(() => {
    setEntries(ENTRIES1);
    getAllPost();
  }, []);

  const getAllPost = () => {
    axios
      .get(AppUrl.GetPromoVideos, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setPromoVideos(res.data.promoVideos);
          //console.log('promo', res.data.promoVideos);
        }
      })
      .catch(err => {
        console.log(err);
        // alert('network problem')
      });
  };

  // const handelShowPromo = (id, index) => {
  //   const filterVideo = promoVideos.filter((item, index) => {
  //     return item.id == id;
  //   });
  //   return Navigation.navigate('StoryPromo2', {
  //     index,
  //     filterVideo,
  //   });
  // };

  const changeIndex = ({ index }) => {
    setCurrIndex(index);
  };

  function onViewableItemsChanged({ viewableItems, changed }) {
    //setViewable(viewableItems);
  }
  function handleImageVisibility(visible) {
    setVisibleView(visible);
  }
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

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <VisibilitySensor onChange={handleImageVisibility}>
        <TouchableOpacity
          // onPress={() => {
          //   handelShowPromo(item.id, index);
          // }}
          onPress={() => Navigation.navigate('StoryPromo2', { data: item })}
          style={{
            marginTop: 10,
            marginRight: 10,
            borderWidth: 1,
            borderColor: colorCode.transparentGold,
            borderRadius: 15,
            marginVertical: 5,
            marginHorizontal: 5,
            height: 220,
          }}>
          <ImageBackground
            source={
              // !videoLoad && {uri: `${AppUrl.MediaBaseUrl + item.thumbnail}`}
              !isLoading && { uri: item?.illustration }
            }
            style={styles.item}
            resizeMode={'cover'}>
            <Video
              // source={{uri: `${AppUrl.MediaBaseUrl + item.video_url}`}}
              source={{ uri: item?.videoURl }}
              poster={`${AppUrl.MediaBaseUrl + item.thumbnail}`}
              bufferConfig={{
                minBufferMs: 5000,
                maxBufferMs: 10000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              maxBitRate={1000000}
              preload={true}
              playInBackground={false}
              posterResizeMode="cover"
              onBuffer={onBuffer}
              onError={onError}
              ref={videoRef}
              resizeMode={'stretch'}
              onLoad={handleLoad}
              repeat
              paused={currIndex !== index || !visibleView}
              // paused={false}
              onChangeIndex={changeIndex}
              // style={styles.backgroundColor}
              muted={!isMuted}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 15,
              }}
            />
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
                source={{ uri: item?.proImage }}
                style={{ width: '100%', height: '100%', borderRadius: 50 }}
              />
            </View>
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
          </ImageBackground>
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
          {item?.title && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={[
                  {
                    color: '#ffffff',
                    bottom: 0,
                    textAlign: 'center',
                    position: 'absolute',
                    backgroundColor: colorCode.transparentGold,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  },
                  themeTextColor,
                ]}>
                {item.title}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </VisibilitySensor>
    );
  };
  //console.log('Entry', entries);
  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: '#343434',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderRadius: 10,
          marginHorizontal: 0,
          marginBottom: 9,
        },
        themeCardColor,
      ]}>
      <SwiperFlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        vertical={false}
        autoplay
        autoplayDelay={60}
        autoplayLoop
        keyExtractor={(item, index) => index.toString()}
        // data={promoVideos}
        data={entries}
        renderItem={renderItem}
        onChangeIndex={changeIndex}
      />
    </View>
  );
};

export default StarPromoVedio2;
