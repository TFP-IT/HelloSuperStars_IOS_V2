import React from 'react';
import navigationStrings from '../Constants/navigationStrings';
import CategorySelection from '../Screen/Auth/CategorySelection';
import CreatePassword from '../Screen/Auth/CreatePassword';
import Flash from '../Screen/Auth/Flash';
import ForgetPassword from '../Screen/Auth/ForgetPassword';
import Login from '../Screen/Auth/Login';
import Otp from '../Screen/Auth/Otp';
import SignUp from '../Screen/Auth/SignUp';
import UserInformation from '../Screen/Auth/UserInformation';
import VirtualTour from '../Screen/Auth/VirtualTour';

const AuthStack = Stack => {
  return (
    <>

      <Stack.Screen name="Flash" component={Flash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="category" component={CategorySelection} />
      <Stack.Screen name="virtualTour" component={VirtualTour} />
      <Stack.Screen name="userInformation" component={UserInformation} />
      <Stack.Screen name={navigationStrings.FORGETPASSWORD} component={ForgetPassword} />
      <Stack.Screen name={navigationStrings.CREATEPASSWORD} component={CreatePassword} />

    </>
  );
};

export default AuthStack;
