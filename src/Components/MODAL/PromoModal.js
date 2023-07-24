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
  ScrollView,
  Dimensions
} from 'react-native';
import styles from './Styles';
import imagePath from '../../Constants/imagePath';
import Icon from 'react-native-vector-icons/AntDesign';
import colorCode from '../../Constants/colorCode';
import { AuthContext } from '../../Constants/context';
import { useContext } from 'react';
import RenderHtml from 'react-native-render-html';


const PromoModal = ({ buttoPress }) => {
  const windowHeight = Dimensions.get('window').height;
  const { signInPromo, useInfo } = useContext(AuthContext);
  // const [modal, setModal] = React.useState(true);
  const [modal, setModal] = React.useState(signInPromo.status);
  const modalObj = {
    modalType: 'success',
    buttonTitle: 'OK',
    message: 'You Registerd Successfully'
  }
  // console.log("jfhkjsdhfjs____", currency?.eventText)

  const titleSource = {
    html: `<div style='color:#e6e6e6;font-size:17px; text-align: justify '>${signInPromo?.eventText?.message ? signInPromo?.eventText?.message : ''
      }</div>`,
  };
  const titleSource1 = {
    html: `<div style='color:#e6e6e6;font-size:17px; text-align: justify'>${signInPromo?.eventText?.message_ex ? signInPromo?.eventText?.message_ex : ''
      }</div>`,
  };






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
            borderRadius: 20,
            overflow: 'hidden',
            borderColor: colorCode.gold, borderWidth: 1

          }}>
          <ImageBackground
            style={{
              width: 350,
            }}
            source={imagePath.cardBg}
            resizeMode="stretch"
          >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 5 }}>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{ color: '#FFAD00', marginRight: 15, marginTop: 10, backgroundColor: colorCode.transparentBlack, height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: 'black', borderWidth: 1 }}>
                <Icon name="close" size={20} color="#FFAD00" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10 }}>

              <Text style={{ fontSize: 22, marginBottom: 10, paddingHorizontal: 10 }}>
                <Icon name="checkcircle" color={colorCode.gold} size={20} />
                <Text style={{ marginLeft: 7, color: colorCode.gold, fontSize: 20 }}> অভিনন্দন। Congratulations </Text>
              </Text>
              <ScrollView style={{ maxHeight: windowHeight - 400, backgroundColor: colorCode.transparentBlack, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 }}>

                <View style={{ fontSize: 17, color: colorCode.whiteText, textAlign: 'justify' }}>
                  <RenderHtml contentWidth={"100%"} source={titleSource} />

                  <Text style={{ color: colorCode.gold, fontSize: 17 }}>
                    (HSS{useInfo?.phone})
                  </Text>

                  <RenderHtml contentWidth={"100%"} source={titleSource1} />
                </View>
              </ScrollView>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 8,
                marginBottom: 10
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFAD00',
                  width: '40%',
                  borderRadius: 4,
                }}
                onPress={() => setModal(false)}>
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
export default PromoModal;
