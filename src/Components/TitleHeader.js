import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useThemeColor} from '../CustomHooks/useThemeColor';

const TitleHeader = ({title}) => {
  const {themeCardColor, themeTextColor} = useThemeColor();
  return (
    <View
      style={[
        {
          backgroundColor: '#202020',
          margin: 10,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        },
        themeCardColor,
      ]}>
      <Text
        style={[
          styles.text,
          themeTextColor,
          {
            paddingVertical: 8,
            fontWeight: 'bold',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({});
