import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import navigationStrings from '../../Constants/navigationStrings';
import {MarketPlace} from '../../Screen';
import AuctionParticipateNow from '../../Screen/MarketPlace/AuctionParticipateNow/AuctionParticipateNow';
import MarketPlaceBuyNow from '../../Screen/MarketPlace/MarketPlaceBuyNow/MarketPlaceBuyNow';
const MarketPlaceStack = createNativeStackNavigator();

export function MarketPlaceStackScreen() {
  return (
    <MarketPlaceStack.Navigator screenOptions={{headerShown: false}}>
      <MarketPlaceStack.Screen
        name={navigationStrings.MARKETPLACE}
        component={MarketPlace}
      />
      <MarketPlaceStack.Screen
        name={navigationStrings.BUYMARKETPLACEPRODUCT}
        component={MarketPlaceBuyNow}
      />
      <MarketPlaceStack.Screen
        name={navigationStrings.AUCTIONPARTICIPATENOW}
        component={AuctionParticipateNow}
      />
    </MarketPlaceStack.Navigator>
  );
}
