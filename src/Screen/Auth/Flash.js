//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { cleanSingle } from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';

const Flash = () => {
  const { getActivity, currency, signInPromo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [music, setMusic] = React.useState(null);
  const [seconds, setSeconds] = React.useState(5);
  const [check, setCheck] = React.useState(true);
  const redirect = useRef(null);



  React.useEffect(() => {
    getActivity();
    retrieveData();
    play();

    redirect.current = setTimeout(() => {
      navigation.navigate('Login')
      setCheck(false)
      // redirectLoginPage()
    }, 2000)
  }, []);

  useEffect(() => {
    check && redirectLoginPage()
  }, [currency])



  // useEffect(
  //   () => {
  //     timer();
  //     if (seconds === 'redirect') {
  //       redirectLoginPage();
  //     }
  //   },
  //   check ? [] : null,
  // );

  // function timer() {
  //   if (seconds > 0) {
  //     setTimeout(() => setSeconds(seconds - 1), 1000);
  //   } else {
  //     setSeconds('redirect');
  //   }
  // }

  const retrieveData = async () => {

    try {
      const value = await AsyncStorage.getItem('auth_token');
      if (value !== null) {
        navigation.navigate('Login');
      }
    } catch (error) { }
  };

  const redirectLoginPage = () => {
    if (currency?.status) {
      // music.stop();
      // clearInterval(redirect.current);
      // }, 5000)
      navigation.navigate(currency?.eventMode && signInPromo?.status !== "logout" ? 'SignUp' : 'Login');
      clearInterval(redirect.current);

    }

  };



  const handelTour = () => {
    if (currency?.status) {
      clearInterval(redirect.current);
      music.stop()
      navigation.navigate('virtualTour');
    }
  };

  const play = () => {
    let summer = new Sound('summer.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('error', err);
        return;
      }
      summer.play(success => {
        console.log('music playing', success);
      });
    });
    //  console.log('success,', summer);
    setMusic(summer);
  };

  return (
    <ImageBackground
      source={imagePath.background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View>

        <TouchableOpacity onPress={() => {
          // redirectLoginPage()
          clearInterval(redirect.current)
          navigation.navigate('Login')
          setCheck(false)
        }}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"


            source={imagePath.logo}
            style={{ height: 200, width: 200 }}
          />
        </TouchableOpacity>

        <Animatable.View
          style={styles.virtual_tour_btn}
        >
          <TouchableOpacity
            style={styles.virtualContainer}
            onPress={handelTour}>
            <LinearGradient
              style={styles.virtualBtn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MatarialIcon name="play-circle-fill" color="black" size={20} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Text style={styles.virtual_tour_btn_text}>Virtual Tour</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ImageBackground>
  );
};


const { height } = Dimensions.get('screen');


const styles = StyleSheet.create({


  virtual_tour_btn: {

    alignItems: 'center',

    marginTop: 40,
  },
  virtual_tour_btn_text: {
    color: 'black',
    // fontWeight: 'bold',
    paddingVertical: 10,
    borderRadius: 50,
    textAlign: 'center',
  },
  virtualContainer: {
    width: '80%',
  },
  virtualBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});


export default Flash;
