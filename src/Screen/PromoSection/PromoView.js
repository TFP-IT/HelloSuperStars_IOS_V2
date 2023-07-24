import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import PromoVideoSlide from '../../Components/HOME/PromoVideoSlider/PromoVideoSlide';

const PromoView = ({ route }) => {
  const { index, data } = route.params;
  //console.log('video data is ===> ',data)

  // const [videoData, setVideoData] = useState([
  //     {
  //         key: 0,
  //         title: 'Habib Wahid',

  //         illustration:
  //             'https://i.scdn.co/image/ab6761610000e5ebf0a1d189da0f9be0977123fe',
  //         proImage: "https://i1.sndcdn.com/artworks-RgyUz7GDrqqaKzTY-fnZkMQ-t500x500.jpg",
  //         videoURl: "http:///backend.hellosuperstars.com/assets/video/habib.mp4"
  //     },
  //     {
  //         key: 1,
  //         title: 'Momotaj',

  //         illustration:
  //             'https://i0.wp.com/i.imgur.com/av1k0l9.jpg?resize=618%2C462&ssl=1',
  //         proImage: "https://pbs.twimg.com/media/ET0MHtzUUAUKZGC.jpg",
  //         videoURl: "http:///backend.hellosuperstars.com/assets/video/momotaj.mp4"
  //     },
  //     {
  //         key: 2,
  //         title: 'Mahajib',

  //         illustration:
  //             'https://cdn.sharechat.com/mehjabinchowdhury_1e18298a_1628074025216_sc_cmprsd_40.jpg',
  //         proImage: "https://muchfeed.com/wp-content/uploads/2018/03/Mehazabien-Chowdhury-1.jpg",
  //         videoURl: "http:///backend.hellosuperstars.com/assets/video/mahajib.mp4"
  //     },
  //     {
  //         key: 3,
  //         title: 'Thasan',
  //         illustration: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Tahsan_Rahman_Khan_%2801%29.jpg',
  //         proImage: "https://pbs.twimg.com/media/ExvL-TLVoAQ8L3Q.jpg",
  //         videoURl: "http:///backend.hellosuperstars.com/assets/video/thasan.mp4"
  //     },

  // ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  //console.log('index is show promo ===>> ', index);
  useEffect(() => {
    setCurrentIndex(index);
  }, []);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <View
      style={{
        height: windowHight,
      }}>
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        index={currentIndex}
        data={data}
        renderItem={({ item, index }) => (
          <PromoVideoSlide
            item={item}
            index={index}
            currentIndex={currentIndex}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default PromoView;

const styles = StyleSheet.create({});
