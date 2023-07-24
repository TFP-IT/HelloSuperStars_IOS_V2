import React from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../../../Constants/imagePath';
import { styles } from './styles';

const PaymentSuccessfulModal = ({ successModal, setSuccessModal }) => {
  return (
    <Modal
      visible={successModal}
      transparent
      onRequestClose={() => setSuccessModal(false)}
      animation="slide"
      hardwareAccelerated>
      <View style={styles.centered_view}>
        <View
          style={{
            borderColor: '#FFAD00',
            borderWidth: 1,
            padding: 1,
          }}>
          <ImageBackground
            style={styles.warning_modal}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => setSuccessModal(false)}
                style={{ color: '#FFAD00', marginRight: 10 }}>
                <Icon name="close" size={30} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={imagePath.greetingsPaymentSuccess}
                // resizeMode="stretch"

                />
              </View>

              <Text
                style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                Payment Successful!
              </Text>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, marginTop: 10 }}>
                Transaction Number: 14569745221562
              </Text>
              <View style={{ borderWidth: 2, borderBottomColor: 'gray', margin: 10 }}>

              </View>
            </View>

            <View style={{ flexDirection: 'row', margin: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white' }}>Amount Pain: </Text>
                <Text style={{ color: 'white' }}>Bank: </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: 'white' }}>$260 </Text>
                <Text style={{ color: 'white' }}>Malta Bank Singapore </Text>
              </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 25 }}>
              <TouchableOpacity
                onPress={() => setSuccessModal(false)}
                style={{
                  backgroundColor: '#FFAD00',
                  width: '40%',
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    paddingVertical: 8,
                    color: '#292929',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentSuccessfulModal;
