import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import imagePath from '../../../Constants/imagePath';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../../Constants/imagePath';
const SouvenorCard = ({status, img}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 10,
        height: 170,
        backgroundColor: '#FFB925',
        width: '45%',
        borderRadius: 10,
        position: 'relative',
      }}>
      <Image source={imagePath.titleTopBanner} style={{zIndex: 1}} />
      <Image
        source={img}
        style={{
          position: 'absolute',
          zIndex: 0,
          resizeMode: 'stretch',
          width: '100%',
        }}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{backgroundColor: '#FFB925', width: '80%', borderRadius: 15}}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: 5,
              fontSize: 14,
              color: 'black',
              paddingHorizontal: 3,
            }}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            width: '80%',
            borderRadius: 15,
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('SouvinerInvoice')}>
          <View style={{marginHorizontal: 5}}>
            <Icon name="cloud-download" size={20} color="white" />
          </View>
          <View style={{marginHorizontal: 3}}>
            <Text style={{color: 'white'}}>INVOICE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SouvenorCard;

const styles = StyleSheet.create({});
