//import liraries
import React, { useContext, useState } from 'react';
import {
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import imagePath from '../../../Constants/imagePath';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../../RestApi/AppUrl';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { AuthContext } from '../../../Constants/context';
import HeaderComp from '../../HeaderComp';
import RegisPaymentModal from '../../MODAL/RegisPaymentModal';

const labels = [
  'Applied',
  'Approved',
  'Process',
  'Received',
  'Process',
  'Out ',
  'Delivered',
];
// const labels = ['Applied', 'Received', 'Out for Delivery', 'Delivered'];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 8,
  currentStepIndicatorLabelFontSize: 11,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#fe7013',
};

// create a component
const SouvenirOrderStatus = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const { event } = route.params;
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  console.log('souvinir apply', event);
  const ownerName = event?.name;
  const ownerPhone = event?.mobile_no;
  const ownerAddress = event?.city?.name + ', ' + event?.country?.name;
  const totalPrice = event?.total_amount;
  const description = event?.souvenir?.description;
  const descriptionHTML = {
    html: `<div style='color:#e6e6e6; '>${description}</div>`,
  };
  const progress = event?.status;
  const imageURl = event?.image;
  const { axiosConfig, currencyCount, currency } = useContext(AuthContext);

  const handelDollarTaxPrice = taxdoller => {
    return (Number(event?.souvenir?.price) * Number(taxdoller)) / 100;
  };

  const downloadInvoice = e => {
    const data = {
      productName: event?.souvenir?.title,
      SuperStar: event?.star?.first_name + ' ' + event?.star?.last_name,
      qty: 1,
      unitPrice: currencyCount(event?.souvenir?.price),
      total: currencyCount(event?.souvenir?.price),
      subTotal: currencyCount(event?.souvenir?.price),
      deliveryCharge: currencyCount(event?.souvenir?.delivery_charge),
      tax: currencyCount(handelDollarTaxPrice(event?.souvenir?.tax)),
      grandTotal: currencyCount(
        parseInt(event?.souvenir?.unit_price) +
        parseInt(event?.souvenir?.delivery_charge) +
        handelDollarTaxPrice(event?.souvenir?.tax),
      ),
      // grandTotal:
      //   parseInt(event?.souvenir?.price) +
      //   parseInt(event?.souvenir?.delivery_charge) +
      //   parseInt(event?.souvenir?.tax),
      orderID: event?.invoice_no,
      orderDate: event?.created_at,
      name: event?.name,
      termCondition: event?.description,
    };
    axios
      .post(AppUrl.getPDF, data, axiosConfig)
      .then(res => {
        //console.log(res.data);
        Linking.openURL(`${AppUrl.MediaBaseUrl}/${res.data}`);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlePayment = () => {
    setIsShowPaymentComp(true);
  };

  return (
    <ScrollView style={{ backgroundColor: '#000', flex: 1, paddingBottom: 20 }}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={{ margin: 8 }}>
            <View style={styles.showcaseStatus}>
              <Text style={{ color: '#ff0' }}>Delivery Status</Text>
            </View>

            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={progress}
                labels={labels}
                stepCount={7}
              />
            </View>

            <View style={styles.showcaseForm}>
              <Image
                source={{
                  uri: `${AppUrl.MediaBaseUrl + '/' + imageURl}`,
                }}
                style={{ width: '100%', height: 200, borderRadius: 10 }}
                resizeMode="stretch"
              />

              <View style={{ marginVertical: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Name:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {ownerName}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Phone No:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {ownerPhone}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Address:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {ownerAddress}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '22%' }}>
                    <Text style={{ color: '#fff', marginTop: 13 }}>
                      Description:
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',
                      width: '75%',
                    }}>
                    <RenderHtml contentWidth={50} source={descriptionHTML} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Price:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {currencyCount(event?.souvenir?.price) +
                        ' ' +
                        currency.symbol}
                      {/* {currencyCount(totalPrice) + ' ' + currency.symbol} */}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Delivery:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {currencyCount(event?.souvenir?.delivery_charge) +
                        ' ' +
                        currency.symbol}
                      {/* {currencyCount(totalPrice) + ' ' + currency.symbol} */}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Tax:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {currencyCount(
                        handelDollarTaxPrice(event?.souvenir?.tax),
                      ) +
                        ' ' +
                        currency.symbol}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Total:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {Number(currencyCount(event?.souvenir?.price)) +
                        Number(
                          currencyCount(
                            handelDollarTaxPrice(event?.souvenir?.tax),
                          ),
                        ) +
                        Number(
                          currencyCount(event?.souvenir?.delivery_charge),
                        ) +
                        ' ' +
                        currency.symbol}

                      {/* {currencyCount(totalPrice) + ' ' + currency.symbol} */}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>
                      {event?.status == 6 ? <>Delivered </> : <>Ordered </>}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {moment(event?.created_at).format('LL')}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <View style={{ width: '20%' }}>
                    <Text style={{ color: '#fff' }}>Status:</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: 'row',

                      width: '78%',
                    }}>
                    <Text style={{ color: '#fff', flexWrap: 'wrap' }}>
                      {event?.status == 0 ? (
                        <> Pending for Approval</>
                      ) : event?.status == 1 ? (
                        <> Approved for Payment</>
                      ) : event?.status == 2 ? (
                        <> Payment Complete</>
                      ) : event?.status == 3 ? (
                        <> Processing</>
                      ) : event?.status == 4 ? (
                        <> Product Received</>
                      ) : event?.status == 5 ? (
                        <> Processing</>
                      ) : event?.status == 6 ? (
                        <> Out for Delivery</>
                      ) : (
                        <> Delivered</>
                      )}
                    </Text>
                  </View>
                </View>

                {event?.status == 1 ? (
                  <TouchableOpacity
                    style={styles.downloadContainer}
                    onPress={handlePayment}>
                    <Text style={{ color: '#fe7013' }}>
                      <FontAwesome5
                        name={'credit-card'}
                        style={styles.customIcon}
                      />
                      {'  '}
                      Pay now
                    </Text>
                  </TouchableOpacity>
                ) : event?.status > 1 ? (
                  <TouchableOpacity
                    style={styles.downloadContainer}
                    onPress={downloadInvoice}>
                    <Text style={{ color: '#fe7013' }}>
                      <FontAwesome5
                        name={'download'}
                        style={styles.customIcon}
                      />{' '}
                      Download Invoice
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}></View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {isShowPaymentComp ? (
        <RegisPaymentModal
          eventType="souvenir"
          modelName="souvenir"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          souvenirId={event.souvenir_id}
          id={event.id}
          fee={event.total_amount}
          eventId={event.id}
        />
      ) : (
        <></>
      )}
    </ScrollView>
    // </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  //modal work start here
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    width: '98%',
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  showcaseStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  stepIndicator: {
    marginVertical: 8,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  showcaseForm: {
    backgroundColor: '#343333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputBorder: {
    backgroundColor: '#343333',
    color: '#ffffff',
    height: 18,
    // margin: 12,
    borderWidth: 0,
    fontSize: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputText: {
    marginTop: 8,
    marginLeft: 5,
    color: '#ddd',
  },
  price: {
    marginTop: 1,
    marginLeft: 5,
    color: '#ddd',
  },
  desc: {
    marginLeft: 5,
    color: '#ddd',
  },
  downloadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  customIcon: {
    fontSize: 18,
    color: '#fe7013',
  },
});

export default SouvenirOrderStatus;
