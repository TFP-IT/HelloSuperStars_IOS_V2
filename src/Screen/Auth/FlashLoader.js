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
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';

const FlashLoader = () => {
  const navigation = useNavigation();
  const { loactionStatus } = useContext(AuthContext);

  React.useEffect(() => {
    loactionStatus && navigation.navigate('Tabs');
  }, [loactionStatus]);

  return (
    <ImageBackground
      source={imagePath.background}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <TouchableOpacity>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={imagePath.logo}
            style={{ height: 200, width: 200 }}
          />
        </TouchableOpacity>

        <Animatable.View style={styles.virtual_tour_btn}></Animatable.View>
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

export default FlashLoader;
