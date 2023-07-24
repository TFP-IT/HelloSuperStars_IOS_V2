import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import navigationStrings from '../../Constants/navigationStrings';
import Notification from '../../Screen/Notification/Notification';
import GreetingRegistration from '../../Screen/Notification/GreetingRegistration/GreetingRegistration';
import AuctionProductContainer from '../../Screen/MarketPlace/AuctionProductContainer/AuctionProductContainer';
import AuctionParticipateNow from '../../Screen/MarketPlace/AuctionParticipateNow/AuctionParticipateNow';
const NotificationStack = createNativeStackNavigator();

export function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator screenOptions={{headerShown: false}}>
      <NotificationStack.Screen
        name={navigationStrings.NOTIFICATION}
        component={Notification}
      />
      <NotificationStack.Screen
        name={navigationStrings.GREETINGREGISTRATION}
        component={GreetingRegistration}
      />
      <NotificationStack.Screen
        name={navigationStrings.AUCTIONPARTICIPATENOW}
        component={AuctionParticipateNow}
      />
    </NotificationStack.Navigator>
  );
}
