import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const SeeMore = ({title}) => {
  return (
    <View style={{alignItems: 'center', marginTop: 10, marginBottom: 10}}>
      <TouchableOpacity
        style={{backgroundColor: '#FFAD00', width: 150, padding: 10, flexDirection: 'row', justifyContent: 'center', borderRadius: 10}}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeeMore;
