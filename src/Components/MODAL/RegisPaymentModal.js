//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import UnderlineImage from '../GLOBAL/Reuseable/UnderlineImage';
import { useNavigation } from '@react-navigation/native';
import AlertModal from './AlertModal';
import LoaderComp from '../LoaderComp';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import navigationStrings from '../../Constants/navigationStrings';
import AllInOneSDKManager from 'paytm_allinone_react-native';
// import Heading from '../Reuseable/Heading';
import Heading from '../GLOBAL/Reuseable/Heading';
import { useAxiosGet } from '../../CustomHooks/useAxiosGet';
import { useStripePayment } from '../../CustomHooks/useStripePayment';
import { useStripe } from '@stripe/stripe-react-native';
import { useThemeColor } from '../../CustomHooks/useThemeColor';

// create a component

const RegisPaymentModal = ({
  appeal,
  setAppeal,
  RoundName,
  eventType,
  eventId = null,
  modelName,
  isShowPaymentComp,
  setIsShowPaymentComp,
  parentData = null,
  event_registration_id = null,
  notification_id = null,
  fee = null,
  end_time = null,
  event_type = null,
  start_time = null,
  fetchAllDataAfterPayment = null,
  modalPara = null,
  setLiked = null,
  souvenirId = null,
  id = null,
  setPaymentComplete = null,
  greetingId = null,
  setParentStep = null,
  job = null,
  setUnlocked = null,
  setIsShowPaymentCompAppeal = null,
  setAppealPaid = null,
  event_id = null,
}) => {
  const { setNotification, quantity, setQuantity, locationInfo } =
    useContext(AuthContext);
  const {
    axiosConfig,
    currencyMulti,
    currencyCount,
    currency,
    getActivity,
    setWaletInfo,
    useInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    if (modelName === 'livechat' || modelName === 'qna') {
      null;
    } else {
      setQuantity(0);
    }
  }, [modelName]);
  // console.log('module name____', modelName);
  // console.log('module name quna____', quantity);

  const Navigation = useNavigation();
  const [regBuffer, setRegBuffer] = useState(false);
  const [walletInfo, setWalletInfo] = useState([]);
  const { themeCardColor, themeTextColor, themeTransparentColor } =
    useThemeColor();

  const [paytmDat, setPaytmDat] = useState({
    token: '',
    order_id: '',
    mid: '',
    amount: '',
    mode: '',
  });

  let countryBaseFee = currencyCount(fee);

  const { resData, setResData, buffer, error, HandelGetData } = useAxiosGet(
    AppUrl.getTokenPaytm + countryBaseFee,
  );

  const {
    stripeBuffer,
    stripeError,
    HandelStripePayment,
    openPaymentSheet,
    stripePaymentStatus,
  } = useStripePayment({
    amount: quantity > 0 ? fee * quantity : fee,
    event_type: modelName,
    event_id:
      eventType === 'greeting' || eventType === 'marketplace'
        ? event_id
        : eventId,
  });

  const [regComBuffer, setRegComBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const getWalletInfo = () => {
    axios
      .get(AppUrl.auditionRegistrationWallet, axiosConfig)
      .then(res => {
        //console.log(res);
        if (res.data.status === 200) {
          //console.log(res.data.userWallet);
          setWalletInfo(res.data.userWallet);
        }
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    setPaytmDat({
      token: resData?.Token_data?.body?.txnToken,
      order_id: resData?.orderId,
      mid: resData?.mid,
      amount: resData?.amount,
      callBackUrl: resData?.callBackUrl,
      mode: resData?.takePaymentMode,
    });

    //console.log('payment status', resData?.takePaymentMode);
    // console.log(
    //   'paytm token',
    //   resData?.Token_data?.body?.txnToken +
    //   ' fee  :' +
    //   fee +
    //   '  payment mode ' +
    //   resData?.takePaymentMode,
    // );
  }, [resData]);

  useEffect(() => {
    getWalletInfo();
    console.log('country base price amount', countryBaseFee + `  unit price${fee}`)
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });

  const cardInfoSubmit = (data, type = null) => {
    console.log(eventId);
    const aditionalData = {
      ...parentData,
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: countryBaseFee,
      start_time: start_time,
      end_time: end_time,

      payment_method: type,
    };
    let finalData = {
      ...aditionalData,
      ...data,
    };
    console.log(finalData);

    axios
      .post(AppUrl.EventRegister, finalData, axiosConfig)
      .then(res => {
        //console.log(res);
        if (res.data.status === 200) {
          setQuantity(0);
          reset(data);
          setWaletInfo(res.data.waletInfo);
          // setModalObj({
          //   modalType: 'success',
          //   buttonTitle: 'OK',
          //   message: 'Registration completed successfully !',
          // });

          setModal(true);
        }
      })
      .catch(err => {
        console.log(err);
        setRegBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };
  const onSubmitLearning = (type, data = null) => {
    let additionalData = {
      ...parentData,
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: countryBaseFee,
      start_time: start_time,
      end_time: end_time,
      room_id: '',
    };

    let finalData = {
      ...additionalData,
      ...data,
    };

    if (type === 'card') {
      eventReg();
    }

    if (type === 'wallet') {
      // eventType === 'livechat' && eventReg();
      let data = {
        event_type: eventType,
        notification_id: notification_id ? notification_id : null,
        eventId: Number(eventId),
        model_name: modelName,
        fee: countryBaseFee,
        start_time: start_time,
        end_time: end_time,
        greetingId: greetingId,
      };
      // console.log('data-------------', data);
      axios
        .post(AppUrl.walletQnaLearningRegister, data, axiosConfig)
        .then(res => {
          setRegBuffer(false);
          //console.log(res.data);
          if (res.data.status === 200) {
            reset(data);

            setModalObj({
              modalType: 'success',
              buttonTitle: 'Ok',
              message: 'Registration completed successfully !',
            });
            getActivity();
            // setWaletInfo()
            setWaletInfo(res.data.waletInfo);
            setModal(true);
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            setModal(true);
          }
        })
        .catch(err => {
          console.log(err);
          setRegBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        });
    }
  };
  const LearningCertificatePay = () => {
    setPaymentComplete(true);
    setModalObj({
      modalType: 'success',
      buttonTitle: 'OK',
      message: 'Registration completed successfully !',
    });
    setModal(true);
  };

  const onSubmit = (data, type = null) => {
    if (eventType === 'souvenir') {
      let data = {
        souvenir_create_id: souvenirId,
        souvenir_apply_id: id,
        total_amount: countryBaseFee,
        card_no: '123',
        card_holder_name: 'abc',
        card_expire_date: '23-04-22',
        card_cvv: '123',
      };

      console.log(data);
      axios
        .post(AppUrl.SouvenirPayment, data, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            setModal(true);
            setModalObj({
              modalType: 'Success',
              buttonTitle: 'OK',
              message: 'Payment Complete',
            });
          }
        })
        .catch(err => {
          console.log(err);
          setRegBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
        });

      return;
    } else if (eventType === 'videoFeed') {
      let Data = {
        videoId: modalPara[0],
        reactNum: modalPara[1],
        fee: countryBaseFee,
        type: type,
      };
      console.log(Data);
      axios
        .post(AppUrl.paymentLoveReact, Data, axiosConfig)
        .then(res => {
          //console.log('res------',res)
          setRegBuffer(false);
          console.log('after payment', res.data);
          if (res.data.status === 200) {
            setWaletInfo(res.data.waletInfo);
            reset(data);
            setLiked(1);
            setModal(true);
            setModalObj({
              modalType: 'success',
              buttonTitle: 'OK',
              message: 'Payment was successful',
            });
            setLiked(1);
            setPaymentComplete(true);
            return;
          } else {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'OK',
              message: 'Something Went Wrong',
            });
            return;
          }
        })
        .catch(err => {
          console.log(err);
          setRegBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
        });
    } else {
      let aditionalData = {
        ...parentData,
        event_registration_id: event_registration_id
          ? event_registration_id
          : null,
        notification_id: notification_id ? notification_id : null,
        event_id: Number(eventId),
        model_name: modelName,
        fee: countryBaseFee,
        start_time: start_time,
        end_time: end_time,
        // room_id: event_type === 'livechat' ? firepadRef.key : '',
        room_id: '',
      };

      let finalData = {
        ...aditionalData,
        ...data,
      };
      // setRegBuffer(true)
      // return console.log(finalData)
      console.log('finalData------------', finalData);
      console.log('AppUrl.EventRegister------------', AppUrl.EventRegister);

      axios
        .post(AppUrl.EventRegister, finalData, axiosConfig)
        .then(res => {
          setRegBuffer(false);
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
            setModal(true);
          }
        })
        .catch(err => {
          console.log(err);
          setRegBuffer(false);
          setModalObj({
            modalType: 'warning',
            buttonTitle: 'OK',
            message: 'Something Went Wrong',
          });
          setModal(true);
        });
    }
  };

  /**
   * paytm payment
   */
  const payTmPayment = () => {
    console.log('bidding idddddddddddddddd', eventId);
    console.log('--------paytmDat', paytmDat);

    if (!buffer) {
      AllInOneSDKManager.startTransaction(
        paytmDat.order_id,
        paytmDat.mid,
        paytmDat.token,
        paytmDat.amount,
        paytmDat.callBackUrl + paytmDat.order_id,
        // paytmDat.mode,
        true,
        false,
        '',
      )
        .then(result => {
          console.log('result back', result);
          if (result.STATUS == 'TXN_SUCCESS') {
            Toast.show('Payment successful', Toast.durations.SHORT);
            paytmScucess({
              ...result,
              modelName,
              eventId,
              event_id,
              souvenir_create_id: souvenirId ? souvenirId : 0,
              souvenir_apply_id: id ? id : 0,
              videoId: modalPara !== null ? modalPara[0] : 0,
              reactNum: modalPara !== null ? modalPara[1] : 0,
            });

            if (eventType == 'videoFeed') {
              setLiked(1);
              setPaymentComplete(true);
              return;
            }

            if (eventType == 'marketplace') {
              Navigation.navigate(navigationStrings.MARKETPLACE);
              return;
            }
            if (eventType == 'auditionAppeal') {
              return setIsShowPaymentCompAppeal(false);
            }
            if (eventType == 'auction') {
              setIsShowPaymentComp(false);
              return Navigation.goBack();
            }
            if (eventType === 'learningSessionCertificate') {
              setPaymentComplete(true);
              return setIsShowPaymentComp(false);
            }
            if (eventType === 'greeting') {
              setIsShowPaymentComp(true);
              return Navigation.navigate(navigationStrings.NOTIFICATION);
            }
            setIsShowPaymentComp(false);

            setModal(true);
            Navigation.navigate(navigationStrings.HOME);
          }
          // }
        })
        .catch(err => {
          console.log('error message', err.message);
          Toast.show('Payment failed', Toast.durations.SHORT);
        });
    } else {
      Toast.show('please wait...', Toast.durations.SHORT);
    }
  };

  /**
   *paytm payment success to backend
   */
  const paytmScucess = data => {
    console.log('payment data success', data);
    axios
      .post(AppUrl.paytmPaymentSuccess, data, axiosConfig)
      .then(res => {
        getActivity();
        console.log('my data succes', res.data);
        if (eventType == 'generalpost') {
          setUnlocked(true);
          setIsShowPaymentComp(false);
          setModalObj({
            modalType: 'success',
            buttonTitle: 'OK',
            message: 'Photo Purchase completed successfully !',
          });
          setModal(true);
          Navigation.navigate(navigationStrings.HOME);
          return;
        } else if (eventType == 'auditionCertificate') {
          return setIsShowPaymentComp(false);
        } else if (eventType == 'auditionAppeal') {
          setAppealPaid(true);
          return setIsShowPaymentCompAppeal(false);
        } else if (eventType === 'learningSessionCertificate') {
          return setModalObj({
            modalType: 'success',
            buttonTitle: 'OK',
            message: 'Registration completed successfully !',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * event reg live chat, learning session, meeetup, qna,souvenir,greetings
   */
  const eventReg = (type = null) => {
    console.log('i hittt bro chill');
    let aditionalData = {
      event_registration_id: event_registration_id
        ? event_registration_id
        : null,
      notification_id: notification_id ? notification_id : null,
      event_id: Number(eventId),
      model_name: modelName,
      fee: countryBaseFee,
      start_time: start_time,
      end_time: end_time,
      quantity: quantity,
      // room_id: event_type === 'livechat' ? firepadRef.key : '',
      // room_id: '',
    };
    console.log('backend data jacche', aditionalData);
    // return console.log('audition type', aditionalData)
    axios
      .post(AppUrl.EventRegister, aditionalData, axiosConfig)
      .then(res => {
        setQuantity(0);
        console.log('event reg api hittting -------------->', res.data);
        setRegComBuffer(false);
        type == 'paytm' ? payTmPayment() : null;

        getActivity();
      })
      .catch(err => {
        console.log(err);
        setRegBuffer(false);
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'OK',
          message: 'Something Went Wrong',
        });
        setModal(true);
      });
  };

  //form paytm icon click
  const handelSubmitPaytm = () => {
    if (!buffer) {
      if (job == 'pay-again') {
        return payTmPayment();
      }
      if (eventType === 'souvenir') {
        return payTmPayment();
      } else if (modelName === 'generalpost') {
        console.log(modelName);
        return payTmPayment();
      } else if (eventType === 'videoFeed') {
        return payTmPayment();
      } else if (eventType === 'greeting') {
        return payTmPayment();
      } else if (eventType === 'auditionCertificate') {
        return payTmPayment();
      } else if (eventType === 'auditionAppeal') {
        return payTmPayment();
      } else if (eventType === 'auction') {
        return payTmPayment();
      } else if (eventType === 'marketplace') {
        return payTmPayment();
      } else if (eventType === 'learningSessionCertificate') {
        return payTmPayment();
      } else {
        eventReg('paytm');
      }
    }
  };

  const handelVideoFeedReactBuy = () => {
    let data = {
      videoId: modalPara !== null ? modalPara[0] : 0,
      reactNum: modalPara !== null ? modalPara[1] : 0,
      modelName: modelName,
      amount: countryBaseFee,
    };
    axios
      .post(AppUrl.VideoFeedReactPayment, data, axiosConfig)
      .then(res => {
        setLiked(1);
        setPaymentComplete(true);
        // getActivity();
        // console.log('my data succes', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (eventType == 'videoFeed') {
      if (stripePaymentStatus) {
        setIsShowPaymentComp(false);

        handelVideoFeedReactBuy();
      } else if (eventType == 'greeting') {
        setIsShowPaymentComp(false);
      } else if (eventType === 'learningSessionCertificate') {
        setIsShowPaymentComp(false);
      } else if (eventType === 'marketplace') {
        setIsShowPaymentComp(false);
      }
    }
  }, [stripePaymentStatus]);

  //stripe click
  const handelClickStripe = () => {
    if (stripeBuffer) {

      if (eventType === 'souvenir') {
        return openPaymentSheet();
      } else if (modelName === 'generalpost') {
        console.log(modelName);
        return openPaymentSheet();
      } else if (eventType === 'videoFeed') {
        return openPaymentSheet();
      } else if (eventType === 'greeting') {
        return openPaymentSheet();
      } else if (eventType === 'auditionCertificate') {
        return openPaymentSheet();
      } else if (eventType === 'auditionAppeal') {
        return openPaymentSheet();
      } else if (eventType === 'auction') {
        return openPaymentSheet();
      } else if (eventType === 'learningSessionCertificate') {
        return openPaymentSheet();
      } else if (eventType === 'marketplace') {
        return openPaymentSheet();
      }

      job != 'pay-again' ? eventReg() : null;
      openPaymentSheet();
    } else {
      Toast.show('Try agin', Toast.durations.SHORT);
    }
  };

  const modalButtonPress = () => {
    if (eventType == 'greeting') {
      return Navigation.navigate(navigationStrings.NOTIFICATION);
    }
    setIsShowPaymentComp(false);
    Navigation.navigate(navigationStrings.HOME);
    Toast.show('Registered Successfully ', Toast.durations.SHORT);
  };

  const [shujoBuffer, setShujoBuffer] = useState(true);

  //shurjo pay click
  const shurjoPayMakePayment = () => {

    setShujoBuffer(false);
    let info = {
      amount: countryBaseFee,
      // amount: 5,
      event_type: modelName,
      event_id:
        eventType === 'greeting' || eventType === 'marketplace'
          ? event_id
          : eventId,
      reactNum: modalPara !== null ? modalPara[1] : 0,
    };

    axios
      .post(AppUrl.shujroPayPaymentInitiata, info, axiosConfig)
      .then(res => {
        console.log('cjeck out url', res.data.checkout_url)
        Navigation.navigate(navigationStrings.SHURJOPAY, {
          checkOutUrl: res?.data?.checkout_url,
        });
        setShujoBuffer(true);
      })
      .catch(err => {
        setShujoBuffer(true);
        console.log(err);
      });
  };

  const shurjoPayClick = () => {

    if (eventType === 'souvenir') {
      return shurjoPayMakePayment();
    } else if (modelName === 'generalpost') {
      console.log(modelName);
      return shurjoPayMakePayment();
    } else if (eventType === 'videoFeed') {
      return shurjoPayMakePayment();
    } else if (eventType === 'greeting') {
      return shurjoPayMakePayment();
    } else if (eventType === 'auditionCertificate') {
      return shurjoPayMakePayment();
    } else if (eventType === 'auditionAppeal') {
      return shurjoPayMakePayment();
    } else if (eventType === 'auction') {
      return shurjoPayMakePayment();
    } else if (eventType === 'learningSessionCertificate') {
      return shurjoPayMakePayment();
    } else if (eventType === 'marketplace') {
      return shurjoPayMakePayment();
    }
    job != 'pay-again' ? eventReg() : null;
    shurjoPayMakePayment();
  };

  const handelIpay88 = () => {
    eventReg();
    Navigation.navigate(navigationStrings.IPAY88PAY, {
      checkOutUrl: `https://backend.hellosuperstars.com/ipay88-make-payment/${useInfo.id}/${countryBaseFee}/${modelName}/${eventId}/0/mobile`,
    });
  };

  // global payment getways
  const globalPayment = () => {
    return (
      <>
        <TouchableOpacity onPress={() => handelClickStripe()}>
          <Image source={imagePath.Stripe} style={styles.payment_icon} />
        </TouchableOpacity>
      </>
    );
  };

  // bangla deshi payment getways
  const bdpayment = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => (shujoBuffer ? shurjoPayClick() : null)}>
          <Image source={imagePath.Surjo} style={styles.payment_icon} />
        </TouchableOpacity>
        {globalPayment()}
      </>
    );
  };

  //indian payment getways
  const indPayment = () => {
    return (
      <>
        <TouchableOpacity onPress={() => handelSubmitPaytm()}>
          <Image source={imagePath.paytm} style={styles.payment_icon} />
        </TouchableOpacity>
        {globalPayment()}
      </>
    );
  };

  // malaysia payment getways
  const mymPayment = () => {
    return (
      <>
        <TouchableOpacity onPress={() => handelIpay88()}>
          <Image source={imagePath.Ipay} style={styles.payment_icon} />
        </TouchableOpacity>
        {globalPayment()}
      </>
    );
  };

  const renderPaymentGetways = () => {
    if (locationInfo?.countryCode == 'BD') {
      return bdpayment();
    } else if (locationInfo?.countryCode == 'IN') {
      return indPayment();
    } else if (locationInfo?.countryCode == 'MY') {
      return mymPayment();
    } else {
      return globalPayment();
    }
  };

  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {regBuffer ? <LoaderComp /> : <></>}
      <Modal
        visible={isShowPaymentComp}
        transparent
        onRequestClose={() => setIsShowPaymentComp(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={[styles.centered_view, themeTransparentColor]}>
          <View style={[styles.warning_modal, themeCardColor]}>
            <View style={[styles.topCard, themeCardColor]}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Pressable
                  onPress={() =>
                    eventType === 'auditionAppeal'
                      ? setIsShowPaymentCompAppeal(false)
                      : setIsShowPaymentComp(false)
                  }>
                  <Text
                    style={[
                      {
                        color: '#000',
                        fontWeight: 'bold',
                        backgroundColor: '#ff0',
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 50,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginTop: 5,
                      },
                      themeTextColor,
                    ]}>
                    X
                  </Text>
                </Pressable>
              </View>
              <Heading heading="Choose payment method" />
              <UnderlineImage />

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  paddingHorizontal: 20,
                  paddingTop: 25,
                }}>
                {/* surjo pay */}

                {/* paytm */}

                {/* ipay 88 */}

                {renderPaymentGetways()}
                {/* pocket pay */}
                {/* <TouchableOpacity
                  onPress={() =>
                    Toast.show('Under Development', Toast.durations.SHORT)
                  }>


                  <Image
                    source={imagePath.Pocket}
                    style={styles.payment_icon}
                  />
                </TouchableOpacity> */}

                {/* stripe */}
              </View>

              {/* <Controller
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
                    <Text style={styles.formText}>Card Number {RoundName}</Text>
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
              /> */}

              {/* <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.formText, { width: '45%' }]}>Date</Text>
                  <Text style={styles.formText}>CCTV</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.formText2, { width: '45%' }]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder=""
                    />
                  </View>
                  <View style={[styles.formText2, { width: '45%' }]}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholderTextColor="#fff"
                      placeholder=""
                    />
                  </View>
                </View>
              </View> */}

              <View style={styles.textInputView}>
                {eventType === 'videoFeed' && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFAD00',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Price: {countryBaseFee}
                    </Text>
                  </TouchableOpacity>
                )}
                {RoundName === 5 || RoundName === 6 || RoundName === 7 ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFAD00',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}
                    onPress={() => {
                      setIsShowPaymentComp(false);
                      setModal(true);
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Confirm Payment
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFAD00',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 0,
                    }}
                    onPress={() =>
                      eventType === 'auditionRegistration'
                        ? cardInfoSubmit(onSubmit, 'card')
                        : eventType === 'learningSession'
                          ? onSubmitLearning('card', onSubmit)
                          : eventType === 'learningSessionCertificate'
                            ? LearningCertificatePay()
                            : onSubmit(onSubmit, 'card')
                    }>
                    {/* <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Confirm Payment
                    </Text> */}
                  </TouchableOpacity>
                )}
              </View>

              {eventType === 'auditionRegistration' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.auditions ? walletInfo?.auditions : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.auditions ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => cardInfoSubmit(onSubmit, 'wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'videoFeed' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.love_points ? walletInfo?.love_points : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.love_points ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmit(onSubmit, 'wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'learningSession' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.learning_session
                        ? walletInfo?.learning_session
                        : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.learning_session ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'greeting' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.greetings ? walletInfo?.greetings : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.greetings ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'qna' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available {walletInfo?.qna ? walletInfo?.qna : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.qna ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'livechat' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available{' '}
                      {walletInfo?.live_chats ? walletInfo?.live_chats : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.live_chats ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {eventType === 'meetup' && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      backgroundColor: '#35b3f2',
                      width: '40%',
                      borderRadius: 4,
                      marginVertical: 15,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 8,
                        color: '#292929',
                      }}>
                      Available {walletInfo?.meetup ? walletInfo?.meetup : '00'}
                    </Text>
                  </TouchableOpacity>
                  {walletInfo?.meetup ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#35b3f2',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}
                      onPress={() => onSubmitLearning('wallet')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        backgroundColor: '#71a4bd',
                        width: '40%',
                        borderRadius: 4,
                        marginVertical: 15,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 8,
                          color: '#292929',
                        }}>
                        Use Wallet
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {regComBuffer && <LoaderComp />}
      {/* <PaymentModal
      appeal={appeal}
      setAppeal={setAppeal}
modal={modal}
setModal={setModal}
      /> */}
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
    marginVertical: 0,
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
  payment_icon: {
    borderRadius: 10,
    padding: 5,
    width: 135,
    height: 75,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee99e99',
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
export default RegisPaymentModal;
