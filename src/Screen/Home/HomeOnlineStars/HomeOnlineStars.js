import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AuthContext, ThemeContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './styles';
import colorCode from '../../../Constants/colorCode';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import {Animated} from 'react-native';
import Toast from 'react-native-root-toast';

export default function HomeOnlineStars({action}) {
  const Navigation = useNavigation();
  const {axiosConfig, socketData, socket, authContext} =
    useContext(AuthContext);
  const [loder, setLoder] = useState(true);
  const [starList, setStarList] = useState([]);
  const {themeCardColor, themeBacground} = useThemeColor();

  const [hideStatus, setHideStatus] = useState(true);

  const opacityAnim = React.useRef(new Animated.Value(1)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;

  const translateYAnimShow = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (action == 'DOWN') {
      // hideComponent()
      setHideStatus(false);
    } else {
      // showComponent()
      setHideStatus(true);
    }
  }, [action]);

  const hideComponent = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setHideStatus(false);
    }, 400);
  };

  const showComponent = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimShow, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setHideStatus(true);
    }, 100);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  /**
   * star list
   */
  const getAllPost = () => {
    setLoder(true);
    axios
      .get(AppUrl.AlluserList, axiosConfig)
      .then(res => {
        setLoder(false);
        setStarList(res?.data?.stars);
      })
      .catch(err => {
        setLoder(false);
        console.log(err);

        if (err.response.status == 401) {
          Toast.show('Login agin', Toast.durations.SHORT);
          authContext.signOut();
        }
      });
  };

  const [onlineSuperStar, setOnlineSuperStar] = useState([]);
  const [starOnline, setStarOnline] = useState([]);
  const prevRates = starOnline?.map(item => item.id);

  useEffect(() => {
    socketData.on('recive_online_star', data => {
      if (data) {
        setStarOnline(prev => [...prev, data && data.userInfo]);
      }
      console.log(data.activeStar);
    });
    socketData.on('recive_offonline_star', data => {});
  }, [socketData]);

  useEffect(() => {
    if (starOnline) {
      sortOnLineStar();
    }
  }, [starOnline]);

  const sortOnLineStar = () => {
    let keepRateOrder = starList?.sort((a, b) => {
      if (prevRates.includes(a.id)) return -1;
      if (!prevRates.includes(a.id)) return 1;
      if (prevRates.includes(b.id)) return 1;
      if (!prevRates.includes(b.id)) return -1;
    });
    setOnlineSuperStar(keepRateOrder);
  };

  function handleStarProfile(data) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: data,
    });
  }

  const renderStar = ({item, index}) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleStarProfile(item)}>
        <View style={styles.container}>
          <Image
            style={styles.starCardImg}
            source={
              !item.image
                ? imagePath.defultStarprofile
                : {uri: AppUrl.imageCdn + item.image}
            }
          />
          {/* {prevRates.includes(item.id) &&
            <View style={styles.dot}></View>
          } */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {hideStatus && (
        <Animated.View
          style={[
            styles.topContainer,
            themeCardColor,
            {
              opacity: opacityAnim,
              transform: [{translateY: translateYAnim}],
            },
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.onlineText}>Online</Text>
          </View>
          {}
          <FlatList
            horizontal
            data={starList}
            renderItem={renderStar}
            keyExtractor={item => item.id}
          />

          {/* <ScrollView horizontal style={[{ marginHorizontal: 8, minHeight: 40 },themeBacground]}>
            {loder &&
              [1, 2, 3, 4, 5, 6, 7].map(index => (
                <View key={index} style={styles.container}>
                  <SkeletonPlaceholder
                    backgroundColor="#2e2e2e"
                    highlightColor="#3d3d3d"
                    height="200">
                    <SkeletonPlaceholder.Item
                      width={40}
                      height={40}
                      borderRadius={100}
                      // marginLeft={5}
                      // marginRight={3}
                    />
                  </SkeletonPlaceholder>
                </View>
              ))}
            {onlineSuperStar?.length !== 0 ? onlineSuperStar?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarProfile(item)}>
                <View style={styles.container}>
                  <Image
                    style={styles.starCardImg}
                    source={
                      item.image == 'null'
                        ? imagePath.noImageUser
                        : { uri: AppUrl.MediaBaseUrl + `/${item.image}` }
                    }
                  />
                  {prevRates.includes(item.id) &&
                    <View style={styles.dot}></View>
                  }
                </View>
              </TouchableOpacity>

            )) : starList && starList.map((item, index) =>

              <TouchableOpacity
                key={index}
                onPress={() => handleStarProfile(item)}>

                <ImageBackground source={imagePath.iconProfile} style={styles.container}>
                  <Image
                    style={styles.starCardImg}
                    source={
                      item.image == 'null'
                        ? imagePath.noImageUser
                        : { uri: AppUrl.MediaBaseUrl + `/${item.image}` }
                    }
                  />

                </ImageBackground>
              </TouchableOpacity>

            )

            }
          </ScrollView> */}
        </Animated.View>
      )}
    </>
  );
}
