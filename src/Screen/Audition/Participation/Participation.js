import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import RoundTopBanner from '../../Audition/Round1/RoundTopBanner';
import imagePath from '../../../Constants/imagePath';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import VideoUploadModal from '../../../Components/MODAL/VideoUploadModal';
import AuditionTimer from '../../../Components/AUDITION/AuditionTimer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import { androidCameraPermission } from '../../../../permission';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import navigationStrings from '../../../Constants/navigationStrings';
import { FlatGrid } from 'react-native-super-grid';
import Toast from 'react-native-root-toast';
import TitleHeader from '../../../Components/TitleHeader';
const Participation = ({ route }) => {
  const {
    title,
    roundName,
    auditionTitle,
    auditionImage,
    roundInformation,
    videoSrc = '',
    auditionId,
    roundId,
  } = route.params;
  const navigation = useNavigation();
  const [pick, setPick] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const [videos, setVideos] = useState([]);
  const [appealVideos, setAppealVideos] = useState([]);
  const [myArray, setMyArray] = useState([]);
  const [myArrayAppeal, setMyArrayAppeal] = useState([]);
  const { axiosConfig } = useContext(AuthContext);
  const [oldVideos, setOldVideos] = useState([]);

  const [videoList, setVideoList] = React.useState([]);
  const [appealVideoList, setAppealVideoList] = useState([]);
  const [markTracking, setMarkTracking] = useState({});
  const [appealMarkTracking, setAppealMarkTracking] = useState({});
  const [isAppealedForThisRound, setIsAppealedForThisRound] = useState(false);
  const [appealedRegistration, setAppealedRegistration] = useState({});
  const [videoType, setVideoType] = useState('general');
  const [refresh, setRefresh] = useState(false);

  const [countAppealUpload, setCountAppealUpload] = useState(0);

  const fetchUploadedVideo = () => {
    console.log('click');
    axios
      .get(
        AppUrl.getUploadedRoundVideo + auditionId + '/' + roundId,
        axiosConfig,
      )
      .then(res => {
        if (res.data.status === 200) {
          //console.log(res.data);
          setVideoList(res?.data?.videos);
          setAppealVideoList(res?.data?.appeal_videos);
          setMarkTracking(res?.data?.auditionRoundMarkTracking);
          setAppealMarkTracking(res?.data?.appealAuditionRoundMarkTracking);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    // createSlot();
    fetchUploadedVideo();
    checkIsAppealForRound();
  }, []);
  const checkIsAppealForRound = () => {
    axios
      .get(AppUrl.isAppealRound + auditionId + '/' + roundId, axiosConfig)
      .then(res => {
        if (res?.data?.status === 200) {
          //console.log(res.data);
          setIsAppealedForThisRound(res?.data?.isAppealedForThisRound);
          if (res?.data?.isAppealedForThisRound == true) {
            setAppealedRegistration(res?.data?.appealedRegistration);
          }
        }
      });
  };
  const handleAppealedVideo = () => {
    if (appealedRegistration?.id) {
      setVideoType('appeal');
    }
  };
  const handleGeneralVideo = () => {
    setVideoType('general');
  };

  const onChoose = async () => {
    if (videos.length > roundInformation.video_slot_num - 1) {
      Toast.show(
        `Only ${videos.length} slot are there for uploading`,
        Toast.durations.SHORT,
      );
      return;
    }
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        { text: 'Camera', onPress: onCamera },
        { text: 'Gallery', onPress: onGallery },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };
  const onChooseAppeal = async () => {
    if (countAppealUpload > roundInformation.appeal_video_slot_num) {
      return Toast.show('No slots left', Toast.durations.SHORT);
    }
    setRefresh(true);
    if (appealVideoList.length > roundInformation.appeal_video_slot_num - 1) {
      alert(`Only ${appealVideoList.length} slot are there for uploading`);
      return;
    }
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        { text: 'Camera', onPress: onCamera },
        { text: 'Gallery', onPress: onGallery },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };
  const onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      const url = image.path;
      const type = image.mime;
      console.log(image);
      RNFS.readFile(url, 'base64').then(res => {
        // console.log('========>baseData=>Video', res);
        // console.log('---------------type--------------', image.mime);
        if (isAppealedForThisRound) {
          setAppealVideos([
            ...appealVideos,
            { type: type, url: url, base64: res },
          ]);
          submitVideo(type, res, 'appeal');
          Toast.show('Uploaded', Toast.durations.SHORT);
          setCountAppealUpload(prevNum => prevNum + 1);
          return;
        }
        setVideos([...videos, { type: type, url: url, base64: res }]);
        // console.log(videos);
        Toast.show('Uploaded', Toast.durations.SHORT);
        submitVideo(type, res, 'general');
      });
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: `video`,
    }).then(video => {
      const url = video.path;
      const type = video.mime;
      console.log('selected video', video);
      alert('Uploaded');
      RNFS.readFile(url, 'base64').then(res => {
        if (isAppealedForThisRound) {
          setAppealVideos([
            ...appealVideos,
            { type: type, url: url, base64: res },
          ]);
          submitVideo(type, res, 'appeal');
          Toast.show('Uploaded', Toast.durations.SHORT);
          setCountAppealUpload(prevNum => prevNum + 1);
          return;
        }
        setVideos([...videos, { type: type, url: url, base64: res }]);
        console.log('Video', res);
        submitVideo(type, res, 'general');
        Toast.show('Uploaded', Toast.durations.SHORT);
      });
    });
  };

  const createSlot = () => {
    remainingTime(
      roundInformation.video_upload_start_date,
      roundInformation.video_upload_end_date,
    );
    if (oldVideos.length === 0) {
      slots();
      slotAppeal();
      console.log('yes');
    }
    getUploadedVideo();
  };
  const slotAppeal = () => {
    let iterator = 0;
    const b = [];
    console.log(
      'slot appeal -----------',
      roundInformation.appeal_video_slot_num,
    );
    while (iterator < roundInformation.appeal_video_slot_num) {
      b.push(Math.floor(Math.random() * 100));
      iterator++;
      console.log('create');
    }
    setMyArrayAppeal(b);
  };
  const slots = () => {
    let iterator = 0;
    const a = [];
    console.log('slot -----------', roundInformation.video_slot_num);
    while (iterator < roundInformation.video_slot_num) {
      a.push(Math.floor(Math.random() * 100));
      iterator++;
      console.log('create');
    }
    setMyArray(a);
  };
  const submitVideo = (type, res, videoType) => {
    let data = {
      audition_id: auditionId,
      round_info_id: roundId,
      type: videoType,
      videoType: type,
      base64: res,
    };
    console.log('data going api', data);
    axios
      .post(AppUrl.auditionVideoUpload, data, axiosConfig)
      .then(res => {
        console.log('video array response', res);
        if (res.data.status === 200) {
          //console.log(res);
          Toast.show('Upload Done', Toast.durations.SHORT);
          if (videoType === 'appeal') {
            myArrayAppeal.pop();
            alert('submitted');
          } else if (videoType === 'general') {
            myArray.pop();
            alert('submitted');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getUploadedVideo = () => {
    axios
      .get(
        AppUrl.getUploadedRoundVideo + auditionId + '/' + roundId,
        axiosConfig,
      )
      .then(res => {
        console.log('video array response', res);
        if (res.data.videos.length > 0) {
          setOldVideos(res?.data?.videos);
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log('--------oldVIDEO', oldVideos);
  };
  const handleJoinCall = meetingId => {
    console.log(meetingId);
    navigation.navigate('VideoSdk', {
      meetingId: `${meetingId}`,
    });
  };
  return (
    <View style={styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <RoundTopBanner
          title={title}
          RoundName={roundName}
          auditionTitle={auditionTitle}
          auditionImage={auditionImage}
          remainingTime={remainTime}
        />
        <TitleHeader title={' Video Uploaded Details'} />
        <View
          style={{
            backgroundColor: '#272727',
            borderRadius: 10,
            marginTop: 3,
            position: 'relative',
            marginHorizontal: 10,
          }}>
          <View style={{ marginHorizontal: 10 }}></View>
          <View style={{ borderWidth: 0.5, borderBottomColor: 'black' }} />
          <View style={styles.uploadStyle}>
            <View>
              {/*========== condition ========== */}
              {roundInformation.round_type === 1 ? (
                <Text style={styles.textColor}>Live Video Date</Text>
              ) : (
                <Text style={styles.textColor}>Video Submission Date</Text>
              )}
              {/*========== condition ========== */}
              {roundInformation.round_type === 1 ? (
                <Text style={styles.textColor}>Live Video Time</Text>
              ) : (
                <Text style={styles.textColor}>Video Submission Duration</Text>
              )}
              {/*========== condition ========== */}
              {roundInformation.round_type === 1 ? null : (
                <Text style={styles.textColor}>Upload Slot</Text>
              )}
            </View>
            <View>
              <Text style={{ color: '#ddd' }}>
                {roundInformation.video_upload_start_date}
              </Text>
              {roundInformation.round_type === 1 ? ( //online
                <Text style={{ color: '#ddd' }}>
                  {roundInformation.video_duration} Minutes
                </Text>
              ) : (
                <Text style={{ color: '#ddd' }}>
                  {roundInformation.video_duration} Minutes
                </Text>
              )}

              {/*========== condition ========== */}
              {roundInformation.round_type === 1 ? null : (
                <Text style={{ color: '#ddd' }}>
                  {roundInformation.video_slot_num}
                </Text>
              )}
            </View>
          </View>

          {/*========== condition ========== */}
          {roundInformation.round_type === 1 ? (
            <>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 14,
                  marginHorizontal: 10,
                }}>
                <View
                  style={{
                    borderColor: '#FFAD00',
                    borderWidth: 1,
                    flexDirection: 'row',
                    paddingVertical: 5,
                    justifyContent: 'center',
                    width: '30%',
                    borderRadius: 5,
                  }}>
                  <MaterialCommunityIcons
                    name="video"
                    color={'#FFAD00'}
                    size={22}
                  />
                  <Text
                    style={{ color: '#FFAD00', marginHorizontal: 5 }}
                    onPress={() => handleJoinCall(roundInformation?.room_id)}>
                    Join Now
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        {/*============ round condition here =========== */}
        {roundInformation.round_type === 1 ? null : (
          <>
            <View
              style={{
                backgroundColor: '#272727',
                marginVertical: 10,
                borderRadius: 10,
                marginHorizontal: 10,
              }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {roundInformation.round_type === 0 &&
                  (videos.length != 0 ? (
                    <FlatGrid
                      spacing={10}
                      itemDimension={120}
                      data={videos}
                      renderItem={({ item, index }) => (
                        <>
                          <View style={{ width: '100%' }}>
                            <VideoPlayer
                              video={{
                                uri: `${AppUrl.MediaBaseUrl + item.video}`,
                              }}
                              videoWidth={200}
                              videoHeight={200}
                              autoplay={false}
                              pauseOnPress
                              hideControlsOnStart
                              resizeMode="stretch"
                              thumbnail={imagePath.AuditionTitleBanner}
                            />
                          </View>
                        </>
                      )}
                    />
                  ) : null)}
              </View>
              <View style={styles.uploadVideoStyle}>
                {roundInformation.round_type === 0 &&
                  (videoList.length != 0 ? (
                    <FlatGrid
                      spacing={10}
                      itemDimension={120}
                      data={videoList}
                      renderItem={({ item, index }) => (
                        <>
                          <View style={{ width: '100%' }}>
                            <VideoPlayer
                              video={{
                                uri: `${AppUrl.MediaBaseUrl + item.video}`,
                              }}
                              videoWidth={200}
                              videoHeight={200}
                              autoplay={false}
                              pauseOnPress
                              hideControlsOnStart
                              resizeMode="stretch"
                              thumbnail={imagePath.AuditionTitleBanner}
                            />
                          </View>
                        </>
                      )}
                    />
                  ) : roundInformation.round_type === 0 ? (
                    [...Array(Number(roundInformation.video_slot_num))].map(
                      (item, index) => {
                        return (
                          <>
                            <View style={styles.pickVideo} key={index}>
                              <TouchableOpacity
                                onPress={onChoose}
                                style={styles.uploadBtn}>
                                <View style={styles.browse}>
                                  <AntDesign
                                    name="upload"
                                    color="#FFAD00"
                                    size={20}
                                  />
                                  {videoSrc != '' && (
                                    <Text style={{ color: '#FFAD00' }}>
                                      Browse
                                    </Text>
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      },
                    )
                  ) : (
                    <></>
                  ))}
              </View>
              {roundInformation.round_instruction === null ? (
                <View>
                  <Text
                    style={{
                      color: 'green',
                      textAlign: 'center',
                      fontSize: 15,
                      marginVertical: 5,
                      fontWeight: 'bold',
                    }}>
                    Please wait for instructions
                  </Text>
                </View>
              ) : roundInformation.round_instruction !== null ? (
                <View>
                  {/* <Text
                    style={{
                      color: 'green',
                      textAlign: 'center',
                      fontSize: 15,
                      marginVertical: 5,
                      fontWeight: 'bold',
                    }}>
                    Please Upload video for Participation
                  </Text> */}
                </View>
              ) : (
                videoList.length === 0 &&
                roundInformation.round_type === 0 && (
                  <View>
                    <Text
                      style={{
                        color: 'green',
                        marginHorizontal: 80,
                        fontSize: 15,
                        marginVertical: 5,
                        fontWeight: 'bold',
                      }}>
                      Your Videos Has Been Uploaded
                    </Text>
                  </View>
                )
              )}
              {roundInformation.round_type === 0 && isAppealedForThisRound && (
                <>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      textAlign: 'center',
                      marginVertical: 20,
                    }}>
                    Appeal Video
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {roundInformation.round_type === 0 &&
                      (appealVideos.length != 0 ? (
                        <FlatGrid
                          spacing={10}
                          itemDimension={120}
                          data={appealVideos}
                          renderItem={({ item, index }) => (
                            <>
                              <View style={{ width: '100%' }}>
                                <VideoPlayer
                                  video={{
                                    uri: `${AppUrl.MediaBaseUrl + item.video}`,
                                  }}
                                  videoWidth={200}
                                  videoHeight={200}
                                  autoplay={false}
                                  pauseOnPress
                                  hideControlsOnStart
                                  resizeMode="stretch"
                                  thumbnail={imagePath.AuditionTitleBanner}
                                />
                              </View>
                            </>
                          )}
                        />
                      ) : null)}
                  </View>

                  <View style={styles.uploadVideoStyle}>
                    {appealVideoList.length != 0 ? (
                      <FlatGrid
                        spacing={10}
                        itemDimension={120}
                        data={appealVideoList}
                        renderItem={({ item, index }) => (
                          <>
                            <View style={{ width: '100%' }}>
                              <VideoPlayer
                                video={{
                                  uri: `${AppUrl.MediaBaseUrl + item.video}`,
                                }}
                                videoWidth={200}
                                videoHeight={200}
                                autoplay={false}
                                pauseOnPress
                                hideControlsOnStart
                                resizeMode="stretch"
                                thumbnail={imagePath.AuditionTitleBanner}
                              />
                            </View>
                          </>
                        )}
                      />
                    ) : appealVideoList.length === 0 ? (
                      [
                        ...Array(
                          Number(roundInformation.appeal_video_slot_num),
                        ),
                      ].map((item, index) => {
                        return (
                          <>
                            <View style={styles.pickVideo} key={index}>
                              <TouchableOpacity
                                onPress={onChooseAppeal}
                                style={styles.uploadBtn}>
                                <View style={styles.browse}>
                                  <AntDesign
                                    name="upload"
                                    color="#FFAD00"
                                    size={20}
                                  />
                                  {videoSrc != '' && (
                                    <Text style={{ color: '#FFAD00' }}>
                                      Browse
                                    </Text>
                                  )}
                                </View>
                              </TouchableOpacity>
                            </View>
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </View>
                  {appealVideoList.length > 0 && (
                    <View>
                      <Text
                        style={{
                          color: 'green',
                          marginHorizontal: 80,
                          fontSize: 16,
                        }}>
                        Your Appeal Videos Uploaded
                      </Text>
                    </View>
                  )}
                </>
              )}

              {pick ? (
                <View style={styles.uploadVideoStyle}>
                  <View style={styles.pickVideo}>
                    <Image style={{ height: '100%' }} source={pick} />
                  </View>
                  <View style={styles.pickVideo}>
                    <Image style={{ height: '100%' }} source={pick} />
                  </View>
                  <View style={styles.pickVideo}>
                    <Image style={{ height: '100%' }} source={pick} />
                  </View>
                  <View style={styles.pickVideo}>
                    <Image style={{ height: '100%' }} source={pick} />
                  </View>
                </View>
              ) : null}

              <View></View>
            </View>
          </>
        )}

        <VideoUploadModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </View>
  );
};

export default Participation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  btnStyle: {
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
  },
  uploadTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    width: 80,
    color: '#FFAD00',
  },
  uploadMainBtn: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textColor: {
    color: '#E6E6E6',
  },
  browse: {
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtn: {
    height: 100,
    borderColor: '#FFAD00',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderRadius: 10,
  },
  uploadVideoStyle: {
    flexDirection: 'row',
  },
  uploadStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickVideo: {
    height: 100,
    flex: 1,
    margin: 5,
  },
  VideoT: {
    flexDirection: 'row',
    marginVertical: 10,
    // paddingLeft: 30,
    justifyContent: 'space-around',
    // margin:8,
  },
});
