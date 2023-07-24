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
const payment = true;

// create a component
const ApplyCertificateModal = ({modal, setModal, appeal, setAppeal}) => {
  // const [showWarning, SetshowWarning] = React.useState(false);
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
            borderWidth: 1,
            padding: 1,
            borderRadius: 3,
          }}>
          <ImageBackground
            style={styles.warning_modal}
            source={imagePath.background}
            resizeMode="cover">
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{color: '#FFAD00', marginRight: 10}}>
                <Icon name="close" size={30} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <Image source={payment ? imagePath.okModal : imagePath.sorry} />
              <Text
                style={{color: '#FFAD00', textAlign: 'center', fontSize: 30}}>
                {payment ? ' Payment Successfull' : 'Payment unsuccessfull'}
              </Text>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {payment
                  ? ' Transaction no: 123428725348297'
                  : 'Card or bank not availabe'}
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#FFAD00',
                borderBottomWidth: 1,
                margin: 8,
              }}
            />
            {payment ? (
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'white'}}>Ammount paid:</Text>
                  <Text style={{color: 'white', marginLeft: 5}}>$230</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'white'}}>Bank</Text>
                  <Text style={{color: 'white', marginLeft: 5}}>
                    Malta Bank Ltd.
                  </Text>
                </View>
              </View>
            ) : null}

            <View style={{alignItems: 'center', marginTop: 5}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAD00',
                  width: '40%',
                  borderRadius: 4,
                }}
                onPress={() => {
                  setModal(false);
                  setAppeal(true);
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

//make this component available to the app
export default ApplyCertificateModal;
