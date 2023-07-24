import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../../Constants/imagePath';
import styles from './styles';
const BidNow = () => {
  const {width} = Dimensions.get('window');
  return (
    <>
      <View style={{marginHorizontal: 8}}>
        <View style={styles.rowX}>
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
            style={{borderRadius: 50}}>
            <Text style={styles.AuctionT}>Auction</Text>
          </LinearGradient>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.PText}>Bidding End Time</Text>
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
            style={{
              borderRadius: 50,
              paddingHorizontal: 5,
              paddingVertical: 8,
              marginTop: 8,
            }}>
            <View style={styles.DateHead}>
              <View style={styles.Clock}>
                <Image source={imagePath.ImgTimeC} style={styles.Img} />
              </View>
              <View style={styles.Clock1}>
                <View>
                  <Text style={styles.TextDate}>DAY</Text>
                </View>
                <View>
                  <Text style={styles.TextDateB}>01</Text>
                </View>
              </View>

              <View style={styles.Clock1}>
                <View>
                  <Text style={styles.TextDate}>HOUR</Text>
                </View>
                <View>
                  <Text style={styles.TextDateB}>23</Text>
                </View>
              </View>
              <View style={styles.Clock1}>
                <View>
                  <Text style={styles.TextDate}>MIN</Text>
                </View>
                <View>
                  <Text style={styles.TextDateB}>29</Text>
                </View>
              </View>
              <View style={styles.Clock1}>
                <View>
                  <Text style={styles.TextDate}>SEC</Text>
                </View>
                <View>
                  <Text style={styles.TextDateB}>03</Text>
                </View>
              </View>
            </View>
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
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </Text>

          <View style={styles.BtnBox}>
            <View style={styles.BtnBoxA}>
              <View style={styles.PriceTag}>
                <Image source={imagePath.PriceTag} style={styles.PriceTagImg} />
              </View>
              <View style={styles.PriceDollar}>
                <Text style={styles.PriceDollarText}> Minimum Bid Price</Text>
                <Text style={styles.PriceDollarTextB}> $ 120</Text>
              </View>
            </View>
            <View style={styles.BtnBoxA}>
              <View style={styles.PriceTag}>
                <Image source={imagePath.Bid} style={styles.PriceTagImgB} />
              </View>
              <View style={styles.PriceDollar}>
                <Text style={styles.PriceDollarText}> Total Bid</Text>
                <Text style={styles.PriceDollarTextB}> 117</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.LiveBidding}>Live Bidding</Text>
          <View style={styles.LiveBCar}>
            <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop>
              <View style={{marginRight: 8}}>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
                <View style={{height: 4}}></View>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
              </View>

              <View style={{marginRight: 8}}>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
                <View style={{height: 4}}></View>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
              </View>

              <View style={{marginRight: 8}}>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
                <View style={{height: 4}}></View>
                <View style={styles.LiveBCarB}>
                  <View style={styles.PriceLive}>
                    <Image source={imagePath.BidUser} style={styles.BidUser} />
                  </View>
                  <View style={styles.PriceLiveDate}>
                    <Text style={styles.PriceBD}>$ 310</Text>
                    <Text style={styles.BDname}> Aslam Uddin</Text>
                    <Text style={styles.BDdate}>18 -12-2021 5:40 PM</Text>
                  </View>
                </View>
              </View>
            </SwiperFlatList>
          </View>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.LiveBidding}>Live Bidding</Text>

          <View style={{marginHorizontal: 12, marginTop: 8}}>
            <Text style={styles.LiveBiddingP}>Price Your Bid</Text>
            <TextInput
              style={styles.input}
              placeholder="$320"
              placeholderTextColor="white"
            />
            <Text style={styles.LiveBiddingP}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="***********"
              placeholderTextColor="white"
              type="password"
            />

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
                style={{
                  borderRadius: 50,
                  marginHorizontal: 10,
                  marginTop: 12,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 5,
                  }}>
                  <Image source={imagePath.BidNow} style={styles.BidBtn} />
                  <Text style={styles.BidNow}>Bid Now</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.LiveBidding}>My Bidding History</Text>

          <View style={styles.BidHis}>
            <View style={styles.BidHBg}>
              <Text style={styles.BidTextHis}>Date</Text>
            </View>
            <View style={styles.BidHBg}>
              <Text style={styles.BidTextHis}>Time</Text>
            </View>
            <View style={styles.BidHBg}>
              <Text style={styles.BidTextHis}>Price</Text>
            </View>
          </View>

          <View style={styles.BidTextHisText}>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>April 7, 2022</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>11:07 AM</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>$250</Text>
            </View>
          </View>
          <View style={styles.BidTextHisText}>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>April 7, 2022</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>11:07 AM</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>$250</Text>
            </View>
          </View>
          <View style={styles.BidTextHisText}>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>April 7, 2022</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>11:07 AM</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>$250</Text>
            </View>
          </View>
          <View style={styles.BidTextHisText}>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>April 7, 2022</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>11:07 AM</Text>
            </View>
            <View style={styles.BidHBgA}>
              <Text style={styles.BidTextHiss}>$250</Text>
            </View>
          </View>
        </View>

        {/* Page 81| Start */}
        <View style={styles.MaiN}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
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
                  style={styles.LinerBG}>
                  <View style={styles.AppBtn}>
                    <Text style={styles.Apply}>Apply</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{width: '50%'}}>
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
                  style={styles.LinerBG}>
                  <View style={styles.AppBtn}>
                    <Text style={styles.Apply}>Dismiss</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Page 81| End */}

        {/* Page 82| Start */}
        <View style={styles.MaiNApp}>
          <View style={styles.Applied}>
            <Text style={styles.ApplyText}>Applied For Acquiring Product</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={imagePath.BidApply} />
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
            style={styles.LinerBGA}>
            <Text style={styles.ApplyTextRe}>Result</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Page 82| End         */}

        {/* Page 82| Start */}
        <View style={styles.MaiNApp}>
          <View style={styles.Applied}>
            <Text style={styles.ApplyText}>Applied For Acquiring Product</Text>
          </View>
          <View style={styles.WinnerE}>
            <ImageBackground
              source={imagePath.BidResult}
              // resizeMode="cover"
              style={width > 500 ? styles.ReImgTab : styles.ReImg}>
              <View>
                <Image
                  source={imagePath.UserWinner}
                  style={width > 500 ? styles.UserImgsTab : styles.UserImgs}
                />
              </View>
              <View
                style={width > 500 ? styles.UserWinnerTab : styles.UserWinner}>
                <Text style={styles.UserTse}>Farhan Khan</Text>
                <Text style={styles.UserTse1}>Maximum Bit Price $320</Text>
              </View>
            </ImageBackground>

            <View
              style={{
                width: '100%',
                backgroundColor: 'black',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.ApplyTextReA}>
                Note: You get refund your bid amount in 09-12-22
              </Text>
            </View>
          </View>
        </View>

        {/* Page 82| End         */}
      </View>
    </>
  );
};

export default BidNow;
