import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import noImage from '../../../../../../Assets/Images/no-image.png';
import navigationStrings from '../../../../../../Constants/navigationStrings';
import AppUrl from '../../../../../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../../../../../Constants/imagePath';
import NoDataComp from '../../../../../../Components/NoDataComp';

const ProfileVideos = ({userActivites, purchasedVideos = null}) => {
  const Navigation = useNavigation();
  const [videoList, setVideoList] = useState([]);
  console.log(userActivites);
  console.log('purchasedVideos', purchasedVideos);

  useEffect(() => {
    setVideoList(
      userActivites.filter(
        item =>
          item.type === 'greeting' && item.greeting_registration?.status > 2,
      ),
    );
  }, []);
  const renderPaidProfileVideo = ({item}) => {
    return (
      <>
        <VideoPlayer
          video={{
            uri: `${AppUrl.MediaBaseUrl + item[0]?.video}`,
          }}
          pauseOnPress
          fullScreenOnLongPress
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{
            uri: `https://www.newagebd.com/files/records/news/202103/132871_199.jpg`,
          }}
          blurRadius={1}
        />
      </>
    );
  };

  const renderVideo = (data, index) => {
    return (
      <View key={index} style={{margin: 7}}>
        <View
          style={{
            height: 120,
            width: '100%',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'gold',
            overflow: 'hidden',
          }}>
          <VideoPlayer
            video={{
              uri: `${
                AppUrl.MediaBaseUrl + data.item.greeting_registration.video
              }`,
            }}
            pauseOnPress
            fullScreenOnLongPress
            videoWidth={1600}
            videoHeight={1000}
            thumbnail={{
              uri: `${AppUrl.MediaBaseUrl + data.item?.greeting?.banner}`,
            }}
            blurRadius={1}
          />
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              justifyContent: 'center',
            }}></View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{margin: 7}}>
        {videoList.length > 0 || purchasedVideos ? (
          <>
            <FlatGrid
              itemDimension={160}
              data={videoList}
              renderItem={renderVideo}
            />

            <FlatGrid
              spacing={15}
              itemDimension={300}
              data={purchasedVideos}
              renderItem={renderPaidProfileVideo}
            />
          </>
        ) : (
          <NoDataComp />
        )}
      </View>
    </>
  );
};

export default ProfileVideos;

const styles = StyleSheet.create({});
