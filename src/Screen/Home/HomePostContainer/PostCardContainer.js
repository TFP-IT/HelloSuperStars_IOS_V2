import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {AuthContext, ThemeContext} from '../../../Constants/context';
import PostCartItem from '../../../Components/GLOBAL/Card/PostCard/PostCartItem';
import {RefreshControl} from 'react-native';
import AppUrl from '../../../RestApi/AppUrl';
import axios from 'axios';
import CardSkeleton from '../../../Components/Skeleton/CardSkeleton/CardSkeleton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import imagePath from '../../../Constants/imagePath';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import StarPromoVideoV1 from '../StarPromoVideo/StarPromoVideoV1';
import StarPromoVideoV1Skaliton from '../StarPromoVideo/StarPromoVideoV1';

const PostCardContainer = ({action, setAction}) => {
  const flatListRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const {axiosConfig} = useContext(AuthContext);
  const [postBuffer, setPostBuffer] = useState(false);
  const [postData, setPostData] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [pageNumber, setpageNumber] = useState(1);
  const [scrollIndex, setScrollIndex] = useState(0);
  const {themeTextColor} = useThemeColor();

  const [endPost, setEndPost] = useState(false);
  /**
   * detect scroll move ment
   */

  useEffect(() => {
    setPostBuffer(true);
    getPostData();
  }, []);

  const [prevOffsetY, setPrevOffsetY] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [viewableItemsChangedHandler, setViewableItemsChangedHandler] =
    useState(() => ({viewableItems}) => {
      if (viewableItems.length > 0) {
        // console.log(viewableItems[0].index)
        setCurrentIndex(viewableItems[0].index);
      }
    });

  const getPostData = async (pageNo = null) => {
    try {
      const posts = await axios.get(
        AppUrl.AllPostWithPagination + `5?page=${pageNo ? pageNo : pageNumber}`,
        axiosConfig,
      );
      //post data save to state
      posts.data.status =
        200 &&
        posts?.data?.posts.length > 0 &&
        setPostData(prev => [...prev, ...posts?.data?.posts]);
      //not post found
      posts?.data?.posts.length == 0 && setEndPost(true);
      //last index
      postData.length !== 0 && setScrollIndex(postData.length);
      setPostBuffer(false);
    } catch (error) {
      setPostBuffer(false);
      console.error(error);
    }
  };

  const scrollToend = () => {
    setpageNumber(prev => prev + 1);
    getPostData(pageNumber + 1);
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > prevOffsetY) {
      action !== 'DOWN' &&
        event.nativeEvent.contentOffset.y < 0 &&
        setAction('DOWN');
    } else {
      action !== 'UP' && setAction('UP');
    }
    setPrevOffsetY(offsetY);
  };

  const keyExtractor = item => item.id;
  return (
    <>
      {postBuffer ? (
        <View>
          {[1, 2, 3, 4].map(index => (
            <>
              <StarPromoVideoV1Skaliton />
              <CardSkeleton key={index} />
            </>
          ))}
        </View>
      ) : (
        <>
          {/* <Text style={{ backgroundColor: 'black', color: 'red', width: 100, position: 'absolute', zIndex: 9 }}>{"=> length " + postData.length}</Text> */}

          <FlatList
            // onScroll={handleScroll}
            ref={flatListRef}
            initialScrollIndex={scrollIndex}
            keyExtractor={keyExtractor}
            onViewableItemsChanged={viewableItemsChangedHandler}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            data={postData}
            renderItem={({item, index}) => {
              return (
                <>
                  {index == 0 ? (
                    <>
                      <StarPromoVideoV1 />
                      <PostCartItem
                        key={item.id}
                        postConfig={{index, currentIndex, isMuted, setIsMuted}}
                        data={item}
                      />
                    </>
                  ) : (
                    <PostCartItem
                      key={item.id}
                      postConfig={{index, currentIndex, isMuted, setIsMuted}}
                      data={item}
                    />
                  )}
                </>
              );
            }}
            onEndReached={scrollToend}
            ListFooterComponent={() => (
              <>
                {!endPost ? (
                  <View style={{height: 400}}>
                    <CardSkeleton />
                  </View>
                ) : (
                  <View
                    style={{
                      height: 400,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={imagePath.noMorPost}
                      style={{height: 130, width: 150, marginTop: 10}}
                      resizeMode="contain"
                    />
                    <Text style={themeTextColor}>🙂 no more post yet !</Text>
                  </View>
                )}
              </>
            )}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                // refreshing={Refreshing}
                // onRefresh={onRefresh}
                colors={['#FFAD00']}
                progressBackgroundColor="black"
              />
            }
            onEndReachedThreshold={0.5}
          />
        </>
      )}
    </>
  );
};

export default PostCardContainer;

const styles = StyleSheet.create({});
