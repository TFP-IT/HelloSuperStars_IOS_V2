import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-root-toast';
import React, {useState, useContext} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../Constants/navigationStrings';
import HeaderComp from '../../Components/HeaderComp';
import LoaderComp from '../../Components/LoaderComp';
import {AuthContext} from '../../Constants/context';
import AppUrl from '../../RestApi/AppUrl';
import axios from 'axios';
const ShujoyPay = ({route}) => {
  const {
    checkOutUrl,
    redirect = null,
    PackegeId = null,
    buyFor = null,
  } = route.params;

  let Navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {
    getActivity,
    axiosConfig,
    getWaletInformation,
    setShurjoPayment,
    shurjoPayment,
  } = useContext(AuthContext);

  const handelBuyPackage = () => {
    if (PackegeId) {
      let PackageData = {
        card_holder_name: '',
        packages_id: PackegeId,
        card_no: '',
        card_expire_date: '',
        card_cvv: '',
        type: buyFor,
      };

      axios
        .post(AppUrl.BuyPackages, PackageData, axiosConfig)
        .then(res => {
          getWaletInformation();
        })
        .catch(err => {});
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <HeaderComp />
      {visible && <LoaderComp />}

      <WebView
        source={{uri: checkOutUrl}}
        onMessage={event => {
          setShurjoPayment(true);
          if (PackegeId) {
            handelBuyPackage();
          }

          if (redirect != false) {
            if (event.nativeEvent.data == 'go-back') {
              Toast.show('Payment Success', Toast.SHORT);
              Navigation.navigate(navigationStrings.HOME);
            } else {
              null;
            }
          } else {
            Navigation.goBack();
          }
          getActivity();
        }}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
    </View>
  );
};

export default ShujoyPay;

const styles = StyleSheet.create({});
