import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-player';
import noImage from '../../../Assets/Images/no-image.png';
import AlertModal from '../../../Components/MODAL/AlertModal';
import RenderHtmlComp from '../../../Components/GLOBAL/Reuseable/RenderHtmlComp';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp/LoaderComp';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import HeaderComp from '../../../Components/HeaderComp';
import { ScrollView } from 'react-native-gesture-handler';
import { androidCameraPermission } from '../../../../permission';
import NoDataComp from '../../../Components/NoDataComp';

const Souvenir = ({ route }) => {
  const { star } = route.params;
  const navigation = useNavigation();
  const [formImage, setFormImage] = useState({});
  const [document, setDocument] = useState(null);
  const [souvinerInfo, setSouvinerInfo] = useState(null);
  const { socketData, axiosConfig, currency, currencyCount } =
    useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modalStartFrom, setModalStartFrom] = useState('Default');
  const [buffer, setBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [pickerData, setPickerData] = useState({});
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  const [showPass, setShowPass] = useState(true);

  const fetchSouvenirInstruction = () => {
    setBuffer(true);
    axios
      .get(AppUrl.GetStarSouvenir + `${star?.id}`, axiosConfig)
      .then(res => {
        // console.log('res----------', res);
        if (res.data.status == 200) {
          setSouvinerInfo(res.data.getSouviner);
          console.log('res.data.getSouviner-----------', res.data.getSouviner);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const handelDollarTaxPrice = taxdoller => {
    return (Number(souvinerInfo?.price) * Number(taxdoller)) / 100;
  };
  const fetchAllCountryList = () => {
    axios
      .get(AppUrl.ViewCountry, axiosConfig)
      .then(res => {
        setBuffer(false);
        setAllCountry(res.data.data);
      })
      .catch(err => {
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };
  const fetchAllStateList = country => {
    axios
      .get(AppUrl.ViewState + country, axiosConfig)
      .then(res => {
        setBuffer(false);
        setAllState(res.data.state);
      })
      .catch(err => {
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });

        setModal(true);
      });
  };

  const fetchAllCityList = state => {
    axios
      .get(AppUrl.ViewCity + state, axiosConfig)
      .then(res => {
        console.log('res----------', res);
        setBuffer(false);
        setAllCity(res.data.city);
      })
      .catch(err => {
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };

  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);

    if (modalStartFrom === 'Default') {
    } else if (modalStartFrom === 'AfterStoreSouviner') {
      navigation.navigate('Home');
    }
  };

  const handleUpload = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        { text: 'Camera', onPress: pickFromCamera },
        { text: 'Gallery', onPress: pickFromLibrary },
        { text: 'Cancel', onPress: () => { } },
      ]);
    }
  };

  const pickFromCamera = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'image',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setDocument(response.assets[0].uri);
        setFormImage({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          // data: response.data
          data: response.assets[0].base64,
        });
        // console.log(document)
      }
    });
  };

  const pickFromLibrary = () => {
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
        setFormImage({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          // data: response.data
          data: response.assets[0].base64,
        });
        // console.log(document)
      }
    });
  };

  const onSubmit = data => {
    if (document == null || document == '' || document == undefined) {
      // newMessages.document = "Please choose a document";

      setModalObj({
        modalType: 'warning',
        buttonTitle: 'OK',
        message: 'Please Choose a photo',
      });
      setModal(true);
    }

    let aditionalData = {
      ...data,
      image: formImage,
      isRequestFromApp: true,
      souvinerId: souvinerInfo.id,
    };
    console.log('aditionalData-----------', aditionalData);
    axios
      .post(AppUrl.SouvenirStore + `${star?.id}`, aditionalData, axiosConfig)
      .then(res => {
        console.log('res---------', res);
        reset(data);
        setBuffer(false);
        if (res.data.status === 201) {
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'Ok',
            message: 'Passowrd Not Match',
            available: '',
          });
          setModal(true);
          setBuffer(false);
        }
        if (res.data.status === 200) {
          setModalObj({
            modalType: 'succcess',
            buttonTitle: 'Ok',
            message: res.data.message,
            available: '',
          });
          setModalStartFrom('AfterStoreSouviner');
          setModal(true);
          setBuffer(false);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchSouvenirInstruction();
    fetchAllCountryList();
    setPickerData({
      ...pickerData,
      // city: marketplaceOrder?.city_id,
      city: '',
      // state: marketplaceOrder?.state_id,
      state: '',
      // country: marketplaceOrder?.country_id,
      country: '',
    });
    // console.log('star-----Souvenir----', star);
  }, [star]);
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />

      {buffer ? (
        <LoaderComp />
      ) : souvinerInfo !== null ? (
        <ScrollView>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.MaiNAS}>
              <Text style={styles.Instruction}>Souvenir Instructions</Text>
            </View>
            <View style={styles.MaiNASr}>
              <RenderHtmlComp description={souvinerInfo?.description} />
              {souvinerInfo?.video !== null ? (
                <VideoPlayer
                  video={{ uri: `${AppUrl.MediaBaseUrl + souvinerInfo?.video}` }}
                  videoWidth={120}
                  videoHeight={80}
                  thumbnail={
                    souvinerInfo?.banner
                      ? {
                        uri: `${AppUrl.MediaBaseUrl + souvinerInfo?.banner}`,
                      }
                      : imagePath.videoPlayIcon
                  }
                  resizeMode={'stretch'}
                  autoplay={true}
                  pauseOnPress
                  hideControlsOnStart
                />
              ) : (
                <></>
              )}

              <Text style={styles.Bds}>Cost for the Souvenir:</Text>
            </View>
            <View
              style={{
                marginHorizontal: 8,
                marginTop: 3,
                marginBottom: 8,
                paddingVertical: 8,
                paddingLeft: 12,
                borderRightWidth: 1,
                borderBottomEndRadius: 15,
                borderBottomLeftRadius: 15,
                marginVertical: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.InstructionPrice}>Price:</Text>
                </View>
                <View>
                  <Text style={styles.InstructionPrice}>
                    {currencyCount(souvinerInfo?.price) + ' ' + currency.symbol}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.InstructionPrice}>Delivery Charge :</Text>
                </View>
                <View>
                  <Text style={styles.InstructionPrice}>
                    {currencyCount(souvinerInfo?.delivery_charge) +
                      ' ' +
                      currency.symbol}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.InstructionPrice}>Tax :</Text>
                </View>
                <View>
                  <Text style={styles.InstructionPrice}>
                    {currencyCount(handelDollarTaxPrice(souvinerInfo?.tax)) +
                      ' ' +
                      currency.symbol}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.InstructionPrice}>Total:</Text>
                </View>
                <View>
                  <Text style={styles.InstructionPrice}>
                    {Number(currencyCount(souvinerInfo?.price)) +
                      Number(
                        currencyCount(handelDollarTaxPrice(souvinerInfo?.tax)),
                      ) +
                      Number(currencyCount(souvinerInfo?.delivery_charge)) +
                      ' ' +
                      currency.symbol}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.MaiNAS}>
              <Text style={styles.InstructionV}>Apply</Text>
            </View>

            <View style={{ margin: 8 }}>
              <View style={styles.MaiNAppL}>
                <View style={styles.WinnerES}>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text
                      style={styles.ApplyR}
                      onPress={() => {
                        console.log(souvinerInfo);
                      }}>
                      Country
                    </Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                          dropdownIconColor="white"
                          mode="dialog"
                          style={styles.ApplyR}
                          selectedValue={pickerData.country}
                          onValueChange={(itemValue, itemIndex) => {
                            onChange(itemValue);
                            setPickerData({
                              ...pickerData,
                              country: itemValue,
                            });
                            fetchAllStateList(itemValue);
                          }}>
                          <Picker.Item label="Select Country" value={null} />
                          {allCountry.map(country => {
                            return (
                              <Picker.Item
                                key={country.id}
                                label={country.name}
                                value={country.id}
                              />
                            );
                          })}
                        </Picker>
                      )}
                      name="country_id"
                    />
                    {errors.country_id && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>State</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                          dropdownIconColor="white"
                          mode="dialog"
                          style={styles.ApplyR}
                          selectedValue={pickerData.state}
                          onValueChange={(itemValue, itemIndex) => {
                            onChange(itemValue);
                            setPickerData({
                              ...pickerData,
                              state: itemValue,
                            });
                            fetchAllCityList(itemValue);
                          }}>
                          <Picker.Item label="Select State" value={null} />
                          {allState.map(state => {
                            return (
                              <Picker.Item
                                key={state.id}
                                label={state.name}
                                value={state.id}
                              />
                            );
                          })}
                        </Picker>
                      )}
                      name="state_id"
                    />
                    {errors.state_id && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>City</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Picker
                          dropdownIconColor="white"
                          mode="dialog"
                          style={styles.ApplyR}
                          selectedValue={pickerData.city}
                          onValueChange={(itemValue, itemIndex) => {
                            onChange(itemValue);
                            setPickerData({
                              ...pickerData,
                              city: itemValue,
                            });
                          }}>
                          <Picker.Item label="Select City" value={null} />
                          {allCity.map(city => {
                            return (
                              <Picker.Item
                                key={city.id}
                                label={city.name}
                                value={city.id}
                              />
                            );
                          })}
                        </Picker>
                      )}
                      name="city_id"
                    />
                    {errors.city_id && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Name</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                          placeholderTextColor="#9e9e9e"
                          placeholder="Name"
                          style={styles.inputY}
                        />
                      )}
                      name="name"
                    />
                    {errors.name && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Mail</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Please enter a valid email',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                          placeholderTextColor="#9e9e9e"
                          placeholder="Mail Address"
                          style={styles.inputY}
                        />
                      )}
                      name="email"
                    />
                    {errors.email && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        {errors.email?.type === 'pattern'
                          ? 'Provide valid email'
                          : 'This field is required !'}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Phone</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                        pattern: {
                          value:
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message: 'Please enter a valid phone number',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                          placeholderTextColor="#9e9e9e"
                          placeholder="Phone Number"
                          keyboardType="numeric"
                          style={styles.inputY}
                        />
                      )}
                      name="mobile_no"
                    />
                    {errors.mobile_no && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        {errors.mobile_no?.type === 'pattern'
                          ? 'Provide valid phone number'
                          : 'This field is required !'}
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Address</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline
                          placeholderTextColor="#9e9e9e"
                          placeholder="Address"
                          style={styles.inputY}
                        />
                      )}
                      name="area"
                    />
                    {errors.area && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Short Description</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          multiline={true}
                          placeholderTextColor="#9e9e9e"
                          placeholder="Short Discription"
                          style={styles.inputY}
                          row="5"
                        />
                      )}
                      name="description"
                    />
                    {errors.description && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginHorizontal: 27,
                      marginVertical: 20,
                    }}>
                    {document ? (
                      <Image
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 100,
                          height: 100,
                          width: 100,
                        }}
                        source={{ uri: document }}
                      />
                    ) : (
                      <Image
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 100,
                          height: 100,
                          width: 100,
                        }}
                        source={noImage}
                      />
                    )}
                    <View>
                      <Text style={styles.ApplyR}>
                        Upload Your T-Shirt Photo
                      </Text>
                      <TouchableOpacity
                        style={styles.profileEditSection}
                        onPress={handleUpload}>
                        <Text
                          style={{
                            height: 38,
                            marginHorizontal: 27,
                            borderWidth: 0.5,
                            padding: 10,
                            fontSize: 13,
                            color: '#B6B6B6',
                            borderColor: 'gold',
                            borderRadius: 80,
                            width: 90,
                          }}>
                          <MaterialCommunityIcons
                            name="cloud-upload"
                            color={'#488BFF'}
                            size={15}
                          />{' '}
                          Upload{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.ApplyR}>Password</Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <TextInput
                            // onBlur={onBlur}
                            // onChangeText={onChange}
                            // value={value}
                            // multiline
                            // placeholderTextColor="#9e9e9e"
                            // type="password"
                            // placeholder="Enter password"
                            // style={styles.inputY}
                            // secureTextEntry={true}

                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholderTextColor="white"
                            type="password"
                            placeholder="Enter password"
                            style={styles.inputY}
                            // keyboardType="visible-password"
                            secureTextEntry={showPass}
                          />
                          <TouchableOpacity
                            style={{
                              marginTop: '-7%',
                              marginLeft: '85%',
                            }}
                            onPress={() => setShowPass(!showPass)}>
                            {showPass ? (
                              <Entypo
                                name="eye-with-line"
                                size={20}
                                color={'#ffaa00'}
                              />
                            ) : (
                              <Entypo name="eye" size={20} color={'#ffaa00'} />
                            )}
                          </TouchableOpacity>
                        </>
                      )}
                      name="password"
                    />
                    {errors.password && (
                      <Text
                        style={{
                          color: 'red',
                          marginLeft: 27,
                          marginBottom: -15,
                        }}>
                        This field is required !
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.ApplyBg}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#E19A04',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={styles.LinerBGAl}>
                  <Text style={styles.ApplyTextRe}>Apply</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <NoDataComp />
      )}
    </View>
  );
};

export default Souvenir;
