import {View, Text} from 'react-native';
import React from 'react';
import AuditionUploadRound from '../AuditionUploadRound/AuditionUploadRound';

const RoundStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Screen name="AuditionUploadRound" component={AuditionUploadRound} />
     
    </>
  );
};

export default RoundStack;
