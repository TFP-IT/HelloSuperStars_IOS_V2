//import liraries
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import AppUrl from '../../../../../../RestApi/AppUrl';
import {AuthContext} from '../../../../../../Constants/context';
import {useContext} from 'react';

// create a component
const EditProfileModal = ({editProfile, setEditProfile}) => {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {axiosConfig, authContext} = useContext(AuthContext);
  const [buffer, setBuffer] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formImage, setFormImage] = useState({});
  const [document, setDocument] = useState(null);
  const [updateData, setUpdateData] = useState({
    occupation: '',
    edu: '',
    birthday: '',
    country: '',
    img: {},
  });

  // console.log(updateData)

  const handelSkip = () => {
    Navigation.navigate('category');
  };
  //
  const hendalSubmitInformation = () => {
    setBuffer(true);
    axios
      .post(AppUrl.SignUpInforUpdate, updateData, axiosConfig)
      .then(res => {
        //console.log(res.data);
        if (res.data.status == 200) {
          // authContext.userInfoUpate(res.data.userInfo);
          setBuffer(false);
          setEditProfile(false);
        } else {
          setBuffer(false);
          Toast.show(res.data.message, Toast.durations.SHORT);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  //chose photo
  const chosePhoto = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setDocument(response.assets[0].uri);
        // setFormImage(response.assets[0].base64)
        setUpdateData({
          ...updateData,
          img: {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            // data: response.data
            data: response.assets[0].base64,
          },
        });
      }
    });
  };

  return (
    <>
      <Modal
        visible={editProfile}
        transparent
        onRequestClose={() => setEditProfile(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <Animatable.View
              style={
                windowWidth > 600 ? styles.footerWithScreen : styles.footer
              }
              animation="slideInUp">
              <View
                style={{
                  padding: 10,
                  borderWidth: 1,

                  borderRadius: 15,
                }}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Pressable onPress={() => setEditProfile(false)}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',

                        fontSize: 20,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginTop: 5,
                      }}>
                      X
                    </Text>
                  </Pressable>
                </View>
                <Text style={styles.inputText}>Occupation</Text>
                <View style={styles.input}>
                  <Picker
                    dropdownIconColor="white"
                    mode="dialog"
                    style={styles.input_title}
                    selectedValue={updateData.occupation}
                    onValueChange={(itemValue, itemIndex) =>
                      setUpdateData({
                        ...updateData,
                        occupation: itemValue,
                      })
                    }>
                    <Picker.Item label="Select Occupation" value="null" />
                    <Picker.Item label="Teacher" value="Teacher" />
                    <Picker.Item label="Doctor" value="Doctor" />
                    <Picker.Item label="Engineer" value="Engineer" />
                    <Picker.Item label="Farmer" value="Farmer" />
                    <Picker.Item label="House wife" value="House wife" />
                    <Picker.Item label="Private Job" value="Private Job" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                {/* Name input  */}
                <Text style={styles.inputText}>Education Level</Text>
                <View style={styles.input}>
                  <Picker
                    dropdownIconColor="white"
                    mode="dialog"
                    style={styles.input_title}
                    selectedValue={updateData.edu}
                    onValueChange={(itemValue, itemIndex) =>
                      setUpdateData({
                        ...updateData,
                        edu: itemValue,
                      })
                    }>
                    <Picker.Item label="Select Education Level" value="null" />
                    <Picker.Item label="PSC" value="PSC" />
                    <Picker.Item label="JSC" value="JSC" />
                    <Picker.Item label="SSC/A Level" value="SSC/A Level" />
                    <Picker.Item label="HSC/O Level" value="HSC/O Level" />
                    <Picker.Item label="Honours" value="Honours" />
                    <Picker.Item label="Masters" value="Masters" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                {/* email input  */}
                <Text style={styles.inputText}>Birthday </Text>
                <TouchableOpacity
                  style={styles.input_textInput}
                  onPress={() => setOpen(true)}>
                  <Text style={{color: '#ffffff'}}>
                    {moment(date).format('YYYY-MM-DD')}
                  </Text>
                  <AntDesign name={'calendar'} size={20} color={'#ddd'} />
                </TouchableOpacity>

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  theme="light"
                  onConfirm={date => {
                    setOpen(false);
                    setUpdateData({
                      ...updateData,
                      birthday: date,
                    });
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />

                <Text style={styles.inputText}>Country</Text>
                <View style={styles.input}>
                  <Picker
                    dropdownIconColor="white"
                    mode="dialog"
                    style={styles.input_title}
                    selectedValue={updateData.country}
                    onValueChange={(itemValue, itemIndex) =>
                      setUpdateData({
                        ...updateData,
                        country: itemValue,
                      })
                    }>
                    <Picker.Item label="Select Country" value="null" />
                    <Picker.Item label="BanglaDesh" value="BanglaDesh" />
                    <Picker.Item label="India" value="india" />
                    <Picker.Item label="Malaysia" value="Malaysia" />
                    <Picker.Item label="Kuwait" value="Kuwait" />
                    <Picker.Item label="UAE" value="UAE" />
                    <Picker.Item label="Bahrain" value="Bahrain" />
                  </Picker>
                </View>

                {/* button */}

                <View style={styles.btn_container}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#ffa825', '#ffce48', '#ab6616']}
                    style={styles.login_btn}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={hendalSubmitInformation}>
                      <Text style={styles.updateTxt}>UPDATE</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </Animatable.View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    marginTop: 5,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 360,
    // height: 500,
    backgroundColor: '#000',
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
  input: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#D4AF37',
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 10,
    color: '#ffffff',
  },
  input_textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    height: 40,
    borderColor: '#D4AF37',
    borderRadius: 50,

    marginTop: 10,
    color: '#ffffff',
  },

  input_title: {
    color: '#ddd',
  },
  updateTxt: {
    width: 150,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#D4AF37',
  },

  // header: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // footer: {
  //   flex: 4,
  //   backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   paddingVertical: 40,
  //   paddingHorizontal: 30,
  // },
  // footerWithScreen: {
  //   flex: 4,
  //   backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   paddingVertical: 40,
  //   paddingHorizontal: 30,
  //   marginHorizontal: 200,
  // },

  // title: {
  //   color: '#D4AF37',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  // },

  btn_container: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'center',
  },

  login_btn: {
    backgroundColor: '#D4AF37',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    color: 'black',
  },

  // sign_btn: {
  //   borderWidth: 1,
  //   borderColor: '#D4AF37',
  //   borderRadius: 50,
  //   paddingHorizontal: 55,
  //   paddingVertical: 10,
  //   borderRadius: 50,
  //   alignItems: 'center',
  //   marginTop: 30,

  //   color: 'black',
  // },
});

//make this component available to the app
export default EditProfileModal;
