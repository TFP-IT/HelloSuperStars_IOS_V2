import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import HeaderComp from '../../../Components/HeaderComp';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import styles from './Styles';
import AppUrl from '../../../RestApi/AppUrl';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FlatGrid} from 'react-native-super-grid';
import {AuthContext} from '../../../Constants/context';
import axios from 'axios';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
const TotalAuditions = ({route}) => {
  const navigation = useNavigation();
  const {audition} = route.params;
  const {axiosConfig} = useContext(AuthContext);

  const [roundInfo, setRoundInfo] = useState([]);
  const [roundPass, setRoundPass] = useState(0);

  const [roundInstruction, setRoundInstruction] = useState([]);
  const [auditionRoundNum, setAuditionRoundNum] = useState(0);
  const [round, setRound] = useState([]);
  const [roundStartDate, setRoundStartDate] = useState(null);
  const [lastTime, setLastTime] = useState(true);
  const remainingTime = time => {
    const startTime = new Date(time.concat(' 00:00:00')).getTime();
    const currentTime = new Date().getTime();
    if (startTime >= currentTime) {
      return (startTime - currentTime) / 1000;
    }
    return 0;
  };
  useEffect(() => {
    axios
      .get(AppUrl.activeRounds + audition.slug, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setRoundInfo([res.data.round_info]);
          setRoundPass(res.data.myRoundPass);
          //console.log(res.data);
          setRoundInstruction(res.data.round_instruction);
          setAuditionRoundNum(
            res.data.myRoundPass + 1 >= res.data.totalRound
              ? res.data.totalRound
              : res.data.myRoundPass + 1,
          );

          const allRounds = audition.audition_round;

          const activeRoundNumber = res.data.myRoundPass;

          console.log('all rounds', allRounds);

          console.log('activeRoundNumber', activeRoundNumber);

          const currentRound = allRounds?.filter(item => {
            return item.round_num <= activeRoundNumber + 1;
          });

          setRound(currentRound);
          console.log('data is===>', currentRound);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const buildRound = () => {};
  return (
    <View style={styles.container}>
      {/*========= header start here==========  */}
      <HeaderComp backFunc={() => navigation.goBack()} />
      {/*========= header start here==========  */}

      <ScrollView style={{marginTop: 6}}>
        {/*============ top banner start here ======= */}

        <View style={styles.topBannerImg}>
          <View style={{zIndex: 2}}>
            <CountDown
              // until={totalSecond}
              until={remainingTime(
                audition?.audition_round[0]?.round_start_date,
              )}
              onFinish={() => setLastTime(false)}
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
              size={20}
            />
          </View>

          <Image
            // source={imagePath.RoundBanner}
            source={{
              uri: AppUrl.MediaBaseUrl + audition.banner,
            }}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 10,
              marginTop: -80,
              zIndex: 1,
              elevation: 1,
            }}
          />
          <Text
            style={styles.topBannerTxt}
            onPress={() => {
              console.log(round);
            }}>
            {audition.title}
          </Text>
        </View>
        {/*============ top banner end here ======= */}

        {/* =============Round-1 & 2 Navigation start here==========  */}
        <View style={styles.roundView}>
          <FlatGrid
            itemDimension={160}
            data={round}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log(item.round_start_date);
                    const roundStartDate = new Date(
                      item.round_start_date,
                    ).getTime();
                    const timeNow = new Date().getTime();
                    const end_date =
                      moment(audition.info?.registration_end_date).format(
                        'LL',
                      ) +
                      ' ' +
                      '00:00:00';
                    const auditionRegistrationEnd = new Date(
                      end_date,
                    ).getTime();

                    if (timeNow <= roundStartDate) {
                      console.log('block');
                      Toast.show(
                        'round not started Yet! Please wait...',
                        Toast.durations.SHORT,
                      );
                      return;
                    } else if (timeNow <= auditionRegistrationEnd) {
                      console.log(timeNow - auditionRegistrationEnd);
                      Toast.show(
                        'Registration not end yet! Please wait...',
                        Toast.durations.SHORT,
                      );
                      return;
                    }

                    navigation.navigate(navigationStrings.ROUND1, {
                      auditionInfo: item,
                      auditionImage: audition.banner,
                      auditionTitle: audition.title,
                      auditionId: item.audition_id,
                      roundId: item.id,
                      judges: audition.assigned_judges,
                      juries: audition.assigned_juries,
                    });
                  }}
                  style={{
                    height: 180,
                    width: '100%',
                    // backgroundColor: '#282828',
                    borderRadius: 10,
                    // padding: 10,
                    position: 'relative',
                  }}>
                  <Image
                    source={imagePath.Round}
                    style={styles.roundImg}
                    resizeMode={'stretch'}
                  />

                  <Text style={styles.roundTxt}>{item.round_num}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TotalAuditions;
