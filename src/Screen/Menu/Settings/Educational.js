import { Picker } from '@react-native-picker/picker';
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
import { useAxiosGet } from '../../../CustomHooks/useAxiosGet';
import AppUrl from '../../../RestApi/AppUrl';
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

const Educational = ({ navigation }) => {
  const [serverError, setServerError] = useState({});
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [updateData, setUpdateData] = useState({
    occupation: null,
    edu: null,
    birthday: null,
    country: null,
    img: null,
  });
  const { resData } = useAxiosGet(AppUrl.infoUpdateInforamtion);
  const { country, educationlevel, occupation } = resData;
  console.log(resData);
  function handleBack() {
    return navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View>
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Educational Information
            </Text>
          </View>

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
              <Text style={styles.inputText}>Education Level</Text>
              <View
                style={{
                  borderColor: '#ffaa00',
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 40,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Picker
                  style={{ color: 'white' }}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    selectedLanguage(itemValue)
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
              <Text style={styles.inputText}>Institute</Text>
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
              <Text style={styles.inputText}>Subject</Text>
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
              {/* Country  */}
              <TouchableOpacity>
                <LinearGradient
                  style={styles.login_btn}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={{ color: 'black' }}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Educational;

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
