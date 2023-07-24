import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const AuditionTimer = () => {
  return (
    <View
    style={{
    
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
 
    }}>
    <View >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#ECA81D',
          justifyContent: 'center',
          borderRadius: 5,
          paddingVertical: 4,
        }}>
        <View
          style={{
            backgroundColor: 'black',
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
          <MaterialCommunityIcons
            name="alarm"
            color={'#ECA81D'}
            size={18}
          />
        </View>
        <View
          style={{
            backgroundColor: 'black',
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
          <Text style={{color: 'gold', fontSize: 10}}>Day</Text>
          <Text style={{color: 'gold'}}>01</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
          <Text style={{color: 'gold', fontSize: 10}}>Hou</Text>
          <Text style={{color: 'gold'}}>01</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
          <Text style={{color: 'gold', fontSize: 10}}>Min</Text>
          <Text style={{color: 'gold'}}>01</Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            height: 40,
            width: 40,
          }}>
          <Text style={{color: 'gold', fontSize: 10}}>Sec</Text>
          <Text style={{color: 'gold'}}>01</Text>
        </View>
      </View>
    </View>
  </View>
  )
}

export default AuditionTimer

const styles = StyleSheet.create({})