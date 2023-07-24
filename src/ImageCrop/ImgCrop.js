import { TouchableOpacity, View, Text, Platform, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../permission';
import RNFS from 'react-native-fs';

export default function ImgCrop() {
  const [imgSrc, setImgSrc] = useState('')
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    }
  }
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path)
      setImgSrc(image.path)
    });
  }

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("selected Image", image.path)
      setImgSrc(image.path)

    });
  }
  RNFS.readFile(imgSrc, 'base64')
    .then(res => {
      console.log('========>baseData', res);
    });


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Image source={{ uri: imgSrc ? imgSrc : "https://picsum.photos/200", width: 200, height: 200, }} style={{ margin: 10, }} />
      {/* <Image source={{uri:imgSrc?imgSrc:"https://picsum.photos/200", width:100,height:100 }} style={{margin:10,borderRadius:100}}/> */}
      <TouchableOpacity onPress={onSelectImage} activeOpacity={0.8} style={{ backgroundColor: '#ffaa00', padding: 10 }}>
        <Text>Upload Image</Text>
      </TouchableOpacity>
    </View>
  )
}