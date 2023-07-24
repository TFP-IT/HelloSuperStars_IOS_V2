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
  FlatList,
} from 'react-native';
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
import VideoUplaodComp from './VideoUplaodComp';

const VideoUploadLearningSession = ({route}) => {
  const Navigation = useNavigation();
  const [uploadDone, setUploadDone] = useState(false);
  const [document, setDocument] = useState(null);
  const {axiosConfig, countryDateTime} = useContext(AuthContext);
  const {event} = route.params;
  const [lastTime, setLastTime] = useState(true);
  const [videos, setVideos] = useState([]);

  const {seconds, days, endSeconds, timeLeft} = useTimeDiff({
    time: countryDateTime(event.assignment_reg_start_date),
    currentTime: moment().format(''),
    endTime: countryDateTime(event.assignment_reg_end_date),
  });

  const getOldVideo = () => {
    axios
      .get(AppUrl.getLearningUploadedVideo + event?.id, axiosConfig)
      .then(res => {
        setVideos(res.data.videos);
        console.log('uploaded videosssss: ', res.data.videos);
      });
  };
  const [totalUploadDone, setTotalUploadDone] = useState(false);

  const checkAllUploaded = () => {
    console.log('slot: ', event?.assignment_video_slot_number);

    axios
      .get(AppUrl.getLearningUploadedVideo + event?.id, axiosConfig)
      .then(res => {
        setVideos(res.data.videos);
        console.log('uploaded- check all: ', res.data.videos.length);
        if (event?.assignment_video_slot_number === res.data.videos.length) {
          setTotalUploadDone(true);
        }
      });

    console.log('uploaded: ', videos?.length);
    if (event?.assignment_video_slot_number == videos?.length) {
      console.log('done');
      setTotalUploadDone(true);
    } else {
      console.log('not done');
    }
  };
  useEffect(() => {
    getOldVideo();
    checkAllUploaded();
  }, [uploadDone]);

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

  // console.log('update video---', updateData)
  // setUploadDone(true);
  return (
    <ScrollView style={styles.container}>
      <HeaderComp />
      <View style={styles.bannerTitle}>
        <ImageBackground
          style={styles.background}
          source={{uri: `${AppUrl.imageCdn + event.banner}`}}>
          <View>
            <View
              style={{
                backgroundColor: '#ffffffa2',
                padding: 5,
                borderRadius: 10,
              }}>
              <CountDown
                until={timeLeft}
                // onFinish={() => setLastTime(false)}
                // onPress={() => alert('hello')}
                digitStyle={{
                  backgroundColor: 'black',
                  borderWidth: 2,
                  borderColor: '#FFAD00',
                  borderRadius: 20,
                }}
                digitTxtStyle={{color: '#FFAD00'}}
                timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
                size={20}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <Text
              style={{
                color: '#ddd',
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center',
                padding: 5,
              }}>
              {event.title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          backgroundColor: '#343434',
          margin: 10,
          borderRadius: 10,
          overflow: 'hidden',
          borderWidth: 1,
          padding: 10,
        }}>
        <Text
          style={{
            color: '#FFAD00',
            fontSize: 15,
            marginHorizontal: 8,
            textAlign: 'center',
          }}>
          Assignment Slot {event?.assignment_video_slot_number}
        </Text>
      </View>
      <View style={{paddingBottom: 200}}>
        <FlatList
          data={Array.from(Array(event?.assignment_video_slot_number).keys())}
          renderItem={({item, index}) => (
            <VideoUplaodComp event={event} key={index} index={index} />
          )}
          keyExtractor={item => item.key}
          initialScrollIndex={1}
        />
      </View>

      <VideoUploadSuccessfulModal
        uploadDone={uploadDone}
        setUploadDone={setUploadDone}
      />
    </ScrollView>
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
    height: 70,
  },

  participationText: {
    color: '#FFAD00',
    fontSize: 18,
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

export default VideoUploadLearningSession;
