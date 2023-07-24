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
const MenuActivities = ({route}) => {
  const navigation = useNavigation();

  // const { menuActivitList } = route.params;

  const {activities} = useContext(AuthContext);

  let menuActivitList = activities;

  const [greetingActivities, setGreetingActivities] = useState(0);
  const filteredActivities = menuActivitList?.greeting_activities?.filter(
    item => {
      return item.type === 'greeting'
        ? item?.greeting_registration?.status > 2
          ? () => {
              item.greeting;
              setGreetingActivities(greetingActivities + 1);
            }
          : null
        : item;
    },
  );

  return (
    <SafeAreaView>
      <HeaderComp backFunc={() => navigation.goBack()} />

      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#000', paddingBottom: 200}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList:
                  menuActivitList?.learning_session_activities,
                childActivityEventType: 'learningSession',
              });
            }}>
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
                        {menuActivitList?.learning_session_activities?.length}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Learning Sessions</Text>

                    <Text style={styles.contentText2}>
                      {menuActivitList?.learning_session_activities?.length > 0
                        ? menuActivitList?.learning_session_activities?.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                {menuActivitList?.learning_session_activities?.length > 0 ? (
                  <View style={{justifyContent: 'center'}}>
                    {menuActivitList?.learning_session_activities[0]
                      ?.created_at ? (
                      <>
                        <Text style={styles.contentText2}>
                          {moment(
                            menuActivitList?.learning_session_activities[0]
                              ?.created_at
                              ? menuActivitList?.learning_session_activities[0]
                                  ?.created_at
                              : null,
                          ).fromNow()}
                        </Text>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Live Chat  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.live_chat_activities,
                childActivityEventType: 'liveChat',
              });
            }}>
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
                        {' '}
                        {menuActivitList?.live_chat_activities?.length}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Live Chat</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.live_chat_activities?.length > 0
                        ? menuActivitList?.live_chat_activities?.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.live_chat_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.live_chat_activities[0]?.created_at
                            ? menuActivitList?.live_chat_activities[0]
                                ?.created_at
                            : null,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Question & Answer  */}

          {/* Meetup Events  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.meetup_activities,
                childActivityEventType: 'meetup',
              });
            }}>
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
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {menuActivitList?.meetup_activities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Meetup Events</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.meetup_activities.length > 0
                        ? menuActivitList?.meetup_activities.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.meetup_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.meetup_activities[0]?.created_at,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.qna_activities,
                childActivityEventType: 'qna',
              });
            }}>
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
                        {' '}
                        {menuActivitList?.qna_activities?.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Question & Answer</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.qna_activities?.length > 0
                        ? menuActivitList?.qna_activities?.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.qna_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.qna_activities[0]?.created_at
                            ? menuActivitList?.qna_activities[0]?.created_at
                            : null,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Greetings  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.GREETINGS, {
                activeGreetings: menuActivitList?.greeting_activities,
              });
            }}>
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
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {' '}
                        {filteredActivities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Greetings</Text>
                    <Text style={styles.contentText2}>
                      {filteredActivities.length > 0
                        ? filteredActivities.length
                        : 'No'}{' '}
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
            onPress={() => {
              navigation.navigate(navigationStrings.LEARNING, {
                activeAudition: menuActivitList?.audition_activities,
              });
            }}>
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
                        {' '}
                        {menuActivitList?.audition_activities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Auditions</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.audition_activities.length > 0
                        ? menuActivitList?.audition_activities.length
                        : 'No'}{' '}
                      audition available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.contentText2}>
                    {moment(
                      menuActivitList?.audition_activities[0]?.created_at,
                    ).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* MarketPlace  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.marketplace_activities,
                childActivityEventType: 'marketplace',
              });
            }}>
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
                        {' '}
                        {menuActivitList?.marketplace_activities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>MarketPlace</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.marketplace_activities.length > 0
                        ? menuActivitList?.marketplace_activities.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.marketplace_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.marketplace_activities[0]
                            ?.created_at,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Auction  */}

          {/* 
          setChildActivityEventList(menuActivitList?.auction_activities);
          setChildActivityEventType('auction'); */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.auction_activities,
                childActivityEventType: 'auction',
              });
            }}>
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
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {' '}
                        {menuActivitList?.auction_activities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Auction</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.auction_activities.length > 0
                        ? menuActivitList?.auction_activities.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.auction_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.auction_activities[0]?.created_at,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* Souvenir  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(navigationStrings.ACTIVITESCARD, {
                childActivityEventList: menuActivitList?.souviner_activities,
                childActivityEventType: 'souviner',
              });
            }}>
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
                      <Text style={{color: '#fff', fontSize: 10}}>
                        {' '}
                        {menuActivitList?.souviner_activities.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ContentItems2}>
                    <Text style={styles.contentText}>Souvenir</Text>
                    <Text style={styles.contentText2}>
                      {menuActivitList?.souviner_activities.length > 0
                        ? menuActivitList?.souviner_activities.length
                        : 'No'}{' '}
                      activities available now
                    </Text>
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  {menuActivitList?.souviner_activities[0]?.created_at ? (
                    <>
                      <Text style={styles.contentText2}>
                        {moment(
                          menuActivitList?.souviner_activities[0]?.created_at,
                        ).fromNow()}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </View>
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

export default MenuActivities;
