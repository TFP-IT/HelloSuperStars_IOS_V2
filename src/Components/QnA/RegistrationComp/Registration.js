import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import {LinearTextGradient} from 'react-native-text-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import { useZeroCostPayment } from '../../../CustomHooks/useZeroCostPayment';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp';
import AlertModal from '../../MODAL/AlertModal';
import styles from './Styles';

const RegistrationComp = ({
  takeTime = null,
  post = null,
  event_type = null,
  fee = null,
  start_time = null,
  end_time = null,
  eventId,
  modelName,
  passChildData,
  setParentData,
}) => {
  // console.log('RegistrationComp------eventId------', eventId);
  // console.log('RegistrationComp------modelName------', event_type);
  // console.log('RegistrationComp------setParentData------', setParentData);
  // console.log('RegistrationComp------passChildData------', passChildData);

  const [buffer, setBuffer] = useState(false);
  const [forParentIsShowPaymentModal, setForParentIsShowPaymentModal] =
    useState(false);
  const { axiosConfig, currency, currencyMulti, currencyCount } =
    useContext(AuthContext);
  const { useInfo } = useContext(AuthContext);
  // console.log('last name=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', useInfo?.last_name);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [registered, setRegistered] = useState();


  const registerData = {
    quantity: takeTime,
    event_id: eventId,
    model_name: event_type,
    fee: fee,
    start_time: 0,
    end_time: 0,
    payment_method: "Free-Registaion",
  }
  const { freeRegistration, freeRegBuffer, setFreeRegBuffer } = useZeroCostPayment(registerData)

  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const data = {
    password: password,
    model_name: modelName,
    event_id: eventId,
  };

  const handlePress = () => {
    if (password == null || password == '') {
      setErrorMessage('Please enter your password');
    } else if (fee == 0) {
      setFreeRegBuffer(true)
      freeRegistration()
    } else {
      // let aditionalData = {
      //   ...data,
      //   'take_time': takeTime,
      // }

      setErrorMessage('');
      setBuffer(true);
      if (modelName === 'GreetingsRegistration') {
        axios
          .post(AppUrl.VerifyUser, data, axiosConfig)
          .then(res => {
            if (res.data.status === 401) {
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'OK',
                message: res.data.message ? res.data.message : '',
              });
              setModal(true);
              setBuffer(false);
            } else if (res.data.status === 200) {
              setBuffer(false);
              setModalObj({
                modalType: 'success',
                buttonTitle: 'OK',
                message: 'Password matched',
              });
              setModal(true);
              setForParentIsShowPaymentModal(true);
            }
          })
          .catch(err => {
            console.log(err);
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
            setBuffer(false);
          });
      } else if (modelName === 'auditionRegistration') {
        axios
          .post(AppUrl.VerifyUser, data, axiosConfig)
          .then(res => {
            if (res.data.status === 401) {
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'OK',
                message: res.data.message ? res.data.message : '',
              });
              setModal(true);
              setBuffer(false);
            } else if (res.data.status === 200) {
              setBuffer(false);
              setModalObj({
                modalType: 'success',
                buttonTitle: 'OK',
                message: 'Password matched',
              });
              setModal(true);
              setForParentIsShowPaymentModal(true);
            }
          })
          .catch(err => {
            console.log(err);
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
            setBuffer(false);
          });
      } else if (modelName === 'paidPhoto') {
        axios
          .post(AppUrl.VerifyUser, data, axiosConfig)
          .then(res => {
            if (res.data.status === 401) {
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'OK',
                message: res.data.message ? res.data.message : '',
              });
              setModal(true);
              setBuffer(false);
            } else if (res.data.status === 200) {
              setBuffer(false);
              setModalObj({
                modalType: 'success',
                buttonTitle: 'OK',
                message: 'Password matched',
              });
              setModal(true);
              setForParentIsShowPaymentModal(true);
            }
          })
          .catch(err => {
            console.log(err);
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
            setBuffer(false);
          });
      } else {
        axios
          .post(AppUrl.VerifyToRegisterEvent, data, axiosConfig)
          .then(res => {
            if (res.data.status === 401) {
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'OK',
                message: res.data.message ? res.data.message : '',
              });
              setModal(true);
              setBuffer(false);
            } else if (res.data.status === 200) {
              setBuffer(false);
              if (res.data.is_already_registered == true) {
                setModalObj({
                  modalType: 'success',
                  buttonTitle: 'OK',
                  message: 'You are already registered',
                });
                setModal(true);
              } else if (res.data.is_already_registered == false) {
                setModalObj({
                  modalType: 'success',
                  buttonTitle: 'Pay Now',
                  message:
                    'Slot is available ! Please make payment for register',
                });
                setModal(true);
                setForParentIsShowPaymentModal(true);
              }
            }
          })
          .catch(err => {
            console.log(err);
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
            setBuffer(false);
          });
      }
    }
  };

  const modalButtonPress = () => {
    setModal(false);
    passChildData(forParentIsShowPaymentModal);
    setParentData(data);
  };

  useEffect(() => {
    axios
      .get(
        AppUrl.RegistrationChecker + `${event_type}/${post?.slug}`,
        axiosConfig,
      )
      .then(res => {
        if (res.data.status === 200) {
          //console.log(res.data);
          setRegistered(res.data.participant);
          //console.log(res.data.participant);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [post?.slug, event_type]);

  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {buffer ? <LoaderComp /> : <></>}
      {registered ? (
        registered?.payment_status === null ? (
          <View>
            <TouchableOpacity
              style={{
                margin: 20,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LinearGradient
                colors={['#FFAD00', '#E19A04', '#FACF75']}
                style={{
                  borderColor: '#FFAD00',
                  borderWidth: 1,
                  padding: 1,
                  borderRadius: 3,
                  width: '40%',
                }}>
                <Text
                  style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>
                  Payment Pending
                </Text>
              </LinearGradient>
              {/* <Image source={imagePath.sorry} style={{  justifyContent:'center', width: 300, height: 150 }} /> */}

              {/* <Text style={{ color: 'white', textAlign: 'center' }}>
          {description}
        </Text> */}
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              borderColor: '#FFAD00',
              borderWidth: 1,
              padding: 1,
              borderRadius: 3,
            }}>
            <ImageBackground
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                height: 350,
                backgroundColor: 'coral',
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 20,
              }}
              source={imagePath.background}
              resizeMode="cover">
              <View style={{ marginTop: 30 }}>
                {/* <Image source={imagePath.sorry} style={{  justifyContent:'center', width: 300, height: 150 }} /> */}
                <Text
                  style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                  Already Registered at:{' '}
                  {moment(registered.created_at).format('LL')}
                </Text>
                {/* <Text style={{ color: 'white', textAlign: 'center' }}>
              {description}
            </Text> */}
              </View>
            </ImageBackground>
          </View>
        )
      ) : (
        <>
          <View style={styles.topCard}>
            {/* <LinearTextGradient
              style={styles.fonts}
              locations={[0, 1]}
              colors={['#ffaa00', '#fcfab6']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}> */}
            <Text style={styles.fonts}>Registration</Text>
            {/* </LinearTextGradient> */}
            {/* <UnderlineImage /> */}
            <View
              style={{
                borderWidth: 0.3,
                borderColor: 'black',
                marginVertical: 10,
                marginHorizontal: 10,
              }}
            />
            {event_type === 'livechat' || event_type === 'qna' ? (
              <>
                <View
                  style={{
                    backgroundColor: '#282828',
                    margin: 8,
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 5,
                    }}>
                    <Text style={{ color: 'white', width: '30%' }}>Fee: </Text>
                    <Text style={{ color: 'white', width: '60%' }}>
                      {currencyCount(fee) + currency.symbol}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 5,
                    }}>
                    {/* <Text style={{ color: 'white', width: '30%' }}>Start:</Text>
                    <Text style={{ color: 'white', width: '60%' }}>
                      {moment(start_time, 'HH:mm::ss').format('h:mm a')}
                    </Text> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 5,
                    }}>
                    {/* <Text style={{ color: 'white', width: '30%' }}>End:</Text>
                    <Text style={{ color: 'white', width: '60%' }}>
                      {moment(end_time, 'HH:mm::ss').format('h:mm a')}
                    </Text> */}
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
            <View>
              <Text style={styles.formText}>Name</Text>
              <View style={styles.formText2}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  editable={false}
                  value={useInfo?.name}
                // value = `${useInfo?.first_name}`
                // value={useInfo?.first_name} + {useInfo?.last_name ? useInfo?.last_name : ''}
                />
              </View>
            </View>

            <View>
              <Text style={styles.formText}>Email</Text>
              <View style={styles.formText2}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  editable={false}
                  value={useInfo?.email}
                />
              </View>
            </View>
            <View>
              <Text style={styles.formText}>Phone</Text>
              <View style={styles.formText2}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  editable={false}
                  value={useInfo?.phone}
                />
              </View>
            </View>
            <View>
              <Text style={styles.formText}>Password</Text>
              <View
                style={{
                  alignItems: 'stretch',
                  borderWidth: 0.5,
                  borderColor: '#FFAD00',
                  borderRadius: 20,
                  backgroundColor: 'black',
                  height: 38,
                  color: '#fff',
                  paddingLeft: 16,
                  marginTop: 10,

                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  margin: 10,
                }}>
                <Icon
                  name="lock"
                  color={'#ffaa00'}
                  size={20}
                  style={styles.Icon}
                />
                <TextInput
                  secureTextEntry={showPass}
                  style={{ color: '#9e9e9e', marginLeft: 10, width: '76%' }}
                  placeholderTextColor="#9e9e9e"
                  placeholder="Enter Password"
                  onChangeText={value => setPassword(value)}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    marginLeft: 10,
                  }}
                  onPress={() => setShowPass(!showPass)}>
                  {showPass ? (
                    <Entypo name="eye-with-line" size={20} color={'#ffaa00'} />
                  ) : (
                    <Entypo name="eye" size={20} color={'#ffaa00'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {errorMessage != null || errorMessage != '' ? (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {errorMessage}
              </Text>
            ) : null}

            <View style={styles.textInputView}>
              <TouchableOpacity
                style={{
                  width: '40%',
                  borderRadius: 4,
                  marginTop: 18,
                }}
                onPress={() => handlePress()}>
                <LinearGradient
                  style={{
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>

                  {freeRegBuffer ?
                    <ActivityIndicator />
                    :

                    <Text style={{ color: 'black', fontWeight: 'bold' }}>
                      Register
                    </Text>
                  }


                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default RegistrationComp;
