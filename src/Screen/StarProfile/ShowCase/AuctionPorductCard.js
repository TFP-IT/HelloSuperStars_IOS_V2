import React, { useContext } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import showcaseNavigator from './showcaseNavigator';
import styles from './styles';
import AppUrl from '../../../RestApi/AppUrl';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../Constants/navigationStrings';
import { AuthContext } from '../../../Constants/context';
import RenderHTML from 'react-native-render-html';
const AuctionProductCard = props => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { setProduct, starId, product, item } = props;
  //console.log('item', item);
  const source = {
    html: `<div style='color:#e6e6e6'>${props?.details ? props?.details.slice(0, 100).concat(' ....') : ''
      }</div>`,
  };
  const { currencyCount, currency } = useContext(AuthContext);

  return (
    <>
      <View style={styles.MaiN}>
        <View style={styles.mainView}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={{ width: '40%' }}>
              <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                width={130}>
                <Image
                  source={{
                    uri: `${AppUrl.MediaBaseUrl + props.productImg}`,
                  }}
                  style={styles.postImageX}
                />
              </SwiperFlatList>
            </View>
            <View style={styles.mainView2}>
              <Text style={{ color: 'white', fontSize: 18 }}>{props.name}</Text>

              <View style={{ height: 100, width: '100%' }}>
                <RenderHTML contentWidth={width} source={source} />
              </View>

              <Image
                source={{ uri: `${AppUrl.MediaBaseUrl + props.productImg}` }}
              />

              <View style={styles.PriceRow}>
                <View>
                  <Text style={styles.Price}>
                    {currencyCount(props.price) + ' ' + currency.symbol}
                  </Text>
                </View>
                <View>
                  <Text style={styles.PriceBest}>Base Price</Text>
                </View>
              </View>

              <View style={styles.View3}>
                <View style={{ justifyContent: 'center' }}>
                  <Image source={props.ownerImg} />
                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: 'gray', marginLeft: 2 }}>Owner</Text>
                  <Text style={styles.Owner}> {props.owerName} </Text>
                </View>
              </View>

              {new Date(props.productDetails.bid_to).getTime() <
                new Date().getTime() ? (
                <TouchableOpacity disabled={true}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#AD850C', '#AD850C']}
                    style={{ borderRadius: 15 }}>
                    <Text style={styles.Btn}>{props.buttonText}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setProduct(props.productDetails);
                    navigation.navigate(
                      navigationStrings.AUCTIONPARTICIPATENOW,
                      {
                        product: props.productDetails,
                      },
                    );
                  }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[
                      '#FFAD00',
                      '#FFD273',
                      '#E19A04',
                      '#FACF75',
                      '#E7A725',
                      '#FFAD00',
                    ]}
                    style={{ borderRadius: 15 }}>
                    <Text style={styles.Btn}>{props.buttonText}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AuctionProductCard;
