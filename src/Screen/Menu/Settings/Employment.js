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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import TitleHeader from '../../../Components/TitleHeader';
const Employment = ({ navigation }) => {
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [allOccupation, setAllOccupation] = useState([]);
  const { axiosConfig } = useContext(AuthContext);
  const handleUpdate = () => {
    const data = {
      salery_range: salary,
      position,
      company,
    };
    console.log(data);
    console.log(AppUrl.userEducationalData);
    axios
      .post(AppUrl.userEmploymentDataSubmit, data, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const loadUserData = () => {
    axios
      .get(AppUrl.userEmploymentData, axiosConfig)
      .then(res => {
        //console.log(res.data);
        //console.log(res.data?.info?.salery_range);
        if (res.status === 200) {
          setSalary(res.data?.info?.salery_range);
          setPosition(res.data?.info?.occupation);
          setCompany(res.data?.info?.company);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const loadOccupation = () => {
    axios
      .get(AppUrl.occupationData, axiosConfig)
      .then(res => {
        if (res.status === 200) {
          //console.log(res.data);
          setAllOccupation(res.data.occupation);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadUserData();
    loadOccupation();
  }, []);
  const renderOccupation = () => {
    return allOccupation.map(item => {
      return <Picker.Item label={item.title} value={item.title} />;
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <TitleHeader
          title={'Employment information'}
          onPress={() => {
            console.log('salary', salary);
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: '#202020',
            borderRadius: 10,
          }}>
          {/* <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            EMPLOYMENT INFORMATION
          </Text> */}
          <TouchableOpacity style={{ marginVertical: 5 }}>
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
              <Ionicons
                name="man-sharp"
                size={20}
                color="#ffaa00"
                style={{ position: 'absolute', left: 9 }}
              />
              <Picker
                style={{ color: '#fff', marginLeft: 10 }}
                selectedValue={position}
                onValueChange={(itemValue, itemIndex) =>
                  setPosition(itemValue)
                }>
                <Picker.Item label="Select Role" value="" />
                {renderOccupation()}
              </Picker>
            </View>
          </TouchableOpacity>

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
              <Icon name="building" size={18} color="#ffaa00" />
              <TextInput
                style={{ paddingHorizontal: 10, color: 'white' }}
                placeholder={'Company Name'}
                placeholderTextColor="gray"
                onChangeText={setCompany}
                value={company}
              />
            </View>
          </View>

          <TouchableOpacity style={{ padding: 20 }} onPress={handleUpdate}>
            <LinearGradient
              style={styles.login_btn}
              colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
              <Text style={{ color: 'black' }}>Save</Text>
            </LinearGradient>
            {/* <Text style={styles.input_title}>LOGIN</Text> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Employment;

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
