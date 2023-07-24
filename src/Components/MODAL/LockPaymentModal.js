//import liraries
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import navigationStrings from '../../Constants/navigationStrings';
import AppUrl from '../../RestApi/AppUrl';
import Heading from '../GLOBAL/Reuseable/Heading';
import UnderlineImage from '../GLOBAL/Reuseable/UnderlineImage';
// import Heading from '../Reuseable/Heading';
// import UnderlineImage from '../Reuseable/UnderlineImage';

// create a component

const LockPaymentModal = ({
  lockModal,
  setLockModal,
  isShowPaymentComp,
  setIsShowPaymentComp,
  parentData,
  event_registration_id = null,
  notification_id = null,
  eventId = null,
  modelName = null,
  fee = null,
}) => {
  const { setNotification } = useContext(AuthContext);
  const { axiosConfig } = useContext(AuthContext);
  const Navigation = useNavigation();
  const [buffer, setBuffer] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);

  const onSubmit = data => {
    console.log(data);
    let aditionalData = {
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: fee,
    };
    console.log(aditionalData);
    // setBuffer(true)

    axios
      .post(AppUrl.EventRegister, aditionalData, axiosConfig)
      .then(res => {
        console.log('res------', res);
        setBuffer(false);
        if (res.data.status === 200) {
          reset(data);
          if (eventType == 'OfflineMeetup') {
            setModalObj({
              modalType: 'success',
              buttonTitle: 'Download Ticket',
              message: 'Registration completed successfully !',
            });
          } else {
            setModalObj({
              modalType: 'success',
              buttonTitle: 'OK',
              message: 'Registration completed successfully !',
            });
          }
          setModal(true);
        } else {
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setIsShowPaymentComp(false);
          setModal(true);
        }
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };

  const modalButtonPress = () => {
    setModal(false);
    if (eventType == 'OfflineMeetup') {
      Linking.openURL('http://www.africau.edu/images/default/sample.pdf');
    } else if (event_registration_id !== null && notification_id !== null) {
      //console.log('here---------')
      axios
        .get(AppUrl.CheckNotification, axiosConfig)
        .then(res => {
          setNotification(res?.data?.notifiction);
        })
        .catch(err => {
          console.log(err);
        });
      return Navigation.navigate(navigationStrings.NOTIFICATION);
    } else {
      return Navigation.navigate(navigationStrings.HOME);
    }
  };
  return (
    <>
      <Modal
        visible={lockModal}
        transparent
        onRequestClose={() => setLockModal(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.topCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Pressable onPress={() => setLockModal(false)}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      backgroundColor: '#ff0',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 50,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    X
                  </Text>
                </Pressable>
              </View>
              {/* <Text style={styles.fonts}>Payment Information</Text> */}
              <Heading heading="Choose payment Method" />
              <UnderlineImage />

              <ScrollView horizontal>
                <TouchableOpacity onPress={() => onSubmit()}>
                  <Image
                    source={imagePath.paytm}
                    style={{
                      margin: 10,
                      margin: 10,
                      width: 100,
                      height: 80,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.bkash} style={{ margin: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.payneeor} style={{ margin: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={imagePath.bank} style={{ margin: 10 }} />
                </TouchableOpacity>
              </ScrollView>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text style={styles.formText}>Card Holder Name</Text>
                    <View style={styles.formText2}>
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        style={styles.textInputStyle}
                        placeholderTextColor="#fff"
                        placeholder="Enter Name"
                        value={value}
                      />
                      {errors.card_holder_name && (
                        <Text style={{ color: 'red', marginLeft: 8 }}>
                          This field is required !
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                name="card_holder_name"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text style={styles.formText}>Card Number</Text>
                    <View style={styles.formText2}>
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.textInputStyle}
                        placeholderTextColor="#fff"
                        placeholder="Enter Card Number"
                      />
                      {errors.card_number && (
                        <Text style={{ color: 'red', marginLeft: 8 }}>
                          This field is required !
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                name="card_number"
              />

              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.formText, { width: '45%' }]}>Date</Text>
                  <Text style={styles.formText}>CCTV</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.formText2, { width: '45%' }]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder="23-04-22"
                    />
                  </View>
                  <View style={[styles.formText2, { width: '45%' }]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder="125"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.textInputView}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FFAD00',
                    width: '40%',
                    borderRadius: 4,
                    marginVertical: 15,
                  }}
                  onPress={handleSubmit(onSubmit)}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingVertical: 8,
                      color: '#292929',
                    }}>
                    Confirm Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  topCard: {
    backgroundColor: '#000',
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
  bannerRow: { alignItems: 'center', position: 'relative', paddingBottom: 15 },
  imgRow: { marginVertical: 2, width: '90%' },
  imgRow2: { marginVertical: 2, position: 'absolute', top: '45%', left: '50%' },
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
    width: 350,
    // height: 500,
    backgroundColor: '#000',

    borderWidth: 1,
    borderColor: '#FFAD00',
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
});

//make this component available to the app
export default LockPaymentModal;
