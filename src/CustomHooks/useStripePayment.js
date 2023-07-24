import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../Constants/context';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'react-native';
import AppUrl from '../RestApi/AppUrl';
import Toast from 'react-native-root-toast';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../Constants/navigationStrings';

export const useStripePayment = data => {
  const [reciveData, setReciveData] = useState(data);
  const {axiosConfig} = useContext(AuthContext);
  const [stripeError, setStripeError] = useState(null);
  const [stripeBuffer, setStripeBuffer] = useState();
  const [stripePaymentStatus, setStripePaymentStatus] = useState(false);
  const Navigation = useNavigation();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log('data from stripe ok', data);
    HandelStripePayment(data);
  }, []);

  const HandelStripePayment = data => {
    //console.log('data load', data);
    setStripeBuffer(false);
    axios
      .post(AppUrl.stripeMobilePayment, data, axiosConfig)
      .then(res => {
        setStripeBuffer(true);
        console.log('ok', res.data);
        let data = {
          paymentIntent: res.data.paymentIntent,
          ephemeralKey: res.data.ephemeralKey,
          customer: res.data.customer,
          publishableKey: res.data.publishableKey,
        };
        initializePaymentSheet(data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        setStripeError(err);
      });
  };

  const initializePaymentSheet = async data => {
    const {error} = await initPaymentSheet({
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      paymentIntentClientSecret: data.paymentIntent,
      merchantDisplayName: 'Hellosuperstars',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async data => {
    // HandelStripePayment()
    console.log('stripe payClick');
    const {error} = await presentPaymentSheet();

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
      Toast.show(error.message, Toast.durations.SHORT);
    } else {
      setStripePaymentStatus(true);

      // Navigation.navigate(navigationStrings.HOME)
      //Alert.alert('Success', 'Your order is confirmed!');
      if (reciveData.event_type === 'marketplace') {
        Toast.show('Payment added', Toast.durations.SHORT);

        return Navigation.goBack();
      }

      if (reciveData.event_type !== 'videoFeed') {
        // data.redirect == false ? null :
        Navigation.navigate(navigationStrings.HOME);
      }

      Toast.show('Payment added', Toast.durations.SHORT);
    }
  };

  return {
    stripeBuffer,
    stripeError,
    HandelStripePayment,
    openPaymentSheet,
    stripePaymentStatus,
  };
};
