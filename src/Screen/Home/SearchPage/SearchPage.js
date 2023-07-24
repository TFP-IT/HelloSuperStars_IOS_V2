import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useContext } from 'react';
import styles from './Styles';
import SearchBar from 'react-native-platform-searchbar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAxiosGet } from '../../../CustomHooks/useAxiosGet';
import AppUrl from '../../../RestApi/AppUrl';
import imagePath from '../../../Constants/imagePath';
import axios from 'axios';
import { AuthContext } from '../../../Constants/context';
import CardSkeleton from '../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import PostCard from '../../../Components/GLOBAL/Card/PostCard/PostCard';
import navigationStrings from '../../../Constants/navigationStrings';

var drKamrul = 'https://feeds.abplive.com/onecms/images/uploaded-images/2021/08/10/78c55387283c9019b1821e8f682c9b9d_original.jpg'
var ranuMondol = "https://pbs.twimg.com/media/EJg6uOSUUAAT-H8?format=jpg&name=small";
var prova = 'https://www.daily-bangladesh.com/media/imgAll/2019December/en/prova-1912201210-1912210647.jpg'

// search page added 

const SearchPage = ({ navigation }) => {
  const { axiosConfig } = useContext(AuthContext);
  const [inputText, setInputText] = useState()
  const { resData, setResData, buffer, error } = useAxiosGet(AppUrl.allStarListForSearch)
  const [starList, setStarList] = useState();
  const [filterPost, setFilterPost] = useState();
  const [postBuffer, setPostBuffer] = useState(false)


  // console.log(resData)

  const handelSearch = (text) => {
    handleFilterData(text, "first_name", "last_name")

    if (text.length == 0) {
      setFilterPost([])
    } else {
      setPostBuffer(true)
      axios.get(AppUrl.postSearch + text, axiosConfig)
        .then(res => {
          setPostBuffer(false)
          setFilterPost(res.data.posts)

        })
        .catch(err => {
          setPostBuffer(false)
          console.log(err.message)
        });
    }

  }

  /**
   * redirect star profile
  */
  function handleStarProfile(data) {
    return navigation.navigate(navigationStrings.STARPROFILE, {
      payload: data,
    });
  }

  /**
   * filter data 
  */
  const handleFilterData = (value, ...props) => {

    let array = resData.stars?.filter(item => {
      let state = false;

      props.forEach(property => {
        if (item[property].toLowerCase().includes(value.toLowerCase())) {
          state = true;
        }
      });

      return state;
    });


    if (value.length > 0) {

      setStarList(array)
    } else {
      setStarList([])
    }
  };


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.Header}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchField}
              placeholder="Search"
              placeholderTextColor={'#fff'}
              onChangeText={(text) => handelSearch(text)}
            />
          </View>

        </View>


        <ScrollView style={styles.subContent}>


          {buffer && <Image source={imagePath.loadingGif} style={{ height: 20, width: 30, marginLeft: 5 }} />}

          {starList?.length > 0 &&
            <>
              <View style={styles.subContent}>
                <Text style={[styles.font, styles.topTitle]}>Star</Text>
              </View>
              {starList.map((item, index) =>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: '#343434', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }} key={index} onPress={() => handleStarProfile(item)}>

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 10 }}>
                      <View >
                        <Image source={{ uri: AppUrl.MediaBaseUrl + item?.image }} style={styles.profileImg} />
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.font]}>{item?.first_name + " " + item?.last_name}</Text>
                      <Text style={[styles.font, styles.follow]}>{item?.user_type}</Text>
                    </View>
                  </View>

                  {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="close" size={25} color="gray" />
            </TouchableOpacity> */}
                </TouchableOpacity>
              )}
            </>
          }


          {postBuffer &&
            <Image source={imagePath.loadingGif} style={{ height: 20, width: 30, marginLeft: 5, marginTop: 10 }} />
          }
          {filterPost?.length > 0 &&
            <>
              <View style={styles.subContent}>
                <Text style={[styles.font, styles.topTitle]}>Post</Text>
              </View>
              {filterPost.map((item, index) =>

                <PostCard key={index} post={item} />
              )}
            </>
          }


        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SearchPage;
