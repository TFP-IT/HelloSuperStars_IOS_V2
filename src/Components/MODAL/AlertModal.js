//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import styles from './Styles';
import imagePath from '../../Constants/imagePath';
import Icon from 'react-native-vector-icons/FontAwesome';

const AlertModal = ({ modalObj, modal, setModal, buttoPress }) => {
  // const [modal, setModal] = React.useState(true);
  // const modalObj = {
  //   modalType : 'success',
  //   buttonTitle : 'Pay Now',
  //   message : 'You Registerd Successfully'
  // }
  return (
    <Modal
      visible={modal}
      transparent
      onRequestClose={() => setModal(false)}
      animationType="slide"
      hardwareAccelerated>
      <View style={styles.centered_view}>
        <View
          style={{
            borderColor: '#FFAD00',
            borderBottomWidth: 7,
            padding: 1,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <ImageBackground
            style={styles.warning_modal}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{ color: '#FFAD00', marginRight: 15, marginTop: 10 }}>
                <Icon name="close" size={20} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
              <Image
                source={
                  modalObj.modalType == 'success'
                    ? imagePath.congratulation
                    : imagePath.sorry
                }
                style={{ width: 200, height: 80 }}
              />
              <Text
                style={{ color: '#FFAD00', textAlign: 'center', fontSize: 25 }}>
                {modalObj.modalType == 'success'
                  ? 'Congratulation'
                  : modalObj.modalType == 'warning'
                    ? 'Opps...'
                    : modalObj.modalType == 'warningGreetings'
                      ? 'Sure?'
                      : modalObj.modalType == 'successGreetings'
                        ? 'Done'
                        : ''}
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  fontSize: 10,
                }}>
                {modalObj.message}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAD00',
                  width: '40%',
                  borderRadius: 4,
                }}
                onPress={buttoPress}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 8,
                    color: '#292929',
                  }}>
                  {modalObj.buttonTitle}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default AlertModal;
