import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import imagePath from '../../Constants/imagePath';
import HeaderComp from '../../Components/HeaderComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const PocketTxt = () => {

    const [showPass, setShowPass] = useState(true);

    return (
        <KeyboardAwareScrollView>
            <HeaderComp />
            <View style={styles.container}>

                <Image source={imagePath.pocketPay} style={{ width: 130, height: 110, marginBottom: 20 }} />

                <View style={styles.input}>
                    <Fontisto
                        name="key"
                        color={'red'}
                        size={18}
                        style={styles.Icon}
                    />
                    <TextInput
                        placeholder="E3DCAB408A56"
                        style={styles.input_fild}
                        width={255}
                        placeholderTextColor="#9e9e9e"

                    />
                </View>

                <Text style={styles.title}>Your Token Number</Text>

                <TouchableOpacity style={styles.payBtn}>
                    <Text style={{ color: '#FAFAFA' }}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default PocketTxt
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

    container: {
        height: windowHeight - 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FAFAFA'
    },
    title: {
        marginTop: 5,
        color: '#9e9e9e',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
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