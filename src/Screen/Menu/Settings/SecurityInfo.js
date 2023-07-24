/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import TitleHeader from '../../../Components/TitleHeader';
const SecurityInfo = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isPassMatched, setIsPassMatched] = useState(false);
  const { axiosConfig } = useContext(AuthContext);
  const [eyeIcon1, seteyeIcon1] = useState(false);
  const [eyeIcon2, seteyeIcon2] = useState(false);
  const [eyeIcon3, seteyeIcon3] = useState(false);
  const handleSave = () => {
    const data = {
      oldPassword,
      newPassword,
    };
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setHasError(true);
    } else if (newPassword === confirmPassword) {
      setIsPassMatched(true);
      axios
        .post(AppUrl.passwordChange, data, axiosConfig)
        .then(res => {
          //console.log(res.data);
          if (res.data.status === 200) {
            navigation.goBack();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <TitleHeader title={'Security information'} />
        <View style={{ marginHorizontal: 10, backgroundColor: '#202020', borderRadius: 10 }}>
          {/* <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            SECURITY INFORMATION
          </Text> */}

          <View style={{ marginVertical: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
              }}>

              <TextInput
                secureTextEntry={!eyeIcon1 ? true : false}
                style={{ paddingHorizontal: 10, color: 'white', width: '93%' }}
                placeholder={'Old Password'}
                placeholderTextColor="gray"
                onChangeText={setOldPassword}
                value={oldPassword}
              />
              <TouchableOpacity onPress={() => {
                seteyeIcon1(!eyeIcon1);

              }} >
                <Icon name={eyeIcon1 ? 'eye' : "eye-slash"} size={18} color="#ffaa00" />
              </TouchableOpacity>
            </View>
            {hasError && !oldPassword && (
              <Text style={{ color: 'red', marginLeft: 30, marginTop: 5 }}>
                This field is required !
              </Text>
            )}
          </View>

          <View style={{ marginVertical: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
              }}>

              <TextInput
                secureTextEntry={!eyeIcon2 ? true : false}
                style={{ paddingHorizontal: 10, color: 'white', width: '93%' }}
                placeholder={'New Password'}
                placeholderTextColor="gray"
                onChangeText={setNewPassword}
                value={newPassword}
              />
              <TouchableOpacity onPress={() => seteyeIcon2(!eyeIcon2)}>
                <Icon name={eyeIcon2 ? 'eye' : "eye-slash"} size={18} color="#ffaa00" />
              </TouchableOpacity>
            </View>
            {hasError && !newPassword && (
              <Text style={{ color: 'red', marginLeft: 30, marginTop: 5 }}>
                This field is required !
              </Text>
            )}
          </View>

          <View style={{ marginVertical: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
              }}>


              <TextInput
                secureTextEntry={!eyeIcon3 ? true : false}
                style={{ paddingHorizontal: 10, color: 'white', width: '93%' }}
                placeholder={'Confirm Password'}
                placeholderTextColor="gray"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              <TouchableOpacity onPress={() => seteyeIcon3(!eyeIcon3)}>
                <Icon name={eyeIcon3 ? 'eye' : "eye-slash"} size={18} color="#ffaa00" />
              </TouchableOpacity>
            </View>
            {hasError && !confirmPassword && (
              <Text style={{ color: 'red', marginLeft: 30, marginTop: 5 }}>
                This field is required !
              </Text>
            )}
          </View>

          <TouchableOpacity style={{ padding: 20 }} onPress={handleSave}>
            <LinearGradient
              style={styles.login_btn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <Text style={{ color: 'black' }}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SecurityInfo;

const styles = StyleSheet.create({
  login_btn: {
    // backgroundColor: '#D4AF37',
    borderWidth: 1,
    // borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,

    color: 'black',
  },
});
