//import liraries
import React, { useState } from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';
import imagePath from '../../Constants/imagePath';
import styles from './Styles';

const FanGModal = ({ show, setShow, joinNowShow, setJoinNowShow }) => {
  const data = [
    {
      label: 'Shahrukh Khan Team',
    },
    {
      label: 'Salman Khan Team',
    },
  ];

  const [checked, setChecked] = useState('');

  const joinNow = () => {
    setShow(false);
    setJoinNowShow(true);
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
        <View style={styles.FanBlack}>
          <View style={styles.FanGModal}>
            <ImageBackground
              style={styles.LearnMoZ}
              source={imagePath.LeFAn}
              resizeMode="cover">
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={{
                  color: '#FFAD00',
                  marginRight: 10,
                  padding: 10,
                }}></TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.ColText}>Select your favorite group</Text>

            <View style={styles.ButtonBlue}>
              <LinearGradient
                style={{ flexDirection: 'row' }}
                colors={['#00A791', '#00A780', '#00A780']}>
                {/* <RadioButtonRN
                  data={data}
                  selectedBtn={e => console.log(e)}
                  icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
                /> */}
                <RadioButton
                  value={checked}
                  label="Carto Base MAp"
                  status={
                    checked === 'Sahrukh Khan Team' ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setChecked('Sahrukh Khan Team');
                  }}
                />
                <Text style={styles.ButText}>Shahrukh Khan Team</Text>
              </LinearGradient>
            </View>

            <View style={styles.ButtonBlue}>
              <LinearGradient
                style={{ flexDirection: 'row' }}
                colors={['#FE00C0', '#FE00F4', '#DE00F4']}>
                <RadioButton
                  value={checked}
                  label="Carto Base MAp"
                  status={
                    checked === 'Salman Khan Team' ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setChecked('Salman Khan Team');
                  }}
                />
                <Text style={styles.ButText}>Salman Khan Team</Text>
              </LinearGradient>
            </View>

            <TouchableOpacity
              onPress={() => joinNow()}
              style={styles.ButtonNext}>
              <Text style={styles.ButNext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FanGModal;
