import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import styles from './stylesActive';
import {BackHandler} from 'react-native';
import MenuNavigator from '../MenuNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComp from '../../../Components/HeaderComp';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../../../Constants/context';
const MenuActivitiesV1 = ({route}) => {
  const navigation = useNavigation();

  const [activitesData, setActivitesData] = useState({
    marketPlace: [],
    livechat: [],
    qna: [],
    meetup: [],
    learningSession: [],
    audition: [],
  });

  const {activities} = useContext(AuthContext);
  useEffect(() => {
    console.log('all activety list', activities);

    setActivitesData({
      ...activitesData,
      marketPlace:
        activities && activities.filter(item => item.type == 'marketplace'),
      livechat:
        activities && activities.filter(item => item.type == 'livechat'),
      qna: activities && activities.filter(item => item.type == 'qna'),
      meetup: activities && activities.filter(item => item.type == 'meetup'),
      learningSession:
        activities && activities.filter(item => item.type == 'learningSession'),
      audition:
        activities && activities.filter(item => item.type == 'audition'),
    });
  }, [activities]);

  return (
    <SafeAreaView>
      <HeaderComp backFunc={() => navigation.goBack()} />

      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#000', paddingBottom: 200}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.learningSession,
                noduleName: 'Learning session',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Learning}
                        style={{height: 18, width: 18}}
                      />
                    </LinearGradient>

                    {/* <Text>    {menuActivitList?.learning_session_activities?.length}</Text> */}

                    <View style={styles.NotifyText}>
                      <Text style={{color: 'white', fontSize: 10}}>
                        {activitesData?.learningSession?.length}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Learning Sessions</Text>

                    <Text style={styles.contentText2}></Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Live Chat  */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.livechat,
                noduleName: 'Live Chat',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  {/* <Text style={styles.Bar}></Text> */}
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.LiveChat}
                        style={{height: 18, width: 18}}
                      />
                    </LinearGradient>
                    <View style={styles.NotifyText}>
                      <Text style={{color: 'white', fontSize: 10}}>
                        {activitesData?.livechat?.length}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Live Chat</Text>
                    <Text style={styles.contentText2}></Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Question & Answer  */}

          {/* Meetup Events  */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.meetup,
                noduleName: 'Meetup',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  {/* <Text style={styles.Bar}></Text> */}

                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.MeetUp}
                        resizeMode={'contain'}
                        style={{height: 25, width: 25}}
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: 'white', fontSize: 10}}>
                        {activitesData?.meetup?.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Meetup Events</Text>
                    <Text style={styles.contentText2}></Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.qna,
                noduleName: 'Question and answer',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  {/* <Text style={styles.Bar}></Text> */}

                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.QA}
                        resizeMode={'contain'}
                        style={{height: 25, width: 25}}
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {activitesData?.qna?.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Question & Answer</Text>
                    <Text style={styles.contentText2}></Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Greetings  */}
          <TouchableOpacity>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  {/* <Text style={styles.Bar}></Text> */}

                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Greetings}
                        resizeMode={'contain'}
                        style={{height: 25, width: 25}}
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}> </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Greetings</Text>
                    <Text style={styles.contentText2}>
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Upcoming Auditions  */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.audition,
                noduleName: 'Audition',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  {/* <Text style={styles.Bar}></Text> */}

                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <Image
                        source={imagePath.Auditions}
                        resizeMode={'contain'}
                        style={{height: 25, width: 25}}
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {activitesData?.audition.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Auditions</Text>
                    <Text style={styles.contentText2}></Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.contentText2}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* MarketPlace  */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(navigationStrings.EVENTACTIVITY, {
                data: activitesData?.marketPlace,
                noduleName: 'Market place',
              })
            }>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <FontAwesome
                        name="shopping-cart"
                        size={22}
                        color="#000"
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {activitesData?.marketPlace?.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>MarketPlace</Text>
                    <Text style={styles.contentText2}>2</Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Auction  */}

          {/* 
          setChildActivityEventList(menuActivitList?.auction_activities);
          setChildActivityEventType('auction'); */}

          <TouchableOpacity>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <MaterialCommunityIcons
                        name="point-of-sale"
                        size={23}
                        color="#000"
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}></Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Auction</Text>
                    <Text style={styles.contentText2}>
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text>41241</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Souvenir  */}
          <TouchableOpacity>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <FontAwesome name="gift" size={23} color="#000" />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}></Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Souvenir</Text>
                    <Text style={styles.contentText2}>
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}></View>
              </View>
            </View>
          </TouchableOpacity>

          {/* live now  */}
          <TouchableOpacity
            onPress={() => {
              Toast.show('No Activities Available', Toast.SHORT);
            }}>
            <View style={styles.Touch}>
              <View style={styles.content}>
                <View style={styles.ContentItems}>
                  <View style={{position: 'relative'}}>
                    <LinearGradient
                      colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}
                      style={styles.iconView2}>
                      <MaterialCommunityIcons
                        name="video"
                        size={23}
                        color="#000"
                      />
                    </LinearGradient>

                    <View style={styles.NotifyText}>
                      <Text style={{color: '#fff', fontSize: 10}}> 0</Text>
                    </View>
                  </View>

                  {/* <Text style={styles.NotifyText}>15</Text> */}
                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Live Now</Text>
                    <Text style={styles.contentText2}>
                      No activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.contentText2}></Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuActivitiesV1;
