import {StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import imagePath from '../../../Constants/imagePath';
import colorCode from '../../../Constants/colorCode';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';

const imageWidth = Dimensions.get('window').width;
const imageHeight = Dimensions.get('window').height;
const PhotosCard = ({imageUrl, onPress}) => {
  return (
    <>
      {imageUrl && (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={onPress}
          style={{
            width: imageWidth / 2.5,
            height: imageHeight / 4,
            borderWidth: 1,
            borderColor: '#575757',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={!imageUrl ? imagePath.noImage1 : {uri: imageUrl}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default PhotosCard;

const styles = StyleSheet.create({});
