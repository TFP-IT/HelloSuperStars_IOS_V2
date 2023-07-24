import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import React from 'react';
import imagePath from '../../../Constants/imagePath';
export default function TopAuditonBanner({title}) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        <ImageBackground
          source={imagePath.AuditonBanner}
          style={{
            height: 80,
            width: '100%',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>{title}</Text>
        </ImageBackground>
      </View>
    </View>
  );
}
