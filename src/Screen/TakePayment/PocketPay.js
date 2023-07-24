import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import imagePath from '../../Constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../Constants/navigationStrings';
const PocketPay = () => {

    const [showPass, setShowPass] = useState(true);
    let Navigation = useNavigation();

    const payNow = () => {
        Navigation.navigate(navigationStrings.POCKETTXT)
    }

    return (
        <KeyboardAwareScrollView>
            <HeaderComp />
            <View style={styles.container}>

                <Image source={imagePath.pocketPay} style={{ width: 130, height: 110, marginBottom: 20 }} />
                <View style={styles.paymentDetails}>
                    <Text style={{ color: '#5e5e5e' }}>Amount : </Text><Text style={{ color: 'black', marginRight: 20 }}>400</Text>
                    <Text style={{ color: '#5e5e5e' }}>For : </Text><Text style={{ color: 'black' }}>Package</Text>
                </View>
                <View style={styles.input}>
                    <Icon
                        name="mobile-phone"
                        color={'red'}
                        size={25}
                        style={styles.Icon}
                    />
                    <TextInput
                        placeholder="+88017738"
                        style={styles.input_fild}
                        width={255}
                        placeholderTextColor="#9e9e9e"

                    />
                </View>

                <View style={styles.input}>
                    <Icon
                        name="lock"
                        color={'red'}
                        size={20}
                        style={styles.Icon}
                    />
                    <TextInput
                        placeholder="*****"
                        style={styles.input_fild}
                        width={200}
                        placeholderTextColor="#9e9e9e"
                        secureTextEntry={showPass}
                    />
                    < TouchableOpacity
                        style={styles.password}
                        onPress={() => setShowPass(!showPass)}>
                        {showPass ? (
                            <Entypo name="eye-with-line" size={20} color={'red'} />
                        ) : (
                            <Entypo name="eye" size={20} color={'red'} />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.payBtn} onPress={payNow}>
                    <Text style={{ color: '#FAFAFA' }}>
                        PAY NOW
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default PocketPay
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

    container: {
        height: windowHeight - 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FAFAFA'
    },
    paymentDetails: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        height: 50,
        width: 295,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    payBtn: {
        backgroundColor: 'red',
        width: 295,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        borderRadius: 10,

    },
    input: {
        justifyContent: 'center',
        alignItems: 'stretch',
        borderWidth: 2,
        height: 40,
        borderColor: 'red',
        borderRadius: 10,
        paddingLeft: 16,
        marginTop: 10,
        color: '#343A40',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    input_fild: {
        marginLeft: 10,
        color: '#343A40',
        height: 40,
        width: '76%',
        // backgroundColor: 'red'
    },
    Icon: {
        marginTop: 8,
    },
    password: {
        marginTop: 8,
        marginLeft: '8%',
        paddingRight: 6
    },
})