//import liraries
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoaderComp from '../../Components/LoaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';

// create a component
const Otp = ({ route }) => {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const { phone, user = null } = route.params;
  const { axiosConfig, authContext } = useContext(AuthContext);
  const [buffer, setBuffer] = useState(false);
  const [error, setError] = useState(null);

  const [counter, setCounter] = useState(30);
  const [data, setData] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const OtpVerification = () => {
    setBuffer(true);
    // console.log()
    const fdata = {
      otp: data,
    };

    axios
      .post(AppUrl.OtpVerification, fdata, axiosConfig)
      .then(res => {
        setBuffer(false);
        if (res.data.status === 200) {
          if (user) {
            authContext.signIn(user.token, user.information);
          } else {
            Navigation.navigate('userInformation');
          }
        } else {
          setError(res.data.message);
        }
      })
      .catch(err => {
        setBuffer(false);
        // alert('network problem')
        //Navigation.navigate('userInformation')
      });
  };

  return (
    <>
      {buffer ? <LoaderComp /> : <></>}
      <KeyboardAwareScrollView>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={styles.container}>
          {/* <View style={styles.header}>
            
                        <Animatable.Image
                            animation="pulse"
                            iterationCount="infinite"
                            // duration="1500"
                            
                            source={imagePath.logo}
                            style={{ height:150, width:150 }}
                            />
                            
                    </View> */}

          <Animatable.View
            style={
              windowWidth > 600 ? styles.OtpBodywidthScreen : styles.OtpBody
            }
            animation="zoomIn">
            <Text style={styles.title}>OTP </Text>
            <Text style={styles.text}>
              We have sent an OTP number to your phone {phone}. Enter the OTP
              below to verify your identity
            </Text>

            <OTPInputView
              style={{ width: '100%', height: 70 }}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setData(code);
              }}
            />

            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            <Text style={styles.text}>Time left {counter} sec</Text>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={
                  counter == 0 ? styles.resent_btn : styles.resent_btn_disable
                }>
                <Text
                  style={
                    counter == 0
                      ? { color: '#ffff' }
                      : { color: 'rgba(255, 255, 255, 0.295)' }
                  }>
                  RESENT
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continue_btn}
                disabled={data ? false : true}
                onPress={OtpVerification}>
                <Text style={styles.input_title}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 809,
    justifyContent: 'center',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#F6F6F6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D4AF37',
  },

  underlineStyleHighLighted: {
    borderColor: '#F6F6F6',
  },
  text: {
    color: '#D4AF37',
    fontSize: 14,
    marginVertical: 2,
  },

  optContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#D4AF37',
  },
  input_title: {
    color: '#ffff',
  },

  //   header: {
  //        flex: 2,
  //       justifyContent: 'center',
  //       alignItems: 'center'
  //   },
  OtpBody: {
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderWidth: 0.3,
    borderColor: '#F6F6F6',
  },
  OtpBodywidthScreen: {
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    borderWidth: 0.3,
    borderColor: '#F6F6F6',
    marginHorizontal: 200,
  },

  title: {
    color: '#D4AF37',
    fontSize: 30,
    fontWeight: 'bold',
  },

  btn_container: {
    flexDirection: 'row',
    // marginTop: 20,
    justifyContent: 'space-between',
    gap: 5,
  },

  continue_btn: {
    backgroundColor: '#D4AF37',
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },

  resent_btn: {
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },
  resent_btn_disable: {
    borderWidth: 1,
    borderColor: '#d4af3756',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },
});

//make this component available to the app
export default Otp;
