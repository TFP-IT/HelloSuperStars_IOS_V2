import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useContext, useState} from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import TitleHeader from '../../../Components/TitleHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import LoaderComp from '../../../Components/LoaderComp';

const DeleteWarning = ({navigation}) => {
  const {authContext, axiosConfig} = useContext(AuthContext);

  const [showPass, setShowPass] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [password, setPassword] = useState(null);
  const [buffer, setBuffer] = useState(false);

  const handelDeleteUser = () => {
    let data = {
      password: password,
    };
    setBuffer(true);
    axios
      .post(AppUrl.UserDelete, data, axiosConfig)
      .then(res => {
        setBuffer(false);
        if (res.data.status == 200) {
          authContext.signOut();
        } else {
          Toast.show(res.data.message, Toast.durations.SHORT);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err.message);
      });
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView>
        {buffer && <LoaderComp />}

        <HeaderComp backFunc={() => navigation.goBack()} />
        <TitleHeader title={'Security Alert'} />
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: '#202020',
            borderRadius: 10,
          }}>
          <View style={{marginVertical: 5}}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 15,
                paddingHorizontal: 5,
                borderRadius: 23,
                paddingVertical: 2,
              }}>
              <FontAwesome name="warning" size={50} color={'#ffaa00'} />
              <Text style={{color: '#ffaa00', marginTop: 20}}>
                Are you sure to delete your accounts from "Hello Super Stars"?
                Please insert your password if you want otherwise press the
                CANCEL button.
              </Text>

              <Text style={{color: '#ffaa00', marginTop: 10, color: 'red'}}>
                <Text style={{fontWeight: 'bold'}}>Note:</Text> After deleting
                your accounts, all of the information will be deleted and you
                can signup again by using the same email !
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
            <Text style={styles.inputText}>Password</Text>
            <View style={styles.input}>
              <Icon
                name="lock"
                color={'#ffaa00'}
                size={20}
                style={styles.Icon}
              />
              <TextInput
                placeholder="Enter Your Password !"
                style={styles.input_fild}
                placeholderTextColor="#9e9e9e"
                secureTextEntry={showPass}
                onChangeText={newText => setPassword(newText)}
              />
              <TouchableOpacity
                style={styles.password}
                onPress={() => setShowPass(!showPass)}>
                {showPass ? (
                  <Entypo name="eye-with-line" size={20} color={'#ffaa00'} />
                ) : (
                  <Entypo name="eye" size={20} color={'#ffaa00'} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              style={styles.back_btn}
              onPress={() => navigation.goBack()}>
              <Text style={{color: '#ffaa00'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete_btn}
              onPress={() => (password != null ? handelDeleteUser() : null)}>
              <Text style={{color: 'white'}}>Delete account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default DeleteWarning;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  delete_btn: {
    backgroundColor: 'red',
    borderWidth: 1,
    // borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    color: 'black',
  },

  back_btn: {
    // backgroundColor: '#D4AF37',
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    color: '#ffaa00',
  },
  Icon: {
    marginTop: 8,
  },
  password: {
    marginTop: 8,
    marginLeft: '8%',
  },
  containerWideScreen: {
    flex: 1,
    height: windowHeight,
    paddingHorizontal: 150,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingLeft: 16,
    marginTop: 10,
    color: '#ffaa00',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  input_fild: {
    marginLeft: 10,
    color: '#ffaa00',
    height: 40,
    width: '76%',
    // backgroundColor: 'red'
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#ffaa00',
  },
  input_title: {
    color: '#ddd',
  },
});
