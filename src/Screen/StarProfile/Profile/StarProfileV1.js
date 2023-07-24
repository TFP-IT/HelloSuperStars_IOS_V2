import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, SafeAreaView} from 'react-native';
import Toast from 'react-native-root-toast';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import UpcomingAuditionsCard from '../../../Components/GLOBAL/Card/PostCard/UpcomingAuditionsCard';
import HeaderComp from '../../../Components/HeaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import CardSkeleton from '../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import GreetingRegistration from '../Greetings/GreetingRegistration/GreetingRegistration';
import Greetings from '../Greetings/Greetings';
import LiveChatDetails from '../LiveChat/LiveChatDetails';
import profileNavigatr from './profileNavigatr';
import VIdeos from '../TopNav/VIdeos';
import showcaseNavigator from '../ShowCase/showcaseNavigator';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import StarProfileHeader from '../../../Components/HOME/StarProfile/StarProfileHeader';
import LoaderCompV1 from '../../../Components/LoaderCompV1';
import NavigatorButton from '../../../Components/HOME/StarProfile/NavigatorButton';
import StarPostDataV1 from '../StarPostDataV1';
import PhotosV1 from '../TopNav/PhotosV1';
import StarShowCaseButton from '../../../Components/HOME/StarProfile/StarShowCaseButton';
import UpcomingAuditionsCardV1 from '../../../Components/GLOBAL/Card/PostCard/UpcomingAuditionsCardV1';
import GreetingsV1 from '../Greetings/GreetingsV1';
import ShowCaseV1 from '../ShowCase/ShowCaseV1';
import VideosV1 from '../TopNav/VideosV1';

const StarProfileV1 = ({route}) => {
  const [filterPost, setFilterPost] = useState(null);
  const {payload} = route.params;
  const navigation = useNavigation();
  const [profileNavigate, setProfileNavigate] = useState(profileNavigatr.POST);
  const [buffer, setBuffer] = useState(false);
  const [selectedLiveChat, setSelectedLiveChat] = useState(null);
  const [greetings, setGreetings] = useState({});
  const [greetingRegistration, setGreetingRegistration] = useState({});
  const {axiosConfig} = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [activeButton, setActiveButton] = useState();
  const [isActiveBtn, setIsActiveBtn] = useState();
  //for dark & light mode
  const {themeBacground} = useThemeColor();

  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  const [data, setData] = useState({
    star: payload,
  });

  useEffect(() => {
    getPostByStar();
  }, []);

  //get all psot base on stars
  const [allPost, setAllPost] = useState([]);
  const [auditionPosts, setAuditionPosts] = useState([]);
  const [postBuffer, setPostBuffer] = useState(false);

  const getPostByStar = (pageNo = null) => {
    setPostBuffer(true);
    axios
      .get(
        AppUrl.AllPostWithPagination + `5?page=${pageNo ? pageNo : pageNumber}`,
        axiosConfig,
      )
      .then(res => {
        setPostBuffer(false);
        if (res.data.status === 200) {
          setAllPost(res.data.posts);
          //Toast.show('done', Toast.durations.SHORT);
          //console.log('-----------------------------------');
          // console.log(allPost.filter(post => post.type == 'audition'));
          // console.log('-----------------auditions posts-------'.auditionPosts);
        }
      })
      .catch(err => {
        setPostBuffer(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setAuditionPosts(allPost.filter(post => post.type == 'audition'));
  }, [allPost]);

  //console.log('All Post => ', allPost);

  // console here
  const greetingsCheck = () => {
    setBuffer(true);

    axios
      .get(AppUrl.GreetingStarStatus + data?.star?.id, axiosConfig)
      .then(res => {
        setBuffer(false);
        if (res.data.status === 200) {
          if (res.data.action) {
            setProfileNavigate(profileNavigatr.GREETINGS);
          } else {
            setProfileNavigate(profileNavigatr.GREETINGS);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);
  };

  const handleBackFunction = () => {
    navigation.goBack();
  };

  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttonPress={modalOkBtn}
      />
      {buffer ? <LoaderCompV1 /> : <></>}
      <SafeAreaView>
        <HeaderComp backFunc={handleBackFunction} />
        <ScrollView style={themeBacground}>
          <View style={[{flex: 1.5, minHeight: 280}, themeBacground]}>
            {/* Star Cover With Profile */}
            <StarProfileHeader starData={data} />
          </View>
          <View>
            {/* navigator */}
            <View style={styles.postNavigator}>
              {/* Post */}
              <NavigatorButton
                title={'Post'}
                onPress={() => {
                  setProfileNavigate(profileNavigatr.POST);
                  setActiveButton('Post');
                }}
                isActive={activeButton === 'Post'}
              />
              {/* Photos */}
              <NavigatorButton
                title={'Photos'}
                onPress={() => {
                  setProfileNavigate(profileNavigatr.PHOTOSTAR);
                  setActiveButton('Photos');
                }}
                isActive={activeButton === 'Photos'}
              />
              {/* Videos */}
              <NavigatorButton
                title={'Videos'}
                onPress={() => {
                  setProfileNavigate(profileNavigatr.VIDEOSTAR);
                  setActiveButton('Videos');
                }}
                isActive={activeButton === 'Videos'}
              />
            </View>

            {/* autoplay autoplayDelay={5} autoplayLoop */}
            <View>
              <SwiperFlatList autoplay index={0} autoplayDelay={5} autoplayLoop>
                {/* star show case */}
                <StarShowCaseButton
                  title={'Star show case'}
                  imagePath={imagePath.StarShowcase}
                  onPress={() => {
                    navigation.navigate(navigationStrings.STARSHOWCASE, {
                      data: data?.star,
                    });
                    setIsActiveBtn('StarShowCase');
                  }}
                  isActive={isActiveBtn === 'StarShowCase'}
                />
                {/* meet up */}
                <StarShowCaseButton
                  title={'Meetup'}
                  imagePath={imagePath.MeetUp}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.MEETUP);
                    setIsActiveBtn('Meetup');
                  }}
                  isActive={isActiveBtn === 'Meetup'}
                />

                {/* audition */}
                <StarShowCaseButton
                  title={'Audition'}
                  imagePath={imagePath.Auditions}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.AUDITION);
                    setIsActiveBtn('Audition');
                  }}
                  isActive={isActiveBtn === 'Audition'}
                />

                {/* Greetings */}
                <StarShowCaseButton
                  title={'Greetings'}
                  imagePath={imagePath.Greetings}
                  onPress={() => {
                    greetingsCheck();
                    setIsActiveBtn('Greetings');
                  }}
                  isActive={isActiveBtn === 'Greetings'}
                />
                {/*  Q & A */}
                <StarShowCaseButton
                  title={'Q & A'}
                  imagePath={imagePath.QA}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.QNA);
                    setIsActiveBtn('Qna');
                  }}
                  isActive={isActiveBtn === 'Qna'}
                />
                {/* live chat */}
                <StarShowCaseButton
                  title={'Live Chat'}
                  imagePath={imagePath.LiveChat}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.LIVECHAT);
                    setIsActiveBtn('Live_chat');
                  }}
                  isActive={isActiveBtn === 'Live_chat'}
                />
                {/* learning session */}
                <StarShowCaseButton
                  title={'Learning'}
                  imagePath={imagePath.Learning}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.LARNINGSESSION);
                    setIsActiveBtn('learningSession');
                  }}
                  isActive={isActiveBtn === 'learningSession'}
                />
                {/* fan group */}
                <StarShowCaseButton
                  title={'Fan group'}
                  imagePath={imagePath.MeetUp}
                  onPress={() => {
                    setProfileNavigate(profileNavigatr.FANGROUP);
                    setIsActiveBtn('Fangroup');
                  }}
                  isActive={isActiveBtn === 'Fangroup'}
                />
              </SwiperFlatList>
            </View>
          </View>
          <View
            style={[
              styles.postContainer,
              themeBacground,
              {marginTop: 15, marginBottom: 40},
            ]}>
            {profileNavigate == profileNavigatr.POST ? (
              <>
                {postBuffer ? (
                  <CardSkeleton />
                ) : (
                  <StarPostDataV1
                    setBuffer={setBuffer}
                    setProfileNavigate={setProfileNavigate}
                    data={allPost}
                    setSelectedLiveChat={setSelectedLiveChat}
                    PostData={filterPost}
                    star={data.star}
                    filter="null"
                  />
                )}
              </>
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.PHOTOSTAR ? (
              <>
                {postBuffer ? (
                  <CardSkeleton />
                ) : (
                  <PhotosV1 starId={data?.star?.id} setToggle={toggle} />
                )}
              </>
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.VIDEOSTAR ? (
              <>
                {postBuffer ? (
                  <CardSkeleton />
                ) : (
                  <VideosV1 starId={data?.star?.id} setToggle={toggle} />
                )}
              </>
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.LIVECHAT ? (
              <StarPostDataV1
                setBuffer={setBuffer}
                setProfileNavigate={setProfileNavigate}
                data={allPost}
                setSelectedLiveChat={setSelectedLiveChat}
                PostData={filterPost}
                star={data.star}
                filter="livechat"
              />
            ) : (
              <></>
            )}
            {/* meetup session */}
            {profileNavigate == profileNavigatr.MEETUP ? (
              <StarPostDataV1
                setBuffer={setBuffer}
                setProfileNavigate={setProfileNavigate}
                data={allPost}
                setSelectedLiveChat={setSelectedLiveChat}
                PostData={filterPost}
                star={data.star}
                filter="meetup"
              />
            ) : (
              <></>
            )}
            {/* learning session  */}
            {profileNavigate == profileNavigatr.LARNINGSESSION ? (
              <StarPostDataV1
                setBuffer={setBuffer}
                setProfileNavigate={setProfileNavigate}
                data={allPost}
                setSelectedLiveChat={setSelectedLiveChat}
                PostData={filterPost}
                star={data.star}
                filter="learningSession"
              />
            ) : (
              <></>
            )}
            {/* FanGroup session  */}
            {profileNavigate == profileNavigatr.FANGROUP ? (
              <StarPostDataV1
                setBuffer={setBuffer}
                setProfileNavigate={setProfileNavigate}
                data={allPost}
                setSelectedLiveChat={setSelectedLiveChat}
                PostData={filterPost}
                star={data.star}
                filter="fangroup"
              />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.QNA ? (
              // <Qna QnaData={filterPost} star={data.star} />
              <StarPostDataV1
                setBuffer={setBuffer}
                setProfileNavigate={setProfileNavigate}
                data={allPost}
                setSelectedLiveChat={setSelectedLiveChat}
                PostData={filterPost}
                star={data.star}
                filter="qna"
              />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.LIVECHATDETAILS ? (
              <LiveChatDetails data={selectedLiveChat} />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.AUDITION ? (
              <UpcomingAuditionsCardV1
                setProfileNavigate={setProfileNavigate}
                post={auditionPosts}
              />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.GREETINGS ? (
              <GreetingsV1
                setProfileNavigate={setProfileNavigate}
                star_id={data.star.id}
              />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.GREETINGREGISTRATION ? (
              <GreetingRegistration
                parentGreetings={greetings}
                parentGreetingRegistration={greetingRegistration}
                setProfileNavigate={setProfileNavigate}
                star={data.star}
                setBuffer={setBuffer}
              />
            ) : (
              <></>
            )}
            {profileNavigate == profileNavigatr.STARSHOWCASE ? (
              <ShowCaseV1 data={data?.star} />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default StarProfileV1;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1.5,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  postContainer: {
    // flex: 2,
    backgroundColor: 'black',
  },
  banner: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFAD00',
    minHeight: 150,
  },
  bannerImage: {
    height: '100%',
  },
  profileImageContainer: {
    // flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  postNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  ProfileOption: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ProfileItem: {
    width: '23%',
    backgroundColor: '#282828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileItemActive: {
    width: '23%',
    backgroundColor: '#FFAD00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfileItemText: {
    fontSize: 11,
    paddingTop: 5,
    color: 'white',
  },
  ProfileItemTextActive: {
    fontSize: 11,
    paddingTop: 5,
    color: '#171717',
  },
  proImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },

  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#FFAD00'
  },
  title: {
    fontSize: 19,
    color: 'white',
    // color: '#00000'
  },
  active: {
    color: '#FFAD00',
  },
  //updated navbar
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  iconView: {
    height: 55,
    width: 55,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView2: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  sliderItem: {
    height: 80,
    width: 80,
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
