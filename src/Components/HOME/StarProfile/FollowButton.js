import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import colorCode from '../../../Constants/colorCode';

const FollowButton = ({btnText, onPress, follow = false}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.4}
      style={[
        styles.followBtn,
        follow
          ? {backgroundColor: colorCode.gold}
          : {borderWidth: 1, borderColor: colorCode.gold},
      ]}>
      <Text
        style={[
          styles.followBtnText,
          follow
            ? {color: colorCode.textColorDarkL}
            : {color: colorCode.textColorLight},
        ]}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  followBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followBtnText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
