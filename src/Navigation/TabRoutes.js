import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Constants/context';
import navigationStrings from '../Constants/navigationStrings';
import AppUrl from '../RestApi/AppUrl';
import VideoSliderContainer from '../Screen/VideoSlider/VideoSliderContainer';
import { HomeStackScreen } from './HomeStack/HomeStackScreen';
import { MarketPlaceStackScreen } from './MarketPlaceStack/MarketPlaceStackScreen';
import MenuStackScreen from './MenuStack/MenuStackScreen';
import MenuStackScreenV2 from './MenuStackV2/MenuStackScreenV2';
import { NotificationStackScreen } from './NotificationStack/NotificationStackScreen';
import { useThemeColor } from '../CustomHooks/useThemeColor';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const {
    notification,
    setNotification,
    axiosConfig,
    totalNotification,
    updateNotification,
    setGreetingInfo,
    promoNotification,
    useInfo,
    currency
  } = useContext(AuthContext);
  updateNotification();
  const [winderCount, setWinderCount] = useState()
  const { themeCardColor, themeIconColor, themeBacground } = useThemeColor()

  useEffect(() => {
    checkNotification();
    updateNotification();

  }, [totalNotification]);

  useEffect(() => {
    console.log('my user', useInfo)
    if (currency.eventMode) {
      setWinderCount(useInfo?.notify_status)
    }
  }, [currency])

  let checkNotification = async () => {
    let res = await axios
      .get(AppUrl.CheckNotification, axiosConfig)
      .then(res => {
        //console.log('greeting_info', res.data);
        setNotification(res?.data?.notifiction);
        setGreetingInfo(res.data.greeting_info);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log('notification-----', notification);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBg, themeBacground]
        // position: 'absolute',

        // borderTopRightRadius: 10,
        // borderTopLeftRadius: 10,


      }}>
      <Tab.Screen
        name={navigationStrings.HOMESTACK}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="home"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={23}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="home"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={23}
                    />
                  </View>
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.NOTIFICATIONSTACK}
        component={NotificationStackScreen}
        options={{
          tabBarBadge: totalNotification > 0 ? totalNotification : null || promoNotification > 0 ? promoNotification : null || winderCount,
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="bell"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={22}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="bell"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={22}
                    />
                  </View>
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="hekkpo"
        component={VideoSliderContainer}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="video"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={23}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="video"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={23}
                    />
                  </View>
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.MARKETPLACE}
        component={MarketPlaceStackScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="shopping"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={22}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="shopping"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={22}
                    />
                  </View>
                )}
              </>
            );
          },
        }}
      />


      <Tab.Screen
        name={navigationStrings.MENUSTACKSCREENV2}
        component={MenuStackScreenV2}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="format-list-bulleted"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={24}
                    />
                  </Animatable.View>
                ) : (
                  <View style={focused ? styles.activeTab : styles.menuTab}>
                    <MaterialCommunityIcons
                      name="format-list-bulleted"
                      color={focused ? '#FFAD00' : themeIconColor}
                      size={24}
                    />
                  </View>
                )}
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBg: {
    borderTopWidth: 0,
    paddingHorizontal: 3,
    position: 'absolute',
    // bottom: 10,
    paddingBottom: 6,
    // height: 65
    paddingVertical: 5
  },
  activeTab: {
    position: 'absolute',
    borderColor: '#FFAD00',
    borderWidth: 0.3,
    // backgroundColor: '#ffffff7c',
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTab: {
    position: 'absolute',
    // borderColor: 'black',
    // borderWidth: 0.3,
    // backgroundColor: '#00000048',
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabRoutes;
