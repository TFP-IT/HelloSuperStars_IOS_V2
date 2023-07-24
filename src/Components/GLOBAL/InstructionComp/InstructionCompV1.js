import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import TitleHeader from '../../TitleHeader';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';
// import {LinearTextGradient} from 'react-native-text-gradient';
import he from 'he';
import imagePath from '../../../Constants/imagePath';
import UnderlineImage from '../Reuseable/UnderlineImage';

function InstructionCompV1({title, instruction}) {
  const {width} = useWindowDimensions();
  const {themeCardColor, themeTextColor} = useThemeColor();
  const insText = instruction ? instruction : '';
  const insDetailsText = he.decode(insText).replace(/<[^>]+>/g, '');
  return (
    <>
      <View style={styles.topCard}>
        <ImageBackground
          resizeMode="cover"
          imageStyle={{
            borderRadius: 10,
          }}
          style={{width: '100%', paddingVertical: 15}}
          source={imagePath.backgroundImage01}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {title}
          </Text>
          {/* <UnderlineImage /> */}
          <View
            style={{
              borderWidth: 0.3,
              borderColor: 'black',
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
              textAlign: 'justify',
              textTransform: 'capitalize',
              color: 'white',
            }}>
            {insDetailsText}
          </Text>
        </ImageBackground>
      </View>
    </>
  );
}

export default InstructionCompV1;

const styles = StyleSheet.create({
  topCard: {
    margin: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
