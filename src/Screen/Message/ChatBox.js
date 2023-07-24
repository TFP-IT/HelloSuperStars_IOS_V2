import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-root-toast';
import React, { Component, useEffect, useState } from 'react'
import imagePath from '../../Constants/imagePath';
import { useNavigation } from '@react-navigation/native';
import AppUrl from '../../RestApi/AppUrl';
import { checkPluginState } from 'react-native-reanimated/lib/reanimated2/core';
import CountDown from 'react-native-countdown-component';
import { timecoundFunc } from '../../CustomHelper/timecoundFunc';

function ChatBox({ data }) {
    const [qnaStarStatus, setQnaStarStatus] = useState(true)
    const [timeCount, setTimeCount] = useState(data.type !== 'fan-group' ? timecoundFunc(data?.qna?.qna_date.split(" ")[0] + " " + data?.qna?.qna_start_time) / 1000 : 0)
    console.log(data)
    const navigation = useNavigation()
    let chatData
    if (data.type === 'fan-group') {
        chatData = data.fangroup
    } else {
        chatData = data.qna
    }

    useEffect(() => {
        console.log('time------>', timeCount)
    }, [])

    const handelInsertChat = () => {
        let messageInfo

        if (data.type === 'fan-group') {
            messageInfo = {
                room_id: chatData.room_id,
                group_id: chatData.id,
                data: chatData
            }
        } else {
            messageInfo = {
                room_id: chatData.room_id,
                qna_id: chatData.qna.id,
                data: chatData
            }
        }


        if (data.type === 'fan-group') {
            navigation.navigate('MessageStar', {
                messageInfo
            })



        } else {
            if (!qnaStarStatus) {
                navigation.navigate('QnaMessages', {
                    messageInfo
                })
            } else {

                Toast.show(
                    'Your slot is not start yet',
                    Toast.durations.SHORT,
                );
            }

        }

        // navigation.navigate(`${data.type === 'fan-group' ? 'MessageStar' : 'QnaMessages'}`, {
        //     messageInfo
        // })
    }

    const remainingTime = time => {
        const startTime = new Date(time.concat(' 00:00:00')).getTime();
        const currentTime = new Date().getTime();
        if (startTime >= currentTime) {
            return (startTime - currentTime) / 1000;
        }
        return 0;
    };


    // console.log(AppUrl.MediaBaseUrl + chatData.banner)
    return (
        <TouchableOpacity
            style={styles.row}
            onPress={handelInsertChat}>
            <View style={styles.content}>
                <View style={styles.ContentItems}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: 'gold',
                            borderRadius: 100,
                            padding: 3,
                        }}>
                        <Image style={styles.starCardImg} source={data.type !== 'qna' ? { uri: AppUrl.MediaBaseUrl + chatData.banner } : { uri: AppUrl.MediaBaseUrl + chatData?.qna?.banner }} />
                    </View>

                    <View style={styles.ContentItems2}>
                        <View>
                            <Text style={styles.contentText}>{data?.title}</Text>
                        </View>
                        <Text style={styles.contentText2}>hi</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    {data.type !== 'fan-group' &&
                        <>
                            {qnaStarStatus ?
                                <CountDown
                                    // until={totalSecond}
                                    until={timeCount}
                                    onFinish={() => setQnaStarStatus(false)}
                                    // onPress={() => alert('hello')}
                                    digitStyle={{
                                        backgroundColor: 'black',
                                        borderWidth: 1,
                                        borderColor: '#FFAD00',
                                        borderRadius: 10,
                                    }}
                                    digitTxtStyle={{ color: '#FFAD00' }}
                                    timeLabelStyle={{
                                        color: '#FFAD00',
                                        fontWeight: 'bold',
                                    }}
                                    size={10}
                                />
                                :
                                <Text style={{ color: '#FFAD00', marginRight: 12, borderColor: '#FFAD00', borderWidth: 1, padding: 5, borderRadius: 50 }}>Running</Text>
                            }
                        </>
                    }
                    {/* <Text style={styles.contentText2}>Yesterday</Text>
                    <Text style={styles.contentText2}>10 minute</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    starCardImg: {
        padding: 3,
        height: 50,
        width: 50,
        borderRadius: 50,
        resizeMode: 'cover',

    },
    SearchBar: {
        borderColor: '#FFAD00',
        borderWidth: 1,

        height: 28,
        padding: 3,
        borderRadius: 20,
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    row: {
        marginVertical: 1,
        backgroundColor: 'black',

        marginVertical: 3,
        marginHorizontal: 3,
        borderWidth: 1,
        borderBottomColor: 'gray',
    },
    content: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ContentItems: {
        flexDirection: 'row',
    },
    ContentItems2: {
        marginLeft: 5,
        justifyContent: 'center',
    },
    contentText: {
        fontSize: 18,
        color: 'white',
    },
    contentText2: {
        fontSize: 12,
        color: 'gray',
    },
});

export default ChatBox