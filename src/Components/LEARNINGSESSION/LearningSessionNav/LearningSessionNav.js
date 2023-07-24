import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import HeaderComp from '../../HeaderComp';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../../RestApi/AppUrl';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import LineView from '../../LineView';
import { AuthContext } from '../../../Constants/context';
const LearningSessionNav = ({ route, navigation }) => {
  const { event, timeLeft } = route.params;
  const Navigation = useNavigation();
  const [showInstruction, setShowInstruction] = useState(false);
  const nowDate = new Date().getTime();
  // const countDownDate = new Date(event.assignment_reg_end_date).getTime();
  console.log('event', event);



  const eventInstruction = {
    html: `<div style='color:#e6e6e6;'>${event?.assignment_instruction ? event.assignment_instruction : ''
      }</div>`,
  };
  const { currencyCount, currency } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.bannerTitle}>
        <ImageBackground
          style={styles.background}
          source={{ uri: `${AppUrl.imageCdn + event.banner}` }}>
          <View
            style={{
              backgroundColor: '#ffffffa2',
              padding: 5,
              borderRadius: 10,
            }}>
            <CountDown
              until={timeLeft}
              // onFinish={() => setTimeDone(false)}
              // onPress={() => alert('hello')}
              digitStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: '#FFAD00',
                borderRadius: 20,
              }}
              digitTxtStyle={{ color: '#FFAD00' }}
              timeLabelStyle={{ color: 'black', fontWeight: 'bold' }}
              size={20}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <Text
              style={{
                color: '#ddd',
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center',
                padding: 5,
              }}>
              {event.title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            Navigation.navigate(navigationStrings.VIDEOUPLOADLEARNINGSESSION, {
              event: event,
            })
          }
          style={styles.listParent}>
          <View style={styles.onLeft}>
            <Image
              style={styles.resizeImage}
              source={imagePath.participation}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.middleOne}>
            <Text style={styles.participationText}>Video Upload</Text>
          </View>
          <View style={styles.onRight}>
            <AntDesign name="caretright" color="#ff0" size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.listParent}
          onPress={() => setShowInstruction(!showInstruction)}>
          <View style={styles.onLeft}>
            <Image
              style={styles.resizeImage}
              source={imagePath.instruction}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.middleOne}>
            <Text style={styles.participationText}>Instruction</Text>
          </View>
          {showInstruction ? (
            <View style={styles.onRight}>
              <View>
                <AntDesign name="caretdown" color="#ff0" size={20} />
              </View>
            </View>
          ) : (
            <View style={styles.onRight}>
              <View>
                <AntDesign name="caretright" color="#ff0" size={20} />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {showInstruction && (
          <View style={styles.listParentCopy}>
            <View style={{ padding: 5 }}>
              <RenderHtml contentWidth={9000} source={eventInstruction} />
            </View>
            <View>
              <View style={styles.topCard}>
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
                    Start:
                  </Text>
                  <Text style={{ color: 'white', width: '60%' }}>
                    {moment(event?.assignment_reg_start_date).format(
                      'DD MMMM YYYY',
                    )}
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
                    End:
                  </Text>
                  <Text style={{ color: 'white', width: '60%' }}>
                    {moment(event?.assignment_reg_end_date).format(
                      'DD MMMM YYYY',
                    )}
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
                    Fee:
                  </Text>
                  <Text style={{ color: 'white', width: '60%' }}>
                    {currencyCount(event?.assignment_fee) + ' ' + currency.symbol}
                    {/* {data.fee ? data.fee : data.cost} BDT */}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            Navigation.navigate(navigationStrings.RESULTLEARNINGSESSION, {
              event: event,
            })
          }
          style={styles.listParent}>
          <View style={styles.onLeft}>
            <Image
              style={styles.resizeImage}
              source={imagePath.judges}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.middleOne}>
            <Text style={styles.participationText}>Result</Text>
          </View>
          <View style={styles.onRight}>
            <AntDesign name="caretright" color="#ff0" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#343434',
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listParentCopy: {
    // flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#343434',
    padding: '8%',
    borderRadius: 10,
  },
  onLeft: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 5
  },
  participationText: {
    color: '#ffad00',
    fontSize: 17,
  },
  middleOne: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
  roundImage: {
    flexDirection: 'row',
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roundOneSize: {
    // width: 200,
    // height: 100,
  },
});

export default LearningSessionNav;
