import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {launchImageLibrary} from 'react-native-image-picker';
import CropImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import FanGroupPost from '../../../../Components/GLOBAL/Card/PostCard/FanGroupPost';
import UserProPost from '../../../../Components/GLOBAL/Card/PostCard/UserProPost';
import HeaderComp from '../../../../Components/HeaderComp';
import CardSkeleton from '../../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import {AuthContext} from '../../../../Constants/context.js';
import imagePath from '../../../../Constants/imagePath.js';
import {useAxiosGet} from '../../../../CustomHooks/useAxiosGet';
import AppUrl from '../../../../RestApi/AppUrl.js';
import EditProfileModal from './profileComp/EditProfileModal/EditProfileModal';
import ProfilePhotos from './profileComp/ProfilePhotos/ProfilePhotos.js';
import ProfilePost from './profileComp/ProfilePost/ProfilePost.js';
import ProfileVideos from './profileComp/ProfileVideos/ProfileVideos.js';
import styles from './Styles.js';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import noImage from '../../../../Assets/Images/defult_image_profile.png';
import {androidCameraPermission} from '../../../../../permission';
import navigationStrings from '../../../../Constants/navigationStrings';
import PostCartItem from '../../../../Components/GLOBAL/Card/PostCard/PostCartItem';
import {useImageUploadS3} from '../../../../CustomHooks/useImageUploadS3';
const windowWidth = Dimensions.get('window').width;

const UserProfile = () => {
  const Navigation = useNavigation();
  const [buffer, setBuffer] = useState(true);
  const {resData} = useAxiosGet(AppUrl.UserInfo);

  const {useInfo, authContext, axiosConfig} = useContext(AuthContext);
  const [data, setData] = React.useState('posts');
  const [purchasedPhotos, setPurchasedPhotos] = useState([]);
  const [purchasedVideos, setPurchasedVideos] = useState([]);

  const [userActivites, setUserActivites] = useState([]);

  const [editProfile, setEditProfile] = useState(false);
  const [imageBuffer, setImageBuffer] = useState(false);
  const [coverBuffer, setCoverBuffer] = useState(false);

  const {isLoading, uploadFile, isDone} = useImageUploadS3('user/profile');

  const [fanGrops, setFanGrops] = useState([]);
  const userData = resData?.users;

  console.log('user info data', resData);

  const UserInFormation = {
    id: userData?.id,
    name: userData?.first_name + ' ' + userData?.last_name,
    image: userData?.image,
    cover_photo: userData?.cover_photo,
  };

  useEffect(() => {
    authContext.userInfoUpate(UserInFormation);
  }, [resData]);

  const [profileUpload, setProfileUpload] = useState({
    awsKey: '',
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });
  const [coverUpload, setCoverUpload] = useState({
    awsKey: '',
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });

  useEffect(() => {
    getUserActivityData();
  }, []);

  let getUserActivityData = () => {
    setBuffer(true);
    axios
      .get(AppUrl.UserActivityData, axiosConfig)
      .then(res => {
        setBuffer(false);
        if (res.data.status === 200) {
          setFanGrops(res.data?.fanGroup);
          setUserActivites(res.data?.userActivites);
          console.log(res.data?.userActivites);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
    axios
      .get(AppUrl.purchasedStarPhotos, axiosConfig)
      .then(res => {
        console.log(res.data);
        setBuffer(false);
        if (res.data.status === 200) {
          setPurchasedPhotos(res.data?.photos);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
    axios
      .get(AppUrl.purchasedStarVideos, axiosConfig)
      .then(res => {
        console.log(res.data);
        setBuffer(false);
        if (res.data.status === 200) {
          setPurchasedVideos(res.data?.videos);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };
  /**
   * state clear
   */
  const clearPhoto = () => {
    setProfileUpload({
      img: {
        uri: '',
        type: '',
        name: '',
        data: '',
        oldImage: '',
        for: '',
      },
    });
  };

  const clearCover = () => {
    setCoverUpload({
      img: {
        uri: '',
        type: '',
        name: '',
        data: '',
        oldImage: '',
        for: '',
      },
    });
  };

  /**
   * uplaod profile photo
   */
  const choseProfile = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: uploadProfilePhotoCamera},
        {text: 'Gallery', onPress: uploadProfilePhoto},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
    // clearInterval(progress);
  };

  const uploadProfilePhotoCamera = () => {
    CropImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      uploadFile(image.path, image.mime, 'jpg')
        .then(valu => {
          console.log('video url', valu.Key);

          setProfileUpload({
            awsKey: valu.Key,
            img: {
              uri: image.path,
              type: image.mime,
              oldImage: useInfo.image,
              for: 'profile',
            },
          });

          profileImageUpdateTOserver(valu.Key);
        })
        .catch(err => {
          console.log('error message', err);
        });

      // setProfileUpload({
      //   img: {
      //     uri: image.path,
      //     type: image.mime,
      //     data: res,
      //     oldImage: useInfo.image,
      //     for: 'profile',
      //   },
      // });
    });
  };

  const uploadProfilePhoto = () => {
    CropImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      uploadFile(image.path, image.mime, 'jpg')
        .then(valu => {
          console.log('video url', valu.Key);

          setProfileUpload({
            awsKey: valu.Key,
            img: {
              uri: image.path,
              type: image.mime,
              oldImage: useInfo.image,
              for: 'profile',
            },
          });
          profileImageUpdateTOserver(valu.Key);
        })
        .catch(err => {
          console.log('error message', err);
        });

      // setProfileUpload({
      //   img: {
      //     uri: image.path,
      //     type: image.mime,
      //     data: res,
      //     oldImage: useInfo.image,
      //     for: 'profile',
      //   },
      // });
    });
  };

  /**
   * upload cover photo
   */

  const choseCover = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: uploadCoverPhotoCamera},
        {text: 'Gallery', onPress: uploadCoverPhoto},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
    // clearInterval(progress);
  };

  const uploadCoverPhotoCamera = () => {
    CropImagePicker.openCamera({
      width: 300,
      height: 160,
      cropping: true,
    }).then(image => {
      RNFS.readFile(image.path, 'base64').then(res => {
        uploadFile(image.path, image.mime, 'jpg')
          .then(valu => {
            console.log('video url', valu.Key);

            setCoverUpload({
              awsKey: valu.Key,
              img: {
                uri: image.path,
                type: image.mime,
                oldImage: useInfo.image,
                for: 'cover',
              },
            });

            profileCoverUploadToServer(valu.Key);
          })
          .catch(err => {
            console.log('error message', err);
          });
      });
    });
  };
  const uploadCoverPhoto = () => {
    CropImagePicker.openPicker({
      width: 300,
      height: 160,
      cropping: true,
    }).then(image => {
      uploadFile(image.path, image.mime, 'jpg')
        .then(valu => {
          console.log('video url', valu.Key);

          setCoverUpload({
            awsKey: valu.Key,
            img: {
              uri: image.path,
              type: image.mime,
              oldImage: useInfo.image,
              for: 'cover',
            },
          });

          profileCoverUploadToServer(valu.Key);
        })
        .catch(err => {
          console.log('error message', err);
        });
    });
  };

  const profileCoverUploadToServer = key => {
    axios
      .post(AppUrl.UserCoverUpdate, {coverImage: key}, axiosConfig)
      .then(res => {
        console.log('uplaod cover status', res.data);
        const UserInFormation = {
          id: useInfo?.id,
          name: useInfo?.name,
          image: useInfo?.image,
          cover_photo: coverUpload.awsKey,
        };
        authContext.userInfoUpate(UserInFormation);
        Toast.show('save to server', Toast.durations.SHORT);
      })
      .catch(err => {});
  };

  const profileImageUpdateTOserver = key => {
    axios
      .post(AppUrl.UserProfileUpdate, {profilePhoto: key}, axiosConfig)
      .then(res => {
        console.log('uplaod profile status', res.data);
        const UserInFormation = {
          id: useInfo?.id,
          name: useInfo?.name,
          image: profileUpload.awsKey,
          cover_photo: useInfo?.cover_photo,
        };
        authContext.userInfoUpate(UserInFormation);
        Toast.show('save to server', Toast.durations.SHORT);
      })
      .catch(err => {});
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <HeaderComp backFunc={() => Navigation.goBack()} />

        <ScrollView>
          {/* cover photo work start here */}
          <View style={styles.container2}>
            <Image
              style={styles.image}
              source={
                coverUpload.img.uri != ''
                  ? {uri: coverUpload.img.uri}
                  : useInfo?.cover_photo == null
                  ? imagePath.coverNoImgae
                  : {
                      uri: `${AppUrl.imageCdn + userData?.cover_photo}`,
                    }
              }
            />
            {coverBuffer && (
              <View
                style={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  backgroundColor: '#00000091',
                  borderRadius: 50,
                  padding: 5,
                }}>
                <Image
                  source={imagePath.loadingBuffering}
                  style={{height: 30, width: 30}}
                />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <TouchableOpacity onPress={choseCover}>
                <Icon name="camera" size={16} color="white" />
              </TouchableOpacity>
              {/* {coverUpload.img.uri != '' && (
                <TouchableOpacity
                  style={{ marginLeft: 25 }}
                  onPress={coverBuffer ? () => { } : () => UploadDone('cover')}>
                  <Icon name="check" size={16} color="white" />
                </TouchableOpacity>
              )} */}
            </View>

            {/* profile photo work start here */}
            <View
              style={
                windowWidth > 500 ? styles.profileViewTab : styles.profileView
              }>
              {!useInfo ? (
                <>
                  <SkeletonPlaceholder
                    backgroundColor="#2e2e2e"
                    highlightColor="#3d3d3d">
                    <SkeletonPlaceholder.Item
                      flexDirection="row"
                      alignItems="center">
                      <SkeletonPlaceholder.Item
                        width={120}
                        height={120}
                        borderRadius={60}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                </>
              ) : (
                <ImageBackground
                  style={{
                    borderRadius: 60,
                    height: 120,
                    width: 120,
                  }}
                  source={noImage}
                  resizeMode="cover">
                  <Image
                    source={
                      profileUpload.img.uri != ''
                        ? {uri: profileUpload.img.uri}
                        : {uri: `${AppUrl.imageCdn + userData?.image}`}
                    }
                    style={styles.ProfileImg}
                  />
                  {imageBuffer && (
                    <View
                      style={{
                        position: 'absolute',
                        right: 40,
                        backgroundColor: '#00000091',
                        borderRadius: 50,
                        padding: 5,
                      }}>
                      <Image
                        source={imagePath.loadingBuffering}
                        style={{height: 30, width: 30}}
                      />
                    </View>
                  )}

                  <View style={styles.cameraIcon2}>
                    <TouchableOpacity onPress={choseProfile}>
                      <Icon name="camera" size={18} color="white" />
                    </TouchableOpacity>
                    {/* {profileUpload.img.uri != '' && (
                      <TouchableOpacity
                        style={{ marginLeft: 25 }}
                        onPress={
                          imageBuffer ? () => { } : () => UploadDone('profile')
                        }>
                        <Icon name="check" size={18} color="white" />
                      </TouchableOpacity>
                    )} */}
                  </View>
                </ImageBackground>
              )}
            </View>

            {/* profile photo work start here */}
          </View>

          {/* cover photo work end here */}

          {/* ====name text section start ===  */}
          <View style={styles.nameView}>
            <View>
              <View style={styles.userContainer}>
                <Text style={styles.TextView1}>
                  {' '}
                  {userData?.first_name + ' ' + userData?.last_name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Navigation.navigate(navigationStrings.SETTINGS)
                  }>
                  <Text style={styles.editTxt}>Edit </Text>
                </TouchableOpacity>
              </View>

              {useInfo && (
                <Text
                  style={styles.TextView2}
                  onPress={() => {
                    console.log(data);
                  }}>
                  @{userData?.username}
                </Text>
              )}
            </View>
          </View>
          {/* ====name text section end ===  */}

          {/* =======working information sections start  =========*/}

          <View
            style={{
              backgroundColor: '#343434',
              margin: 8,
              borderRadius: 8,
            }}>
            {/* <View style={styles.infoView}>
                  <View style={styles.infoChild}>
                    <View style={{ marginRight: 10 }}>
                      <MatarialIcon
                        name="work-outline"
                        size={20}
                        color="white"
                      />
                    </View>
                    <View style={styles.infoChild}>
                      <Text style={{ color: 'white' }}>
                        Chairman at
                      </Text>
                      <Text style={styles.infoTextmain}>Kamrul Group</Text>
                    </View>
                  </View>
                </View> */}

            {userData?.user_info?.occupation && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <>
                    <View style={{marginRight: 10}}>
                      <MatarialIcon
                        name="work-outline"
                        size={20}
                        color="white"
                      />
                    </View>
                    <View style={styles.infoChild}>
                      <Text style={{color: 'white'}}>Occupation</Text>
                      <Text style={styles.infoTextmain}>
                        {userData?.user_info?.occupation}
                      </Text>
                    </View>
                  </>
                </View>
              </View>
            )}

            {userData?.user_info?.edu_level && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon name="graduation-cap" size={16} color="white" />
                  </View>

                  <View style={styles.infoChild}>
                    <Text style={{color: 'white'}}>Education</Text>
                    <Text style={styles.infoTextmain}>
                      {userData?.user_info?.edu_level}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {userData?.user_info?.gender && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon2 name="group" size={16} color="white" />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={{color: 'white'}}>Gender</Text>
                    <Text style={styles.infoTextmain}>
                      {userData.user_info.gender}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {userData?.user_info?.dob && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon2 name="birthday-cake" size={16} color="white" />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={{color: 'white'}}>Birth Date </Text>
                    <Text style={styles.infoTextmain}>
                      {userData?.user_info?.dob}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {userData?.user_info?.country && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon name="city" size={16} color="white" />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={{color: 'white'}}>Lives in</Text>
                    <Text style={styles.infoTextmain}>
                      {userData?.user_info?.country}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={{height: 400, justifyContent: 'center'}}>
            <View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={imagePath.lazyDog}
                  style={{height: 100, width: 100}}
                />
              </View>

              <Text style={{color: 'white', textAlign: 'center'}}>
                Sorry No Data Available !
              </Text>
            </View>
          </View>

          {/* =======working information sections end  =========*/}

          {/*=========== nested route start========  */}

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={styles.bgNav}
              onPress={() => setData('posts')}>
              <Text
                style={data === 'posts' ? { color: 'gold' } : { color: 'white' }}>
                All Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgNav}
              onPress={() => setData('photos')}>
              <Text
                style={data === 'photos' ? { color: 'gold' } : { color: 'white' }}>
                Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bgNav}
              onPress={() => setData('videos')}>
              <Text
                style={data === 'videos' ? { color: 'gold' } : { color: 'white' }}>
                Videos
              </Text>
            </TouchableOpacity>
          </View> */}
          {/*=========== nested route end========  */}

          {/* =========routed items start========  */}

          {buffer && (
            <View>
              {[1, 2, 3, 4].map(index => (
                <CardSkeleton key={index} />
              ))}
            </View>
          )}
          {data === '' && (
            <View style={{height: 600, justifyContent: 'center'}}>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={imagePath.lazyDog}
                    style={{height: 100, width: 100}}
                  />
                </View>

                <Text style={{color: 'white', textAlign: 'center'}}>
                  Sorry No Data Available !
                </Text>
              </View>
            </View>
          )}

          {data == 'photos' ? (
            <ProfilePhotos
              userActivites={userActivites}
              starProPhotos={purchasedPhotos}
            />
          ) : data == 'videos' ? (
            <ProfileVideos
              userActivites={userActivites}
              purchasedVideos={purchasedVideos}
            />
          ) : userActivites.length > 0 ? (
            <>
              {/* {fanGrops &&
                fanGrops.map((item, index) => (
                  // <FanGroupPost post={item} key={index} />
                  <FanGroupPost data={item.fangroup} key={index} />
                ))} */}

              {userActivites &&
                userActivites.map((item, index) => (
                  // <UserProPost
                  //   post={
                  //     item.type === 'greeting'
                  //       ? item?.greeting_registration?.status > 2
                  //         ? item
                  //         : null
                  //       : item
                  //   }
                  //   key={index}
                  // />
                  // <PostCartItem />
                  <></>
                ))}
              {/* <ProfilePost userActivites={userActivites} /> */}
            </>
          ) : (
            <View style={{height: 200, justifyContent: 'center'}}>
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={imagePath.lazyDog}
                    style={{height: 100, width: 100}}
                  />
                </View>

                <Text style={{color: 'white', textAlign: 'center'}}>
                  Sorry No Data Available !
                </Text>
              </View>
            </View>
          )}

          {/* =========routed items end========  */}
        </ScrollView>
      </SafeAreaView>

      {editProfile && (
        <EditProfileModal
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        />
      )}
    </>
  );
};

export default UserProfile;
