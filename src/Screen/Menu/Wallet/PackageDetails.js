import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../../Constants/context';
const PackageDetails = ({
  setToggol,
  packageName,
  LiniarColor,
  price,
  handelPaymentView,
  allInfo = null,
}) => {
  const { currencyMulti, currencyCount, currency } = useContext(AuthContext);
  console.log(allInfo);
  return (
    <View style={{ position: 'relative', marginBottom: 10 }}>
      <LinearGradient
        colors={['#FFAD00',
          '#FFD273',
          '#FACF75',
          '#E7A725',
          '#FFAD00',]}
        style={{ margin: 15, borderRadius: 15, paddingVertical: 10 }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {packageName}
          </Text>
          <Text
            style={{
              color: '#F4EAFB',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {price + " " + currency.symbol}
          </Text>

          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Club Points : {allInfo.club_points}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Love Points :{allInfo.love_points}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Auditions :{allInfo.auditions}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Learning Session :{allInfo.learning_session}
            </Text>

            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Live Chats :{allInfo.live_chats}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Meetup Events :{allInfo.meetup}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />
              Greetings :{allInfo.greetings}
            </Text>
            <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 18 }}>
              <Icon name="star" size={12} />Q & A :{allInfo.qna}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={
                packageName == 'SILVER'
                  ? {
                    backgroundColor: '#C2C2C2',
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }
                  : packageName === 'GOLD'
                    ? {
                      backgroundColor: '#FFD465',
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }
                    : packageName === 'PLATINUM'
                      ? {
                        backgroundColor: '#E3BEE4',
                        width: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }
                      : null
              }
              onPress={handelPaymentView}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  padding: 5,
                  color: 'white',
                }}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={() => {
          setToggol(false);
        }}
        style={{ position: 'absolute', bottom: -10, left: '45%' }}>
        <Text>
          <Icon name="chevron-up-circle-sharp" size={40} color="#C2C2C2" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PackageDetails;
