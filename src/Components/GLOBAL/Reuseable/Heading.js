import React from 'react';
import {View, Text} from 'react-native';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';

function Heading({heading}) {
  const {themeTextColor} = useThemeColor();
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        style={[
          {
            textAlign: 'center',
            color: '#FFAD00',
            marginTop: 10,
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '500',
          },
          themeTextColor,
        ]}>
        {heading}
      </Text>
    </View>
  );
}

export default Heading;
