import React from 'react';
import {StyleSheet, View} from 'react-native';
import BannerTitle from '../../Components/STAR_SHOWCASE/Souviner/BannerTitle';
import imagePath from '../../Constants/imagePath';

import {ScrollView} from 'react-native';
import SouvenorCard from '../../Components/STAR_SHOWCASE/Souviner/SouvenorCard';
const StarShowCase = () => {
  return (
    <ScrollView style={styles.container}>
      <BannerTitle title="Souvenir" />

      {/* =====card start here===  */}
      <View style={{flexDirection: 'row'}}>
        <SouvenorCard status="SOUVENIR STATUS" img={imagePath.starSign} />
        <SouvenorCard status="SOUVENIR STATUS" img={imagePath.starSign} />
      </View>
      <BannerTitle title="Market Place" />
      <View style={{flexDirection: 'row'}}>
        <SouvenorCard status="DELIVERY STATUS" img={imagePath.football} />
        <SouvenorCard status="DELIVERY STATUS" img={imagePath.football} />
      </View>

      <BannerTitle title="Aucations" />
      <View style={{flexDirection: 'row'}}>
        <SouvenorCard status="AUCTION STATUS" img={imagePath.jersey} />
        <SouvenorCard status="AUCTION STATUS" img={imagePath.jersey} />
      </View>
      {/* =====card end here===  */}
    </ScrollView>
  );
};

export default StarShowCase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
