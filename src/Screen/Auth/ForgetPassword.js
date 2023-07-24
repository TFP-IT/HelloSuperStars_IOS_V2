import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import imagePath from '../../Constants/imagePath'

import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import navigationStrings from '../../Constants/navigationStrings';
import { AuthContext } from '../../Constants/context';
import axios from 'axios';
import AppUrl from '../../RestApi/AppUrl';
import LoaderComp from '../../Components/LoaderComp';
import Toast from 'react-native-root-toast';


const ForgetPassword = ({ navigation }) => {


    const [email, setEmail] = useState(null);
    const [buffer, setBuffer] = useState(false);
    const { authContext } = useContext(AuthContext);
    // navigation.navigate(navigationStrings.CREATEPASSWORD)

    const handelForgetPassword = () => {


        if (email != "") {
            const data = {
                email: email,
            };
            setBuffer(true);
            axios
                .post(AppUrl.UserForgetPassword, data)
                .then(res => {
                    setBuffer(false);

                    if (res.data.status == 200) {
                        navigation.navigate(navigationStrings.CREATEPASSWORD, { email: email });
                        //console.log(res.data);
                    } else {

                        Toast.show('user not found!', Toast.durations.SHORT);
                    }
                })
                .catch(err => {
                    setBuffer(false);
                });
        } else {
            Toast.show('email not be empty', Toast.durations.SHORT);
        }
    };


    return (

        <>
            {buffer &&
                <LoaderComp />
            }
            <View style={styles.container}>


                <View style={styles.imgContainer}>

                    <View style={{ backgroundColor: 'rgba(255, 231, 1, 0.23)', height: 200, width: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={imagePath.forgetPasswordImg} style={{ height: 120, width: 120 }} resizeMode='contain' />
                    </View>


                </View>

                <View style={styles.formContainer}>
                    <View style={styles.textSection}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#ffaa00' }}>Forgot your password?</Text>
                        <Text style={{ fontSize: 13, color: '#ABAFB2' }}>Enter your email address to retrive your password!</Text>
                    </View>

                    <View style={styles.inputFieldView}>
                        <Fontisto name='email' size={20} color='#ffaa00' />
                        <TextInput placeholder='Enter your Email' onChangeText={newText => setEmail(newText)} placeholderTextColor={'#B6B6B6'} style={{ paddingHorizontal: 10, width: '85%', marginLeft: 8, color: '#fff' }} />
                    </View>

                    <TouchableOpacity style={{ marginHorizontal: 55 }} onPress={handelForgetPassword}>
                        <LinearGradient
                            style={styles.login_btn}
                            colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                            <Text style={{ color: 'black' }}>Send</Text>
                        </LinearGradient>
                        {/* <Text style={styles.input_title}>LOGIN</Text> */}
                    </TouchableOpacity>
                </View>
            </View >
        </>

    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imgContainer: {

        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {

        flex: 3
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