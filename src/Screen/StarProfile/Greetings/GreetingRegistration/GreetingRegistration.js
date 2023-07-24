import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InformationComp from '../../../../Components/GLOBAL/InformationComp/InformationComp';
// import InformationComp from '../../../../Components/InformationComp/InformationComp';
import InstructionComp from '../../../../Components/GLOBAL/InstructionComp/InstructionComp';
import Heading from '../../../../Components/GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../../../Components/GLOBAL/Reuseable/UnderlineImage';
import Video from '../../../../Components/VIDEO/Video';
// import Video from '../../../../Components/VIDEO/Video';
import { AuthContext } from '../../../../Constants/context';
import AppUrl from '../../../../RestApi/AppUrl';
import { styles } from './styles';

const GreetingRegistration = ({
  parentGreetings,
  parentGreetingRegistration,
  setBuffer,
}) => {
  // console.log('GreetingRegistration--------parentGreetings-------------', parentGreetings)
  // console.log('GreetingRegistration--------parentGreetingRegistration-------------', parentGreetingRegistration)
  const [selectedValue, setSelectedValue] = useState('birthday-greeting');
  const { axiosConfig } = useContext(AuthContext);
  const { useInfo } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const greetingType = [
    {
      label: 'Anniversary Greeting',
      value: 'Anniversary Greeting',
    },
    {
      label: 'Birthday Greeting',
      value: 'Birthday Greeting',
    },
    {
      label: 'Surprise Greeting',
      value: 'Surprise Greeting',
    },
    {
      label: 'Seasonal Greeting',
      value: 'Seasonal Greeting',
    },
    {
      label: 'Congratulations Greeting',
      value: 'Congratulations Greeting',
    },
    {
      label: 'Encouragement Greeting',
      value: 'Encouragement Greeting',
    },
    {
      label: 'Special Occasion Greeting',
      value: 'Special Occasion Greeting',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];
  const onSubmit = data => {
    let aditionalData = {
      ...data,
      name: useInfo?.first_name + useInfo?.last_name,
      phone: useInfo.phone,
    };
    // setBuffer(true)

    axios
      .post(AppUrl.GreetingRegistrationUpdate, aditionalData, axiosConfig)
      .then(res => {
        // //console.log(res.data)
        setBuffer(false);
        if (res.data.status === 200) {
          // alert('hello')
        } else {
          // setServerError(res.data.validation_errors)
        }
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  return (
    <>
      <ScrollView>
        <View style={styles.greetingsBody}>
          {/* video or banner  */}
          <Video
            image={`${AppUrl.MediaBaseUrl + parentGreetings.banner}`}
            title={parentGreetings.title}
          />
          {/* information  */}
          <InformationComp data={parentGreetings} type="greeting" />
          {/* instruction  */}
          <InstructionComp
            title="Greetings Instructions"
            instruction={parentGreetings.instruction}
          />

          <View style={styles.greetingsRequest}>
            <Heading heading="Registration" />
            <UnderlineImage />
            <View style={{ margin: 13, color: 'white' }}>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>
                  Select your greeting category
                </Text>
                <Picker
                  dropdownIconColor="white"
                  mode="dropdown"
                  selectedValue={selectedValue}
                  style={styles.textInput}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  {greetingType &&
                    greetingType.map((data, index) => (
                      <Picker.Item
                        key={index}
                        style={styles.itemPickerStyle}
                        label={data.label}
                        value={data.value}
                      />
                    ))}
                </Picker>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>
                  Greeting content
                </Text>
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
                      multiline
                      placeholderTextColor="#9e9e9e"
                      placeholder="Text something what do you want to showing in your video"
                      style={styles.textInput}
                    />
                  )}
                  name="greetings_context"
                />
                {errors.greetings_context && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>
                  Additional message (Optional)
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      multiline
                      placeholderTextColor="#9e9e9e"
                      placeholder="Text something what do you want to showing in your video"
                      style={styles.textInput}
                    />
                  )}
                  name="additional_message"
                />
                {errors.additional_message && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required !
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ marginBottom: 8, color: 'white' }}>Password</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: {
                      value: 6,
                      message: ', Min length is 6',
                    },
                    maxLength: {
                      value: 20,
                      message: ', Max length is 20',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor="#9e9e9e"
                      placeholder="Enter password"
                      keyboardType="visible-password"
                      style={styles.textInput}
                    />
                  )}
                  name="password"
                />

                {errors.password && (
                  <Text
                    style={{ color: 'red', marginLeft: 8, marginBottom: -15 }}>
                    This field is required {errors.password.message}
                  </Text>
                )}
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={[
                    {
                      backgroundColor: '#ffad00',
                      borderRadius: 10,
                    },
                    styles.button,
                  ]}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 8,
                      fontWeight: 'bold',
                    }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default GreetingRegistration;
