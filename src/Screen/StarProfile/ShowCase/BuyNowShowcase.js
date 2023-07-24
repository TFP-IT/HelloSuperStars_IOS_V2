import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../../Constants/imagePath';
import styles from './styles';
const BuyNowShowcase = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView>
          <View style={styles.row1}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                '#FFAD00',
                '#FFD273',
                '#E19A04',
                '#FACF75',
                '#E7A725',
                '#FFAD00',
              ]}
              style={{borderRadius: 15}}>
              <Text style={styles.AuctionT}>MarketPlace</Text>
            </LinearGradient>
          </View>

          <View style={styles.MaiN}>
            <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop>
              <Image source={imagePath.Foot} />
              <Image source={imagePath.Foot} />
              <Image source={imagePath.Foot} />
              <Image source={imagePath.Foot} />
            </SwiperFlatList>
            <Text style={styles.FootH}>Signature Football</Text>
            <Text style={styles.FootSt}>Auction at 21-11-2022</Text>
            <Text style={styles.FootS}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </Text>

            <View style={styles.BtnBox}>
              <View style={styles.BtnBoxA}>
                <View style={styles.PriceTag}>
                  <Image
                    source={imagePath.PriceTag}
                    style={styles.PriceTagImg}
                  />
                </View>
                <View style={styles.PriceDollar}>
                  <Text style={styles.PriceDollarText}> Minimum Bid Price</Text>
                  <Text style={styles.PriceDollarTextB}> $ 120</Text>
                </View>
              </View>
              <View style={styles.BtnBoxA}>
                <View style={styles.PriceTag}>
                  <Image
                    source={imagePath.Delivery}
                    style={styles.PriceTagImgDeli}
                  />
                </View>
                <View style={styles.PriceDollar}>
                  <Text style={styles.PriceDollarText}> Total Bid</Text>
                  <Text style={styles.PriceDollarTextB}> 117</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.MaiN}>
            <View style={styles.Increment}>
              <View style={{flex: 2}}>
                <Image source={imagePath.BoxA} />
              </View>
              <View style={{flex: 4}}>
                <Text style={styles.TextEr}>Your quantity</Text>
              </View>
              <View style={styles.Increment1}>
                <View style={styles.Flex1}>
                  <TouchableOpacity onPress={decrement}>
                    <View style={styles.Minus}>
                      <Text style={styles.MinusText}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.Flex1}>
                  <Text style={styles.TextColorS}> {count} </Text>
                </View>

                <View style={styles.Flex1}>
                  <TouchableOpacity onPress={() => setCount(count + 1)}>
                    <View style={styles.Plus}>
                      <Text style={styles.PulsText}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.Increment}>
              <View style={{flex: 2}}>
                <Image source={imagePath.PriceTag} />
              </View>
              <View style={{flex: 4}}>
                <Text style={styles.TextEr}>Total Price</Text>
              </View>
              <View style={styles.Increment2}>
                <View style={styles.Flex1}>
                  <Text style={styles.TextColorS}> $ 320 </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                '#FFAD00',
                '#FFD273',
                '#E19A04',
                '#FACF75',
                '#E7A725',
                '#FFAD00',
              ]}
              style={styles.Buy}>
              <Text style={styles.BuyText}>Buy Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default BuyNowShowcase;
