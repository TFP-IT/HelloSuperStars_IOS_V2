import React, { useEffect, useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { FlatGrid } from 'react-native-super-grid';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../../Constants/imagePath';
import { BackHandler } from "react-native";
import styles from './FollowersStyle';
import { useAxiosGet } from '../../../CustomHooks/useAxiosGet';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HeaderComp from '../../../Components/HeaderComp';
import TitleHeader from '../../../Components/TitleHeader';




const MenuFollowers = ({
  route,
  navigation

}) => {
  const { resData, buffer, setFollowerArrayId } = route.params;

  const [followingCat, setStarCategory] = useState([]);
  const [followingStarCat, setFollowStarCategory] = useState([]);
  const [followersIds, setFollowersIds] = useState([])
  const { useInfo, axiosConfig } = useContext(AuthContext);

  useEffect(() => {
    setStarCategory(resData.allSuperstar);
    setFollowStarCategory(resData.followStarCategory);
    setFollowersIds(resData.followingStarCategory)
    setFollowerArrayId(resData.followingStarCategory?.split(","))
  }, [resData])


  const handleFollowing = (id) => {
    if (!followingStarCat.includes(id)) {

      setFollowStarCategory([...followingStarCat, id]);
      handleChange([...followingStarCat, id]);
    }

    if (followingStarCat.includes(id)) {

      const checked_data = followingStarCat.filter((item) => item !== id);
      setFollowStarCategory(checked_data);
      handleChange(checked_data);
    }
  }


  const handleChange = (data) => {
    let followData = {
      'star_id': JSON.stringify(data)
    }
    axios.post(AppUrl.followStor, followData, axiosConfig).then((res) => {
      //console.log(res.data)
      if (res.data.status === 200) {
        setFollowersIds(res.data.followers)
        setFollowerArrayId(res.data.followers?.split(","))
        Toast.show("Followers list updated", Toast.durations.SHORT);
      }
    }).catch((err) => {

      console.log(err.message)
    });
  }





  const RenderStarsFollowList = ({ item }) => {
    if (followersIds.includes(item.super_star.id)) {

      return (
        <View style={{ width: '48%' }}>
          <View style={[styles.followCard]}>
            <View style={styles.followContents}>
              <Image style={styles.followImage} source={{ uri: AppUrl.MediaBaseUrl + item?.super_star?.image }} />
              <Text style={styles.followText}>SuperStar</Text>
              <Text
                style={[styles.text, { marginVertical: 8, fontSize: 18 }]}>
                {item.super_star.first_name + " " + item.super_star?.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleFollowing(item?.super_star?.id);
              }}
              style={
                item.type === 'Follow'
                  ? styles.followButton
                  : styles.unfollowButton
              }>
              <Text style={styles.followBtnText}>
                <Icon
                  name={
                    followingStarCat.includes(item.super_star.id)
                      ? 'plus-circle'
                      : 'check-circle'
                  }
                  size={18}
                />{' '}
                {followingStarCat.includes(item.super_star.id) ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

  }

  const RenderStarsSugestedList = ({ item }) => {
    if (!followersIds.includes(item.super_star.id)) {
      return (
        <View style={{ width: '48%' }}>
          <View style={styles.followCard}>
            <View style={styles.followContents}>
              <Image style={styles.followImage} source={{ uri: AppUrl.MediaBaseUrl + item?.super_star?.image }} />
              <Text style={styles.followText}>SuperStar</Text>
              <Text
                style={[styles.text, { marginVertical: 8, fontSize: 18 }]}>
                {item.super_star.first_name + " " + item.super_star?.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleFollowing(item?.super_star?.id);
              }}
              style={
                item.type === 'Follow'
                  ? styles.followButton
                  : styles.unfollowButton
              }>
              <Text style={styles.followBtnText}>
                <Icon
                  name={
                    followingStarCat.includes(item.super_star.id)
                      ? 'plus-circle'
                      : 'check-circle'
                  }
                  size={18}
                />{' '}
                {followingStarCat.includes(item.super_star.id) ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

  }



  return (<>
    <HeaderComp backFunc={() => navigation.goBack()} />
    <ScrollView style={{ backgroundColor: 'black' }}>

      <View style={{ flex: 1, backgroundColor: 'black' }}>

        {buffer &&
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <Image source={imagePath.loadingGif} style={{ height: 20, width: 30, margin: 10 }} />
          </View>
        }

        {!buffer &&
          <TitleHeader title={'YOU FOLLOW'} />
        }





        <View style={styles.followMainrow}>
          <>


            <FlatList
              columnWrapperStyle={{ justifyContent: 'space-around' }}
              numColumns={2}

              data={followingCat}
              renderItem={RenderStarsFollowList}
            />
          </>
        </View>




        {!buffer &&
          <TitleHeader title={'SUGGESSION'} />
        }


        <>

          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            numColumns={2}

            data={followingCat}
            renderItem={RenderStarsSugestedList}
          />
        </>
      </View>

    </ScrollView>
  </>
  );
};

export default MenuFollowers;
