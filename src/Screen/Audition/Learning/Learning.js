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
import SingleAudition from './SingleAudition';
const Learning = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [auditions, setAuditions] = useState([]);
  const { useInfo, axiosConfig } = useContext(AuthContext);

  const [lastTime, setLastTime] = useState(true);

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

  useEffect(() => {
    axios.get(AppUrl.enrolledAudition, axiosConfig).then(res => {
      if (res.data.status === 200) {
        setAuditions(res.data.enrolledAuditions);
      }
    });
  }, []);
  return (
    <>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.container}>
        <SafeAreaView style={styles.ActiveNew}>
          {/* <View style={{position: 'relative'}}>
            <Image source={imagePath.BgLane} style={styles.LaneBg} />
            <Text style={styles.LaneText} onPress={console.log(auditions)}>
              Auditions
            </Text>
          </View> */}
          <TitleHeader title={'Auditions'} />

          <View style={{ height: '100%' }}>
            {/*================== Card  Start here==================  */}

            {auditions?.length > 0 ? (
              auditions.map((audition, index) => {
                return <SingleAudition audition={audition} />;
              })
            ) : (
              <></>
            )}

            {/*================== Card  Start here==================  */}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Learning;
