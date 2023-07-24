import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import MarketPlaceShipingComp from '../MarketPlaceShipingComp/MarketPlaceShipingComp';
import styles from './MarketPlaceBuyNowStyle';
import {Picker} from '@react-native-picker/picker';
import useAsyncGet from '../../../CustomHooks/useAsyncGet';

const MarketPlaceBuyNow = ({route}) => {
  const {axiosConfig, currencyMulti, currencyCount, currency} =
    useContext(AuthContext);

  const {sendGetRequest, response, error, loading} = useAsyncGet(
    AppUrl.DeliveyCharge,
  );
  const delivery = response?.data?.data;

  const {width} = useWindowDimensions();
  const {product} = route.params;

  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [step, setStep] = useState(1);
  const [marketplaceOrder, setMarketplaceOrder] = useState({});
  const [modal, setModal] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [parentData, setParentData] = useState({});
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryChargeError, setDeliveryChargeError] = useState('');

  const navigation = useNavigation();

  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  const contentSource = {
    html: `<div style='color:#e6e6e6;'>${
      product?.description ? product?.description : ''
    }</div>`,
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalPrice(count - 1);
      setFeeValue(count - 1);
    }
  };
  const increment = () => {
    setCount(count + 1);
    setTotalPrice(count + 1);
    setFeeValue(count + 1);
  };

  const handelDollarTaxPrice = taxdoller => {
    return (Number(product?.unit_price * count) * Number(taxdoller)) / 100;
  };

  useEffect(() => {
    setFee(
      Number(product?.unit_price) +
        Number(handelDollarTaxPrice(product?.tax)) +
        Number(deliveryCharge),
    );
  }, []);
  const setFeeValue = count_amount => {
    if (count_amount !== 0) {
      setFee(
        Number(count_amount * product?.unit_price) +
          Number(count_amount * product?.tax) +
          Number(deliveryCharge),
      );
    } else {
      setFee(0);
    }
  };
  const setTotalPrice = (count_amount, deliveryChargeValue = null) => {
    if (count_amount !== 0) {
      let ProductTotalPrice =
        (Number(product?.unit_price) + Number(product?.tax)) * count_amount;
      let productDelivery = deliveryChargeValue
        ? deliveryChargeValue
        : deliveryCharge;
      setAmount(currencyCount(ProductTotalPrice + productDelivery));
    } else {
      setAmount(0);
    }
  };
  const checkPaymentUncompletedOrder = async () => {
    // return alert('dadad')

    setBuffer(true);
    axios
      .get(AppUrl.CheckPaymentUncompletedOrder + product.id, axiosConfig)
      .then(res => {
        // console.log('res---------', res);
        if (res.data?.status === 200) {
          if (res.data?.isHavePaymentUncompletedOrder == true) {
            setMarketplaceOrder(res?.data?.marketplaceOrder);
            //console.log(res.data.marketplaceOrder);
            setStep(2);

            // if (res.data?.marketplaceOrder?.phone == null) {
            //      setStep(2);
            // } else {
            //      setStep(3);
            // }
          } else if (res.data.isHavePaymentUncompletedOrder == false) {
            setStep(1);
          }
          setBuffer(false);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };
  const handleBuyNow = async () => {
    if (deliveryCharge !== 0) {
      setDeliveryChargeError('');
      if (count !== 0) {
        const inputData = {
          items: count,
          marketplace_id: product?.id,
          total_price: fee,
        };
        setBuffer(true);
        axios
          .post(AppUrl.MarketplaceOrderStore, inputData, axiosConfig)
          .then(res => {
            console.log('res---------', res);
            if (res.data.status === 200) {
              if (res.data.message == 'Order Stored Successfully') {
                setMarketplaceOrder(res.data.marketplaceOrder);
                setModalObj({
                  modalType: 'success',
                  buttonTitle: 'Ok',
                  message: 'Please provide your shipping address.',
                  available: '',
                });
                setModal(true);
                setStep(2);
              } else if (res.data.message == 'Not Enough Product') {
                setModalObj({
                  modalType: 'warning',
                  buttonTitle: 'Ok',
                  message: "Sorry ! Does'nt have enough product ",
                  available: '',
                });
                setModal(true);
              }
              setBuffer(false);
            }
          })
          .catch(err => {
            console.log('buy product problem', err.message);
            setBuffer(false);
            console.log(err);
          });
      } else {
        setModalObj({
          modalType: 'warning',
          buttonTitle: 'Ok',
          message: 'Please add quantity',
          available: '',
        });
        setModal(true);
      }
    } else {
      setDeliveryChargeError('This field is required !');
    }
  };

  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);
  };
  const randerFlatListItem = ({index}) => {
    return (
      <Image
        style={{height: 200, width: width - 20}}
        source={
          !product?.image
            ? imagePath.cardBg
            : {
                uri: `${AppUrl.imageCdn + product?.image}`,
              }
        }
        key={index}
      />
    );
  };
  useEffect(() => {
    setTotalPrice(1);
    checkPaymentUncompletedOrder();
  }, []);

  // console.log('product-----------', product);
  return (
    <SafeAreaView style={styles.container}>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <SafeAreaView style={{paddingBottom: 100}}>
          {buffer && loading ? <LoaderComp /> : <></>}
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
              style={{borderRadius: 15, marginTop: 15}}>
              <Text style={styles.AuctionT}>MarketPlace</Text>
            </LinearGradient>
          </View>

          <View style={styles.MaiN}>
            <SwiperFlatList
              autoplay
              autoplayDelay={5}
              autoplayLoop
              data={[1, 2, 3, 4]}
              renderItem={randerFlatListItem}
            />
            <Text style={styles.FootH}>{product?.title}</Text>
            {/* if product type === auction the it show  */}
            {/* <Text style={styles.FootSt}>Auction at 21-11-2022</Text> */}
            <View style={{width: '100%'}}>
              <RenderHtml contentWidth={width} source={contentSource} />
            </View>
          </View>
          {step === 1 ? (
            <>
              <View style={styles.MaiN}>
                <View style={styles.BtnBox}>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.PriceTag}
                        style={styles.PriceTagImg}
                        height={20}
                        width={20}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={styles.PriceDollarText}> Price</Text>
                      <Text style={styles.PriceDollarTextB}>
                        {' '}
                        {currencyCount(product?.unit_price) +
                          ' ' +
                          currency.symbol}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.PriceTag}
                        style={styles.PriceTagImg}
                        height={20}
                        width={20}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={styles.PriceDollarText}> Tax</Text>
                      <Text style={styles.PriceDollarTextB}>
                        {' '}
                        {currencyCount(product?.tax) + ' ' + currency.symbol}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.BtnBox}>
                  <View style={styles.BtnBoxA}>
                    <View style={styles.PriceTag}>
                      <Image
                        source={imagePath.PriceTag}
                        style={styles.PriceTagImg}
                        height={20}
                        width={20}
                      />
                    </View>
                    <View style={styles.PriceDollar}>
                      <Text style={[styles.PriceDollarText, {paddingLeft: 15}]}>
                        Delivery charge
                      </Text>
                      <Picker
                        dropdownIconColor="white"
                        mode="dialog"
                        style={{width: 200, color: '#ffff', fontSize: 11}}
                        selectedValue={deliveryCharge}
                        onValueChange={(itemValue, itemIndex) => {
                          setDeliveryCharge(itemValue);
                          setTotalPrice(count, itemValue);
                          setDeliveryChargeError('');
                        }}>
                        <Picker.Item label="Delivery to" value="0" />
                        {delivery &&
                          delivery.map((item, index) => (
                            <Picker.Item
                              label={
                                item?.country +
                                ` - (${currencyCount(item?.courier_charge)})${
                                  currency.symbol
                                }`
                              }
                              value={item?.courier_charge}
                              key={index}
                            />
                          ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                <Text style={{color: 'red', marginLeft: 20}}>
                  {deliveryChargeError}
                </Text>
              </View>

              <View style={styles.MaiN}>
                <View style={styles.Increment}>
                  <View style={{flex: 2}}></View>
                  <View style={{flex: 7}}>
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
                      <TouchableOpacity onPress={increment}>
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
                  <View style={{flex: 8}}>
                    <Text style={styles.TextEr}>Total Price</Text>
                  </View>
                  <View style={styles.Increment2}>
                    <View style={styles.Flex1}>
                      <Text style={styles.TextColorS}>
                        {' '}
                        {amount + ' ' + currency.symbol}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleBuyNow}>
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
            </>
          ) : (
            <>
              <MarketPlaceShipingComp
                marketplaceOrder={
                  marketplaceOrder === null ? product : marketplaceOrder
                }
                passChildData={setIsShowPaymentComp}
                setParentData={setParentData}
                setParentStep={setStep}
                amount={amount}
                slug={product.slug}
                deliveryCharge={deliveryCharge}
                tax={product?.tax * count}
                fee={fee}
              />
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MarketPlaceBuyNow;
