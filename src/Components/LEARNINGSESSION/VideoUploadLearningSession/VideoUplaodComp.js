import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-root-toast';
import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import HeaderComp from '../../HeaderComp';
import VideoUploadSuccessfulModal from '../../MODAL/VideoUploadSuccessfulModal';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import VideoPlayer from 'react-native-video-player';
import {androidCameraPermission} from '../../../../permission';
import ImagePicker from 'react-native-image-crop-picker';
import {useEffect} from 'react';
import {useTimeDiff} from '../../../CustomHooks/useTimeDiff';
import {useMediaUploadS3} from '../../../CustomHooks/useMediaUploadS3';
import JustVideoPlayer from '../../VideoPlayer/JustVideoPlayer';
import * as Progress from 'react-native-progress';
import colorCode from '../../../Constants/colorCode';
const VideoUplaodComp = ({event, index}) => {
  const windowWidth = Dimensions.get('window').width;
  const Navigation = useNavigation();
  const [uploadDone, setUploadDone] = useState(false);
  const {axiosConfig, countryDateTime} = useContext(AuthContext);
  const [videos, setVideos] = useState([]);

  const {seconds, days, endSeconds, timeLeft} = useTimeDiff({
    time: countryDateTime(event.assignment_reg_start_date),
    currentTime: moment().format(''),
    endTime: countryDateTime(event.assignment_reg_end_date),
  });
  const {isLoading, uploadFile, isDone, buffer} = useMediaUploadS3(
    'learningSession/videos',
  );

  const [localVideoUrl, setLocalVideoUrl] = useState();

  const [totalUploadDone, setTotalUploadDone] = useState(false);

  const [updateData, setUpdateData] = useState({
    video: {
      learningSessionId: event.id,
      taskNumber: event.assignment,
      uri: '',
      type: '',
      name: '',
      data: '',
    },
  });

  const [progress, setProgress] = useState(false);
  const nowDate = new Date().getTime();

  // console.log(countDownDate - nowDate)
  // console.log('dfajdhakjdh', new Date())
  // console.log('dfajdhakjdh', new Date(event.assignment_reg_end_date))
  //chose video
  const chosePhoto = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
    clearInterval(progress);
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      const url = image.path;
      const type = image.mime;
      setLocalVideoUrl(url);

      uploadFile(url, type)
        .then(valu => {
          console.log('video url', valu.Key);
        })
        .catch(err => {
          console.log('error message', err);
        });
    });
  };

  const onGallery = () => {
    let options = {
      mediaType: 'video',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled video picker');
      } else if (response.error) {
        // console.log('Video Picker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setLocalVideoUrl(response.assets[0].uri);
        uploadFile(response.assets[0].uri, response.assets[0].type)
          .then(valu => {
            console.log('video url', valu.Key);
          })
          .catch(err => {
            console.log('error message', err);
          });
      }
    });
  };

  const uploadVideo = () => {};

  return (
    <>
      {localVideoUrl && (
        <View
          style={{
            backgroundColor: '#343434',
            marginHorizontal: 10,
            borderRadius: 20,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#ffad00',
          }}>
          <JustVideoPlayer videoUrl={localVideoUrl} />

          <Progress.Bar
            progress={buffer}
            width={windowWidth}
            color={colorCode.gold}
            borderColor={colorCode.formBg}
          />
        </View>
      )}

      <View>
        <TouchableOpacity
          onPress={!localVideoUrl ? chosePhoto : null}
          style={styles.listParent}>
          <View style={styles.onRight}>
            {progress ? (
              <Image
                source={imagePath.loadingBuffering}
                style={{height: 40, width: 40}}
              />
            ) : (
              <Image source={imagePath.UploadVideoLearning} />
            )}
          </View>
          <View style={styles.middleOne}>
            <Text style={styles.participationText}>
              Upload Video ({index + 1})
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#343434',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffad00',
    height: 50,
  },

  participationText: {
    color: '#FFAD00',
    fontSize: 15,
    marginHorizontal: 8,
  },
  // middleOne: {
  //   flex: 3,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // onRight: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
  roundImage: {
    flexDirection: 'row',
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roundOneSize: {
    // width: 200,
    // height: 100,
  },
});

export default VideoUplaodComp;
