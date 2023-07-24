//import liraries
import React, {useContext} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../Constants/imagePath';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import {AuthContext} from '../../Constants/context';
import {useNavigation} from '@react-navigation/native';

const AppealRequestModal = ({show, setShow, appeal, setAppeal}) => {
  const Navigation = useNavigation();
  const handleDone = () => {
    setShow(false);
    Navigation.goBack();
  };

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
            source={imagePath.DeleteMZ}
            resizeMode="cover">
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
                <Icon name="close" size={15} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={imagePath.DeleteM} style={styles.LearnMoImgA} />
            </View>
            <View style={styles.FleXFoZ}>
              <Text style={styles.FleXFoZY}>
                Your Appeal Request Submitted.!
              </Text>
              <Text style={styles.FleXFoZYX}>
                We will notify you as soon as possible how to resubmit your
                content again.
              </Text>

              <TouchableOpacity onPress={() => handleDone()}>
                <Text style={styles.DoneS}>Done</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default AppealRequestModal;
