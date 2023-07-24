import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import InfiniteScroll from 'react-native-infinite-scrolling';
// import PostCard from '../../../Components/Card/PostCard/PostCard';
import CardSkeleton from '../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import StarPromoVedio from '../StarPromoVideo/StarPromoVedio';
import PostCard from '../../../Components/GLOBAL/Card/PostCard/PostCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { RefreshControl } from 'react-native';
import AppUrl from '../../../RestApi/AppUrl';
import Toast from 'react-native-root-toast';

const PostContainer = ({
  path = null,
  position = null,
  setFilterPost = null,
  setPostPage = null,
  postPage = null,
  type = null,
}) => {
  const Navigation = useNavigation();
  const { axiosConfig, authContext } = useContext(AuthContext);
  const windowHeight = Dimensions.get('window').height;
  const [buffer, setBuffer] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);
  const [emptyPost, setEmptyPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [noUpcommingEvent, setNoUpcommingEvent] = useState(false);

  useEffect(() => {
    console.log('path', path);
    getAllPost();
    setBuffer(true);
    // setPostPage(2);
  }, []);

  const getAllPost = async () => {
    setNoUpcommingEvent(false);
    setLoadMore(true);
    if (postPage != null) {
      setPostPage(postPage + 1);
    }

    let res = await axios
      .get(path, axiosConfig)

      .then(res => {
        setLoadMore(false);
        setBuffer(false);
        setRefreshing(false);

        if (type !== null) {
        }

        if (res.data.status === 200) {
          setBuffer(false);
          if (setFilterPost != null) {
            setFilterPost(res.data.posts);
          }
          if (res.data.posts.length === 0) {
            setEmptyPost(true);
          }
          setPosts([...posts, ...res.data.posts]);
        }
      })
      .catch(err => {
        // authContext.signOut();
        console.log(err);
        // Toast.show('Please check internet connection !', Toast.durations.SHORT);

        // alert('network problem')
      });
  };

  const pageReload = () => {
    setBuffer(true);
    setPosts([]);
    getAllPost();
  };

  const onRefresh = () => {
    // setPostPage(1);
    // setBuffer(true);

    // getAllPost();
    freshDataGet();
  };

  const freshDataGet = () => {
    setBuffer(true);
    setPosts([]);
    setRefreshing(true);
    axios
      .get(AppUrl.AllPostWithPagination + 5 + `?page=1`, axiosConfig)
      .then(res => {
        setRefreshing(false);
        setBuffer(false);
        if (res.data.status === 200) {
          setPosts(res.data.posts);
          setPostPage(1);
        }
      })
      .catch(err => {
        setRefreshing(false);
        setBuffer(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      posts.filter(a => {
        if (a.type == type) {
          return a;
        }
      }).length == 0
    ) {
      setEmptyPost(true);
      setNoUpcommingEvent(true);
    }
  }, [type]);

  const renderData = ({ item, index }) => {
    return (
      <>
        {type !== null ? (
          <>{item.type === type && <PostCard key={index} post={item} />}</>
        ) : (
          <>
            {index === 0 ? (
              setFilterPost == null ? (
                <>
                  <StarPromoVedio />
                  {/* <Text style={{ color: '#fff' }}>{posts.length}</Text> */}
                  <PostCard key={index} post={item} />
                </>
              ) : (
                <></>
              )
            ) : (
              <PostCard key={index} post={item} />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      {buffer ? (
        <View>
          {[1, 2, 3, 4].map(index => (
            <CardSkeleton key={index} />
          ))}
        </View>
      ) : (
        <View
          style={
            !noUpcommingEvent
              ? { marginBottom: 130 }
              : { marginBottom: 130, minHeight: windowHeight }
          }>
          {/* <InfiniteScroll
            onScroll={() => console.log('jekhae')}
            renderData={renderData}
            data={posts}
            loadMore={getAllPost}
          /> */}

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={posts}
            renderItem={renderData}
            onEndReached={getAllPost}
            ListFooterComponent={() => (
              <View style={{ height: 250 }}>
                {loadMore && <CardSkeleton />}
                {emptyPost && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                    <Image
                      source={imagePath.lazyDog}
                      style={{ height: 70, width: 70 }}
                    />
                    <TouchableOpacity
                      style={{ alignItems: 'center', marginTop: 10 }}
                      onPress={pageReload}>
                      <Text style={{ color: '#ffaa00' }}>
                        No more post yet{' '}
                        <Icon name="reload" color={'#ffaa00'} size={20} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={['#FFAD00']}
                progressBackgroundColor="black"
              />
            }
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </>
  );
};
export default PostContainer;
