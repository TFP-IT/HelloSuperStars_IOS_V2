import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import BidCongratulationModal from '../../../Components/MODAL/BidCongratulationModal';
import ProductProcessModal from '../../../Components/MODAL/ProductProcessModal';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import styles from './styles';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import noImage from '../../../Assets/Images/no-image.png';
import HeaderComp from '../../../Components/HeaderComp';
const Participate = ({ route, navigation }) => {
  // const product = props.product;
  const { product } = route.params;
  console.log('product from props=====>', product);
  const { socketData, axiosConfig } = useContext(AuthContext);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [winner, setWinner] = useState([]);
  const [liveBidding, setLiveBidding] = useState([]);
  const [bidHistory, setBidHistory] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [auctionApply, setAuctionApply] = useState();
  const { width } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const source = {
    html: `<div style='color:#e6e6e6'>${product ? product?.details : ''}</div>`,
  };
  const [modalStartFrom, setModalStartFrom] = useState('Default');
  const [modal, setModal] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  const [data, setData] = React.useState('Bidnow');
  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);

    if (modalStartFrom === 'Default') {
    } else if (modalStartFrom === 'ApplyBtn') {
      if (Number(auctionApply?.notify_status) === 1) {
        setProcessModal(true);
      } else {
        navigation.navigate('Home');
      }
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [processModal, setProcessModal] = useState(false);

  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [nowDate, setNowDate] = useState(new Date().getTime());

  const countDownDate = new Date(product?.bid_to).getTime();
  const resultPublishDate = new Date(product?.result_date).getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    setDay(days);
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    setHour(hours);
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    setMinute(minutes);
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setSecond(seconds);
  }, 1000);
  const randerProductImageFlatListItem = ({ index }) => {
    return (
      <Image
        style={{ height: 200, width: width - 20 }}
        source={
          product?.product_image == null
            ? imagePath.Foot
            : {
              uri: `${AppUrl.MediaBaseUrl + product?.product_image}`,
            }
        }
        key={index}
      />
    );
  };
  const randerLiveBidFlatListItem = ({ item, index }) => {
    return (
      <View style={{ marginRight: 8 }}>
        <View style={styles.LiveBCarB}>
          <View style={styles.PriceLive}>
            <Image
              source={
                item?.user?.image == null
                  ? noImage
                  : {
                    uri: `${AppUrl.MediaBaseUrl + item?.user?.image}`,
                  }
              }
              style={styles.BidUser}
            />
          </View>
          <View style={styles.PriceLiveDate}>
            <Text style={styles.PriceBD}>Tk {Number(item?.amount)}</Text>
            <Text style={styles.BDname}>
              {item?.user?.first_name + ' ' + item?.user?.last_name}
            </Text>
            <Text style={styles.BDdate}>
              {moment(item?.created_at).format('DD MMMM YYYY hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const getLiveBidding = () => {
    setBuffer(true);
    axios
      .get(AppUrl.AuctionLiveBidding + `${product?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setLiveBidding(res.data.bidding);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const handleApplyButton = () => {
    setModalStartFrom('ApplyBtn');
    if (Number(auctionApply?.notify_status) === 1) {
      setModalObj({
        modalType: 'success',
        buttonTitle: 'Pay Now',
        message: 'You are one of the top bidder !',
      });
      setModal(true);
    } else {
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'Dismiss',
        message: 'We are sorry . You are not top bidder !',
      });
      setModal(true);
    }
  };
  const bidingHistory = () => {
    setBuffer(true);
    axios
      .get(AppUrl.AuctionMyBiddingHistory + `${product?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setBidHistory(res.data.bidHistory);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const fetchAuctionApply = () => {
    setBuffer(true);
    axios
      .get(AppUrl.AuctionMyApply + `${product?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setAuctionApply(res.data.auctionApply);
          setWinner(res.data.winner);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  const fetchAuctionInstruction = () => {
    setBuffer(true);
    axios
      .get(AppUrl.AuctionGetInstruction + `${product?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setInstruction(res.data.instruction);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };

  const onSubmit = data => {
    if (data.amount < product?.base_price) {
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'Ok',
        message:
          'Opps...  price should more then ' + product?.base_price + ' !',
      });
      setModal(true);
    } else {
      // setData('Applybid');
      setBuffer(true);
      let aditionalData = {
        ...data,
        auction_id: product?.id,
      };
      axios
        .post(AppUrl.AuctionBiddingProduct, aditionalData, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            reset(data);
            socketData.emit('joinBiddingRoom', { room: product?.id });
            socketData.emit('sendLiveBidding', product?.id);
            socketData.on('getLiveBidding', sdata => {
              // console.log("data from socket", sdata);
            });
            bidingHistory();
            getLiveBidding();
          }
          if (res.data.status === 201) {
            setModalObj({
              modalType: 'warning',
              buttonTitle: 'Ok',
              message: "Opps... Password doesn't matched !",
            });
            setModal(true);
          }
          setBuffer(false);
        })
        .catch(err => {
          console.log(err);
          setBuffer(false);
        });
    }
  };
  const fetchAllDataAfterPayment = () => {
    bidingHistory();
    getLiveBidding();
    fetchAuctionApply();
    fetchAuctionInstruction();
  };

  useEffect(() => {
    socketData.emit('joinBiddingRoom', { room: product?.id });
    socketData.emit('sendLiveBidding', product?.id);
    socketData.on('getLiveBidding', sdata => {
      // console.log("data from socket", sdata);
      getLiveBidding();
    });
    bidingHistory();
    getLiveBidding();
    fetchAuctionApply();
    fetchAuctionInstruction();
  }, [product?.id]);

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <View style={styles.rowX}>
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
            style={{ borderRadius: 50 }}>
            <Text style={styles.AuctionT}>Auction</Text>
          </LinearGradient>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.PText}>Bidding End Time</Text>
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
            style={{
              borderRadius: 50,
              paddingHorizontal: 5,
              paddingVertical: 8,
              marginTop: 8,
            }}>
            <>
              <View style={styles.DateHead}>
                <View style={styles.Clock}>
                  <Image source={imagePath.ImgTimeC} style={styles.Img} />
                </View>
                <View style={styles.Clock1}>
                  <View>
                    <Text style={styles.TextDate}>DAY</Text>
                  </View>
                  <View>
                    <Text style={styles.TextDateB}>{day > 0 ? day : '00'}</Text>
                  </View>
                </View>

                <View style={styles.Clock1}>
                  <View>
                    <Text style={styles.TextDate}>HOUR</Text>
                  </View>
                  <View>
                    <Text style={styles.TextDateB}>
                      {hour > 0 ? hour : '00'}
                    </Text>
                  </View>
                </View>
                <View style={styles.Clock1}>
                  <View>
                    <Text style={styles.TextDate}>MIN</Text>
                  </View>
                  <View>
                    <Text style={styles.TextDateB}>
                      {minute > 0 ? minute : '00'}
                    </Text>
                  </View>
                </View>
                <View style={styles.Clock1}>
                  <View>
                    <Text style={styles.TextDate}>SEC</Text>
                  </View>
                  <View>
                    <Text style={styles.TextDateB}>
                      {second > 0 ? second : '00'}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          </LinearGradient>
        </View>

        <View style={styles.MaiN}>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            data={[1, 2, 3, 4]}
            renderItem={randerProductImageFlatListItem}
          />
          <Text style={styles.FootH}>{product?.title}</Text>
          <Text style={styles.FootSt}>
            Auction at {moment(product?.created_at).format('DD MMMM YYYY')}
          </Text>
          <View style={{ width: '100%' }}>
            <RenderHtml contentWidth={width} source={source} />
          </View>
          <View style={styles.BtnBox}>
            <View style={styles.BtnBoxA}>
              <View style={styles.PriceTag}>
                <Image source={imagePath.PriceTag} style={styles.PriceTagImg} />
              </View>
              <View style={styles.PriceDollar}>
                <Text style={styles.PriceDollarText}> Minimum Bid Price</Text>
                <Text style={styles.PriceDollarTextB}>
                  Tk {product.base_price}
                </Text>
              </View>
            </View>
            <View style={styles.BtnBoxA}>
              <View style={styles.PriceTag}>
                <Image source={imagePath.Bid} style={styles.PriceTagImgB} />
              </View>
              <View style={styles.PriceDollar}>
                <Text style={styles.PriceDollarText}> Total Bid</Text>
                <Text style={styles.PriceDollarTextB}>
                  {' '}
                  {liveBidding && liveBidding.length}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.MaiN}>
          <Text style={styles.LiveBidding}>Live Bidding</Text>
          <View style={styles.LiveBCar}>
            <SwiperFlatList
              autoplay
              autoplayDelay={5}
              autoplayLoop
              data={liveBidding}
              renderItem={randerLiveBidFlatListItem}
            />
          </View>
        </View>

        {countDownDate > nowDate ? (
          <>
            <View style={styles.MaiN}>
              <Text style={styles.LiveBidding}>Bid Now</Text>
              <View style={{ marginHorizontal: 12, marginTop: 8 }}>
                <Text style={styles.LiveBiddingP}>Price Your Bid</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="white"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  )}
                  name="amount"
                />
                {errors.amount && (
                  <Text
                    style={{
                      color: 'red',
                      marginLeft: 8,
                      marginBottom: 8,
                    }}>
                    This field is required !
                  </Text>
                )}
                <Text style={styles.LiveBiddingP}>Password</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="white"
                      type="password"
                      placeholder="Enter password"
                      keyboardType="visible-password"
                      style={styles.input}
                    />
                  )}
                  name="password"
                />

                {errors.password && (
                  <Text
                    style={{
                      color: 'red',
                      marginLeft: 8,
                      marginBottom: 8,
                    }}>
                    This field is required !
                  </Text>
                )}
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
              {bidHistory &&
                bidHistory.map((singleHistory, index) => (
                  <View key={index} style={styles.BidTextHisText}>
                    <View style={styles.BidHBgA}>
                      <Text style={styles.BidTextHiss}>
                        {moment(singleHistory.created_at).format(
                          'DD MMMM YYYY',
                        )}
                      </Text>
                    </View>
                    <View style={styles.BidHBgA}>
                      <Text style={styles.BidTextHiss}>
                        {moment(singleHistory.created_at).format('hh:mm A')}
                      </Text>
                    </View>
                    <View style={styles.BidHBgA}>
                      <Text style={styles.BidTextHiss}>
                        Tk {Number(singleHistory.amount)}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </>
        ) : (
          <>
            {auctionApply?.auction?.id == product?.id ? (
              <>
                {isShowResult === true ? (
                  <>
                    {/* Page 82| Start */}
                    <View style={styles.MaiNApp}>
                      <View style={styles.Applied}>
                        <Text style={styles.ApplyText}>Result</Text>
                      </View>
                      <View style={styles.WinnerE}>
                        {winner != null ? (
                          <>
                            <ImageBackground
                              source={imagePath.BidResult}
                              // resizeMode="cover"
                              style={
                                width > 500 ? styles.ReImgTab : styles.ReImg
                              }>
                              <View>
                                <Image
                                  // source={imagePath.UserWinner}
                                  source={
                                    winner?.user?.image !== null
                                      ? {
                                        uri: `${AppUrl.MediaBaseUrl +
                                          winner?.user?.image
                                          }`,
                                      }
                                      : noImage
                                  }
                                  style={
                                    width > 500
                                      ? styles.UserImgsTab
                                      : styles.UserImgs
                                  }
                                />
                              </View>
                              <View
                                style={
                                  width > 500
                                    ? styles.UserWinnerTab
                                    : styles.UserWinner
                                }>
                                <Text style={styles.UserTse}>
                                  {winner?.user?.first_name}{' '}
                                  {winner?.user?.last_name}
                                </Text>
                                <Text style={styles.UserTse1}>
                                  Maximum Bit Price TK {Number(winner?.amount)}
                                </Text>
                              </View>
                            </ImageBackground>
                          </>
                        ) : (
                          <></>
                        )}

                        <View
                          style={{
                            width: '100%',
                            backgroundColor: 'black',
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {Number(winner?.win_status) === 1 ? (
                            <>
                              <Text style={styles.ApplyTextReA}>
                                Note: Contratulations you are the winner !
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text style={styles.ApplyTextReA}>
                                Note: Best Of Luck for Next Time.You get refund
                                your bid amount in 09-12-22
                              </Text>
                            </>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* Page 82| End         */}
                  </>
                ) : (
                  <>
                    {/* Page 82| Start */}
                    <View style={styles.MaiNApp}>
                      <View style={styles.Applied}>
                        <Text style={styles.ApplyText}>
                          Applied For Acquiring Product
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingVertical: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.BDname}>
                          Result will be publish on{' '}
                          {moment(product?.result_date).format('LL')}
                        </Text>
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

                    <TouchableOpacity
                      disabled={nowDate < resultPublishDate ? true : false}
                      onPress={() => setIsShowResult(true)}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={
                          nowDate < resultPublishDate
                            ? ['#343333', '#343333']
                            : [
                              '#FFAD00',
                              '#FFD273',
                              '#E19A04',
                              '#FACF75',
                              '#E7A725',
                              '#FFAD00',
                            ]
                        }
                        style={styles.LinerBGA}>
                        <Text
                          style={
                            nowDate < resultPublishDate
                              ? styles.ApplyTextReWhite
                              : styles.ApplyTextRe
                          }>
                          Result
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    {/* Page 81| End         */}
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.MaiN}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '50%' }}>
                      <TouchableOpacity onPress={handleApplyButton}>
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
                          style={styles.LinerBG}>
                          <View style={styles.AppBtn}>
                            <Text style={styles.Apply}>Apply</Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: '50%' }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}>
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
                          style={styles.LinerBG}>
                          <View style={styles.AppBtn}>
                            <Text style={styles.Apply}>Dismiss</Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {data === 'Congratsbid' ? (
          <>
            {/* Page 82| Start */}
            <View style={styles.MaiNApp}>
              <View style={styles.Applied}>
                <Text style={styles.ApplyText}>
                  Applied For Acquiring Product
                </Text>
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
                    style={
                      width > 500 ? styles.UserWinnerTab : styles.UserWinner
                    }>
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
          </>
        ) : null}
      </View>
      <ProductProcessModal
        instruction={instruction}
        processModal={processModal}
        setProcessModal={setProcessModal}
        setIsShowPaymentComp={setIsShowPaymentComp}
        setData={setData}
      />
      <RegisPaymentModal
        eventType="auction"
        eventId={product?.id}
        modelName="auction"
        isShowPaymentComp={isShowPaymentComp}
        setIsShowPaymentComp={setIsShowPaymentComp}
        event_registration_id={auctionApply && auctionApply?.id}
        fetchAllDataAfterPayment={fetchAllDataAfterPayment}
      />

      <BidCongratulationModal
        showModal={showModal}
        setShowModal={setShowModal}
        processModal={processModal}
        setProcessModal={setProcessModal}
      />
    </ScrollView>
  );
};

export default Participate;
