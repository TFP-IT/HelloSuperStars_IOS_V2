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
import navigationStrings from '../../Constants/navigationStrings'

const LearningSessionCard = ({ data }) => {
    const { themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor } = useThemeColor()
    const { countryDateTime } = useContext(AuthContext);
    const [callJoin, setcallJoin] = useState(false)
    const eventDate = data?.learning_session?.event_date.split(" ")[0]
    const navigation = useNavigation()

    const { seconds, days, endSeconds, timeLeft } = useTimeDiff({
        time: countryDateTime(eventDate + " " + data?.learning_session?.start_time),
        currentTime: moment().format(''),
        endTime: countryDateTime(eventDate + " " + data?.learning_session?.end_time)
    })

    console.log("time left event", timeLeft)


    const { seconds: assinmentSecond, timeLeft: assinmentTimeLeft } = useTimeDiff({
        time: countryDateTime(data?.learning_session?.assignment_reg_start_date),
        currentTime: moment().format(''),
        endTime: countryDateTime(data?.learning_session?.assignment_reg_end_date)
    })

    console.log("time left assinemnt", assinmentTimeLeft)


    const joinCall = () => {
        navigation.navigate('VideoSdk', {
            meetingId: data?.learning_session?.room_id,
            type: 'learningSession',
        });
    }

    //video upload
    const assinemntSubmit = () => {
        console.log('i hit');
        return navigation.navigate(navigationStrings.LEARNINGSESSIONNAV, {
            event: data?.learning_session,
            timeLeft: assinmentTimeLeft
        });
    };

    return (
        <ImageBackground source={imagePath.cardBg} style={[styles.contaner, themeCardColor]}>

            <Image source={{ uri: AppUrl.imageCdn + data?.learning_session?.banner }} resizeMode='contain' style={styles.cardImageContainer} />

            <View style={styles.cardTextContainer}>
                <Text style={[styles.titleText, themeTextColor]}>{data?.learning_session?.title.slice(0, 24) + '...'}</Text>
                <View style={{ width: '100%', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={!data?.learning_session?.star?.image ? imagePath.noImage : {
                            uri: AppUrl.imageCdn + data?.learning_session?.star?.image
                        }} style={styles.starProfile}
                    />
                    <Text style={{ color: colorCode.gold, fontWeight: '600', marginLeft: 5 }}>{
                        data?.learning_session?.star?.first_name + data?.learning_session?.star?.last_name}
                    </Text>
                </View>


                {timeLeft > 0 ?
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
                    :
                    <>
                        {assinmentTimeLeft > 0 && data?.learning_session?.assignment == 1 && assinmentSecond < 0 &&
                            <>
                                <TouchableOpacity style={{ backgroundColor: colorCode.gold, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 50 }} onPress={assinemntSubmit}>
                                    <Text style={{ color: colorCode.textColorDarkL, fontWeight: '800' }}>Submit Assinment</Text>
                                </TouchableOpacity>

                            </>
                        }


                    </>

                }
            </View>
        </ImageBackground>
    )
}

export default LearningSessionCard

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