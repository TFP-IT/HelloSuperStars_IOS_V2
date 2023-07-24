import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import CustomVideoPlayerV1 from '../../../Components/VIDEO/CustomVideoPlayerV1';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FullScreenVideo = ({route, navigation}) => {
  const {themeBacground, themeIconColor} = useThemeColor();
  const {videoUri, videoThumb} = route.params;
  return (
    <View style={[styles.container, themeBacground]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color={themeIconColor} />
      </TouchableOpacity>
      <View style={styles.videoContainer}>
        <CustomVideoPlayerV1
          // videoUrl={item?.video}
          videoUrl={videoUri}
          thumbnail={videoThumb}
          autoplay={true}
          muted={true}
          playBtn={false}
          repeat={false}
        />
      </View>
    </View>
  );
};

export default FullScreenVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
