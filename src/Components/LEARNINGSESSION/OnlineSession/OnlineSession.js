import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import HeaderComp from '../../HeaderComp';
// import imagePath from '../../Constants/imagePath';

import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import imagePath from '../../../Constants/imagePath';
const data = [
    {
        key: 1,
        img: imagePath.chatPerson,
        msg: 'In publishing and graphic design, Lorem ipsum is a placeholder text',
    },
    {
        key: 2,
        img: imagePath.chatPerson,
        msg: 'In publishing and graphic design, Lorem ipsum is apeface without',
    },
    {
        key: 3,
        img: imagePath.chatPerson,
        msg: 'In publishing and graphic design, Lorem ipsum is a placeholder ',
    },

]
const OnlineSession = (props) => {
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <View style={styles.mainContainer}>
                    <HeaderComp />
                    <SafeAreaView>

                        <View style={{ position: 'relative' }}>

                            <Image source={props.image} />
                            {/* <View style={styles.firstRow}>
                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                        <Icon name="clock-o" size={18} color="#FFAD00" />
                    </View>
                    <Text style={styles.firstRowText}>
                        {props.time}
                    </Text>
                </View> */}
                        </View>

                        <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 10 }}>
                            <Image source={props.image_pro} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 20 }}>{props.name}</Text>
                                    <Text style={{ color: 'white', color: '#FFAD00', fontSize: 18 }}>{props.date}</Text>
                                </View>
                            </View>
                        </View>

                        <ScrollView>
                            {data.map((item, index) => {
                                return <View key={index} style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 15 }}>
                                    <View style={{ width: '20%', }}>
                                        <Image source={imagePath.chatPerson} style={styles.commentImg} />
                                    </View>
                                    <View style={{ width: '80%', }}>
                                        <Text style={styles.commentMsg}>{item.msg}</Text>
                                        <View style={styles.keyDirection}>
                                            <Text style={styles.msgText}>Like</Text>
                                            <Text style={styles.msgText}>Replay</Text>
                                            <Text style={styles.msgGold}>3d</Text>
                                            <Text style={styles.msgText}>
                                                <Icon name='thumbs-o-up' />102</Text>
                                        </View>
                                    </View>
                                </View>
                            })}

                        </ScrollView>

                        <View>
                            <TextInput placeholder='Enter your comments....' placeholderTextColor={'gray'}
                                style={styles.commentInput} />
                        </View>
                    </SafeAreaView>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default OnlineSession
