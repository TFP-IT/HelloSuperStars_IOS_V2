import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FullScreenImage = ({ route, navigation }) => {
  const { imagePath } = route.params;
  const { themeBacground, themeIconColor } = useThemeColor();
  //console.log('image path', imagePath);
  return (
    <View style={[styles.container, themeBacground]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color={themeIconColor} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagePath }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
