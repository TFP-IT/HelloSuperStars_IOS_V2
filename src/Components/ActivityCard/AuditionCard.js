import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import colorCode from '../../Constants/colorCode';
import imagePath from '../../Constants/imagePath';
import {useThemeColor} from '../../CustomHooks/useThemeColor';
import CountDown from 'react-native-countdown-component';
import Wav from '../Wav/Wav';
import moment from 'moment';
import {AuthContext} from '../../Constants/context';
import {useContext} from 'react';
import {useTimeDiff} from '../../CustomHooks/useTimeDiff';
import {useState} from 'react';
import AppUrl from '../../RestApi/AppUrl';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import navigationStrings from '../../Constants/navigationStrings';
import useAsyncGet from '../../CustomHooks/useAsyncGet';

const AuditionCard = ({data}) => {
  const {themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor} =
    useThemeColor();
  const {countryDateTime, axiosConfig, useInfo} = useContext(AuthContext);
  const [callJoin, setcallJoin] = useState(false);
  const navigation = useNavigation();

  const {seconds, days, endSeconds, timeLeft} = useTimeDiff({
    time: countryDateTime(data?.audition?.user_reg_start_date),
    currentTime: moment().format(''),
    endTime: countryDateTime(data?.audition?.user_reg_end_date),
  });

  const {response, loading} = useAsyncGet(AppUrl.enrolledAudition);
  // const audition = response?.data?.audition

  // console.log('my data audition', data?.audition?.slug)

  const handelStartRound = () => {
    // alert('hello')

    if (!loading) {
      const curAudition = response.data.enrolledAuditions?.filter(item => {
        return item.audition_id == data?.audition.id;
      });
      navigation.navigate(navigationStrings.TOTALAUDITION, {
        audition: curAudition[0].audition,
      });
    }

    // return navigation.navigate(navigationStrings.ROUNDDETAILS, {
    //   AuditionData: {
    //     slug: data?.audition?.slug,
    //     title: data?.audition?.title,
    //     bannerImage: data?.audition?.banner,
    //   },
    // });
  };

  console.log('time', seconds + 'time left' + timeLeft);
  return (
    <ImageBackground
      source={imagePath.cardBg}
      style={[styles.contaner, themeCardColor]}>
      <Image
        source={{uri: AppUrl.imageCdn + data?.audition?.banner}}
        resizeMode="contain"
        style={styles.cardImageContainer}
      />

      <View style={styles.cardTextContainer}>
        <Text style={[styles.titleText, themeTextColor]}>
          {data?.audition?.title.slice(0, 22) + '...'}
        </Text>
        <View
          style={{
            width: '100%',
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {data?.audition?.assigned_judges &&
            data?.audition?.assigned_judges.map((item, index) => (
              <>
                <Image
                  source={
                    !item?.user?.image
                      ? imagePath.noImage
                      : {
                          uri: AppUrl.imageCdn + item?.user?.image,
                        }
                  }
                  style={styles.starProfile}
                  key={index}
                />
              </>
            ))}
        </View>

        {/* {timeLeft > 0 ? ( */}
        {false ? (
          <CountDown
            size={14}
            until={timeLeft}
            onFinish={() => setcallJoin(true)}
            digitStyle={{
              backgroundColor: colorCode.Background,
              borderColor: colorCode.gold,
            }}
            digitTxtStyle={{color: colorCode.gold}}
            timeLabelStyle={{color: colorCode.whiteText, fontWeight: 'bold'}}
            // separatorStyle={{ color: colorCode.gold }}
            timeToShow={['D', 'H', 'M', 'S']}
            timeLabels={{m: 'Minute', s: 'Second', h: 'Hour', d: 'Day'}}
            showSeparator
          />
        ) : (
          <View>
            {/* {[...Array(6).keys()].map((_, index) => (
              <Wav key={index} index={index} size={50} />
            ))} */}
            <TouchableOpacity
              style={{
                backgroundColor: colorCode.gold,
                height: 40,
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
              }}
              onPress={handelStartRound}>
              <Text style={{fontWeight: '700', color: colorCode.formBg}}>
                Join Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default AuditionCard;

const styles = StyleSheet.create({
  contaner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: '40%',
    margin: 5,
    borderRadius: 10,
  },
  cardTextContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 5,
    width: '100%',
  },
  starProfile: {
    width: 40,
    height: 40,
    backgroundColor: colorCode.transparentBlackDark,
    borderRadius: 50,
  },
});
