import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import VideoSlider from '../../Components/HOME/VideoSlider/VideoSlider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import {useThemeColor} from '../../CustomHooks/useThemeColor';
import NoDataComp from '../../Components/NoDataComp';
const VideoSliderContainer = ({navigation}) => {
  const {axiosConfig} = useContext(AuthContext);
  const [videoData, setVideoData] = useState([]);
  const [paidLoveReact, setPaidLoveReact] = useState([]);
  const {themeBacground, themeTextColor} = useThemeColor();
  const getLoveReact = () => {
    axios.get(AppUrl.videoFeedLoveReact, axiosConfig).then(res => {
      if (res.data.status === 200) {
        setPaidLoveReact(res.data?.loveReact);
        // console.log('love react ===================>', res.data?.loveReact);
      }
    });
  };
  useEffect(() => {
    getLoveReact();
  }, []);
  const [liked, setLiked] = useState(0);

  const loadVideos = async () => {
    let res = await axios
      .get(AppUrl.videoFeed, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setVideoData(res.data.totalVideos);

          console.log('videos->>>>>>>>>>>>>>>>>', res.data.totalVideos);

          setLiked(0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  //OXYGEN VIDEO
  const [oxygenVideos, setOxygenVideos] = useState([]);
  const getOxygenVideo = () => {
    axios.get(AppUrl.getOxygen, axiosConfig).then(res => {
      if (res.data.status === 200) {
        setOxygenVideos(res.data?.oxygenVideos);
      }
    });
  };
  //OXYGEN VIDEO
  useEffect(() => {
    loadVideos();
    getOxygenVideo();
  }, [liked]);
  const [totalVideo, setTotalVideo] = useState([]);
  useEffect(() => {
    setTotalVideo(videoData.concat(oxygenVideos));
  }, [oxygenVideos, videoData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

  let VideoData = [
    {
      id: 1,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    },
    {
      id: 2,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    },
    {
      id: 3,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    },
    {
      id: 4,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    {
      id: 5,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    },

    {
      id: 6,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
  ];

  return (
    <SafeAreaView>
      <View style={[{backgroundColor: 'black'}, themeBacground]}>
        <View
          style={{
            height: windowHight,
          }}>
          {videoData.length === 0 && (
            <>
              <HeaderComp
                text="Notification"
                backFunc={() => navigation.goBack()}
              />
              <NoDataComp />
            </>
          )}

          <SwiperFlatList
            vertical={true}
            onChangeIndex={handleChangeIndexValue}
            // index={4}
            data={totalVideo.length > 0 ? totalVideo : videoData}
            // data={VideoData}
            renderItem={({item, index}) => (
              <VideoSlider
                item={item}
                index={index}
                loadVideos={loadVideos}
                currentIndex={currentIndex}
                setLiked={setLiked}
                liked={liked}
                paidLoveReact={paidLoveReact}
              />
            )}
            keyExtractor={(item, index) => index}
          />

          {videoData.length > 0 && (
            <TouchableOpacity
              style={{position: 'absolute', left: 10, top: 10}}
              onPress={() => navigation.goBack()}>
              <Text>
                <Icon name="arrow-back" size={25} color="#fff" />
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoSliderContainer;
