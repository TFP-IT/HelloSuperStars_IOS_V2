import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import HeaderComp from '../../Components/HeaderComp';
import CardSkeleton from '../../Components/Skeleton/CardSkeleton/CardSkeleton';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import { useAxiosGet } from '../../CustomHooks/useAxiosGet';
import { useMediaPicker } from '../../CustomHooks/useMediaPicker';
import AppUrl from '../../RestApi/AppUrl';
import Analytics from './Analytics/Analytics';
import FanbaseModal from './FanbaseModal/FanbaseModal';
import FangroupCard from './FangroupCard/FangroupCard';
import Media from './Media/Media';
import Members from './Members/Members';
import styles from './Styles';

const Fangroup = ({ route }) => {
  const { data } = route.params;
  const { fangroup } = data;

  const width = useWindowDimensions().width;
  const [fanState, setFanstate] = React.useState('Home');
  // const [submitted, SetSubmitted] = React.useState(false);
  const [showWarning, SetshowWarning] = React.useState(false);
  const [starName, setStarName] = React.useState();
  const [dropDown, setDropDown] = React.useState(true);
  const { resData, setResData, buffer, error, HandelGetData } = useAxiosGet(
    AppUrl.GetFanGoupDetails + fangroup.slug,
  );
  const { onSelectImage, imgSrc, imageUpload, setImgSrc } = useMediaPicker();
  const [joinStatus, setJoinStatus] = React.useState(false);
  const [starInfo, setStarInfo] = useState();
  const { axiosConfig } = useContext(AuthContext);
  const [discripation, setDiscripation] = useState();
  const [postbuffer, setPostBuffer] = useState(false);
  const [progress, setProgress] = useState(false);
  const [videoUpload, setVideoUpload] = useState({
    uri: null,
    type: null,
    base64: null,
  });
  const [submitType, setSubmitType] = useState();

  const Navigation = useNavigation();
  const HandelJoin = () => {
    setDropDown(!dropDown);
  };

  const chosephoto = () => {
    onSelectImage();
    setSubmitType('img');
  };
  /**
   * post submite
   */
  const HandelSubmitPost = () => {
    if (submitType === 'img') {
      HandelSubmitPhoto();
    } else {
      HandelSubmitVideo();
    }
  };

  /**
   * handel image post submit
   */
  const HandelSubmitPhoto = () => {
    if (imgSrc) {
      setPostBuffer(true);
      axios
        .post(AppUrl.GroupMedia, imageUpload, axiosConfig)
        .then(res => {
          if (res.data.status == 200) {
            setImgSrc(null);

            let data = {
              description: discripation,
              slug: fangroup.slug,
              path: res.data.path,
            };

            axios
              .post(AppUrl.GroupPostStore, data, axiosConfig)
              .then(res => {
                setPostBuffer(false);
                setDiscripation('');
                if (res.data.status == 200) {
                  //console.log(res.data);
                  HandelGetData();
                  Toast.show('Posted', Toast.durations.SHORT);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          Toast.show(err.message, Toast.durations.SHORT);
          console.log(err);
        });
    } else {
      Toast.show('please Select Media', Toast.durations.SHORT);
    }
  };

  /**
   * video post
   */
  const HandelSubmitVideo = () => {
    if (videoUpload.uri) {
      setPostBuffer(true);
      axios
        .post(AppUrl.OnlyMediaUpload, videoUpload, axiosConfig)
        .then(res => {
          if (res.data.status == 200) {
            setVideoUpload({
              uri: null,
              type: null,
              base64: null,
            });

            let data = {
              description: discripation,
              slug: fangroup.slug,
              video_url: res.data.path,
            };

            axios
              .post(AppUrl.GroupPostStore, data, axiosConfig)
              .then(res => {
                setPostBuffer(false);
                setDiscripation('');
                if (res.data.status == 200) {
                  //console.log(res.data);
                  HandelGetData();
                  Toast.show('Posted', Toast.durations.SHORT);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          Toast.show(err.message, Toast.durations.SHORT);
          console.log(err);
        });
    } else {
      Toast.show('please Select Media', Toast.durations.SHORT);
    }
  };

  /**
   * chose video file
   */
  const choseVideo = () => {
    setSubmitType('video');
    clearInterval(progress);
    let options = {
      mediaType: 'video',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('Video Picker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        RNFS.readFile(response.assets[0].uri, 'base64')
          .then(res => {
            setVideoUpload({
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              base64: res,
            });
          })
          .catch(err => {
            Toast.show(err.message, Toast.durations.SHORT);
          });
      }
    });
  };

  console.log('join status--->', fangroup.join_approval_status);

  return (
    <>
      <View style={styles.container}>
        <Modal
          visible={showWarning}
          transparent
          onRequestClose={() => SetshowWarning(false)}
          animationType="slide"
          hardwareAccelerated>
          <FanbaseModal
            CloseModal={() => SetshowWarning(false)}
            starName={starName}
            setStarName={setStarName}
            fanGroup={fangroup}
            setJoinStatus={setJoinStatus}
            starInfo={starInfo}
            HandelGetData={HandelGetData}
          />
        </Modal>
        <HeaderComp
          backFunc={() => Navigation.goBack()}
          FanGroup={'fangroup'}
        />
        <View style={styles.row1}>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{
                width: '100%',
                height: 100,
                borderRadius: 6,
                resizeMode: 'cover',
              }}
              source={{ uri: `${AppUrl.MediaBaseUrl + fangroup.banner}` }}
            />
          </View>
        </View>

        <View
          style={
            starName ? { alignItems: 'center' } : [styles.row1, styles.row2]
          }>
          <View style={{ width: '67%' }}>
            <Text style={styles.fontTitle}>{fangroup?.group_name}</Text>
            <Text style={styles.fontSubtitle}>
              Created at {moment(fangroup.start_date).format('LL')} || Continue{' '}
              {moment(fangroup.end_date).format('LL')}
              {/* Created  12 Feb 2022  */}
            </Text>
          </View>
          {starName ? (
            <></>
          ) : (
            <View style={styles.row3}>
              <TouchableOpacity
                onPress={() => (resData.myJoinData ? null : HandelJoin())}
                style={{
                  backgroundColor: '#ffaa00',
                  flexDirection: 'row',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.joinNowText}>
                    {resData.myJoinData
                      ? resData.myJoinData?.star_name
                      : 'Join Now!'}{' '}
                  </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MatarialIcon name="arrow-drop-down" size={20} />
                </View>
              </TouchableOpacity>

              {!dropDown && (
                <View
                  style={{
                    backgroundColor: '#313131',
                    borderRadius: 5,
                    marginTop: 5,
                    padding: 10,
                    position: 'absolute',
                    width: '100%',
                    marginTop: 35,
                    zIndex: 15,
                    elevation: Platform.OS === 'android' ? 50 : 0,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setDropDown(true);
                      SetshowWarning(true);
                      setStarInfo(fangroup.my_superstar);
                    }}
                    style={{
                      borderWidth: 0.7,
                      borderColor: '#4556EA',
                      padding: 2,
                      margin: 3,
                      borderRadius: 10,
                      marginVertical: 5,
                      backgroundColor: `${starName === 'Shrukh khan' ? '#4556EA' : '#313131'
                        }`,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        textAlign: 'center',
                      }}>
                      {fangroup.my_superstar.first_name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDropDown(true);
                      SetshowWarning(true);
                      setStarInfo(fangroup.another_superstar);
                    }}
                    style={{
                      borderWidth: 0.7,
                      borderColor: '#1FA98F',
                      padding: 2,
                      margin: 3,
                      borderRadius: 10,

                      backgroundColor: `${starName === 'Salman Khan' ? '#1FA98F' : '#313131'
                        }`,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        textAlign: 'center',
                      }}>
                      {fangroup.another_superstar.first_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.horizontalLine} />
        {/*....... Route navbar start here....... */}
        <View style={[styles.row1, styles.routerow2]}>
          <TouchableOpacity onPress={() => setFanstate('Home')}>
            <Text
              style={
                fanState === 'Home' ? styles.routeTxtActive : styles.routeTxt
              }>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFanstate('Media')}>
            <Text
              style={
                fanState === 'Media' ? styles.routeTxtActive : styles.routeTxt
              }>
              Media
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFanstate('Analytics')}>
            <Text
              style={
                fanState === 'Analytics'
                  ? styles.routeTxtActive
                  : styles.routeTxt
              }>
              Analytics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFanstate('Members')}>
            <Text
              style={
                fanState === 'Members' ? styles.routeTxtActive : styles.routeTxt
              }>
              Members
            </Text>
          </TouchableOpacity>

          {starName && (
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: 'rgba(219, 8, 246, 1)',
                  padding: 2,
                  color: 'white',
                  borderRadius: 3,
                }}>
                {starName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/*....... Route navbar end here....... */}
        <ScrollView>
          {fanState === 'Members' || fanState === 'Analytics' ? null : (
            <>
              {(resData.myJoinStaus || joinStatus) && (
                <View style={[styles.row1, styles.postRow]}>
                  <View style={styles.subRow}>
                    <Text style={[styles.routeTxt, styles.postTitle]}>
                      Create a post
                    </Text>
                    <TextInput
                      value={discripation}
                      style={styles.postInput}
                      placeholder="Type here to post something"
                      placeholderTextColor={'gray'}
                      onChangeText={e => setDiscripation(e)}
                    />
                    {imgSrc && submitType === 'img' && (
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 200,
                        }}>
                        <Image
                          source={{
                            uri: imgSrc ? imgSrc : 'https://picsum.photos/200',
                            width: 300,
                            height: 200,
                          }}
                          height={200}
                          width={width - 10}
                        />
                      </View>
                    )}
                    {videoUpload.uri && (
                      <VideoPlayer
                        video={{
                          uri: videoUpload.uri,
                        }}
                        videoWidth={1600}
                        videoHeight={900}
                        thumbnail={imagePath.videoPlayIcon}
                        blurRadius={10}
                      />
                    )}

                    {videoUpload.uri !== null ||
                      (!imgSrc && (
                        // {!imgSrc&&
                        <View style={styles.postView}>
                          <TouchableOpacity
                            style={styles.postBtns}
                            onPress={chosephoto}>
                            <View>
                              <Icon name="photo" size={20} color="#fff" />
                            </View>
                            <View
                              style={{ justifyContent: 'center', marginLeft: 5 }}>
                              <Text style={styles.routeTxt}>Add Photo</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.postBtns}
                            onPress={choseVideo}>
                            <View>
                              <Icon
                                name="video-camera"
                                size={20}
                                color="#fff"
                              />
                            </View>
                            <View
                              style={{ justifyContent: 'center', marginLeft: 5 }}>
                              <Text style={styles.routeTxt}>Add Video</Text>
                            </View>
                          </TouchableOpacity>
                          {/* <TouchableOpacity style={styles.postBtns}>
                      <View>
                        <Icon name="tags" size={20} color="#fff" />
                      </View>
                      <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                        <Text style={styles.routeTxt}>Add Photo</Text>
                      </View>
                    </TouchableOpacity> */}
                        </View>
                      ))}
                    <TouchableOpacity
                      style={[styles.joinNowBtn, styles.postNowBtn]}
                      onPress={() => (postbuffer ? null : HandelSubmitPost())}>
                      {postbuffer ? (
                        <Image
                          source={imagePath.loadingGif}
                          style={{ height: 20, width: 40 }}
                        />
                      ) : (
                        <Text
                          style={{
                            textAlign: 'center',
                            marginVertical: 5,
                            color: '#402801',
                          }}>
                          Post Now
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
          <View>
            {!buffer ? (
              <>
                {resData.myJoinStaus || joinStatus ? (
                  <>
                    {fanState === 'Home' ? (
                      <>
                        {resData.fanPost &&
                          resData.fanPost.map((item, index) => (
                            <FangroupCard data={item} key={index} />
                          ))}
                      </>
                    ) : null}
                    {fanState === 'Media' ? (
                      <ScrollView>
                        <Media resData={resData} />
                      </ScrollView>
                    ) : null}
                    {fanState === 'Members' ? (
                      <Members
                        memberInfos={resData?.member}
                        fangroup={fangroup}
                      />
                    ) : null}
                    {fanState === 'Analytics' && <Analytics />}
                  </>
                ) : (
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 50,
                    }}>
                    <Image
                      source={imagePath.lazyDog}
                      style={{ height: 150, width: 200 }}
                    />
                    <Text style={{ color: '#ffaa00', fontSize: 20 }}>
                      {resData.myJoinData?.approveStatus === 0
                        ? 'Wating for approved !'
                        : 'Wating For Your Join !'}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <CardSkeleton />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Fangroup;
