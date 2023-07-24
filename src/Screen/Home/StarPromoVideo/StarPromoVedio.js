/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import VideoPlayer from 'react-native-video-player';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import {videoData} from './dummyVideoData';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import styles from './Styles';
import Video from 'react-native-video';

const ENTRIES1 = [
  {
    key: 0,
    title: 'Habib Wahid',

    illustration:
      'https://i.scdn.co/image/ab6761610000e5ebf0a1d189da0f9be0977123fe',
    proImage:
      'https://i1.sndcdn.com/artworks-RgyUz7GDrqqaKzTY-fnZkMQ-t500x500.jpg',
    videoURl: 'http:///backend.hellosuperstars.com/assets/video/habib.mp4',
  },
  {
    key: 1,
    title: 'Momotaj',

    illustration:
      'https://i0.wp.com/i.imgur.com/av1k0l9.jpg?resize=618%2C462&ssl=1',
    proImage:
      'https://i0.wp.com/i.imgur.com/7ObP5DV.jpg?resize=618%2C372&ssl=1',
    videoURl: 'http:///backend.hellosuperstars.com/assets/video/momotaj.mp4',
  },
  {
    key: 2,
    title: 'Mahajib',

    illustration:
      'https://cdn.sharechat.com/mehjabinchowdhury_1e18298a_1628074025216_sc_cmprsd_40.jpg',
    proImage:
      'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg',
    videoURl: 'http:///backend.hellosuperstars.com/assets/video/mahajib.mp4',
  },
  {
    key: 3,
    title: 'Thasan',
    illustration:
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Tahsan_Rahman_Khan_%2801%29.jpg',
    proImage: 'https://pbs.twimg.com/media/ExvL-TLVoAQ8L3Q.jpg',
    videoURl: 'http:///backend.hellosuperstars.com/assets/video/thasan.mp4',
  },
  {
    key: 4,
    title: 'Mahajib',

    illustration:
      'https://cdn.sharechat.com/mehjabinchowdhury_1e18298a_1628074025216_sc_cmprsd_40.jpg',
    proImage:
      'https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg',
    videoURl: 'http:///backend.hellosuperstars.com/assets/video/mahajib.mp4',
  },
];

const StarPromoVedio = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const {axiosConfig} = useContext(AuthContext);
  const windowWidth = Dimensions.get('window').width;
  const {width: screenWidth} = Dimensions.get('window');
  const [promoVideos, setPromoVideos] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [visibleView, setVisibleView] = useState();

  const videoRef = useRef(null);
  const onBuffer = e => {
    console.log('buffering video promo', e);
  };
  const onError = e => {
    console.log('error raisied', e);
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
        }
      })
      .catch(err => {
        console.log(err);
        // alert('network problem')
      });
  };

  const handelShowPromo = (id, index) => {
    const filterVideo = promoVideos.filter((item, index) => {
      return item.id == id;
    });

    // return Navigation.navigate(navigationStrings.PROMOSHOW, {
    //   index: index,

    //   filterVideo,
    //   data:promoVideos
    // });

    return Navigation.navigate('StoryPromo', {
      index,
      filterVideo,
    });
  };

  const changeIndex = ({index}) => {
    setCurrIndex(index);

    // if (index==0){
    //   setCurrIndex(0)
    // }
    // else if(index==1){
    //   setCurrIndex(1)
    // }

    // else{
    //   setCurrIndex(index-1)
    // }
  };

  function onViewableItemsChanged({viewableItems, changed}) {
    // setViewable(viewableItems);
  }
  function handleImageVisibility(visible) {
    setVisibleView(visible);
  }
  //   return (
  //     <TouchableOpacity
  //       onPress={() => handelShowPromo(index)}
  //       style={{ paddingHorizontal: 5 }}>
  //       <LinearGradient
  //         colors={['#FFAD00', '#000000']}
  //         start={{ x: 0, y: 1 }}
  //         end={{ x: 1, y: 0 }}
  //         style={styles.item}>
  //         <Image
  //           source={{ uri: `${AppUrl.MediaBaseUrl + item.thumbnail}` }}
  //           // source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqQp7Mnj-5Sl3GujKwmjwK6iMzZTjqnP1CA&usqp=CAU'}}
  //           containerStyle={styles.imageContainer}
  //           style={styles.image}
  //         />
  //         <ImageBackground
  //           source={imagePath.ProImageBackground}
  //           style={styles.profileImage}>
  //           <Image
  //             source={{ uri: `${AppUrl.MediaBaseUrl + item.star?.image}` }}
  //             // source={{uri: `https://dailyeventnews.com/wp-content/uploads/2020/10/Screenshot_1.png`}}
  //             style={{ height: 35, width: 35, borderRadius: 50 }}
  //           />
  //         </ImageBackground>
  //       </LinearGradient>
  //     </TouchableOpacity>
  //   );
  // };

  //==============>> testing<<<<========
  const renderItem = ({item, index}, parallaxProps) => {
    let videoLoad = false;

    return (
      <VisibilitySensor onChange={handleImageVisibility}>
        <TouchableOpacity
          onPress={() => {
            handelShowPromo(item.id, index);

            // alert(index)
          }}
          style={{paddingHorizontal: 5}}>
          <ImageBackground
            source={
              !videoLoad && {uri: `${AppUrl.MediaBaseUrl + item.thumbnail}`}
            }
            style={styles.item}
            resizeMode={'cover'}>
            <Video
              source={{uri: `${AppUrl.MediaBaseUrl + item.video_url}`}}
              poster={`${AppUrl.MediaBaseUrl + item.thumbnail}`}
              posterResizeMode="cover"
              onBuffer={onBuffer}
              onError={onError}
              ref={videoRef}
              resizeMode={'contain'}
              onLoad={() => (videoLoad = true)}
              repeat
              paused={currIndex !== index || !visibleView}
              // paused={false}
              onChangeIndex={changeIndex}
              // style={styles.backgroundColor}
              muted={false}
              style={{height: '100%'}}
            />

            <ImageBackground
              source={imagePath.ProImageBackground}
              style={styles.profileImage}>
              <Image
                source={{uri: `${AppUrl.MediaBaseUrl + item.star?.image}`}}
                style={{height: 35, width: 35, borderRadius: 50}}
              />
            </ImageBackground>
          </ImageBackground>
        </TouchableOpacity>
      </VisibilitySensor>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#343434',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginHorizontal: 0,
        marginBottom: 9,
      }}>
      <SwiperFlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        vertical={false}
        autoplay
        autoplayDelay={10}
        autoplayLoop
        keyExtractor={(item, index) => index.toString()}
        // data={promoVideos}
        data={promoVideos}
        renderItem={renderItem}
        onChangeIndex={changeIndex}
      />
    </View>
  );
};

export default StarPromoVedio;
