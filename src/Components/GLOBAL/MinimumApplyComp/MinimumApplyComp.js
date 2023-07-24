import React from 'react';
import { View, Text, SafeAreaView, ImageBackground } from 'react-native';
import styles from './styles';
// import Heading from '../Reuseable/Heading';
// import UnderlineImage from '../Reuseable/UnderlineImage';

// import imagePath from '../../Constants/imagePath';
// import Heading from '../../Reuseable/Heading';
// import UnderlineImage from '../../Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import Heading from '../../GLOBAL/Reuseable/Heading';
import UnderlineImage from '../Reuseable/UnderlineImage';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';

const MinimumApplyComp = ({ title, amount }) => {
  // console.log('MinimumApplyComp------title------', title)
  // console.log('MinimumApplyComp------amount------', amount)
  const { themeCardColor } = useThemeColor();
  return (
    <>
      <View style={[styles.greetingsRequest, themeCardColor]}>
        <Heading heading="Minimum apply before" />
        <UnderlineImage />
        <View style={{ margin: 13, borderRadius: 15, overflow: 'hidden' }}>
          <ImageBackground
            style={styles.costBg}
            source={imagePath.greetingsBanner}>
            <View style={{ padding: 15 }}>
              <Text style={styles.greetingsCost}>{title}</Text>
              <Text style={styles.twoFiftySix}>{amount} Day</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </>
  );
};

export default MinimumApplyComp;
