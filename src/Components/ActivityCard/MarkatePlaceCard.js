import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import colorCode from '../../Constants/colorCode'
import imagePath from '../../Constants/imagePath'
import { useThemeColor } from '../../CustomHooks/useThemeColor'
import CountDown from 'react-native-countdown-component';
import Wav from '../Wav/Wav'
import AppUrl from '../../RestApi/AppUrl'
import { useNavigation } from '@react-navigation/native'
import navigationStrings from '../../Constants/navigationStrings'

const MarkatePlaceCard = ({ data }) => {
    console.log('my single data', data)
    const { themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor } = useThemeColor()
    const navigation = useNavigation()

    const showDetails = () => {
        return navigation.navigate(navigationStrings.ORDERSTATUS, {
            event: data,
        });
    };


    return (
        <ImageBackground source={imagePath.cardBg} style={[styles.contaner, themeCardColor]}>

            <Image
                source={!data?.marketplace?.image ? imagePath.noImage : { uri: AppUrl.imageCdn + data?.marketplace?.image }}
                resizeMode='contain' style={styles.cardImageContainer}
            />

            <View style={styles.cardTextContainer}>
                <Text style={[styles.titleText, themeTextColor]}>{data?.marketplace?.title}</Text>
                <View style={{ width: '100%', paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={!data?.marketplace?.superstar?.image ? imagePath.noImage : {
                            uri: AppUrl.imageCdn + data?.marketplace?.superstar?.image
                        }} style={styles.starProfile}
                    />
                    <Text style={{ color: colorCode.gold, fontWeight: '600', marginLeft: 5 }}>{
                        data?.marketplace?.superstar?.first_name + data?.marketplace?.superstar?.last_name}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: colorCode.gold, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 50 }} onPress={showDetails}>
                        <Text style={{ color: colorCode.textColorDarkL, fontWeight: '800' }}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default MarkatePlaceCard

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