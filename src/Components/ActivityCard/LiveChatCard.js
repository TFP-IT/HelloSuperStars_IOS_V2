import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
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

const LiveChatCard = ({ data }) => {
    const { themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor } = useThemeColor()
    const { countryDateTime } = useContext(AuthContext);
    const navigation = useNavigation()
    const [callJoin, setcallJoin] = useState(false)
    const { seconds, days, endSeconds, timeLeft } = useTimeDiff({
        time: countryDateTime(data.livechat.event_date + " " + data.livechat.start_time),
        currentTime: moment().format(''),
        endTime: countryDateTime(data.livechat.event_date + " " + data.livechat.end_time)
    })

    const joinCall = () => {
        navigation.navigate('VideoSdk', {
            meetingId: data.room_id,
            type: 'videoChat',
        });
    }


    console.log('time', seconds + "time left" + timeLeft)
    return (
        <ImageBackground source={imagePath.cardBg} style={[styles.contaner, themeCardColor]}>

            <Image source={{ uri: AppUrl.imageCdn + data?.livechat?.banner }} resizeMode='contain' style={styles.cardImageContainer} />

            <View style={styles.cardTextContainer}>
                <Text style={[styles.titleText, themeTextColor]}>{data?.livechat?.title.slice(0, 24) + '...'}</Text>
                <View style={{ width: '100%', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={imagePath.defultStarprofile} style={styles.starProfile} />
                    <Text style={{ color: colorCode.gold, fontWeight: '600', marginLeft: 5 }}>{data?.livechat?.star?.first_name + " " + data?.livechat?.star?.last_name}</Text>
                </View>



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
            </View>
        </ImageBackground>
    )
}

export default LiveChatCard

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