import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const StarShowCaseButton = ({onPress, title, imagePath, isActive}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.sliderItem}
        colors={
          isActive
            ? ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
            : ['#dbbc0c', '#310404']
        }>
        <View>
          <View style={styles.topView}>
            <LinearGradient
              colors={
                isActive
                  ? ['#ffffff', '#ffffff']
                  : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
              }
              style={styles.iconView2}>
              <Image source={imagePath} style={{height: 30, width: 30}} />
            </LinearGradient>
          </View>
          <Text style={styles.TextView}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StarShowCaseButton;

const styles = StyleSheet.create({
  sliderItem: {
    height: 80,
    width: 80,
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  iconView2: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
