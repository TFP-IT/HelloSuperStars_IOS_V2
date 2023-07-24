import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colorCode from '../../../Constants/colorCode';

const NavigatorButton = ({onPress, title, isActive}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        isActive
          ? {backgroundColor: colorCode.gold}
          : {backgroundColor: colorCode.cardLight},
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={{color: colorCode.textColorDarkL, fontWeight: '500'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigatorButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 80,
    borderRadius: 10,
  },
});
