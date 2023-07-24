import moment from 'moment';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '../../../Constants/context';
import LineView from '../../LineView';
import TitleHeader from '../../TitleHeader';
import styles from './styles';

const InformationComp = ({ data, type = null, takeTime = null }) => {
  // console.log('InformationComp------data------', data)
  const { axiosConfig, currencyMulti, currencyCount, currency, countryTime, countryDate } =
    useContext(AuthContext);
  // console.log('data issssssssssssssss', data);

  return (
    <>
      {type == 'greeting' ? (
        <>
          <View style={styles.topCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{ color: 'white', width: '30%' }}>Star:</Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {data?.greeting?.star?.first_name}{' '}
                {data?.greeting?.star?.last_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{ color: 'white', width: '30%' }}>Date:</Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {moment(data?.request_time).format('LL')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{ color: 'white', width: '30%' }}>Time:</Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {moment(data?.request_time, 'HH:mm:ss').format('hh:mm A')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{ color: 'white', width: '30%' }}>Fee:</Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {currencyCount(data?.greeting?.cost) + ' ' + currency.symbol}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <TitleHeader title={'Information'} />
          <View
            style={{
              backgroundColor: '#282828',
              margin: 8,
              borderRadius: 5,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: '30%',
                  fontWeight: 'bold',
                  color: '#ffaa00',
                }}>
                Name
              </Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {data?.star?.first_name} {data?.star?.last_name}
              </Text>
            </View>
            <LineView />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: '30%',
                  fontWeight: 'bold',
                  color: '#ffaa00',
                }}>
                Registration Date
              </Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {countryDate(data?.registration_start_date)} <Text style={{ color: '#ffaa00' }}> To </Text>{' '}
                {countryDate(data?.registration_end_date)}
              </Text>
            </View>
            <LineView />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: '30%',
                  fontWeight: 'bold',
                  color: '#ffaa00',
                }}>
                Date
              </Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {countryDate(data?.event_date)}
              </Text>
            </View>
            <LineView />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: '30%',
                  fontWeight: 'bold',
                  color: '#ffaa00',
                }}>
                Time
              </Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {countryTime(data?.start_time)} to{' '}
                {countryTime(data?.end_time)}
              </Text>
            </View>
            <LineView />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  width: '30%',
                  fontWeight: 'bold',
                  color: '#ffaa00',
                }}>
                Fee
              </Text>
              <Text style={{ color: 'white', width: '60%' }}>
                {currencyCount(data?.fee ? data?.fee : 0) +
                  ' ' +
                  currency.symbol}
                {/* {data?.fee ? data?.fee : data?.cost} BDT */}
              </Text>
            </View>
            <LineView />
            {takeTime != null && takeTime != '' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      width: '30%',
                      fontWeight: 'bold',
                      color: '#ffaa00',
                    }}>
                    Total Fee:
                  </Text>
                  <Text style={{ color: 'white', width: '60%' }}>
                    {currencyMulti(data?.fee, takeTime) +
                      ' ' +
                      currency.symbol +
                      ' '}
                    ({currencyCount(Number(data?.fee))}*{takeTime})
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default InformationComp;
