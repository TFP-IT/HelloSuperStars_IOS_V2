import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Controller, useForm } from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import TitleHeader from '../../../Components/TitleHeader';
function CustomHeader(props) {
  return (
    <View style={{ backgroundColor: '#343434', paddingVertical: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 10 }}
        onPress={() => props.onPress()}>
        <Text style={{ color: 'white' }}>
          <Icon name="arrow-back" size={25} />
        </Text>
        <Text style={{ color: 'white', fontSize: 18, marginLeft: 4 }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const Personal = ({ navigation }) => {
  const [serverError, setServerError] = useState({});
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function handleBack() {
    return navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <TitleHeader title={'Personal Information'} />
          {/* <View>
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Personal Information
            </Text>
          </View> */}

          <View
            style={{
              backgroundColor: '#1F1F1F',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              height: 600,
              overflow: 'scroll',
            }}>
            <ScrollView>
              {/* name started */}
              <Text style={styles.inputText}>Full Name</Text>

              <View style={styles.input}>
                <Icon
                  name="person"
                  color={'#ffaa00'}
                  size={20}
                  style={styles.Icon}
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      // onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="#343434"
                      placeholder="Your first name"
                      style={styles.input_fild}
                    />
                  )}
                  name="first_name"
                />
              </View>
              {errors.first_name && (
                <Text style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                  This field is required !
                </Text>
              )}
              {/* name ended */}

              {/* email input  */}
              <Text style={styles.inputText}>Email </Text>

              <View style={styles.input}>
                <Entypo
                  name="email"
                  color={'#ffaa00'}
                  size={20}
                  style={styles.Icon}
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="#343434"
                      placeholder="Your Email"
                      style={styles.input_fild}
                    />
                  )}
                  name="email"
                />
              </View>
              {errors.email && (
                <Text style={{ color: 'red', marginLeft: 8, marginBottom: -10 }}>
                  {errors.email?.type === 'pattern'
                    ? 'provide valid email'
                    : 'This field is required !'}
                </Text>
              )}

              {serverError?.email && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 8,
                    marginBottom: -10,
                    marginTop: 10,
                  }}>
                  {serverError?.email}
                </Text>
              )}
              {/* password input  */}
              <Text style={styles.inputText}>Phone</Text>
              <View style={styles.input}>
                <Icon
                  name="phone"
                  color={'#ffaa00'}
                  size={20}
                  style={styles.Icon}
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      message: 'Please enter a valid phone number',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="#343434"
                      placeholder="Your Phone Number"
                      style={styles.input_fild}
                    />
                  )}
                  name="phone"
                />
              </View>
              {errors.phone && (
                <Text style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                  {errors.phone?.type === 'pattern'
                    ? 'provide valid phone number'
                    : 'This field is required !'}
                </Text>
              )}
              {serverError?.phone && (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 8,
                    marginBottom: -10,
                    marginTop: 10,
                  }}>
                  {serverError?.phone}
                </Text>
              )}
              <Text style={styles.inputText}>Birthday </Text>
              <TouchableOpacity
                style={styles.input_textInput}
                onPress={() => setOpen(true)}>
                <Text style={{ color: '#ffffff' }}>
                  {moment(date).format('YYYY-MM-DD')}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                theme="light"
                onConfirm={date => {
                  setOpen(false);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              {/* Country  */}
              <Text style={styles.inputText}>Country</Text>
              <View style={styles.input}>
                <Icon
                  name="person"
                  color={'#ffaa00'}
                  size={20}
                  style={styles.Icon}
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="#343434"
                      placeholder="Your first name"
                      style={styles.input_fild}
                    />
                  )}
                  name="first_name"
                />
              </View>
              {errors.first_name && (
                <Text style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                  This field is required !
                </Text>
              )}
              {/* Country  */}
              <TouchableOpacity>
                <LinearGradient
                  style={styles.login_btn}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={{ color: 'black' }}>Update</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerWideScreen: {
    flex: 1,
    backgroundColor: 'black',
    height: 809,
    paddingHorizontal: 150,
  },
  Icon: {
    marginTop: 8,
  },
  password: {
    marginTop: 8,
    marginLeft: '5%',
  },
  input_textInput: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingLeft: 35,
    marginTop: 10,
    color: '#ffffff',
  },
  input_fild: {
    marginLeft: 10,
    color: '#ffaa00',
    height: 40,
    width: '76%',
    backgroundColor: '#1F1F1F',
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
  input_title: {
    color: '#ffff',
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#ffaa00',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 4,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },

  title: {
    color: '#ffaa00',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },

  login_btn: {
    backgroundColor: '#ffaa00',
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },

  sign_btn: {
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },
});
