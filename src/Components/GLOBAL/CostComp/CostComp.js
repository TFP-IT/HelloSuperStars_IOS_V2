import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Image } from 'react-native';
import styles from './styles';

import Heading from '../Reuseable/Heading';
import UnderlineImage from '../Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';

const CostComp = ({ title, amount, stars = null }) => {
  const { currencyCount, currency } = useContext(AuthContext);
  return (
    <>
      <View style={styles.greetingsRequest}>
        <View style={{ margin: 13, borderRadius: 15, overflow: 'hidden' }}>
          {title === 'With' ? (
            <>
              <Heading heading="With" />
              <UnderlineImage />
              <ImageBackground style={styles.costBg} source={imagePath.Silver}>
                <View
                  style={{
                    padding: 15,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {stars?.map((star, index) => {
                    return (
                      <Image
                        style={styles.starCardImg}
                        source={{
                          uri: `${AppUrl.MediaBaseUrl + star?.user?.image}`,
                        }}
                      />
                    );
                  })}
                </View>
              </ImageBackground>
            </>
          ) : (
            <>
              <Heading heading="Cost" />
              <UnderlineImage />
              <ImageBackground
                style={styles.costBg}
                source={imagePath.greetingsBanner}>
                <View style={{ padding: 15 }}>
                  <Text style={styles.greetingsCost}>{title}</Text>
                  <Text style={styles.twoFiftySix}>
                    {amount} {currency.symbol}
                  </Text>
                </View>
              </ImageBackground>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default CostComp;
