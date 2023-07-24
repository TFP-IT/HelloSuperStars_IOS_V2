import {Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
import colorCode from '../../../Constants/colorCode';
import imagePath from '../../../Constants/imagePath';

const AlreadyRegistered = () => {
  const {themeCardColor, themeTextColor} = useThemeColor();
  return (
    <ImageBackground
      source={imagePath.backgroundImage02}
      resizeMode="cover"
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          height: 250,
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: colorCode.transparentGold,
          marginVertical: 10,
          overflow: 'hidden',
        },
      ]}>
      <Text
        style={[{fontSize: 24, fontWeight: 'bold', color: colorCode.white}]}>
        Already Registered
      </Text>
    </ImageBackground>
  );
};

export default AlreadyRegistered;
