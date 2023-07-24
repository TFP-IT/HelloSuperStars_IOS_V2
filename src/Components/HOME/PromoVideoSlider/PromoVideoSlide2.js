import { View, Text, FlatList } from 'react-native';
import React from 'react';
import PromoItemCard from './PromoItemCard';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const PromoVideoSlide2 = ({ data }) => {
  //console.log('data', data);
  const flatListRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (index < data.length - 1) {
      const timerId = setTimeout(() => {
        setIndex(prevIndex => prevIndex + 1);
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [index, data]);

  const renderItem = ({ item, index }) => {
    return <PromoItemCard item={item} index={index} />;
  };
  function onViewableItemsChanged({ viewableItems, changed }) {
    // setViewable(viewableItems);
  }
  const changeIndex = ({ index }) => {
    setCurrIndex(index);
  };

  return (
    <View>
      <SwiperFlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onChangeIndex={changeIndex}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}`}
        vertical={false}
        autoplay
        autoplayDelay={60}
        autoplayLoop
      />
    </View>
  );
};

export default PromoVideoSlide2;
