import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import RenderHtml from 'react-native-render-html';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import noImage from '../../../Assets/Images/no-image.png';
import HeaderComp from '../../../Components/HeaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import BidCongratulationModal from '../../../Components/MODAL/BidCongratulationModal';
import ProductProcessModal from '../../../Components/MODAL/ProductProcessModal';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp/LoaderComp';
import styles from '../AuctionProductCard/AuctionProductCardStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import AuctionAcquireModel from '../../../Components/MODAL/AuctionAcquireModel';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import AuctionAcquireMsgModal from './AuctionAcquireMsgModal';
// import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
// import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';

const AuctionParticipateNow = ({route}) => {
  const navigation = useNavigation();
  const {socketData, axiosConfig} = useContext(AuthContext);
  const {product} = route.params;
  console.log('The product is', product);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [resultTime, setResultTime] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [winner, setWinner] = useState([]);
  const [liveBidding, setLiveBidding] = useState([]);
  const [bidHistory, setBidHistory] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [auctionApply, setAuctionApply] = useState();
  const [showPass, setShowPass] = useState(true);
  const {width} = useWindowDimensions();
  const {currencyMulti, currencyCount, currency} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const source = {
    html: `<div style='color:#e6e6e6'>${product ? product?.details : ''}</div>`,
  };
  const [modalStartFrom, setModalStartFrom] = useState('Default');
  const [modal, setModal] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [lockModal, setLockModal] = useState(false);
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
  const [showAcquire, setShowAcquire] = useState(false);

  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [nowDate, setNowDate] = useState(new Date().getTime());
  const [isEnded, setIsEnded] = useState(null);
  const [isStarted, setIsStarted] = useState(null);
  const countDownDate = new Date(product?.bid_to).getTime();
  const resultPublishDate = new Date(product?.result_date).getTime();

  const remainingTime = async time => {
    const startTime = await new Date(time).getTime();

    const currentTime = await new Date().getTime();
    if (startTime >= currentTime) {
      return (startTime - currentTime) / 1000;
    }
    return 0;
  };

  const [countDownTime, setCountDownTime] = useState(null);
  const calculateRemainingTime = async time => {
    const now = await moment.utc();
    var end = await moment(time);
    var hours = end.diff(now, 'seconds');
    setCountDownTime(hours);
  };

  const isComplete = async time => {
    const now = await moment.utc();
    var end = await moment(time);
    var hours = now.diff(end, 'seconds');
    if (hours < 0) {
      setIsEnded(false);
      return false;
    } else {
      setIsEnded(true);
      return true;
    }
  };

  const checkStarted = async time => {
    const now = await moment.utc();
    var end = await moment(time);
    var hours = now.diff(end, 'seconds');
    if (hours < 0) {
      setIsStarted(false);
    } else {
      setIsStarted(true);
    }
  };

  const [maxBid, setMaxBid] = useState([]);
  const getMaxBid = () => {
    axios
      .get(AppUrl.userMaxBid + product.id, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setMaxBid(res.data.maxBid);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [showResult, setShowResult] = useState(null);

  const resultView = async time => {
    const now = await moment.utc();

    var end = await moment(time);
    var dif = now.diff(end, 'seconds');
    if (dif < 0) {
      console.log('result dekhabe na');
      setShowResult(false);
    } else {
      console.log('result dekhabe ');
      setShowResult(true);
    }
  };
  const [showAcquireBtn, setShowAcquireBtn] = useState(null);
  const checkTiming = async (time, to) => {
    const now = await moment.utc();
    var end = await moment(time);
    var endTo = await moment(time);
    var dif = now.diff(end, 'seconds');
    var dif2 = now.diff(endTo, 'seconds');
    if (dif > 0) {
      if (dif2 < 0) {
        setShowAcquireBtn(false);
      }
    } else {
      setShowAcquireBtn(true);
    }
    // nowDate < resultPublishDate
  };
  useEffect(() => {
    checkStarted(product?.bid_from);
    isComplete(product?.bid_to);
    calculateRemainingTime(product?.bid_to);
    getMaxBid();
    resultView(product?.result_date);
    checkApplied();
    checkTiming(product?.result_date, product?.bid_to);
  }, []);
  const checkApplied = () => {};

  const randerProductImageFlatListItem = ({index}) => {
    return (
      <Image
        style={{height: 200, width: width - 20}}
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
  const randerLiveBidFlatListItem = ({item, index}) => {
    return (
      <View style={{marginRight: 8}}>
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
            <Text style={styles.PriceBD}>
              {currencyCount(item?.amount) + ' ' + currency.symbol}
            </Text>
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
          console.log('setAuctionApply', res.data);
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
    if (Number(data.amount) < Number(currencyCount(product?.base_price))) {
      setModalObj({
        modalType: 'warning',
        buttonTitle: 'Ok',
        message:
          'Opps...  price should more then ' +
          currencyCount(product?.base_price) +
          ' !',
      });
      setModal(true);
    } else {
      setBuffer(true);
      let aditionalData = {
        amount: Number(data?.amount) / Number(currency.currency_value),
        password: data.password,
        auction_id: product?.id,
      };

      axios
        .post(AppUrl.AuctionBiddingProduct, aditionalData, axiosConfig)
        .then(res => {
          if (res.data.status === 200) {
            reset(data);
            socketData.emit('joinBiddingRoom', {room: product?.id});
            socketData.emit('sendLiveBidding', product?.id);
            socketData.on('getLiveBidding', sdata => {});
            bidingHistory();
            getLiveBidding();
            Toast.show('Bidding Success!!!', Toast.SHORT);
            setModalObj({
              modalType: 'success',
              buttonTitle: 'Ok',
              message: 'Bidding Success!',
            });
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
    socketData.emit('joinBiddingRoom', {room: product?.id});
    socketData.emit('sendLiveBidding', product?.id);
    socketData.on('getLiveBidding', () => {
      getLiveBidding();
    });
    bidingHistory();
    getLiveBidding();
    fetchAuctionApply();
    fetchAuctionInstruction();
  }, [product?.id]);

  return (
    <SafeAreaView horizontal style={{backgroundColor: 'blue'}}>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={{height: '100%'}}>
        <ScrollView style={styles.container}>
          <SafeAreaView>
            {buffer ? (
              <LoaderComp />
            ) : (
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
                    <Text
                      style={styles.PText}
                      onPress={() => {
                        remainingTime(product?.bid_to);
                      }}>
                      Bidding End Time
                    </Text>
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
                      <CountDown
                        // until={totalSecond}
                        until={countDownTime}
                        onFinish={() => {}}
                        // onPress={() => alert('hello')}
                        digitStyle={{
                          backgroundColor: 'black',
                          borderWidth: 2,
                          borderColor: '#FFAD00',
                          borderRadius: 20,
                        }}
                        digitTxtStyle={{color: '#FFAD00'}}
                        timeLabelStyle={{
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                        size={18}
                      />
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

                    <View style={{width: '100%'}}>
                      <RenderHtml contentWidth={width} source={source} />
                    </View>

                    <View style={styles.BtnBox}>
                      <View style={styles.BtnBoxA}>
                        <View style={styles.PriceTag}>
                          <Image
                            source={imagePath.PriceTag}
                            style={styles.PriceTagImg}
                          />
                        </View>
                        <View style={styles.PriceDollar}>
                          <Text style={styles.PriceDollarText}>
                            {' '}
                            Base Price
                          </Text>
                          <Text style={styles.PriceDollarTextB}>
                            {currencyCount(product?.base_price) +
                              ' ' +
                              currency.symbol}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.BtnBoxA}>
                        <View style={styles.PriceTag}>
                          <Image
                            source={imagePath.Bid}
                            style={styles.PriceTagImgB}
                          />
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

                    {/* <View style={styles.BtnBox}>
                      <View style={styles.BtnBoxA}>
                        <View style={styles.PriceTag}>
                          <Image
                            source={imagePath.ImgTimeC}
                            style={styles.PriceTagImg}
                          />
                        </View>
                        <View style={styles.PriceDollar}>
                          <Text style={styles.PriceDollarText}>
                            {' '}
                            Bidding Deadline
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            {moment(product?.created_at).format('DD MMMM YYYY')}
                            {' - '}
                            {moment(product?.bid_to).format('DD MMMM YYYY')}
                          </Text>
                        </View>
                      </View>
                    </View> */}
                  </View>

                  <View style={styles.MaiN}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Superstar
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                      }}>
                      <View style={{}}>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          Name:
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          Category:
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          Start Date:
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          End Date:
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          {product?.star?.first_name}
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          {product?.star?.category?.name}
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          {moment(product?.bid_from).format('DD MMMM YYYY')}
                        </Text>
                        <Text style={{color: '#e6e6e6', fontSize: 15}}>
                          {moment(product?.bid_to).format('DD MMMM YYYY')}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginBottom: 40,
                      padding: 12,
                      borderRadius: 10,
                      backgroundColor: '#222222',
                    }}>
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
                  {isEnded && (
                    <View>
                      {/* Page 82| Start */}
                      {/* <View style={styles.MaiNApp}>
                        <View
                          style={{
                            flexDirection: 'row',
                            paddingVertical: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.BDname}>
                            Result publishing on{' '}
                            {moment(product?.result_date).format('LL')}
                          </Text>
                        </View>
                      </View> */}
                      {isEnded && !showResult && (
                        <View style={{paddingBottom: 110}}>
                          {/* Page 82| Start */}
                          <View style={styles.MaiNApp}>
                            <View style={styles.Applied}>
                              <TouchableOpacity
                                disabled={auctionApply ? false : true}
                                onPress={() => {
                                  if (!showResult) {
                                    return;
                                  } else if (auctionApply) {
                                    setShowAcquire(true);
                                  }
                                }}>
                                <LinearGradient
                                  start={{x: 0, y: 0}}
                                  end={{x: 1, y: 0}}
                                  colors={
                                    auctionApply
                                      ? [
                                          '#FFAD00',
                                          '#FFD273',
                                          '#E19A04',
                                          '#FACF75',
                                          '#E7A725',
                                          '#FFAD00',
                                        ]
                                      : ['#AD850C', '#AD850C']
                                  }
                                  style={styles.LinerBGA}>
                                  <Text
                                    style={
                                      showAcquireBtn
                                        ? styles.ApplyTextReWhite
                                        : styles.ApplyTextRe
                                    }>
                                    Acquire Application
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )}

                  {!isEnded ? (
                    <View style={{paddingBottom: 110}}>
                      <View style={styles.MaiN}>
                        <Text style={styles.LiveBidding}>Bid Now</Text>
                        <View style={{marginHorizontal: 12, marginTop: 8}}>
                          <Text style={styles.LiveBiddingP}>
                            Price Your Bid
                          </Text>
                          <Controller
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                              <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholderTextColor="white"
                                keyboardType="numeric"
                                style={styles.input}
                                placeholder="Price Your Bid"
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
                            render={({field: {onChange, onBlur, value}}) => (
                              <>
                                <TextInput
                                  onBlur={onBlur}
                                  onChangeText={onChange}
                                  value={value}
                                  placeholderTextColor="white"
                                  type="password"
                                  placeholder="Enter password"
                                  // keyboardType="visible-password"
                                  style={styles.input}
                                  // secureTextEntry={showPass}
                                  secureTextEntry={showPass}
                                />
                                <TouchableOpacity
                                  style={{
                                    marginTop: '-11%',
                                    marginLeft: '87%',
                                  }}
                                  onPress={() => setShowPass(!showPass)}>
                                  {showPass ? (
                                    <Entypo
                                      name="eye-with-line"
                                      size={20}
                                      color={'#ffaa00'}
                                    />
                                  ) : (
                                    <Entypo
                                      name="eye"
                                      size={20}
                                      color={'#ffaa00'}
                                    />
                                  )}
                                </TouchableOpacity>
                              </>
                            )}
                            name="password"
                          />

                          {errors.password && (
                            <Text
                              style={{
                                color: 'red',
                                marginLeft: 8,
                                marginBottom: 8,
                                marginTop: 10,
                              }}>
                              This field is required !
                            </Text>
                          )}

                          <TouchableOpacity
                            disable={isStarted ? false : true}
                            onPress={
                              isStarted ? handleSubmit(onSubmit) : () => {}
                            }>
                            <LinearGradient
                              start={{x: 0, y: 0}}
                              end={{x: 1, y: 0}}
                              colors={
                                isStarted
                                  ? [
                                      '#FFAD00',
                                      '#FFD273',
                                      '#E19A04',
                                      '#FACF75',
                                      '#E7A725',
                                      '#FFAD00',
                                    ]
                                  : ['#AD850C', '#AD850C']
                              }
                              style={{
                                borderRadius: 50,
                                marginHorizontal: 10,
                                marginTop: 25,
                                marginBottom: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  paddingVertical: 5,
                                }}>
                                <Image
                                  source={imagePath.BidNow}
                                  style={styles.BidBtn}
                                />
                                <Text
                                  style={
                                    isStarted
                                      ? styles.BidNow
                                      : {
                                          fontSize: 15,
                                          color: 'black',
                                          paddingTop: 0,
                                          paddingBottom: 3,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                          marginLeft: 8,
                                        }
                                  }>
                                  {isStarted ? 'Bid Now' : 'Starting Soon'}{' '}
                                </Text>
                              </View>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.MaiN}>
                        <Text style={styles.LiveBidding}>
                          My Bidding History
                        </Text>

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
                                  {moment(singleHistory.created_at).format(
                                    'hh:mm A',
                                  )}
                                </Text>
                              </View>
                              <View style={styles.BidHBgA}>
                                <Text style={styles.BidTextHiss}>
                                  {/* {currencyCount(singleHistory?.amount + " " + currency.symbol)} */}
                                  {currencyCount(singleHistory.amount) +
                                    ' ' +
                                    currency.symbol}
                                  {/* Tk {Number(singleHistory.amount)} */}
                                </Text>
                              </View>
                            </View>
                          ))}
                      </View>
                    </View>
                  ) : (
                    <>
                      <>
                        {isShowResult === true ? (
                          <View style={{paddingBottom: 120}}>
                            {/* Page 82| Start */}
                            <View style={styles.MaiNApp}>
                              <View style={styles.Applied}>
                                <Text style={styles.ApplyText}>
                                  Result Information
                                </Text>
                              </View>
                              <View style={styles.WinnerE}>
                                {winner != null ? (
                                  <>
                                    <ImageBackground
                                      source={imagePath.BidResult}
                                      // resizeMode="cover"
                                      style={
                                        width > 500
                                          ? styles.ReImgTab
                                          : styles.ReImg
                                      }>
                                      <View>
                                        <Image
                                          // source={imagePath.UserWinner}
                                          source={
                                            winner?.user?.image !== null
                                              ? {
                                                  uri: `${
                                                    AppUrl.MediaBaseUrl +
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
                                          Maximum Bit Price {currency.symbol}{' '}
                                          {currencyCount(winner?.amount)}
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
                                        Note: Congratulations you are the winner
                                        !
                                      </Text>
                                    </>
                                  ) : (
                                    <>
                                      <Text style={styles.ApplyTextReA}>
                                        Note: Best Of Luck for Next Time.
                                      </Text>
                                    </>
                                  )}
                                </View>
                              </View>
                            </View>

                            {/* Page 82| End         */}
                          </View>
                        ) : (
                          <View style={{marginBottom: 100}}>
                            {/* Page 82| Start */}
                            <View style={styles.MaiNApp}>
                              <View style={styles.Applied}>
                                <Text style={styles.ApplyText}>
                                  Applied For Acquiring Product
                                </Text>
                              </View>
                              {!showResult && (
                                <>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      paddingVertical: 25,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text style={styles.BDname}>
                                      Result will be publish on{' '}
                                      {moment(product?.result_date).format(
                                        'LL',
                                      )}
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
                                </>
                              )}

                              {/* <View
                                  style={{
                                    flexDirection: 'row',
                                    paddingVertical: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text style={styles.BDname}>
                                    Please Wait And Complete Further Process
                                  </Text>
                                </View> */}
                            </View>

                            <TouchableOpacity
                              disabled={showResult ? false : true}
                              onPress={() => setIsShowResult(true)}>
                              <LinearGradient
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                colors={
                                  !showResult
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
                                    !showResult
                                      ? styles.ApplyTextReWhite
                                      : styles.ApplyTextRe
                                  }>
                                  Result
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                            {/* Page 81| End         */}
                          </View>
                        )}
                      </>
                    </>
                  )}

                  {data === 'Congratsbid' ? (
                    <View style={{height: 200}}>
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
                            style={
                              width > 500 ? styles.ReImgTab : styles.ReImg
                            }>
                            <View>
                              <Image
                                source={imagePath.UserWinner}
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
                              <Text style={styles.UserTse}>Farhan Khan</Text>
                              <Text style={styles.UserTse1}>
                                Maximum Bit Price $320
                              </Text>
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
                              Best of luck for next time
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Page 82| End         */}
                    </View>
                  ) : null}
                </View>
                {/* <ProductProcessModal
                  instruction={instruction}
                  processModal={processModal}
                  setProcessModal={setProcessModal}
                  setIsShowPaymentComp={setIsShowPaymentComp}
                  setData={setData}
                /> */}

                {isShowPaymentComp && (
                  <RegisPaymentModal
                    eventType="auction"
                    modelName="auction"
                    isShowPaymentComp={isShowPaymentComp}
                    setIsShowPaymentComp={setIsShowPaymentComp}
                    eventId={product?.id}
                    fee={maxBid?.amount}
                  />
                )}

                {/* <AuctionAcquireModel
                  lockModal={lockModal}
                  setLockModal={setLockModal}
                  auctionId={product?.id}
                /> */}

                <AuctionAcquireMsgModal
                  showAcquire={showAcquire}
                  setShowAcquire={setShowAcquire}
                  productId={product?.id}
                  setIsShowPaymentComp={setIsShowPaymentComp}
                />

                <BidCongratulationModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  processModal={processModal}
                  setProcessModal={setProcessModal}
                />
              </>
            )}
          </SafeAreaView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AuctionParticipateNow;
