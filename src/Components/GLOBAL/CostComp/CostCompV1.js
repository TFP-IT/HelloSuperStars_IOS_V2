import React, {useContext} from 'react';
import {View, Text, SafeAreaView, ImageBackground, Image} from 'react-native';
import styles from './styles';

import Heading from '../Reuseable/Heading';
import UnderlineImage from '../Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';

const CostCompV1 = ({title, amount, stars = null}) => {
  const {currencyCount, currency} = useContext(AuthContext);
  // console.log('Currency', currency);
  const {themeCardColor} = useThemeColor();
  return (
    <>
      <ImageBackground
        imageStyle={{
          borderRadius: 10,
        }}
        style={styles.greetingsRequest}
        source={imagePath.backgroundImage02}>
        <View style={{margin: 13, borderRadius: 15, overflow: 'hidden'}}>
          {title === 'With' ? (
            <>
              <Heading heading="With" />
              {/* <UnderlineImage /> */}
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: 'black',
                  marginVertical: 0,
                  marginHorizontal: 10,
                }}
              />
              <View style={styles.costBg}>
                <View
                  style={{
                    padding: 15,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {stars &&
                    stars?.map((star, index) => {
                      return (
                        <Image
                          key={index}
                          style={styles.starCardImg}
                          source={
                            !star?.user?.image
                              ? imagePath.defultStarprofile
                              : {
                                  uri: `${AppUrl.imageCdn + star?.user?.image}`,
                                }
                          }
                        />
                      );
                    })}
                </View>
              </View>
            </>
          ) : (
            <>
              <Heading heading="Cost" />
              {/* <UnderlineImage /> */}
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: 'black',
                  marginVertical: 0,
                  marginHorizontal: 10,
                }}
              />
              <View style={styles.costBg}>
                <View style={{padding: 15}}>
                  <Text style={styles.greetingsCostText}>{title}</Text>
                  <Text style={styles.twoFiftySix}>
                    {amount} {currency.symbol}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </>
  );
};

export default CostCompV1;
