//import liraries
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
// import {LinearTextGradient} from 'react-native-text-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoaderComp from '../../Components/LoaderComp';
import {AuthContext} from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import navigationStrings from '../../Constants/navigationStrings';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  GOLD,
  LINEAR_GOLD_ARRAY,
  PLACE_HOLDER_COLOR,
} from '../../Constants/HssColors';
import PhoneInput from 'react-native-phone-number-input';
import colorCode from '../../Constants/colorCode';
// create a component
const Login = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const {authContext, getActivity, currency, locationInfo} =
    useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [buffer, setBuffer] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(true);
  const [customCheck, setCustomCheck] = useState(false);

  const [isPhone, setIsPhone] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const phoneInput = useRef(null);

  useEffect(() => {
    getActivity();
    console.log('phone info', locationInfo);
  }, []);

  const HandelLogin = () => {
    setBuffer(true);

    if (email != null || pass != null) {
      const data = {
        email: isPhone
          ? phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
              .formattedNumber
          : email,
        password: pass,
      };

      console.log('djhfksj____', data);
      // return

      axios
        .post(AppUrl.UserLogin, data)
        .then(res => {
          if (res.data.status === 200) {
            // if (res?.data?.user?.status == 0) {
            //   setBuffer(false);
            //   authContext.signUp(res.data.token, res.data.user);
            //   navigation.navigate('category')

            // } else if (res?.data?.user?.otp_verified_at) {

            let userInfo = {
              id: res.data.id,
              name: res.data.name,
              image: res.data.image,
            };
            setBuffer(false);
            authContext.signIn(res.data);

            // } else if (res?.data?.user?.otp_verified_at) {

            // } else {
            //   authContext.signUp(res.data.token, res.data.user);
            //   navigation.navigate('Otp', {
            //     phone: res.data.user.phone,
            //     user: {
            //       token: res.data.token,
            //       information: res.data.user,
            //     },
            //   });
            // }
          } else {
            setBuffer(false);
            setError('user and password not match !!');
          }
        })
        .catch(err => {
          Toast.show(
            'Network Problem, Check you Internet',
            Toast.durations.SHORT,
          );
          setBuffer(false);
          console.log(err);
        });
    } else {
      setError('All field required !!');
      setBuffer(false);
    }
  };

  const getUserName = value => {
    setIsFocus(true);
    const phoneNumberRegex = /(\+?\d{1,2}[\s-]?)?\(?\d{1}\)?[\s-]?\d{1}/;

    if (phoneNumberRegex.test(value) && value.length < 3) {
      setEmail(value);
      setIsPhone(true);
    } else {
      // setIsPhone(false)
      setEmail(value);
    }
    // console.log('usename value', value)
  };

  return (
    <>
      {buffer ? <LoaderComp /> : <></>}
      <KeyboardAwareScrollView>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={
            windowWidth > 600 ? styles.containerWideScreen : styles.container
          }>
          <View style={styles.header}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              source={imagePath.logo}
              style={{
                height: responsiveHeight(23),
                width: responsiveScreenWidth(35),
                resizeMode: 'contain',
              }}
            />
          </View>

          <Animatable.View style={styles.footer} animation="slideInUp">
            <Text style={styles.title}>LOGIN</Text>

            <Text style={styles.inputText}>Phones / Email </Text>
            <View style={styles.input}>
              {!isPhone ? (
                <>
                  <Icon
                    name="user"
                    color={GOLD}
                    size={20}
                    style={styles.Icon}
                  />
                  <TextInput
                    placeholder="Phone (without county code) or Email !"
                    style={styles.input_fild}
                    // keyboardType='numeric'
                    autoFocus={isFocus}
                    placeholderTextColor={PLACE_HOLDER_COLOR}
                    onChangeText={newText => getUserName(newText)}
                    value={email}
                  />
                </>
              ) : (
                <PhoneInput
                  containerStyle={[
                    styles.input_fild,
                    {backgroundColor: '#24242400'},
                  ]}
                  ref={phoneInput}
                  textContainerStyle={{
                    paddingVertical: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                    backgroundColor: '#24242400',
                  }}
                  codeTextStyle={{
                    fontSize: 13,
                    color: colorCode.gold,
                    padding: 0,
                    fontWeight: 'normal',
                  }}
                  textInputStyle={{
                    fontSize: 13,
                    color: colorCode.gold,
                    padding: 0,
                  }}
                  flagButtonStyle={{width: 48}}
                  autoFocus={isFocus}
                  defaultValue={email}
                  defaultCode={
                    locationInfo?.countryCode ? locationInfo.countryCode : 'BD'
                  }
                  withDarkTheme
                  onChangeFormattedText={number => getUserName(number)}
                />
              )}
            </View>

            <Text style={{color: 'red', marginLeft: 8, marginBottom: -10}}>
              {error}
            </Text>

            <Text style={styles.inputText}>Password</Text>
            <View style={styles.input}>
              <Icon name="lock" color={GOLD} size={20} style={styles.Icon} />
              <TextInput
                placeholder="Enter Your Password !"
                style={styles.input_fild}
                placeholderTextColor={PLACE_HOLDER_COLOR}
                secureTextEntry={showPass}
                onChangeText={newText => setPass(newText)}
              />
              <TouchableOpacity
                style={styles.password}
                onPress={() => setShowPass(!showPass)}>
                {showPass ? (
                  <Entypo name="eye-with-line" size={18} color={GOLD} />
                ) : (
                  <Entypo name="eye" size={18} color={GOLD} />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setCustomCheck(!customCheck)}>
                <Text style={{color: '#9e9e9e', fontSize: 12}}>
                  <Ionicons
                    name={customCheck ? 'checkbox-outline' : 'checkbox'}
                    color={GOLD}
                    size={15}
                  />
                  Remember me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.FORGETPASSWORD)
                }>
                <Text style={{color: '#9e9e9e', fontSize: 12}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.sign_btn}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.input_title}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1}} onPress={HandelLogin}>
                <LinearGradient
                  style={styles.sign_btn}
                  colors={LINEAR_GOLD_ARRAY}>
                  <Text style={{color: 'black'}}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </>
  );
};

const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
  },
  Icon: {
    // marginTop: 8,
  },
  password: {
    right: responsiveScreenWidth(3),
    marginTop: responsiveScreenHeight(1),
    position: 'absolute',
  },
  containerWideScreen: {
    flex: 1,
    height: windowHeight,
    paddingHorizontal: responsiveScreenWidth(7),
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ffaa00',
    paddingHorizontal: 10,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },
  input_fild: {
    // backgroundColor:'red',
    height: responsiveHeight(5.6),
    width: '90%',
    fontSize: responsiveFontSize(1.7),
    paddingHorizontal: 10,
    color: '#ffaa00',
  },
  inputText: {
    marginTop: responsiveHeight(1),
    marginLeft: responsiveHeight(1),
    color: GOLD,
  },
  input_title: {
    color: '#ddd',
  },

  header: {
    flex: 2,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.212)',

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  title: {
    color: GOLD,
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 2,
    // justifyContent: 'space-between',
    // backgroundColor:'pink'
  },

  login_btn: {
    borderWidth: 1,

    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },

  sign_btn: {
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 50,

    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 5,
    flex: 1,
    paddingVertical: 10,
    color: 'black',
  },
});

export default Login;
