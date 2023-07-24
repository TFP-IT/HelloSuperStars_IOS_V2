import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../../Components/HeaderComp'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import TitleHeader from '../../../Components/TitleHeader';
const SecurityInfo = ({ navigation }) => {
 
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <SafeAreaView>
                <HeaderComp backFunc={() => navigation.goBack()} />
                <TitleHeader title={'Security information'} />
                <View style={{marginHorizontal:10,backgroundColor: '#202020',borderRadius:10 }}>
                    {/* <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>SECURITY INFORMATION</Text> */}
                    <TouchableOpacity style={{ marginVertical: 5 }}>
                        <View style={{ marginHorizontal: 20, borderWidth: 0.8, marginTop: 15, paddingHorizontal: 10, borderColor: '#ffaa00', borderRadius: 23, paddingVertical: 2, height: 50, justifyContent: 'center' }}>
                            <Picker
                                style={{ color: 'gray' }}
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                <Picker.Item label="How to be premium member?" value="Bd" />
                                <Picker.Item label="How to join session?" value="Du" />
                                <Picker.Item label="What is general member?" value="In" />
                            </Picker>

                        </View>

                    </TouchableOpacity>
                    <View style={{ marginVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderWidth: 0.8, marginTop: 15, paddingHorizontal: 10, borderColor: '#ffaa00', borderRadius: 23, paddingVertical: 2 }}>
                        <TouchableOpacity>
                        {/* <Icon name="eye" size={18} color="#ffaa00" /> */}
                        </TouchableOpacity>
                            <TextInput multiline={true} numberOfLines={4} style={{ paddingHorizontal: 10, color: 'white' }} placeholder={'Your Message'} placeholderTextColor="gray" />
                        </View>

                    </View>

                    



                    <TouchableOpacity style={{ padding: 20 }}>
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
    )
}

export default SecurityInfo

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
})