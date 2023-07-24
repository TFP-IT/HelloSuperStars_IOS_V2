import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
// import {LinearTextGradient} from 'react-native-text-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import noImage from '../../Assets/Images/defult_image_profile.png';
import HeaderComp from '../../Components/HeaderComp';
import ActivitiesCard from '../../Components/GLOBAL/Reuseable/ActivitiesCard';
import AuctionActivityCard from '../../Components/GLOBAL/Reuseable/AuctionActivityCard';
import ActivityListSkeleton from '../../Components/Skeleton/ActivityListSkeleton/ActivityListSkeleton';
import MenuCardSkeleton from '../../Components/Skeleton/MenuCardSkeleton/MenuCardSkeleton';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import MenuCategorySkeleton from './../../Components/Skeleton/MenuCardSkeleton/MenuCategorySkeleton';
import MenuActivities from './Content/MenuActivities';
import MenuFanGroup from './Content/MenuFanGroup';
import MenuFilter from './Content/MenuFilter';
import MenuFollowers from './Content/MenuFollowers';
import StarCarousel from './Content/StarCarousel';
import MenuNavigator from './MenuNavigator';
import styles from './styles';
import {useAxiosGet} from '../../CustomHooks/useAxiosGet';
import DropDown from '../../Components/DropDown/DropDown';

// thats for privacy policy drop down don't remove
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
let menuDataSettings = [
  {
    id: 1,
    icon: <MaterialIcons name="person" size={18} color="#ffaa00" />,
    title: 'Personal',
    routeName: 'personalSetting',
  },
  {
    id: 2,
    icon: <MaterialIcons name="menu-book" size={18} color="#ffaa00" />,
    title: 'Educational',
    routeName: 'educationalSettings',
  },
  {
    id: 3,
    icon: <MaterialIcons name="work-outline" size={18} color="#ffaa00" />,
    title: 'Employment',
    routeName: 'employmentSettings',
  },
  {
    id: 4,
    icon: (
      <MaterialCommunityIcons name="firework-off" size={18} color="#ffaa00" />
    ),
    title: 'Interest',
    routeName: 'interestSettings',
  },
  {
    id: 5,
    icon: (
      <MaterialCommunityIcons name="cash-refund" size={18} color="#ffaa00" />
    ),
    title: 'Security',
    routeName: 'securitySettings',
  },
  {
    id: 7,
    icon: <MaterialIcons name="dangerous" size={18} color="#ffaa00" />,
    title: 'Report',
    routeName: 'reportSettings',
  },
];

const Menu = () => {
  const Navigation = useNavigation();
  const [menuNavigator, setMenuNavigator] = useState(MenuNavigator.MENUHOME);
  const [menuChange, setMenuChange] = useState(0);
  const [selectCatBuffer, setSelectCatBuffer] = useState(false);

  const [activityLength, setActivityLength] = useState(0);
  const [menuActivitList, setMenuActivitList] = useState({});
  const [childActivityEventList, setChildActivityEventList] = useState({});

  const [childActivityEventType, setChildActivityEventType] = useState('');
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

  const {resData, buffer, HandelGetData} = useAxiosGet(AppUrl.allStarList);

  const [followerArrayId, setFollowerArrayId] = useState([]);
  const [upCommingEvents, setUpCommingEvents] = useState({
    learningSessions: '',
    liveChats: '',
    auditions: '',
    meetups: '',
    qna: '',
  });

  const [menuSelectedItem, setMenuselectedItem] = useState({});
  const handleChange = () => {
    setMenuNavigator(MenuNavigator.MENUACTIVITIES), setMenuChange(0);
  };

  //back icon
  const handleBack = () => {
    setMenuNavigator(MenuNavigator.MENUHOME), setMenuChange(0);
  };

  //follower click
  const handleFollower = () => {
    setMenuNavigator(MenuNavigator.MENUFOLLOWERS);
    setMenuChange(0);
  };

  //fan group click
  const handleFanGroup = () => {
    setMenuNavigator(MenuNavigator.MENUFANGROUP);
    setMenuChange(0);
  };
  const onRefresh = () => {
    setLoder(true);
    setRefreshing(true);
    // getMenuList();
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
    // getMenuList();
    getAllUpCommingEvents();
  }, []);

  //activity from route.js contex
  useEffect(() => {
    setLoder(false);
    setActivityLength(activities.activity_length);
    setMenuActivitList(activities);
  }, [activities]);

  /**
   * get up comming all events
   */
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
  /**
   * view all category
   */
  const getAllCategory = () => {
    setLoder(true);
    axios
      .get(AppUrl.Allcategory, axiosConfig)
      .then(res => {
        setLoder(false);
        makeCatrgoryArry(res.data.category);
        // //console.log(res.data.selectedCategory)
        //old selscted category
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
  /**
   * make category arry with is selected valu
   */
  const makeCatrgoryArry = data => {
    let categoryArry = data.map((item, index) => {
      item.isSelected = false;
      return {...item};
    });

    setAllCategory(categoryArry);
  };

  /**
   * category selected
   */
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

    //category list to serve
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

    // setPosts([])
    // console.log('select all category', selectedCategory)
  };

  /**
   * select category
   */

  useEffect(() => {
    setFollowerArrayId(resData.followingStarCategory?.split(','));
  }, [resData]);

  function MenuBackRoute(parmas) {
    if (
      (menuChange === 1 && childActivityEventType !== 'auction') ||
      (menuChange === 1 && childActivityEventType === 'auction')
    ) {
      setMenuNavigator(MenuNavigator.MENUACTIVITIES);
      setMenuChange(0);
    } else if (
      menuNavigator === MenuNavigator.MENUACTIVITIES ||
      menuNavigator === MenuNavigator.MENUFOLLOWERS
    ) {
      setMenuNavigator(MenuNavigator.MENUHOME);
      setMenuChange(0);
    } else {
      Navigation.goBack();
    }
  }

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
    <>
      <HeaderComp backFunc={MenuBackRoute} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FFAD00']}
            progressBackgroundColor="black"
          />
        }>
        {/* <SafeAreaView> */}

        <View
          style={{
            backgroundColor: '#171717',
            flexDirection: 'row',
            paddingVertical: 6,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
              borderRadius: 50,
              marginRight: 10,
              borderColor: '#FFAD00',
              borderWidth: 1,
              overflow: 'hidden',
              padding: 2,
            }}>
            <Image
              source={
                useInfo?.image !== null
                  ? {
                      uri: `${AppUrl.MediaBaseUrl + useInfo?.image}`,
                    }
                  : noImage
              }
              // source={{

              //   uri: `${AppUrl.MediaBaseUrl + useInfo?.image}`,
              // }}

              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                resizeMode: 'stretch',
                margin: -2,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => Navigation.navigate(navigationStrings.USERPROFILE)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '75%',
            }}>
            <View style={{marginLeft: 7}}>
              <Text style={{color: 'white', fontSize: 18}}>
                {useInfo?.first_name}
              </Text>
              <Text style={{color: 'gray'}}>See your profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={imagePath.MenuCover}
          style={{width: '100%', alignItems: 'center', paddingVertical: 20}}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              style={
                menuNavigator == MenuNavigator.MENUACTIVITIES
                  ? styles.mainRowActive
                  : styles.mainRow
              }
              onPress={
                activityLength > 0
                  ? handleChange
                  : () => {
                      Toast.show(
                        "Pleace wait or you don't have any activity",
                        Toast.durations.SHORT,
                      );
                    }
              }>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image source={imagePath.menuIconActivity} />
              </View>
              <View>
                <Text
                  style={
                    menuNavigator == MenuNavigator.MENUACTIVITIES
                      ? styles.fontsActive
                      : styles.fonts
                  }>
                  Activities
                </Text>
                <Text style={styles.fonts2}>{activityLength} activities</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                menuNavigator == MenuNavigator.MENUFOLLOWERS
                  ? styles.mainRowActive
                  : styles.mainRow
              }
              onPress={handleFollower}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image source={imagePath.menuIconStar} />
              </View>
              <View>
                <Text
                  style={
                    menuNavigator == MenuNavigator.MENUFOLLOWERS
                      ? styles.fontsActive
                      : styles.fonts
                  }>
                  Followers
                </Text>
                <Text style={styles.fonts2}>
                  {followerArrayId?.length} Following
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mainRow}
              onPress={() => Navigation.navigate(navigationStrings.WALLET)}>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <Image source={imagePath.Wallet1} />
              </View>
              <View>
                <Text style={styles.fonts}>Packages</Text>
                <Text style={styles.fonts2}>
                  {waletInfo?.club_points} credit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {menuNavigator == MenuNavigator.MENUHOME ? (
          <>
            <ScrollView style={{backgroundColor: 'black'}}>
              {loder === true ? (
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

                  <View style={{paddingBottom: 5}}>
                    {/* Learning Seassion Carusel Iteam start */}
                    {upCommingEvents.learningSessions.length > 0 && (
                      <View style={styles.menuCrosalItem}>
                        <View>
                          <Text style={styles.titelText}>
                            Learning Seassion
                          </Text>
                        </View>
                        <View style={styles.carouselContainer_gray}>
                          <View style={{width: '85%'}}>
                            <StarCarousel
                              eventData={upCommingEvents.learningSessions}
                            />
                          </View>
                          <View style={{width: '15%'}}>
                            <LinearGradient
                              colors={[
                                '#F1A817',
                                '#F5E67D',
                                '#FCB706',
                                '#DFC65C',
                              ]}
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{borderRadius: 5}}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: 100,
                                }}
                                onPress={() =>
                                  Navigation.navigate(
                                    navigationStrings.POSTSHOWBYTYPE,
                                    {
                                      type: 'learningSession',
                                    },
                                  )
                                }>
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  View
                                </Text>
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  All
                                </Text>
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
                          <View style={{width: '85%'}}>
                            <StarCarousel
                              eventData={upCommingEvents.liveChats}
                            />
                          </View>
                          <View style={{width: '15%'}}>
                            <LinearGradient
                              colors={[
                                '#F1A817',
                                '#F5E67D',
                                '#FCB706',
                                '#DFC65C',
                              ]}
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{borderRadius: 5}}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: 100,
                                }}
                                onPress={() =>
                                  Navigation.navigate(
                                    navigationStrings.POSTSHOWBYTYPE,
                                    {
                                      type: 'livechat',
                                    },
                                  )
                                }>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  View
                                </Text>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  All
                                </Text>
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
                          <View style={{width: '85%'}}>
                            <StarCarousel
                              eventData={upCommingEvents.auditions}
                            />
                          </View>
                          <View style={{width: '15%'}}>
                            <LinearGradient
                              colors={[
                                '#F1A817',
                                '#F5E67D',
                                '#FCB706',
                                '#DFC65C',
                              ]}
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{borderRadius: 5}}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: 100,
                                }}
                                onPress={() =>
                                  Navigation.navigate(
                                    navigationStrings.POSTSHOWBYTYPE,
                                    {
                                      type: 'audition',
                                    },
                                  )
                                }>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  View
                                </Text>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  All
                                </Text>
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
                          <View style={{width: '85%'}}>
                            <StarCarousel eventData={upCommingEvents.meetups} />
                          </View>
                          <View style={{width: '15%'}}>
                            <LinearGradient
                              colors={[
                                '#F1A817',
                                '#F5E67D',
                                '#FCB706',
                                '#DFC65C',
                              ]}
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{borderRadius: 5}}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: 100,
                                }}
                                onPress={() =>
                                  Navigation.navigate(
                                    navigationStrings.POSTSHOWBYTYPE,
                                    {
                                      type: 'meetup',
                                    },
                                  )
                                }>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  View
                                </Text>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  All
                                </Text>
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
                          <Text style={styles.titelText}>
                            Question & Answer
                          </Text>
                        </View>
                        <View style={styles.carouselContainer_gray}>
                          <View style={{width: '85%'}}>
                            <StarCarousel eventData={upCommingEvents.qna} />
                          </View>
                          <View style={{width: '15%'}}>
                            <LinearGradient
                              colors={[
                                '#F1A817',
                                '#F5E67D',
                                '#FCB706',
                                '#DFC65C',
                              ]}
                              start={{x: 0, y: 1}}
                              end={{x: 1, y: 0}}
                              style={{borderRadius: 5}}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: 100,
                                }}
                                onPress={() =>
                                  Navigation.navigate(
                                    navigationStrings.POSTSHOWBYTYPE,
                                    {
                                      type: 'qna',
                                    },
                                  )
                                }>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  View
                                </Text>
                                <Text
                                  style={{fontWeight: 'bold', color: 'black'}}>
                                  All
                                </Text>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              )}

              {/* menu dropdown  */}
              <View>
                <DropDown
                  title={'Terms & Policy'}
                  titleIcon={'policy'}
                  menuData={menuData}
                  onSelect={onSelect}
                />
              </View>
              {/* menu dropdown end  */}

              <TouchableOpacity
                style={styles.menuTab}
                onPress={() => Navigation.navigate(navigationStrings.SETTINGS)}>
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
                  <Text style={{fontSize: 15, color: '#ffaa00'}}>Settings</Text>
                </View>
              </TouchableOpacity>

              <LinearGradient
                colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                style={{marginVertical: 30}}>
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
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        {menuNavigator == MenuNavigator.MENUACTIVITIES && menuChange === 0 ? (
          <>
            {/* {loder ===true && [1, 2, 3, 4,5].map((index) =>
    <ActivityListSkeleton key={index} />)
    } */}

            {loder === true ? (
              [1, 2, 3, 4, 5].map(index => <ActivityListSkeleton key={index} />)
            ) : (
              <MenuActivities
                setMenuNavigator={setMenuNavigator}
                menuNavigator={menuNavigator}
                menuActivitList={menuActivitList}
                menuChange={menuChange}
                setChildActivityEventType={setChildActivityEventType}
                setChildActivityEventList={setChildActivityEventList}
                setMenuChange={setMenuChange}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {menuChange === 1 ? (
          <>
            {childActivityEventType === 'auction' ? (
              <>
                <AuctionActivityCard
                  menuNavigator={menuNavigator}
                  menuChange={menuChange}
                  setMenuNavigator={setMenuNavigator}
                  setMenuChange={setMenuChange}
                  childActivityEventList={childActivityEventList}
                  childActivityEventType={childActivityEventType}
                />
              </>
            ) : (
              <></>
            )}
            {childActivityEventType != 'auction' ? (
              <>
                <ActivitiesCard
                  menuNavigator={menuNavigator}
                  menuChange={menuChange}
                  setMenuNavigator={setMenuNavigator}
                  setMenuChange={setMenuChange}
                  childActivityEventList={childActivityEventList}
                  childActivityEventType={childActivityEventType}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ) : // <ActivityEventList childActivityEventList={childActivityEventList} childActivityEventType={childActivityEventType} />
        null}
        {menuNavigator == MenuNavigator.MENUFOLLOWERS ? (
          <MenuFollowers
            setFollowerArrayId={setFollowerArrayId}
            resData={resData}
            buffer={buffer}
            HandelGetData={HandelGetData}
          />
        ) : (
          <></>
        )}
        {menuNavigator == MenuNavigator.MENUFANGROUP ? <MenuFanGroup /> : <></>}

        {/*
  <MenuHome />
  <MenuActivities />
  <MenuFollowers />
  <MenuFanGroup /> */}

        {/*
</SafeAreaView> */}
      </ScrollView>
    </>
  );
};

export default Menu;
