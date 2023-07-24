import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import noImage from '../../../Assets/Images/no-image.png';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './AuctionProductCardStyle';

const { width } = Dimensions.get('window');

const AuctionProductCard = ({ data }) => {
  console.log(data);
  const { axiosConfig, currencyMulti, currencyCount, currency } =
    useContext(AuthContext);
  const Navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [isEnded, setIsEnded] = useState(null);
  const source = {
    html: `<div style='color:#e6e6e6'>${data ? data.details.slice(0, 100).concat(' ....') : ''
      }</div>`,
  };

  function handleStarProfile(star = null) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: star,
    });
  }
  const handleAuctionParticipate = () => {
    return Navigation.navigate(navigationStrings.AUCTIONPARTICIPATENOW, {
      product: data,
    });
  };
  const randerFlatListItem = ({ index }) => {
    return (
      <>
        <Image
          source={
            data?.product_image == null
              ? imagePath.Foot
              : {
                uri: `${AppUrl.MediaBaseUrl + data?.product_image}`,
              }
          }
          key={index}
          style={styles.postImageX}
        />
      </>
    );
  };
  const isComplete = async time => {
    const now = await moment.utc();
    console.log(time);
    var end = await moment(time);
    var hours = now.diff(end, 'hours');
    console.log('time diff', hours);
    if (hours < 0) {
      setIsEnded(false);
      return false;
    } else {
      setIsEnded(true);
      return true;
    }
  };
  useEffect(() => {
    isComplete(data.bid_to);
  }, []);
  return (
    <ScrollView>
      <View style={styles.MaiN}>
        <View style={styles.mainView}>
          <View style={{ flexDirection: 'row', margin: 10 }}>
            <View style={{ width: '40%', borderWidth: 1, borderColor: 'gray' }}>
              {/* <Image style={{height:'100%',resizeMode:'stretch'}}  source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/002/041/725/original/motion-of-opened-book-on-desk-static-shot-free-video.jpg'}} /> */}

              <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                data={[1, 2, 3, 4]}
                renderItem={randerFlatListItem}
              />

              {/* <SwiperFlatList
                autoplay
                autoplayDelay={5}
                autoplayLoop
                data={[1, 2, 3, 4]}
                renderItem={randerFlatListItem}
              /> */}
            </View>
            <View style={styles.mainView2}>
              <Text style={{ color: 'white', fontSize: 18 }}>{data.title}</Text>

              <View style={{ height: 100, width: '100%' }}>
                <RenderHtml contentWidth={width} source={source} />
              </View>

              <View style={styles.PriceRow}>
                <View>
                  <Text style={styles.Price}>
                    {currencyCount(data?.base_price) + ' ' + currency.symbol}
                  </Text>
                </View>
                <View>
                  <Text style={styles.PriceBest}>Base Price</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => handleStarProfile(data?.star)}>
                <View style={styles.View3}>
                  <View style={{ justifyContent: 'center' }}>
                    {data?.star?.image !== null ? (
                      <>
                        <Image
                          style={{ width: 30, height: 30, borderRadius: 15 }}
                          source={{
                            uri: `${AppUrl.MediaBaseUrl + data?.star?.image}`,
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          style={{ width: 30, height: 30, borderRadius: 15 }}
                          source={noImage}
                        />
                      </>
                    )}
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: 'gray', marginLeft: 2 }}>Owner</Text>
                    <Text style={styles.Owner}>
                      {' '}
                      {data?.star?.first_name +
                        ' ' +
                        data?.star?.last_name}{' '}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {isEnded ? (
                <TouchableOpacity disabled={true}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#AD850C', '#AD850C']}
                    style={{ borderRadius: 15 }}>
                    <Text style={styles.Btn}>Participate</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleAuctionParticipate}>
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
                    <Text style={styles.Btn}>Participate</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuctionProductCard;
