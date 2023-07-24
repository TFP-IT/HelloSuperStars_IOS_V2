//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Styles';
import Cross from '../../Assets/Icons/cross.png';
import {ScrollView} from 'react-native';
// create a component
const ProductProcessModal = ({
  instruction,
  processModal,
  setProcessModal,
  setData,
  setIsShowPaymentComp = null,
}) => {
  const {width} = useWindowDimensions();
  const source = {
    html: `<div style='color:#FFAD00'>${
      instruction ? instruction?.acquired_instruction : ''
    }</div>`,
  };
  const requestCloseModal = () => {
    setProcessModal(false);
  };
  const handleContinueButton = () => {
    setProcessModal(false);
    setIsShowPaymentComp(true);
  };
  useEffect(() => {}, []);

  return (
    <Modal
      visible={processModal}
      transparent
      onRequestClose={requestCloseModal}
      animationType="slide"
      hardwareAccelerated>
      <View style={[styles.centered_view]}>
        <View
          style={{
            borderColor: '#FFAD00',
            borderWidth: 1,
            padding: 1,
            borderRadius: 3,
            backgroundColor: '#282828',
          }}>
          <View style={[styles.warning_modalBid]}>
            <View>
              <Text style={styles.ModText}>Acquire Product Process</Text>
            </View>
            <TouchableOpacity
              style={styles.InlineImg}
              onPress={() => setProcessModal(false)}>
              <Image source={Cross} />
            </TouchableOpacity>

            <View style={styles.Inline}></View>

            <ScrollView style={{marginTop: 20}}>
              <View style={{width: '100%'}}>
                <RenderHtml contentWidth={width} source={source} />
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              bottom: 20,
            }}>
            <TouchableOpacity onPress={() => setProcessModal(false)}>
              <View style={styles.Mbtn}>
                <Text style={styles.TbtnS}> Cancel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleContinueButton}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  '#FFAD00',
                  '#FFD273',
                  '#E19A04',
                  '#FACF75',
                  '#E7A725',
                  '#FFAD00',
                ]}
                style={styles.Mbtn}>
                <Text style={styles.TbtnSS}> Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default ProductProcessModal;
