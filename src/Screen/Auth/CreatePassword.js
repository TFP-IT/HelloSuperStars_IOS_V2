import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import imagePath from '../../Constants/imagePath'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import navigationStrings from '../../Constants/navigationStrings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import LoaderComp from '../../Components/LoaderComp';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
const CreatePassword = ({ navigation, route }) => {

    const { email } = route.params

    const [eyeIconOne, SetIconOne] = useState(false);
    const [eyeIconTwo, setEyeIcontwo] = useState(false);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [buffer, setBuffer] = useState(false);

    function handleIcon(data) {
        if (data === 'one') {
            SetIconOne(!eyeIconOne);
        }
        else {
            setEyeIcontwo(!eyeIconTwo)
        }

    }

    const handelPasswordChange = () => {

        let data = {
            email,
            code,
            password,
        }

        if (code != "") {
            if (password == conPassword) {
                setBuffer(true);
                axios
                    .post(AppUrl.UserForgetPasswordStore, data)
                    .then(res => {
                        setBuffer(false);

                        if (res.data.status == 200) {
                            //console.log(res.data);
                            Toast.show(res.data?.message, Toast.durations.SHORT);
                            navigation.navigate('Login')
                        } else {

                            Toast.show(res.data?.message, Toast.durations.SHORT);
                        }
                    })
                    .catch(err => {
                        setBuffer(false);
                    });

            } else {
                Toast.show('password not match!', Toast.durations.SHORT);
            }
        } else {
            Toast.show('code not be empty!', Toast.durations.SHORT);
        }
    }

    return (
        <>
            {buffer &&
                <LoaderComp />
            }
            <KeyboardAwareScrollView style={{ backgroundColor: 'black' }}


            >

                <View style={styles.container}>

                    <View style={styles.imgContainer}>

                        <View style={{ backgroundColor: 'rgba(255, 231, 1, 0.23)', height: 200, width: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={imagePath.confirmPasswordImg} style={{ height: 120, width: 120 }} resizeMode='contain' />
                        </View>


                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.textSection}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#ffaa00' }}>Create a New Password!</Text>
                            <Text style={{ fontSize: 13, color: '#ABAFB2' }}>Please Enter the 6 Digit code sent to</Text>
                            <Text style={{ fontSize: 13, color: '#ffaa00' }}>{email}</Text>
                        </View>

                        <View style={styles.inputFieldView}>
                            <MaterialIcons name='verified-user' size={20} color='#ffaa00' />
                            <TextInput
                                onChangeText={newText => setCode(newText)}
                                placeholder='Enter 6 Digit Code'
                                placeholderTextColor={'#B6B6B6'}
                                style={{ paddingHorizontal: 10, width: '85%', marginLeft: 8, color: '#fff' }}
                            />
                        </View>
                        <View style={styles.inputFieldView}>

                            <TextInput
                                secureTextEntry={!eyeIconOne ? true : false}
                                onChangeText={newText => setPassword(newText)}
                                placeholder='New Password'
                                placeholderTextColor={'#B6B6B6'}
                                style={{ paddingHorizontal: 10, width: '85%', marginLeft: 8, color: '#fff' }}
                            />
                            <TouchableOpacity onPress={() => handleIcon('one')}>
                                <Ionicons name={eyeIconOne ? 'eye' : 'eye-off'} size={20} color='#ffaa00' />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputFieldView}>

                            <TextInput
                                secureTextEntry={!eyeIconTwo ? true : false}
                                onChangeText={newText => setConPassword(newText)}
                                placeholder='Confirm  Password'
                                placeholderTextColor={'#B6B6B6'}
                                style={{ paddingHorizontal: 10, width: '85%', marginLeft: 8, color: '#fff' }}
                            />
                            <TouchableOpacity onPress={() => handleIcon('two')}>
                                <Ionicons name={eyeIconTwo ? 'eye' : 'eye-off'} size={20} color='#ffaa00' />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginHorizontal: 55 }} onPress={handelPasswordChange}>
                            <LinearGradient
                                style={styles.login_btn}
                                colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                                <Text style={{ color: 'black' }}>Send</Text>
                            </LinearGradient>
                            {/* <Text style={styles.input_title}>LOGIN</Text> */}
                        </TouchableOpacity>
                    </View>






                </View>
            </KeyboardAwareScrollView>
        </>



    )
}

export default CreatePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imgContainer: {

        padding: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {


    },
    textSection: {
        alignItems: 'center',
        justifyContent: "center"
    },
    inputFieldView: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: 55, borderWidth: 1, marginTop: 20, paddingHorizontal: 10, borderColor: '#ffaa00', borderRadius: 25, paddingVertical: 1,

    },
    login_btn: {
        // backgroundColor: '#D4AF37',
        borderWidth: 1,
        // borderColor: '#D4AF37',
        borderRadius: 50,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 30,
        color: 'black',
    },

})