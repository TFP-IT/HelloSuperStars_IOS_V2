//import liraries
import React, { Component, useState } from 'react';
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
import ProductProcessModal from './ProductProcessModal';
import PaymentModal from './PaymentModal';
import RegisPaymentModal from './RegisPaymentModal';

// create a component
const BidCongratulationModal = ({ showModal, setShowModal, processModal, setProcessModal, RoundName, appeal, setAppeal }) => {
  const [isShowPaymentComp, setIsShowPaymentComp] = React.useState(false);




  const processBtn = () => {
    setShowModal(false)
    setModal(true)
    //  setProcessModal(true)
  }


  return (
    <>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}
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
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={{ color: '#FFAD00', marginRight: 10 }}>
                  <Icon name="close" size={30} color="#FFAD00" />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 30 }}>
                <Image
                  source={imagePath.congratulation}
                  style={{ width: 300, height: 150 }}
                />
                <Text
                  style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                  Congratulation
                </Text>
                {RoundName === 5 || RoundName === 6 || RoundName === 7 ? <Text style={{ color: 'white', textAlign: 'center' }}>
                  Apply For payment
                </Text> : <Text style={{ color: 'white', textAlign: 'center' }}>
                  Slot is available
                </Text>}

              </View>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFAD00',
                    width: '40%',
                    borderRadius: 4,
                  }}
                  onPress={() => {
                    setShowModal(false)
                    setIsShowPaymentComp(true)
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 8,
                      color: '#292929',
                    }}>
                    Pay now
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Modal>


      <RegisPaymentModal
        appeal={appeal}
        setAppeal={setAppeal}
        RoundName={RoundName}
        isShowPaymentComp={isShowPaymentComp}
        setIsShowPaymentComp={setIsShowPaymentComp}
      />


    </>
  );
};

//make this component available to the app
export default BidCongratulationModal;
