/* eslint-disable react-native/no-inline-styles */

import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {AuthContext} from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './Styles';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import PromoItemV1 from './PromoItemV1';

const StarPromoVideoV1Skaliton = props => {
  const {axiosConfig} = useContext(AuthContext);
  const [promoVideos, setPromoVideos] = useState([1, 2, 3]);
  const {themeCardColor, themeTextColor} = useThemeColor();
  const [isMuted, setIsMuted] = useState(true);
  const flatListRef = useRef(null);
  const [buffer, setBuffer] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [viewableItemsChangedHandler, setViewableItemsChangedHandler] =
    useState(() => ({viewableItems}) => {
      if (viewableItems.length > 0) {
        // console.log(viewableItems[0].index)
        setCurrentIndex(viewableItems[0].index);
      }
    });

  useEffect(() => {
    getAllPromoVideo();
  }, []);

  const getAllPromoVideo = async () => {
    try {
      let allPromoVideo = await axios.get(AppUrl.GetPromoVideos, axiosConfig);
      console.log('promo video', allPromoVideo.data.promoVideos);
      allPromoVideo?.data?.status === 200 &&
        setPromoVideos(allPromoVideo?.data?.promoVideos);
      setBuffer(false);
    } catch (error) {
      setBuffer(false);
      console.log('promo video error', error.message);
    }
  };

  const promoSkaliton = () => {
    return (
      <View style={[styles.item, {marginHorizontal: 5}]}>
        <SkeletonPlaceholder backgroundColor="#2e2e2e" highlightColor="#3d3d3d">
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <View
              style={{
                width: '100%',
                alignItems: 'flex-end',
                paddingRight: 8,
                paddingTop: 8,
              }}>
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={50}
              />
            </View>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  };

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  const renderItem = ({item, index}) => {
    return (
      <PromoItemV1
        item={item}
        index={index}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        currentIndex={currentIndex}
        scrollToIndex={scrollToIndex}
        setCurrentIndex={setCurrentIndex}
        totalVideoLength={promoVideos.length}
      />
    );
  };
  const ITEM_WIDTH = 100;
  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: '#343434',
          paddingVertical: 8,
          paddingHorizontal: 5,
          marginTop: 4,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          marginHorizontal: 0,
          marginBottom: 9,
        },
        themeCardColor,
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        showPagination
        onViewableItemsChanged={viewableItemsChangedHandler}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        vertical={false}
        horizontal
        autoplayDelay={60}
        autoplayLoop
        keyExtractor={(item, index) => index.toString()}
        data={promoVideos}
        renderItem={buffer ? promoSkaliton : renderItem}
      />
    </View>
  );
};

export default StarPromoVideoV1Skaliton;
