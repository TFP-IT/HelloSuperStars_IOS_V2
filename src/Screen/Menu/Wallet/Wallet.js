import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import Styles from './Styles';
import HeaderComp from '../../../Components/HeaderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../Constants/imagePath';
import Packages from './Packages';
import { AuthContext } from '../../../Constants/context';
const Wallet = ({ navigation }) => {
  const { waletInfo, setWaletInfo } = useContext(AuthContext);


  return (
    <View style={Styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />

      <View style={Styles.mainRow}>
        <View style={Styles.secondRow}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon name="message" color={'#FFC448'} size={20} />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.live_chats}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>Live Chat</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon2 name="persons" color={'#FFC448'} size={20} />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.meetup}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>MeetUp</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon name="mic" color={'#FFC448'} size={20} />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.auditions}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>Auditions</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon name="question-answer" color={'#FFC448'} size={20} />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.qna}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>Q&A</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon3 name="hands-helping" color={'#FFC448'} size={20} />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.greetings}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>Greetings</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={Styles.smallContent}>
                <View>
                  <Text>
                    <Icon3
                      name="chalkboard-teacher"
                      color={'#FFC448'}
                      size={20}
                    />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#FFC448' }}>{waletInfo?.learning_session}</Text>
                </View>
              </View>
              <Text style={{ color: '#979797', fontSize: 12 }}>Learning</Text>
            </View>
          </View>
        </View>

        <View style={{ width: '40%' }}>
          <View style={Styles.thirdRow}>
            <View style={Styles.fourthRow}>
              <Image
                source={imagePath.goldenStar}
                style={{ height: 20, width: 20 }}
              />
            </View>
            <View style={{ width: '80%' }}>
              <View>
                <LinearGradient
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{ borderRadius: 5, width: 80 }}>
                  <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 10 }}>
                    Your status
                  </Text>
                </LinearGradient>

                <Text
                  style={{ color: '#FFAD00', fontWeight: 'bold', fontSize: 15, paddingRight: 3 }}>
                  {waletInfo?.type}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#484848',
              borderRadius: 25,
              marginVertical: 10,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 4,
            }}>

            <View style={Styles.fourthRow}>
              <Image
                source={imagePath.onlyStar}
                style={{ height: 20, width: 20 }}
              />
            </View>

            <View style={{ width: '80%' }}>
              <View>
                <LinearGradient
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{ borderRadius: 5, width: '70%' }}>
                  <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 10 }}>
                    Club Point
                  </Text>
                </LinearGradient>

                <Text
                  style={{ color: '#FFAD00', fontWeight: 'bold', fontSize: 15 }}>
                  {waletInfo?.club_points}
                </Text>
              </View>
            </View>
          </View>



          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#484848',
              borderRadius: 25,
              marginVertical: 10,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 4
            }}>
            <View style={Styles.fourthRow}>
              <Icon4 name="heart" color={'#FFC448'} size={15} />
            </View>
            <View style={{ width: '80%' }}>
              <View>
                <LinearGradient
                  colors={[
                    '#FFAD00',
                    '#FFD273',
                    '#FACF75',
                    '#E7A725',
                    '#FFAD00',
                  ]}
                  style={{ borderRadius: 5, width: '70%' }}>
                  <Text style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 10 }}>
                    Love bundle
                  </Text>
                </LinearGradient>

                <Text
                  style={{ color: '#FFAD00', fontWeight: 'bold', fontSize: 15, paddingRight: 3, width: '80%' }}>
                  {waletInfo?.love_points}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <Packages />
      </ScrollView>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
