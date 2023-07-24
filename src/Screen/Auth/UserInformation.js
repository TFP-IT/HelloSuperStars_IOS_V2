//import liraries
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
// import {launchImageLibrary} from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { androidCameraPermission } from '../../../permission';
import LoaderComp from '../../Components/LoaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { useAxiosGet } from '../../CustomHooks/useAxiosGet';

// create a component
const UserInformation = () => {
  const Navigation = useNavigation();
  const { axiosConfig, authContext } = useContext(AuthContext);
  const [buffer, setBuffer] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [formImage, setFormImage] = useState({});
  const [document, setDocument] = useState('');
  const [updateData, setUpdateData] = useState({
    occupation: null,
    edu: null,
    birthday: new Date(),
    country: null,
    img: null,
  });

  // console.log(updateData)

  const { resData } = useAxiosGet(AppUrl.infoUpdateInforamtion);
  const { country, educationlevel, occupation } = resData;
  console.log(resData);

  const handelSkip = () => {
    Navigation.navigate('category');
  };
  //
  const hendalSubmitInformation = () => {
    setBuffer(true);
    axios
      .post(AppUrl.SignUpInforUpdate, updateData, axiosConfig)
      .then(res => {
        //console.log(res.data.userInfo);
        if (res.data.status == 200) {
          console.log('user infor update page', res.data.userInfo);
          authContext.userInfoUpate(res.data.userInfo);
          setBuffer(false);
          Navigation.navigate('category');
        } else {
          Toast.show(res.data.message, Toast.durations.SHORT);
          setBuffer(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        { text: 'Camera', onPress: onCamera },
        { text: 'Gallery', onPress: onGallery },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      RNFS.readFile(image.path, 'base64').then(res => {
        setUpdateData({
          ...updateData,
          img: {
            type: 'image/jpg',
            data: res,
          },
        });
        setDocument(image.path);
      });
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('selected Image', image.path);

      RNFS.readFile(image.path, 'base64').then(res => {
        setUpdateData({
          ...updateData,
          img: {
            type: 'image/jpg',
            data: res,
          },
        });
        setDocument(image.path);
      });
    });
  };

  //chose photo
  // const chosePhoto = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'image',
  //     },
  //     includeBase64: true,
  //   };
  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       setDocument(response.assets[0].uri);
  //       // setFormImage(response.assets[0].base64)
  //       setUpdateData({
  //         ...updateData,
  //         img: {
  //           uri: response.assets[0].uri,
  //           type: response.assets[0].type,
  //           name: response.assets[0].fileName,
  //           // data: response.data
  //           data: response.assets[0].base64,
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <KeyboardAwareScrollView>
      {buffer ? <LoaderComp /> : <></>}
      <>
        <ScrollView>
          <ImageBackground
            style={styles.container}
            source={imagePath.background}
            resizeMode="cover">
            <Animatable.View
              style={
                windowWidth > 600 ? styles.footerWithScreen : styles.footer
              }
              animation="slideInUp">
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={onSelectImage}>
                  <View style={{ marginTop: 50 }}>
                    {document ? (
                      <Image
                        source={{ uri: document }}
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: 100,
                          borderWidth: 10,
                          overflow: 'hidden',
                          borderWidth: 3,
                          borderColor: '#ffaa00',
                        }}
                      />
                    ) : (
                      <Image
                        source={imagePath.defultCamera}
                        style={{
                          height: 150,
                          width: 150,
                          borderRadius: 100,
                          borderWidth: 10,
                          overflow: 'hidden',
                        }}
                      />
                    )}
                  </View>

                  {/* <Icon name="pencil" color={'white'} style={{ position: 'absolute', zIndex: 9, marginTop: '48%', marginLeft: '4%' }} size={32} /> */}
                </TouchableOpacity>
              </View>

              {/* Name input  */}
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
                  <Picker.Item label="Slect Country" value="null" />
                  {country &&
                    country.map((item, index) => (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={index}
                      />
                    ))}
                </Picker>
              </View>

              {/* Name input  */}
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
                  {occupation &&
                    occupation.map((item, index) => (
                      <Picker.Item label={item.title} value={item.title} />
                    ))}
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
                  <Picker.Item label="Slect Education Level" value="null" />
                  {educationlevel &&
                    educationlevel.map((item, index) => (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={index}
                      />
                    ))}
                </Picker>
              </View>
              {/* email input  */}
              <Text style={styles.inputText}>Birthday </Text>
              <TouchableOpacity
                style={styles.input_textInput}
                onPress={() => setOpen(true)}>
                <Text style={{ color: '#ffffff' }}>
                  {moment(updateData?.birthday).format('YYYY-MM-DD')}
                </Text>
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
              {/* <Text style={styles.inputText}>Country</Text>
                            <View >
                                <TextInput
                                    // placeholderTextColor="#ffffff"
                                    placeholder='Bangladesh'
                                    style={styles.input_textInput}
                                    onChangeText={text => setUpdateData({
                                        ...updateData,
                                        country: text,
                                    })}
                                />



                            </View> */}

              {/* button */}
              <View style={styles.btn_container}>
                <TouchableOpacity onPress={hendalSubmitInformation}>
                  <LinearGradient
                    style={styles.login_btn}
                    colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                    <Text style={{ color: 'black' }}>UPDATE PROFILE</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sign_btn} onPress={handelSkip}>
                  <Text style={styles.input_title}>SKIP</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </ImageBackground>
        </ScrollView>
      </>
    </KeyboardAwareScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderColor: 'red',
    height: 809,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingLeft: 20,
    marginTop: 10,
    color: '#ffffff',
  },
  input_textInput: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingLeft: 35,
    marginTop: 10,
    color: '#ffffff',
  },

  input_title: {
    color: '#ffff',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#ffaa00',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  footerWithScreen: {
    flex: 4,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginHorizontal: 200,
  },

  title: {
    color: '#ffaa00',
    fontSize: 30,
    fontWeight: 'bold',
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },

  login_btn: {
    backgroundColor: '#ffaa00',
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },

  sign_btn: {
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },
});

//make this component available to the app
export default UserInformation;
