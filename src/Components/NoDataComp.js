import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import imagePath from '../Constants/imagePath';
import {useThemeColor} from '../CustomHooks/useThemeColor';

const NoDataComp = () => {
  const {themeTextColor} = useThemeColor();
  return (
    <View style={{justifyContent: 'center'}}>
      <View
        style={{
          height: 400,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Image
          source={imagePath.noMorPost}
          style={{height: 150, width: 180, marginTop: 10}}
          resizeMode="contain"
        />
        <Text style={[themeTextColor, {fontSize: 16}]}>
          🙂 no more post yet !
        </Text>
      </View>
    </View>
  );
};

export default NoDataComp;

const styles = StyleSheet.create({});
