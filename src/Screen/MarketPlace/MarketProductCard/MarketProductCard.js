import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import noImage from '../../../Assets/Images/no-image.png';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './MarketProductCardStyle';

const MarketProductCard = ({ data }) => {
  const { width } = useWindowDimensions();
  const Navigation = useNavigation();
  const { currencyCount, currency } = useContext(AuthContext);


  const source = {
    html: `<div style='color:#e6e6e6'>${data ? data.description.slice(0, 100).concat(' ....') : ''
      }</div>`,
  };

  const handleProductBuy = () => {
    return Navigation.navigate(navigationStrings.BUYMARKETPLACEPRODUCT, {
      product: data,
    });
  };

  function handleStarProfile(star = null) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: star,
    });
  }

  return (

    <View style={styles.mainView}>
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{ width: '45%', position: 'relative' }}>
          <Image
            source={
              data.image == null
                ? noImage
                : {
                  uri: `${AppUrl.imageCdn + data.image}`,
                }
            }
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              borderRadius: 5,
              borderWidth: 2,
              borderColor: '#343434',
            }}
          />
        </View>
        <View style={styles.mainView2}>
          <Text style={{ color: 'white', fontSize: 18, marginBottom: -8 }}>
            {data.title}
          </Text>

          <View style={{ width: '100%' }}>

            {/* <RenderHtml contentWidth={width} source={source} /> */}
          </View>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            {currencyCount(data.unit_price)}
            <Text style={{ color: 'white', fontSize: 12 }}>
              {' '}
              {currency.symbol}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => handleStarProfile(data?.superstar)}>
            <View style={styles.View3}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {data?.superstar?.image == null ? (
                  <Image
                    source={imagePath.defultImage}
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: `${AppUrl.imageCdn + data?.superstar?.image}`,
                    }}
                    style={{
                      marginLeft: 8,
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'gold',
                    }}
                  />
                )}
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ color: 'gray', marginLeft: 2 }}>Superstar</Text>
                <Text
                  style={{ color: 'white', marginLeft: 2, fontWeight: 'bold' }}>
                  {data?.superstar?.first_name} {data?.superstar?.last_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProductBuy}>
            <LinearGradient
              style={{ borderRadius: 18 }}
              colors={[
                '#FFAD00',
                '#FFD273',
                '#FACF75',
                '#E7A725',
                '#FFAD00',
              ]}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  paddingVertical: 7,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Buy Now !
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

export default MarketProductCard;
