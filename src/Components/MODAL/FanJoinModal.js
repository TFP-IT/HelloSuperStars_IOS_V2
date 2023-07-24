import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';

import styles from './Styles';
import imagePath from '../../Constants/imagePath';

const FanJoinModal = ({joinNowShow, setJoinNowShow}) => {
  return (
    <Modal
      visible={joinNowShow}
      transparent
      animation="slide"
      hardwareAccelerated
      onRequestClose={() => {
        setJoinNowShow(false);
      }}>
      <View style={styles.centered_view}>
        <View style={styles.FanBlackS}>

            <View style={styles.FanGModal}>
            <ImageBackground
            style={styles.LearnMoZ}
            source={imagePath.LeFAn}
            resizeMode="cover">
              <TouchableOpacity
                onPress={() => setJoinNowShow(false)}
                style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
              </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={{alignItems: 'center' ,marginBottom:20,}}>
            <Image
                source={imagePath.Join}
                style={styles.LearnMoImgX}
              />
          
              <Text style={styles.ColTextY}>Are you sure to join Salman Khan group</Text>
              <Text style={styles.ColTextYS}>Be careful, once you select someone, you can't go back</Text>

            
              <TouchableOpacity style={styles.ButtonNextA}>
                  <Text style={styles.ButNextA}>Join Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonNextA}>
                  <Text style={styles.ButNextAC}>Go Back</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default FanJoinModal;