import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import React, {useContext, useEffect, useState} from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import {AuthContext} from '../../../Constants/context';
import moment from 'moment';
import TitleHeader from '../../../Components/TitleHeader';
const PersonalInfo = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const {axiosConfig, setUserInfo, useInfo} = useContext(AuthContext);
  const [allCountry, setAllCountry] = useState([]);
  const [serverError, setServerError] = useState([]);

  const [keyUser, setKeyUser] = useState({
    phone: '',
    email: '',
  });

  const loadInfo = () => {
    axios
      .get(AppUrl.userPersonalData, axiosConfig)
      .then(res => {
        console.log('all info---', res.data);
        if (res.status === 200) {
          setFullName(res.data?.userList?.first_name);
          setPhone(res.data?.userList?.phone);
          setEmail(res.data?.userList?.email);
          setKeyUser({
            phone: res.data?.userList?.phone,
            email: res.data?.userList?.email,
          });
          setBirthday(
            moment(res.data?.employmentList?.dob).format('yyyy-MM-DD'),
          );
          console.log(
            moment(res.data?.employmentList?.dob).format('yyyy-MM-DD HH:mm:ss'),
          );
          console.log('default', res.data?.employmentList?.dob);
          // console.log(moment(res.data?.employmentList?.dob, 'DD-MM-YYYY'));
          setCountry(res.data?.employmentList?.country);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const loadCountries = () => {
    axios.get(AppUrl.allCountry, axiosConfig).then(res => {
      //console.log(res.data);
      if (res.status === 200) {
        setAllCountry(res.data.country);
      }
    });
  };
  useEffect(() => {
    loadInfo();
    loadCountries();
  }, []);
  const handleUpdate = () => {
    const data = {
      first_name: fullName,
      last_name: null,
      phone,
      country,
      email,
      // birthday: moment(birthday).format('yyyy-MM-DD HH:mm:ss'),
      birthday: birthday,
    };
    console.log(data);
    axios
      .post(AppUrl.userPersonalDataSubmit, data, axiosConfig)
      .then(res => {
        setServerError(res.data.validation_errors);
        if (res.data.status === 200) {
          // setUserInfo(useInfo);
          setUserInfo(res.data.userInfo);
          Toast.show('Updated', Toast.SHORT);
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const renderCountries = () => {
    return allCountry.map(item => {
      return <Picker.Item label={item.name} value={item.name} />;
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />

        <TitleHeader title={'Personal Information'} />
        <View
          style={{
            backgroundColor: '#202020',
            marginHorizontal: 10,
            borderRadius: 10,
          }}>
          <View style={{marginVertical: 5}}>
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
              <Icon name="user-circle" size={20} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your Name'}
                placeholderTextColor="gray"
                onChangeText={setFullName}
                value={fullName}
              />
            </View>
          </View>

          <View style={{marginVertical: 5}}>
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
              <Icon name="mobile-phone" size={25} color="#ffaa00" />
              <TextInput
                keyboardType="numeric"
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your phone number'}
                placeholderTextColor="gray"
                onChangeText={setPhone}
                value={phone}
                editable={keyUser.phone == null ? true : false}
              />
            </View>
          </View>

          <View style={{marginVertical: 5}}>
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
              <Ionicons name="mail" size={18} color="#ffaa00" />
              <TextInput
                style={{paddingHorizontal: 10, color: 'white'}}
                placeholder={'Enter your email'}
                placeholderTextColor="gray"
                onChangeText={setEmail}
                value={email}
                editable={keyUser.email == null ? true : false}
              />
            </View>
          </View>

          <TouchableOpacity
            style={{marginVertical: 5}}
            onPress={() => setOpen(true)}>
            <View
              style={{
                alignItems: 'flex-start',
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
                height: 50,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="birthday-cake" size={20} color="#ffaa00" />
                <Text
                  style={{textAlign: 'center', color: '#fff', marginStart: 10}}>
                  {birthday}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            theme="light"
            onConfirm={date => {
              setOpen(false);
              setBirthday(moment(date).format('DD-MM-YYYY'));
              console.log(date);
            }}
            // selected={moment(birthday).format('DD-MM-YYYY')}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <TouchableOpacity style={{marginVertical: 5}}>
            <View
              style={{
                marginHorizontal: 20,
                borderWidth: 0.8,
                marginTop: 15,
                paddingHorizontal: 10,
                borderColor: '#ffaa00',
                borderRadius: 23,
                paddingVertical: 2,
                height: 50,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // flexDirection: 'row',
                  // alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="globe" size={20} color="#ffaa00" />
                </View>
                <View style={{width: '90%'}}>
                  <Picker
                    style={{color: '#fff'}}
                    selectedValue={country}
                    onValueChange={(itemValue, itemIndex) =>
                      setCountry(itemValue)
                    }>
                    {renderCountries()}
                  </Picker>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              handleUpdate();
            }}>
            <LinearGradient
              style={styles.login_btn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <Text style={{color: 'black'}}>Save</Text>
            </LinearGradient>
            {/* <Text style={styles.input_title}>LOGIN</Text> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PersonalInfo;

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
