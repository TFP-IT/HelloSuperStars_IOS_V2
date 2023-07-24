import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  StyleSheet,
  SafeAreaView,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import noImage from '../../../../Assets/Images/defult_image_profile.png';
import {androidCameraPermission} from '../../../../../permission';
import navigationStrings from '../../../../Constants/navigationStrings';
import {useThemeColor} from '../../../../CustomHooks/useThemeColor';
import {useFileUploadS3} from '../../../../CustomHooks/useFileUploadS3';
import NoDataComp from '../../../../Components/NoDataComp';
const windowWidth = Dimensions.get('window').width;

const UserProfileV1 = () => {
  const {themeBacground, themeCardColor, themeTextColor, themeIconColor} =
    useThemeColor();
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
  const [progress, setProgress] = useState(0);
  const [coverUri, setCoverUri] = useState();
  const [profileUri, setProfileUri] = useState();

  const [profileUpload, setProfileUpload] = useState({
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
    img: {
      uri: '',
      type: '',
      name: '',
      data: '',
      oldImage: '',
      for: '',
    },
  });

  const [fanGrops, setFanGrops] = useState([]);

  useEffect(() => {
    authContext.userInfoUpate(resData.users);
  }, [resData]);

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
          //console.log(res.data?.userActivites);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
    axios
      .get(AppUrl.purchasedStarPhotos, axiosConfig)
      .then(res => {
        //console.log(res.data);
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
        //console.log(res.data);
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
   * upload profile photo
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
  };

  const uploadProfilePhotoCamera = () => {
    CropImagePicker.openCamera({
      width: 512,
      height: 512,
      cropping: true,
    }).then(image => {
      // console.log('Profile Camera =>', image);
      getImageProcess(image, 'profile');
    });
  };

  const uploadProfilePhoto = () => {
    CropImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
    }).then(image => {
      // console.log('Profile Image =>', image);
      getImageProcess(image, 'profile');
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
  };

  const uploadCoverPhotoCamera = () => {
    CropImagePicker.openCamera({
      width: 1050,
      height: 850,
      cropping: true,
    }).then(image => {
      console.log('image camera =>', image);
      getImageProcess(image, 'cover');
    });
  };
  //upload cover photo in aws s3
  const uploadCoverPhoto = () => {
    CropImagePicker.openPicker({
      width: 1050,
      height: 850,
      cropping: true,
    }).then(image => {
      console.log('image cover =>', image);
      getImageProcess(image, 'cover');
    });
  };

  const getImageProcess = async (image, type) => {
    try {
      //console.log('selected Image', image);

      const fileName = image.path.split('/').pop();
      const contentType = image.mime;
      if (type == 'cover') {
        const response = await useFileUploadS3(
          image.path,
          fileName,
          'tfp-hellosuperstars-images',
          contentType,
          setProgress,
          'cover',
        );
        //console.log('response', response?.uploadResponse?.Key);
        setCoverUri(response?.uploadResponse?.Key);
      } else if (type == 'profile') {
        const response = await useFileUploadS3(
          image.path,
          fileName,
          'tfp-hellosuperstars-images',
          contentType,
          setProgress,
          'image',
        );
        //console.log('response', response?.uploadResponse?.Key);
        setProfileUri(response?.uploadResponse?.Key);
      } else {
        console.log('Nothing');
      }
    } catch (error) {
      console.log('Upload Cover Error', error);
    }
  };
  /**
   * uplaod done
   */

  return (
    <SafeAreaView>
      <View style={[styles.container, themeBacground]}>
        <HeaderComp backFunc={() => Navigation.goBack()} />
        <ScrollView>
          {/* cover photo work start here */}
          <View style={[styles.container2, themeBacground]}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                coverUri == null
                  ? imagePath.coverNoImgae
                  : {
                      uri: `${AppUrl.imageCdn + coverUri}`,
                    }
              }
            />
            <View style={[styles.cameraIcon, themeCardColor]}>
              <TouchableOpacity onPress={choseCover}>
                <Icon name="camera" size={16} color={themeIconColor} />
              </TouchableOpacity>
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
                        width={150}
                        height={150}
                        borderRadius={60}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                </>
              ) : (
                <ImageBackground
                  style={{
                    borderRadius: 60,
                    height: '100%',
                    width: '100%',
                  }}
                  source={noImage}
                  resizeMode="contain">
                  <Image
                    source={
                      profileUpload.img.uri != ''
                        ? {uri: profileUpload.img.uri}
                        : {uri: `${AppUrl.imageCdn + profileUri}`}
                    }
                    style={styles.ProfileImg}
                  />
                  <View style={[styles.cameraIcon2, themeCardColor]}>
                    <TouchableOpacity onPress={choseProfile}>
                      <Icon name="camera" size={18} color={themeIconColor} />
                    </TouchableOpacity>
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
                <Text style={[styles.TextView1, themeTextColor]}>
                  {' '}
                  {useInfo?.first_name} {useInfo?.last_name}
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
                    //console.log(data);
                  }}>
                  @{useInfo?.username}
                </Text>
              )}
            </View>
          </View>
          {/* ====name text section end ===  */}

          {/* =======working information sections start  =========*/}

          <View
            style={[
              {
                backgroundColor: '#343434',
                margin: 8,
                borderRadius: 8,
              },
              themeCardColor,
            ]}>
            {/* <View style={styles.infoView}>
                  <View style={styles.infoChild}>
                    <View style={{ marginRight: 10 }}>
                      <MatarialIcon
                        name="work-outline"
                        size={20}
                        color={themeIconColor}
                      />
                    </View>
                    <View style={styles.infoChild}>
                      <Text style={{ color: 'white' }}>
                        Chairman at
                      </Text>
                      <Text style={[styles.infoTextmain,themeTextColor]}>Kamrul Group</Text>
                    </View>
                  </View>
                </View> */}

            {useInfo?.user_info?.occupation && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <>
                    <View style={{marginRight: 10}}>
                      <MatarialIcon
                        name="work-outline"
                        size={20}
                        color={themeIconColor}
                      />
                    </View>
                    <View style={styles.infoChild}>
                      <Text style={themeTextColor}>Occupation</Text>
                      <Text style={[styles.infoTextmain, themeTextColor]}>
                        {useInfo?.user_info?.occupation}
                      </Text>
                    </View>
                  </>
                </View>
              </View>
            )}

            {useInfo?.user_info?.edu_level && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon
                      name="graduation-cap"
                      size={16}
                      color={themeIconColor}
                    />
                  </View>

                  <View style={styles.infoChild}>
                    <Text style={themeTextColor}>Education</Text>
                    <Text style={[styles.infoTextmain, themeTextColor]}>
                      {useInfo?.user_info?.edu_level}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {useInfo?.user_info?.gender && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon2 name="group" size={16} color={themeIconColor} />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={themeTextColor}>Gender</Text>
                    <Text style={[styles.infoTextmain, themeTextColor]}>
                      {useInfo.user_info.gender}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {useInfo?.user_info?.dob && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon2
                      name="birthday-cake"
                      size={16}
                      color={themeIconColor}
                    />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={themeTextColor}>Birth Date </Text>
                    <Text style={[styles.infoTextmain, themeTextColor]}>
                      {useInfo?.user_info?.dob}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            {useInfo?.user_info?.country && (
              <View style={styles.infoView}>
                <View style={styles.infoChild}>
                  <View style={{marginRight: 10}}>
                    <Icon name="city" size={16} color={themeIconColor} />
                  </View>
                  <View style={styles.infoChild}>
                    <Text style={themeTextColor}>Lives in</Text>
                    <Text style={[styles.infoTextmain, themeTextColor]}>
                      {useInfo?.user_info?.country}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* =======working information sections end  =========*/}

          {/*=========== nested route start========  */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 8,
              marginBottom: 30,
            }}>
            <TouchableOpacity
              style={[styles.bgNav, themeCardColor]}
              onPress={() => setData('posts')}>
              <Text style={data === 'posts' ? {color: 'gold'} : themeTextColor}>
                All Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bgNav, themeCardColor]}
              onPress={() => setData('photos')}>
              <Text
                style={data === 'photos' ? {color: 'gold'} : themeTextColor}>
                Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bgNav, themeCardColor]}
              onPress={() => setData('videos')}>
              <Text
                style={data === 'videos' ? {color: 'gold'} : themeTextColor}>
                Videos
              </Text>
            </TouchableOpacity>
          </View>
          {/*=========== nested route end========  */}

          {/* =========routed items start========  */}

          {buffer && (
            <View>
              {[1, 2, 3, 4].map(index => (
                <CardSkeleton key={index} />
              ))}
            </View>
          )}
          {data === '' && <NoDataComp />}

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
              {fanGrops &&
                fanGrops.map((item, index) => (
                  // <FanGroupPost post={item} key={index} />
                  <FanGroupPost data={item.fangroup} key={index} />
                ))}

              {userActivites &&
                userActivites.map((item, index) => (
                  <UserProPost
                    post={
                      item.type === 'greeting'
                        ? item?.greeting_registration?.status > 2
                          ? item
                          : null
                        : item
                    }
                    key={index}
                  />
                ))}
              {/* <ProfilePost userActivites={userActivites} /> */}
            </>
          ) : (
            <NoDataComp />
          )}

          {/* =========routed items end========  */}
        </ScrollView>
      </View>

      {editProfile && (
        <EditProfileModal
          editProfile={editProfile}
          setEditProfile={setEditProfile}
        />
      )}
    </SafeAreaView>
  );
};

export default UserProfileV1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    maxHeight: 250,
    minHeight: 250,
    paddingHorizontal: 10,
    // marginBottom : 25,
    position: 'relative',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  Text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 3,
  },
  //Name and go back
  topView: {
    flexDirection: 'row',
    marginVertical: 5,
    margin: 10,
  },
  topArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  topName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  cameraIcon: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 100,
  },

  profileView: {
    position: 'absolute',
    bottom: -40,
    left: '35%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileViewTab: {
    position: 'absolute',
    bottom: -40,
    left: '43%',
  },
  ProfileImg: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  cameraIcon2: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: '#333333',
    padding: 7,
    borderRadius: 100,
  },

  // profile name section
  nameView: {
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextView2: {
    color: '#626262',
    marginVertical: 4,
    fontSize: 12,
    textAlign: 'center',
  },

  //information section start
  infoView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  infoChild: {
    flexDirection: 'row',
  },
  infoTextmain: {color: 'white', marginHorizontal: 5, fontWeight: 'bold'},

  bgNav: {
    backgroundColor: '#343434',
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  editTxt: {
    backgroundColor: '#343434',
    marginLeft: 10,
    paddingHorizontal: 5,
    fontSize: 10,
    color: 'white',
    marginTop: 5,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
