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

const CongratulationFanModal = ({show, setShow}) => {
  return (
    <Modal
      visible={show}
      transparent
      animation="slide"
      hardwareAccelerated
      onRequestClose={() => {
        setShow(false);
      }}>
      <View style={styles.centered_view}>
        <View style={styles.FanBlackSD}>

            <View style={styles.FanGModal}>
            <ImageBackground
            style={styles.LearnMoZ}
            source={imagePath.LeFAn}
            resizeMode="cover">
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
              </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style={{alignItems: 'center' ,marginBottom:20,}}>
            <Image
                source={imagePath.JoinCon}
                style={styles.LearnMoImgXC}
              />

              <Text style={styles.TextItemL}>23</Text>
              <Text style={styles.TextItemC}>46</Text>
              <Text style={styles.TextItemR}>90</Text>
          
              <Text style={styles.ColTextY}>Congratulations!!</Text>
              <Text style={styles.ColTextYS}>You earn 23 Diamond 40 gold and 56 silver</Text>

            
              <TouchableOpacity style={styles.ButtonNextAS}>
                  <Text style={styles.ButNextAXS}>Collect Wallet</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default CongratulationFanModal;
