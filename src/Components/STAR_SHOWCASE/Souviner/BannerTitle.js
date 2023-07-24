import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import React from 'react'
import imagePath from '../../../Constants/imagePath'

const BannerTitle = (props) => {
  return (
    <ImageBackground
        source={imagePath.titleBanner}
        resizeMode={'stretch'}
        style={{
          margin: 10,
          height: 40,
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
         {props.title}
        </Text>
      </ImageBackground>
  )
}

export default BannerTitle

const styles = StyleSheet.create({})