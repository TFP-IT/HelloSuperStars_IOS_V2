//import liraries
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';

import styles from './Styles';
import imagePath from '../../Constants/imagePath';
import Icon from 'react-native-vector-icons/FontAwesome';

const LearnModal = ({show, setShow}) => {
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
        <View>
          <ImageBackground
            style={styles.LearnMo}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
                <Icon name="close" size={15} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={imagePath.ImgModalLearn}
                style={styles.LearnMoImg}
              />
            </View>
            <View style={styles.FleXFo}>
              <Image
                source={imagePath.ImgRemainTime}
                style={styles.LearnMoImgTime}
              />
              
              <View style={styles.LearnFo}>
                <View>
                  <Text style={{color: 'white'}}>Remaining Time</Text>
                  <Text style={{color: '#FFAD00', fontSize: 20}}>5.00 PM</Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <Text style={styles.JoinMo}>Join Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default LearnModal;
