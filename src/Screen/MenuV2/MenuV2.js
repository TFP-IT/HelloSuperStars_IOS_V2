import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import HeaderComp from '../../Components/HeaderComp';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './Styles';
import imagePath from '../../Constants/imagePath';
import noImage from '../../Assets/Images/defult_image_profile.png';
import MenuCategorySkeleton from '../../Components/Skeleton/MenuCardSkeleton/MenuCategorySkeleton';
import MenuCardSkeleton from '../../Components/Skeleton/MenuCardSkeleton/MenuCardSkeleton';
import MenuFilter from '../Menu/Content/MenuFilter';
import AppUrl from '../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Constants/context';
import {useAxiosGet} from '../../CustomHooks/useAxiosGet';
import axios from 'axios';
import StarCarousel from '../Menu/Content/StarCarousel';
import LinearGradient from 'react-native-linear-gradient';
import navigationStrings from '../../Constants/navigationStrings';
import DropDown from '../../Components/DropDown/DropDown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
let menuData = [
  {
    id: 1,
    icon: <MaterialIcons name="person" size={18} color="#ffaa00" />,
    title: 'About Us',
    routeName: 'about',
  },
  {
    id: 2,
    icon: <MaterialIcons name="privacy-tip" size={18} color="#ffaa00" />,
    title: 'Privacy Policy',
    routeName: 'privacy',
  },
  {
    id: 3,
    icon: <MaterialIcons name="add-shopping-cart" size={18} color="#ffaa00" />,
    title: 'Product purchase flow',
    routeName: 'product',
  },
  {
    id: 4,
    icon: (
      <MaterialCommunityIcons
        name="file-document-edit"
        size={18}
        color="#ffaa00"
      />
    ),
    title: 'Terms and Condition',
    routeName: 't&c',
  },
  {
    id: 5,
    icon: (
      <MaterialCommunityIcons name="cash-refund" size={18} color="#ffaa00" />
    ),
    title: 'Refund, return, & policy',
    routeName: 'refund',
  },
  {
    id: 7,
    icon: (
      <MaterialIcons name="chat-bubble-outline" size={18} color="#ffaa00" />
    ),
    title: 'FaQ',
    routeName: 'faq',
  },
];
const MenuV2 = ({navigation}) => {
  const Navigation = useNavigation();

  const [menuChange, setMenuChange] = useState(0);
  const [selectCatBuffer, setSelectCatBuffer] = useState(false);

  const [activityLength, setActivityLength] = useState(0);
  const [menuActivitList, setMenuActivitList] = useState({});

  const {
    useInfo,
    authContext,
    waletInfo,
    activities,
    getActivity,
    updateNotification,
  } = useContext(AuthContext);
  const {axiosConfig, posts, setPosts} = useContext(AuthContext);
  const [loder, setLoder] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [allCategoty, setAllCategory] = useState(null);
  const [childActivityEventList, setChildActivityEventList] = useState({});
  const {resData, buffer, HandelGetData} = useAxiosGet(AppUrl.allStarList);

  const [followerArrayId, setFollowerArrayId] = useState([]);
  const [childActivityEventType, setChildActivityEventType] = useState('');
  const [upCommingEvents, setUpCommingEvents] = useState({
    learningSessions: '',
    liveChats: '',
    auditions: '',
    meetups: '',
    qna: '',
  });

  const onRefresh = () => {
    setLoder(true);
    setRefreshing(true);

    getActivity();
    setRefreshing(false);
    getAllUpCommingEvents();
    getAllCategory();
    updateNotification();
  };

  useEffect(() => {
    getAllCategory();
    getActivity();
    updateNotification();

    getAllUpCommingEvents();
  }, []);

  useEffect(() => {
    setLoder(false);
    setActivityLength(activities?.activity_length);
    setMenuActivitList(activities);
  }, [activities]);

  const getAllUpCommingEvents = () => {
    setLoder(true);
    axios
      .get(AppUrl.UpCommingEvents, axiosConfig)
      .then(res => {
        setLoder(false);
        setUpCommingEvents({
          learningSessions: res.data.learningSession,
          liveChats: res.data.LiveChat,
          auditions: res.data.audition,
          meetups: res.data.meetup,
          qna: res.data.qna,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllCategory = () => {
    setLoder(true);
    axios
      .get(AppUrl.Allcategory, axiosConfig)
      .then(res => {
        setLoder(false);
        makeCatrgoryArry(res.data.category);

        let categoryArry = res.data.category.map((item, index) => {
          if (res.data.selectedCategory.includes(item.id)) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
          return {...item};
        });

        setAllCategory(categoryArry);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const makeCatrgoryArry = data => {
    let categoryArry = data.map((item, index) => {
      item.isSelected = false;
      return {...item};
    });

    setAllCategory(categoryArry);
  };

  const selectHandaler = valu => {
    setSelectCatBuffer(true);

    let categoryArry = allCategoty.map((item, index) => {
      if (valu == index) {
        item.isSelected = !item.isSelected;
      }
      return {...item};
    });

    setAllCategory(categoryArry);
    const selected = allCategoty.filter(item => item.isSelected);
    let selectedCategory = [];
    selected.map(valu => {
      if (valu.isSelected) {
        selectedCategory.push(valu.id);
      }
    });

    let formData = {
      category: JSON.stringify(selectedCategory),
    };

    axios
      .post(AppUrl.categoryAdd, formData, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          axios
            .get(AppUrl.AllPostWithPagination + 5 + `?page=1`, axiosConfig)
            .then(res => {
              setSelectCatBuffer(false);
              if (res.data.status === 200) {
                setPosts(res.data.posts);
              }
            });

          Toast.show('Category updated', Toast.durations.SHORT);
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show('problem', Toast.durations.SHORT);
      });
  };

  // useEffect(() => {
  //   setFollowerArrayId(resData.followingStarCategory?.split(','));
  // }, [resData]);

  //terms and condition function
  const onSelect = item => {
    if (item.routeName === 'about') {
      return Navigation.navigate(navigationStrings.ABOUTPOLICY);
    } else if (item.routeName === 'privacy') {
      return Navigation.navigate(navigationStrings.PRIVACYPOLICY);
    } else if (item.routeName === 'product') {
      return Navigation.navigate(navigationStrings.PRODUCTPOLICY);
    } else if (item.routeName === 't&c') {
      return Navigation.navigate(navigationStrings.CONDITIONPOLICY);
    } else if (item.routeName === 'refund') {
      return Navigation.navigate(navigationStrings.REFUNDPOLICY);
    } else if (item.routeName === 'faq') {
      return Navigation.navigate(navigationStrings.FAQPOLICY);
    } else if (item.routeName === 'personalSetting') {
      return Navigation.navigate(navigationStrings.PERSONAL);
    } else if (item.routeName === 'educationalSettings') {
      return Navigation.navigate(navigationStrings.EDUCATIONAL);
    } else if (item.routeName === 'employmentSettings') {
      return Navigation.navigate(navigationStrings.EMPLOYEE);
    } else if (item.routeName === 'interestSettings') {
      return Navigation.navigate(navigationStrings.INTEREST);
    } else if (item.routeName === 'securitySettings') {
      return Navigation.navigate(navigationStrings.SECURITY);
    } else if (item.routeName === 'reportSettings') {
      return Navigation.navigate(navigationStrings.REPORT);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <ScrollView>
          {/*=========== user profile section===========  */}
          <View style={styles.profileView}>
            <View style={styles.subProfileView}>
              <Image
                source={
                  useInfo?.image !== null
                    ? {
                        uri: `${AppUrl.imageCdn + useInfo?.image}`,
                      }
                    : noImage
                }
                style={styles.profileImg}
              />
            </View>
            <TouchableOpacity
              onPress={() => Navigation.navigate(navigationStrings.USERPROFILE)}
              style={styles.profileName}>
              <View style={{marginLeft: 7}}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {useInfo?.name}
                </Text>
                <Text style={{color: '#C8D3D8', fontSize: 12}}>
                  See your profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*=========== user profile section===========  */}

          {/*=========== banner Section start ========== */}

          <ImageBackground
            imageStyle={{borderRadius: 6}}
            source={imagePath.MenuCover}
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 20,
              marginBottom: 10,
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.MENUACTIVITES, {
                    menuActivitList,
                  })
                }
                style={styles.mainRow}>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={imagePath.menuIconActivity} />
                </View>
                <View>
                  <Text style={styles.fonts}>ACTIVITES</Text>
                  <Text style={styles.fonts2}>{activityLength} activities</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate(navigationStrings.MENUFOLLOWERS, {
                //     setFollowerArrayId,
                //     resData,
                //     buffer,
                //   })
                // }
                style={styles.mainRow}>
                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Image source={imagePath.menuIconStar} />
                </View>
                <View>
                  <Text style={styles.fonts}>FOLLOWERS</Text>
                  <Text style={styles.fonts2}>
                    {followerArrayId?.length} Following
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mainRow}
                onPress={() => Navigation.navigate(navigationStrings.WALLET)}>
                <View style={{alignItems: 'center', marginVertical: 3}}>
                  <Image source={imagePath.Wallet1} />
                </View>
                <View>
                  <Text style={styles.fonts}>PACKAGES</Text>
                  <Text style={styles.fonts2}>
                    {waletInfo?.club_points} credit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/*=========== banner Section start ========== */}

          {/*====== Skeleton start here============ */}

          {loder ? (
            [0, 1, 2, 3].map(item => {
              if (item === 0) {
                return <MenuCategorySkeleton key={item} />;
              } else {
                return <MenuCardSkeleton key={item} />;
              }
            })
          ) : (
            <>
              <View style={styles.menuCrosalItem}>
                <MenuFilter
                  loader={selectCatBuffer}
                  categoryData={allCategoty}
                  selectHandaler={selectHandaler}
                />
              </View>

              <View style={{paddingBottom: '15%'}}>
                {/* Learning Seassion Carusel Iteam start */}
                {upCommingEvents.learningSessions.length > 0 && (
                  <View style={styles.menuCrosalItem}>
                    <View>
                      <Text style={styles.titelText}>Learning Session</Text>
                    </View>
                    <View style={styles.carouselContainer_gray}>
                      <View style={{width: '90%'}}>
                        <StarCarousel
                          eventData={upCommingEvents.learningSessions}
                          eventType={'LearningSession'}
                        />
                      </View>
                      <View style={{width: '10%'}}>
                        <LinearGradient
                          colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 0}}
                          style={{borderRadius: 5}}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 100,
                            }}
                            // onPress={() =>
                            //   Navigation.navigate(
                            //     navigationStrings.POSTSHOWBYTYPE,
                            //     {
                            //       type: 'learningSession',
                            //     },
                            //   )
                            // }
                          >
                            <MaterialIcons
                              name="arrow-forward-ios"
                              color={'black'}
                              size={20}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                )}

                {/* Learning Seassion Carusel Iteam end */}

                {/* Live chat Carusel Iteam start */}
                {upCommingEvents.liveChats.length > 0 && (
                  <View style={styles.menuCrosalItem}>
                    <View>
                      <Text style={styles.titelText}>Live Chat</Text>
                    </View>
                    <View style={styles.carouselContainer_gray}>
                      <View style={{width: '90%'}}>
                        <StarCarousel
                          eventData={upCommingEvents.liveChats}
                          eventType={'livechat'}
                        />
                      </View>
                      <View style={{width: '10%'}}>
                        <LinearGradient
                          colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 0}}
                          style={{borderRadius: 5}}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 100,
                            }}
                            // onPress={() =>
                            //   Navigation.navigate(
                            //     navigationStrings.POSTSHOWBYTYPE,
                            //     {
                            //       type: 'livechat',
                            //     },
                            //   )
                            // }
                          >
                            <MaterialIcons
                              name="arrow-forward-ios"
                              color={'black'}
                              size={20}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                )}
                {/* Live chat Carusel Iteam end */}

                {/* Upcoming Auditions Carusel Iteam start */}
                {upCommingEvents.auditions.length > 0 && (
                  <View style={styles.menuCrosalItem}>
                    <View>
                      <Text style={styles.titelText}>Auditions</Text>
                    </View>
                    <View style={styles.carouselContainer_gray}>
                      <View style={{width: '90%'}}>
                        <StarCarousel
                          eventData={upCommingEvents.auditions}
                          eventType={'audition'}
                        />
                      </View>
                      <View style={{width: '10%'}}>
                        <LinearGradient
                          colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 0}}
                          style={{borderRadius: 5}}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 100,
                            }}
                            // onPress={() =>
                            //   Navigation.navigate(
                            //     navigationStrings.POSTSHOWBYTYPE,
                            //     {
                            //       type: 'audition',
                            //     },
                            //   )
                            // }
                          >
                            <MaterialIcons
                              name="arrow-forward-ios"
                              color={'black'}
                              size={20}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                )}

                {/* Upcoming Auditions Carusel Iteam end */}

                {/* Meetup Events Carusel Iteam start */}
                {upCommingEvents.meetups.length > 0 && (
                  <View style={styles.menuCrosalItem}>
                    <View>
                      <Text style={styles.titelText}>Meet up Events</Text>
                    </View>
                    <View style={styles.carouselContainer_gray}>
                      <View style={{width: '90%'}}>
                        <StarCarousel
                          eventData={upCommingEvents.meetups}
                          eventType={'meetup'}
                        />
                      </View>
                      <View style={{width: '10%'}}>
                        <LinearGradient
                          colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 0}}
                          style={{borderRadius: 5}}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 100,
                            }}
                            // onPress={() =>
                            //   Navigation.navigate(
                            //     navigationStrings.POSTSHOWBYTYPE,
                            //     {
                            //       type: 'meetup',
                            //     },
                            //   )
                            // }
                          >
                            <MaterialIcons
                              name="arrow-forward-ios"
                              color={'black'}
                              size={20}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                )}
                {/* Meetup Events Carusel Iteam end */}

                {/* Meetup qna Carusel Iteam start */}
                {upCommingEvents.qna.length > 0 && (
                  <View style={styles.menuCrosalItem}>
                    <View>
                      <Text style={styles.titelText}>Question & Answer</Text>
                    </View>
                    <View style={styles.carouselContainer_gray}>
                      <View style={{width: '90%'}}>
                        <StarCarousel
                          eventData={upCommingEvents.qna}
                          eventType={'qna'}
                        />
                      </View>
                      <View style={{width: '10%'}}>
                        <LinearGradient
                          colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                          start={{x: 0, y: 1}}
                          end={{x: 1, y: 0}}
                          style={{borderRadius: 5}}>
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 100,
                            }}
                            // onPress={() =>
                            //   Navigation.navigate(
                            //     navigationStrings.POSTSHOWBYTYPE,
                            //     {
                            //       type: 'qna',
                            //     },
                            //   )
                            // }
                          >
                            <MaterialIcons
                              name="arrow-forward-ios"
                              color={'black'}
                              size={20}
                            />
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                )}

                <View>
                  <DropDown
                    title={'Terms & Policy'}
                    titleIcon={'policy'}
                    menuData={menuData}
                    onSelect={onSelect}
                  />
                </View>

                <TouchableOpacity
                  style={styles.menuTab}
                  onPress={() =>
                    Navigation.navigate(navigationStrings.SETTINGS)
                  }>
                  <View style={styles.menuSubTab}>
                    <Text style>
                      <MaterialIcons
                        name="settings"
                        color={'#ffaa00'}
                        size={25}
                      />
                    </Text>
                  </View>

                  <View style={styles.menuSubTab}>
                    <Text style={{fontSize: 15, color: '#ffaa00'}}>
                      SETTINGS
                    </Text>
                  </View>
                </TouchableOpacity>

                <LinearGradient
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  style={{marginVertical: 8, borderRadius: 10}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => authContext.signOut()}>
                    <MaterialCommunityIcons
                      name="logout"
                      color={'black'}
                      size={20}
                    />
                    <Text style={{color: 'black'}}>LOGOUT</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MenuV2;
