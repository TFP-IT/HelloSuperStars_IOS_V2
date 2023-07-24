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
import Icon from 'react-native-vector-icons/FontAwesome'

// create a component
const SuccessModal = ({ modal, setModal, buttoPress, showModal, setShowModal }) => {
  // const [modal, setModal] = React.useState(true);

  const modalClose = () => {
    setModal(false)
    setShowModal(false)
  }
  const requestCloseModal = () => {
    setModal(false)
    setShowModal(false)
  }

  return (
    <Modal
      visible={modal}
      transparent
      onRequestClose={requestCloseModal}
      animationType="slide"
      hardwareAccelerated>
      <View style={styles.centered_view}>
        <View
          style={{
            borderColor: '#FFAD00',
            borderWidth: 1,
            padding: 1,
            borderRadius: 3,
          }}>
          <ImageBackground
            style={styles.warning_modal}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={modalClose} style={{ color: '#FFAD00', marginRight: 10 }}><Icon name="close" size={30} color="#FFAD00" /></TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              <Image source={imagePath.congratulation} style={{ width: 300, height: 150 }} />
              <Text
                style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                Congratulation
              </Text>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Slot is available
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAD00',
                  width: '40%',
                  borderRadius: 4,
                }}
                onPress={buttoPress}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 8,
                    color: '#292929'
                  }}>
                  Apply now
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
export default SuccessModal;
