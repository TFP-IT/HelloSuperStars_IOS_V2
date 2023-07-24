import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AlertModal from '../../MODAL/AlertModal';
import TitleHeader from '../../TitleHeader';
import styles from './styles';

const CheckSlot = ({
  data,
  charge = 0,
  setBuffer,
  setTakeTimeParent,
  setIsShowRegComp,
  setFeeCount,
  setStartTime,
  setEndTime,
  apiInPoint,
}) => {
  const [takeTime, setTakeTime] = useState('1');
  const [errorMessage, setErrorMessage] = useState('');
  const [rulesMessage, setRulesMessage] = useState(
    '(Min: ' +
    Number(data?.min_time) +
    ' Minute(s) | Max: ' +
    Number(data?.max_time) +
    ' Minute(s))',
  );
  const { axiosConfig, currencyMulti, currencyCount, setQuantity } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  useEffect(() => {
    setQuantity(0)
  }, [])
  // console.log('CheckSlot------data?.max_time------', Number(data?.max_time))
  // console.log('CheckSlot------data?.min_time------', Number(data?.min_time))
  //check slot
  const handelCheckSlot = () => {
    // alert(takeTime)
    if (true
      // Number(takeTime) !== '' &&
      // Number(takeTime) <= Number(data?.max_time) &&
      // Number(takeTime) >= Number(data?.min_time)
    ) {
      setBuffer(true);
      axios
        .get(apiInPoint + takeTime + '/' + data?.id, axiosConfig)
        .then(res => {
          if (res.data?.status === 200) {
            setBuffer(false);
            if (res.data?.available) {
              setModal(true);
              setModalObj({
                modalType: 'success',
                buttonTitle: 'Register Now',
                message: res.data?.message,
                available: res.data?.available,
              });
              setIsShowRegComp(true);
              setStartTime(res.data?.start_time);
              setEndTime(res.data?.end_time);
              setFeeCount(data?.fee * takeTime);
            } else {
              setModal(true);
              setModalObj({
                modalType: 'warning',
                buttonTitle: 'Try Agin',
                message: res.data?.message,
                available: res.data?.available,
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          // alert('network problem')
        });
    }
    // else {
    //   if (Number(takeTime) == null || Number(takeTime) == '') {
    //     setModal(true);
    //     setModalObj({
    //       modalType: 'warning',
    //       buttonTitle: 'Ok',
    //       message: 'Insert a value !',
    //     });
    //   } else if (Number(takeTime) < Number(data?.min_time)) {
    //     setModal(true);
    //     setModalObj({
    //       modalType: 'warning',
    //       buttonTitle: 'Ok',
    //       message: 'Select More than ' + Number(data?.min_time) + ' minute !',
    //     });
    //   } else if (Number(takeTime) > Number(data?.max_time)) {
    //     setModal(true);
    //     setModalObj({
    //       modalType: 'warning',
    //       buttonTitle: 'Ok',
    //       message: 'Select Less than ' + Number(data?.max_time) + ' minute !',
    //     });
    //   } else {
    //     setModal(false);
    //     setModalObj({
    //       modalType: '',
    //       buttonTitle: '',
    //       message: '',
    //       available: '',
    //     });
    //   }
    // }
  };
  const handleErrorMessage = newText => {
    // alert(takeTime)
    if (
      Number(newText) !== '' &&
      Number(newText) <= Number(data?.max_time) &&
      Number(newText) >= Number(data?.min_time)
    ) {
      setErrorMessage('');
    } else {
      if (Number(newText) == null || Number(newText) == '') {
        setErrorMessage('Insert a value !');
      } else if (Number(newText) < Number(data?.min_time)) {
        setErrorMessage(
          'Select More than ' + Number(data?.min_time) + ' minute !',
        );
      } else if (Number(newText) > Number(data?.max_time)) {
        setErrorMessage(
          'Select Less than ' + Number(data?.max_time) + ' minute !',
        );
      } else {
        setErrorMessage('');
      }
    }
  };
  const applyNow = () => {
    // setIsShowRegComp(true);
    setModal(false);
  };

  return (
    <>
      <TitleHeader title={'Slot Checking'} />
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={applyNow}

      />
      <View style={styles.topCard}>
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: 'white',
              marginBottom: 5,
              fontWeight: 'bold',
            }}>
            Time Period
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
            margin: 10,
          }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.formText}>
              Min: {Number(data?.min_time) != null ? Number(data?.min_time) : 0}{' '}
              Minute(s){'\n'}Max:{' '}
              {Number(data?.max_time) != null ? Number(data?.max_time) : 0}{' '}
              Minute(s)
            </Text>
            <View style={styles.formText2}>
              <TextInput
                onChangeText={newText => {
                  setTakeTime(newText);
                  setTakeTimeParent(newText);
                  handleErrorMessage(newText);
                  setQuantity(newText);
                }}
                keyboardType="numeric"
                style={styles.textInputStyleTime}
                placeholderTextColor="#fff"
                value={takeTime}
              />
            </View>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: '#FFAD00', marginRight: 10 }}>
              {currencyCount(Number(data?.fee))} / {takeTime}
            </Text>
            <Text style={{ color: 'white' }}>Total Cost</Text>
            <View style={styles.formText2}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFAD00',
                  borderRadius: 10,
                  backgroundColor: '#343434',
                  height: 38,
                  color: '#b8b8b8',
                  paddingLeft: 15,
                }}>
                <Text style={{ marginTop: 8, color: 'white' }}>
                  {currencyMulti(data?.fee, takeTime)}{' '}
                </Text>
              </View>
            </View>
            <Text style={{ color: 'black' }}></Text>
          </View>

          {/* <View style={{ flex: 1, backgroundColor: 'green' }}>
                        <Text style={styles.formText}>
                            <Text style={{ color: '#FFAD00', marginRight: 10 }}>{currencyCount(Number(fee))} / {takeTime}</Text>   Total Cost</Text>
                        <View style={{
                            borderWidth: 1, borderColor: '#FFAD00', borderRadius: 10, backgroundColor: '#343434', height: 38, color: '#b8b8b8',
                            paddingLeft: 15
                        }}>
                            <Text style={{ marginTop: 8, color: 'white' }} >{currencyMulti(fee, takeTime)} </Text>
                        </View>
                    </View> */}
        </View>
        <View style={styles.textInputView}>
          <TouchableOpacity onPress={handelCheckSlot}>
            <LinearGradient
              style={styles.login_btn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <Text style={{ color: 'black' }}>Check Slot</Text>
            </LinearGradient>
            {/* <Text style={styles.input_title}>LOGIN</Text> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
                        style={styles.textInputView3}
                        onPress={handelCheckSlot}
                    >
                        <Text style={styles.textInputPass} >Check Slot</Text>
                    </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

export default CheckSlot;
