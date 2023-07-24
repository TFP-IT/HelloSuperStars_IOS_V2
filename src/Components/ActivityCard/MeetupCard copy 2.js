import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import colorCode from '../../Constants/colorCode'
import imagePath from '../../Constants/imagePath'
import { useThemeColor } from '../../CustomHooks/useThemeColor'
import CountDown from 'react-native-countdown-component';
import Wav from '../Wav/Wav'
import moment from 'moment'
import { AuthContext } from '../../Constants/context'
import { useContext } from 'react'
import { useTimeDiff } from '../../CustomHooks/useTimeDiff'
import { useState } from 'react'
import AppUrl from '../../RestApi/AppUrl'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Toast from 'react-native-root-toast'

const MeetupCard = ({ data }) => {
    const { themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor } = useThemeColor()
    const { countryDateTime, axiosConfig, useInfo } = useContext(AuthContext);
    const [callJoin, setcallJoin] = useState(false)
    const navigation = useNavigation()
    const { seconds, days, endSeconds, timeLeft } = useTimeDiff({
        time: countryDateTime(data?.meetup?.event_date + " " + data?.meetup?.start_time),
        currentTime: moment().format(''),
        endTime: countryDateTime(data?.meetup?.event_date + " " + data?.meetup?.end_time)
    })

    const joinCall = () => {
        if (data?.meetup?.meetup_type == 'Offline') {
            alert('offline');
        } else {
            navigation.navigate('VideoSdk', {
                meetingId: data?.meetup?.event_link,
                type: 'meetup',
            });
        }
    }


    const downlodeTicket = () => {
        Toast.show('Please wait downloading...', Toast.durations.SHORT);
        axios
            .get(AppUrl.DownlodMeetUpTicket + data?.meetup?.id, axiosConfig)
            .then(res => {
                console.log('respoce data', res.data)
                return Linking.openURL(
                    `${AppUrl.MediaBaseUrl}${res.data.certificateURL}`,
                );
            })
            .catch(err => {
                console.log(err);
            });
    };


    console.log('time', seconds + "time left" + timeLeft)
    return (
        <ImageBackground source={imagePath.cardBg} style={[styles.contaner, themeCardColor]}>

            <Image source={{ uri: AppUrl.imageCdn + data?.meetup?.banner }} resizeMode='contain' style={styles.cardImageContainer} />

            <View style={styles.cardTextContainer}>
                <Text style={[styles.titleText, themeTextColor]}>{data?.meetup?.title.slice(0, 24) + '...'}</Text>
                <View style={{ width: '100%', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={!data?.meetup?.star?.image ? imagePath.noImage : {
                            uri: AppUrl.imageCdn + data?.meetup?.star?.image
                        }} style={styles.starProfile}
                    />
                    <Text style={{ color: colorCode.gold, fontWeight: '600', marginLeft: 5 }}>{
                        data?.meetup?.star?.first_name + data?.meetup?.star?.last_name}
                    </Text>
                </View>

                {data?.meetup?.meetup_type == 'Offline' ?
                    <>
                        <TouchableOpacity style={{ backgroundColor: colorCode.gold, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 50 }} onPress={downlodeTicket}>
                            <Text style={{ color: colorCode.textColorDarkL, fontWeight: '800' }}>Downlode Ticket</Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        {timeLeft > 0 &&
                            <>
                                {!callJoin ?
                                    <CountDown
                                        size={14}
                                        until={seconds}
                                        onFinish={() => setcallJoin(true)}
                                        digitStyle={{ backgroundColor: colorCode.Background, borderColor: colorCode.gold }}
                                        digitTxtStyle={{ color: colorCode.gold }}
                                        timeLabelStyle={{ color: colorCode.whiteText, fontWeight: 'bold' }}
                                        // separatorStyle={{ color: colorCode.gold }}
                                        timeToShow={['D', 'H', 'M', 'S']}
                                        timeLabels={{ m: 'Minute', s: 'Second', h: 'Hour', d: 'Day' }}
                                        showSeparator
                                    />
                                    :
                                    <View style={{ marginLeft: 60 }}>
                                        {[...Array(6).keys()].map((_, index) => (
                                            <Wav key={index} index={index} size={50} />
                                        ))}
                                        <TouchableOpacity style={{ backgroundColor: colorCode.gold, height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} onPress={joinCall}>
                                            <Text style={{ fontWeight: '700' }}>Join Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </>
                        }
                    </>

                }

            </View>
        </ImageBackground>
    )
}

export default MeetupCard

const styles = StyleSheet.create({
    contaner: {
        width: '100%', height: 150, borderRadius: 10, marginBottom: 10,
        flexDirection: 'row', borderRadius: 10, overflow: 'hidden'
    },
    cardImageContainer: {
        width: '40%', margin: 5, borderRadius: 10
    },
    cardTextContainer: {
        width: '60%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 5
    },
    titleText: {
        fontSize: 18,
        fontWeight: '800',
        paddingBottom: 5,
        width: '100%'
    },
    starProfile: {
        width: 40, height: 40, backgroundColor: colorCode.transparentBlackDark, borderRadius: 50
    }

})