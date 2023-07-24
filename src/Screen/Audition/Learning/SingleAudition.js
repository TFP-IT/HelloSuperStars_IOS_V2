import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import HeaderComp from '../../../Components/HeaderComp';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './Styles';
import CountDown from 'react-native-countdown-component';
import { FlatGrid } from 'react-native-super-grid';
import moment from 'moment';
import TitleHeader from '../../../Components/TitleHeader';
import LinearGradient from 'react-native-linear-gradient';
const SingleAudition = ({ audition }) => {
  console.log('single audition', audition);
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [auditions, setAuditions] = useState([]);
  const { useInfo, axiosConfig } = useContext(AuthContext);
  const [countDownTime, setCountDownTime] = useState(null);
  const calculateRemainingTime = async time => {
    const now = await moment.utc();
    console.log(time);
    var end = await moment(time);
    var hours = end.diff(now, 'seconds');
    console.log('calculateRemainingTime for count', hours);
    setCountDownTime(hours);
  };
  useEffect(() => {
    calculateRemainingTime(
      audition?.audition?.audition_round[0]?.round_start_date,
    );
  }, []);
  const remainingTime = time => {
    const startTime = new Date(time.concat(' 00:00:00')).getTime();
    const currentTime = new Date().getTime();
    if (startTime >= currentTime) {
      return (startTime - currentTime) / 1000;
    }
    return 0;
  };
  const isComplete = time => {
    const endTime = new Date(time.concat(' 00:00:00')).getTime();
    const currentTime = new Date().getTime();
    if (endTime >= currentTime) {
      return true;
    }
  };
  return (
    <View style={{ height: '38%' }}>
      <LinearGradient
        style={styles.LagEr}
        colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
        <TouchableOpacity
          onPress={() => {
            const end_date =
              moment(audition?.audition?.info?.registration_end_date).format(
                'LL',
              ) +
              ' ' +
              '00:00:00';
            const countDownDate = new Date(end_date).getTime();
            if (countDownDate >= new Date().getTime()) {
              console.log('no');
              Toast.show(
                'round not started Yet! Please wait...',
                Toast.durations.SHORT,
              );
              return;
            }

            navigation.navigate(navigationStrings.TOTALAUDITION, {
              audition: audition.audition,
            });

            return;
          }}>
          <Image
            source={{
              uri: AppUrl.MediaBaseUrl + audition.audition.banner,
            }}
            style={width > 500 ? styles.ImgLanB : styles.ImgLan}
          />
          {remainingTime(audition.audition.start_date) != 0 &&
            !isComplete(audition.audition.end_date) ? (
            <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
              Please Wait
            </Text>
          ) : remainingTime(audition.audition.start_date) == 0 &&
            isComplete(audition.audition.end_date) ? (
            <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
              Join Now
            </Text>
          ) : (
            <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
              Completed
            </Text>
          )}
          <View style={styles.LajFS}>
            {countDownTime && (
              <View
                style={{
                  backgroundColor: '#ffffffa2',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <CountDown
                  // until={totalSecond}
                  until={countDownTime}
                  // onPress={() => alert('hello')}
                  digitStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: '#FFAD00',
                    borderRadius: 20,
                  }}
                  digitTxtStyle={{ color: '#FFAD00' }}
                  timeLabelStyle={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                  size={20}
                />
              </View>
            )}

            <Text style={styles.autionTitleText}>
              {audition.audition.title}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default SingleAudition;
