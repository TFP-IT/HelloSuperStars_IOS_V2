//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../Constants/imagePath';
import HeaderComp from '../HeaderComp';
import BidCongratulationModal from '../Modal/BidCongratulationModal';

const LearningApply = ({show, setShow}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDone = () => {
    setShowModal(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderComp />
        <View style={styles.centered_view}>
          <View>
            <ImageBackground
              style={styles.LearnMo}
              source={imagePath.DeleteMZ}
              resizeMode="cover">
              {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => setShow(false)}
                  style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
                  <Icon name="close" size={15} color="#FFAD00" />
                </TouchableOpacity>
              </View> */}

              <View style={styles.LearningApply}>
                <View style={{marginVertical: 10}}>
                  <TextInput
                    placeholder="Enter your name..."
                    placeholderTextColor={'white'}
                    style={{
                      borderWidth: 1,
                      borderColor: '#FFAD00',
                      borderRadius: 15,
                      paddingLeft: 10,
                    }}
                  />
                </View>
                <View style={{marginVertical: 10}}>
                  <TextInput
                    placeholder=" Father name..."
                    placeholderTextColor={'white'}
                    style={{
                      borderWidth: 1,
                      borderColor: '#FFAD00',
                      borderRadius: 15,
                      paddingLeft: 10,
                    }}
                  />
                </View>

                <View style={{marginVertical: 10}}>
                  <TextInput
                    placeholder="Password..."
                    placeholderTextColor={'white'}
                    style={{
                      borderWidth: 1,
                      borderColor: '#FFAD00',
                      borderRadius: 15,
                      paddingLeft: 10,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.DoneS}
                  onPress={() => handleDone()}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>

      <BidCongratulationModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
  },
  lineImgView: {
    alignItems: 'center',
  },
  lineImg: {
    marginVertical: 3,
  },
  bannerRow: {alignItems: 'center', position: 'relative', paddingBottom: 15},
  imgRow: {marginVertical: 2, width: '90%'},
  imgRow2: {marginVertical: 2, position: 'absolute', top: '45%', left: '50%'},
  infoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: 'red',
  },
  infoViewSize: {
    color: 'white',
    width: '30%',
  },
  infoViewSize2: {
    color: 'white',
    width: '60%',
  },
  fontInstruction: {
    color: 'white',
    marginLeft: 13,
    marginBottom: 15,
  },
  formText: {
    color: 'white',
    marginLeft: 13,
    marginBottom: 5,
  },
  formText2: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: '#e6e7e8',
    paddingLeft: 10,
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: 'white',
  },
  textInputView: {
    alignItems: 'center',
    marginVertical: 5,
  },
  textInputView3: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#FFAD00',
    width: '35%',
    borderRadius: 5,
  },

  textInputPass: {
    textAlign: 'center',
    paddingVertical: 4,
    fontWeight: 'bold',
  },

  //modal work start here
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  centered_view: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  centered_viewE: {
    backgroundColor: 'black',
  },
  warning_modal: {
    width: 300,
    height: 380,
    backgroundColor: 'coral',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  // Laren Modal

  LearnMo: {
    width: 370,
    marginVertical: 15,
    backgroundColor: 'black',

    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },

  LearnModalImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LearnMoImg: {
    width: 120,
    height: 80,
  },
  LearnMoImgX: {
    width: 130,
    height: 130,
  },
  LearnMoImgXC: {
    width: 220,
    height: 155,
    marginTop: 10,
    position: 'relative',
    marginBottom: 20,
  },

  ColTextY: {
    color: 'white',
    width: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },

  ColTextYS: {
    color: 'white',
    width: '70%',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
  },

  FleXFo: {
    flexDirection: 'row',
    padding: 15,
    marginTop: 20,
  },
  LearnMoImgTime: {
    width: 50,
    height: 50,
  },
  LearnFo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  JoinMo: {
    backgroundColor: '#FFB138',
    paddingHorizontal: 20,
    marginLeft: 60,
    marginTop: 18,
    borderRadius: 5,
  },

  // Appeal Request

  FleXFoZ: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },

  customModal: {
    margin: 20,
  },

  FleXFoZY: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    marginTop: 10,
    fontSize: 20,
  },

  FleXFoZYX: {
    textAlign: 'center',
    color: 'white',
    width: '70%',
  },
  LearnMoImgA: {
    width: 70,
    height: 70,
  },

  DoneS: {
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#FFAD00',
    height: 45,
  },

  AuInput: {
    margin: 8,
  },

  AuIA: {
    color: 'white',
    marginLeft: 8,
  },

  AuInputA: {
    margin: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#6AFFF6',
    paddingVertical: 2,
    borderRadius: 5,
    color: 'white',
  },
  DoneZS: {
    color: 'black',
    margin: 8,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 5,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: '#6AFFF6',
    marginBottom: 15,
  },

  AuInputFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },

  AuInputAX: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#6AFFF6',
    paddingVertical: 2,
    borderRadius: 5,
    color: 'white',
  },
  AuIAWX: {
    width: '42%',
  },
  AuIAW: {
    color: 'white',
    marginBottom: 8,
  },

  //   FanGModal
  FanBlack: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gold',
    width: '70%',
  },
  FanBlackS: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gold',
    width: '71.3%',
  },
  FanBlackSD: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'gold',
    width: '80%',
  },

  LearnMoZ: {
    width: 130,
    position: 'relative',
    height: 42,
  },

  FanGModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  ButtonBlue: {
    width: '70%',
    marginVertical: 8,
    textAlign: 'center',
  },

  ButText: {
    padding: 8,
    paddingTop: 7.8,
    fontSize: 15,
    color: 'white',
    paddingVertical: 3,
  },

  ColText: {
    color: 'white',
    paddingVertical: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },

  ButtonNext: {
    width: '30%',
    borderWidth: 1,
    borderColor: 'gold',
    marginVertical: 20,
    borderRadius: 5,
  },
  ButNext: {
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
  },

  ButtonNextA: {
    width: '30%',
    borderWidth: 1,
    borderColor: 'gold',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
  },

  ButNextA: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
    backgroundColor: 'gold',
  },
  ButNextAXS: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 15,
    backgroundColor: 'gold',
    borderRadius: 5,
    marginBottom: 25,
    marginTop: 10,
  },
  ButNextAC: {
    color: 'gold',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
  },

  TextItemL: {
    color: 'black',
    position: 'absolute',
    top: '4.5%',
    fontWeight: 'bold',
    fontSize: 20,
    left: '34.5%',
  },
  TextItemC: {
    color: 'black',
    position: 'absolute',
    top: '27%',
    fontWeight: 'bold',
    fontSize: 20,
    left: '46.5%',
  },

  TextItemR: {
    color: 'black',
    position: 'absolute',
    top: '4.5%',
    fontWeight: 'bold',
    fontSize: 20,
    right: '35.9%',
  },

  warning_modalBid: {
    width: 300,
    position: 'relative',
    height: 330,
    marginBottom: 20,
  },
  ModText: {
    color: '#FFAD00',
    fontSize: 17,
    paddingVertical: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Inline: {
    height: 1,

    backgroundColor: 'black',
  },
  InlineImg: {
    position: 'absolute',
    right: 4,
    top: 5,
  },
  TextSh: {
    color: '#FFAD00',
    fontSize: 15,
  },
  Mbtn: {
    backgroundColor: '#666666',
    paddingVertical: 8,
    borderRadius: 15,
    width: 100,
  },
  TbtnS: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  TbtnSS: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Thjdf
});

export default LearningApply;
