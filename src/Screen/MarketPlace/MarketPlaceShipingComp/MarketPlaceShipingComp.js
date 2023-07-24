import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AlertModal from '../../../Components/MODAL/AlertModal';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import { AuthContext } from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp/LoaderComp';
import styles from './MarketPlaceShipingCompStyle';
import { calendarFormat } from 'moment/moment';

const MarketPlaceShipingComp = ({
  marketplaceOrder,
  passChildData,
  setParentData,
  setParentStep,
  amount = null,
  slug = null,
  tax = null,
  fee = null,
  deliveryCharge = null,
}) => {
  console.log('fee is', fee);
  // console.log('MarketPlaceShipingComp------eventId------', eventId);
  // console.log('MarketPlaceShipingComp------setParentData------', setParentData);
  // console.log('MarketPlaceShipingComp------passChildData------', passChildData);
  console.log('marketplaceOrder', marketplaceOrder);
  const [buffer, setBuffer] = useState(false);
  const [forParentIsShowPaymentModal, setForParentIsShowPaymentModal] =
    useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const { axiosConfig } = useContext(AuthContext);
  const { useInfo } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [registered, setRegistered] = useState();
  const [pickerData, setPickerData] = useState({});
  const [allCountry, setAllCountry] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [area, setArea] = useState(null);
  const [phone, setPhone] = useState(null);

  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const data = {
    counntry: password,
  };

  useEffect(() => {
    console.log('htis hello marake palcae', marketplaceOrder);
  }, []);

  const handlePress = () => {
    if (password == null || password == '') {
      setErrorMessage('Please enter your password');
    } else {
      // let aditionalData = {
      //   ...data,
      //   'take_time': takeTime,
      // }

      setErrorMessage('');
      setBuffer(true);
    }
  };

  const onSubmit = () => {
    if (
      // !pickerData.city ||
      // !pickerData.country ||
      // !pickerData.state ||
      !area ||
      !phone
    ) {
      setHasError(true);
      return;
    }
    const data = {
      country_id: pickerData.country,
      state_id: pickerData.state,
      city_id: pickerData.city,
      area: area,
      phone: phone,
      items: marketplaceOrder.items, //number
      unit_price: marketplaceOrder.unit_price,
      delivery_charge: deliveryCharge,
      tax: tax,
      marketplace_slug: slug,
    };
    // console.log('data-----------', data);

    // console.log('AppUrl.MarketplaceOrderUpdate + marketplaceOrder?.id-----------', AppUrl.MarketplaceOrderUpdate + marketplaceOrder?.id);
    axios
      .post(
        AppUrl.MarketplaceOrderUpdate + marketplaceOrder?.id,
        data,
        axiosConfig,
      )
      .then(res => {
        // console.log('res---------', res);
        reset(data);
        setBuffer(false);
        if (res.data.status === 200) {
          if (res.data.message == 'Order updated Successfully') {
            setModalObj({
              modalType: 'success',
              buttonTitle: 'Ok',
              message: 'Please make payment now',
              available: '',
            });
            setModal(true);

            setParentStep(2);
          } else if (res.data.message == 'Not Enough Product') {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'Ok',
              message: "Sorry ! Does'nt have enough product ",
              available: '',
            });
            setModal(true);
          }
          setBuffer(false);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  const modalButtonPress = () => {
    setModal(false);
    setIsShowPaymentComp(true);
    passChildData(forParentIsShowPaymentModal);
    setParentData(data);
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

  useEffect(() => {
    fetchAllCountryList();
    setPickerData({
      ...pickerData,
      city: marketplaceOrder?.city_id,
      state: marketplaceOrder?.state_id,
      country: marketplaceOrder?.country_id,
    });
  }, []);
  const handleShippingSave = () => {
    console.log(pickerData);
    if (
      !pickerData.city ||
      !pickerData.country ||
      !pickerData.state ||
      !area ||
      !phone
    ) {
      setHasError(true);
      return;
    }
    const data = {
      country_id: pickerData.country,
      state_id: pickerData.state,
      city_id: pickerData.city,
      area: area,
      phone: phone,
      items: marketplaceOrder.items, //number
      unit_price: marketplaceOrder.unit_price,
      delivery_charge: marketplaceOrder.delivery_charge,
      tax: tax,
      marketplace_slug: slug,
    };
    axios
      .post(AppUrl.OrderStore + marketplaceOrder?.id, data, axiosConfig)
      .then(res => {
        console.log('res from order store', res.data);
        if (res.data.status === 200) {
          setIsShowPaymentComp(true);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {buffer ? <LoaderComp /> : <></>}
      <>
        <View style={styles.greetingsRequest}>
          <>
            <Heading heading="Shipping information" />
            <UnderlineImage />
            <View style={{ margin: 13, color: 'white' }}>
              <View style={{ marginTop: 10, marginBottom: 10 }}></View>
              {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>Country</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      dropdownIconColor="white"
                      mode="dialog"
                      style={{ color: '#fff' }}
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
                  name="country"
                />
                {!pickerData.country && hasError && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View> */}
              {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>State</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      dropdownIconColor="white"
                      mode="dialog"
                      style={{ color: '#fff' }}
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
                  name="state"
                />
                {!pickerData.state && hasError && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View> */}
              {/* <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>City</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Picker
                      dropdownIconColor="white"
                      mode="dialog"
                      style={{ color: '#fff' }}
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
                  name="city"
                />
                {!pickerData.city && hasError && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View> */}
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>Name</Text>

                <TextInput
                  value={useInfo.name}
                  style={styles.textInput}
                  editable={false}
                />

              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>Address</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={setArea}
                      value={area}
                      multiline
                      placeholderTextColor="#9e9e9e"
                      placeholder="your address"
                      style={styles.textInput}
                    />
                  )}
                  name="area"
                />
                {!area && hasError && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>
                  Contact Number
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={setPhone}
                      value={phone}
                      multiline
                      placeholderTextColor="#9e9e9e"
                      placeholder="ontact Number"
                      style={styles.textInput}
                    />
                  )}
                  name="phone"
                />
                {!phone && hasError && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  // onPress={handleSubmit(onSubmit)}
                  onPress={() => onSubmit()}
                  style={[
                    {
                      backgroundColor: '#ffad00',
                      borderRadius: 10,
                    },
                    styles.button,
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 8,
                      fontWeight: 'bold',
                    }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <RegisPaymentModal
              eventType="marketplace"
              eventId={marketplaceOrder?.id}
              modelName="marketplace"
              isShowPaymentComp={isShowPaymentComp}
              setIsShowPaymentComp={setIsShowPaymentComp}
              event_registration_id={marketplaceOrder && marketplaceOrder?.id}
              fee={fee}
              event_id={marketplaceOrder?.id}
            // parentData={parentData}
            />
          </>
        </View>
      </>
    </>
  );
};

export default MarketPlaceShipingComp;
