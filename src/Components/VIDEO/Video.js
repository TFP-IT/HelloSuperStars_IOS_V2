import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import {LinearTextGradient} from 'react-native-text-gradient';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import TitleHeader from '../TitleHeader';

function Video({ title, image, videoSrc = null }) {
  console.log('image path', image);

  return (
    <>
      <TitleHeader title={title} />
      <View style={styles.topCard}>
        {videoSrc !== null ? (
          <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
            <VideoPlayer
              style={{ height: 300 }}
              video={{
                uri: `${AppUrl.videoCdn}${videoSrc}`,
              }}
              resizeMode={'contain'}
              thumbnail={imagePath.videoPlayIcon}
            />
          </View>
        ) : (
          <View style={{ padding: 10 }}>
            <Image
              source={{ uri: image }}
              style={{ height: 180, resizeMode: 'cover', borderRadius: 10 }}
            />
          </View>
        )}
        {/* <VideoPlayer
        style={{ height: 300 }}
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        resizeMode={'stretch'}
        thumbnail={{
          uri: 'https://www.newagebd.com/files/records/news/202103/132871_199.jpg',
        }}
      /> */}
      </View>
    </>
  );
}

export default Video;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: '#282828',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  fonts: {
    color: '#ffaa00',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 3,
  },
  bannerRow: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 15,
  },
  imgRow: {
    marginVertical: 2,
    width: '90%',
    height: 180,
  },
  imgRow2: {
    marginVertical: 2,
    position: 'absolute',
    top: '45%',
    left: '50%',
  },
});
