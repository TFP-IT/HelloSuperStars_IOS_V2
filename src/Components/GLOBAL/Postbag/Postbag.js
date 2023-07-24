import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import colorCode from '../../../Constants/colorCode';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../../Constants/context';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../Constants/navigationStrings';


const Postbag = ({ data }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const { countryDateTime } = useContext(AuthContext);
    const windowWidth = Dimensions.get('window').width;
    const Navigation = useNavigation();
    const handlePress = () => {
        setIsAnimating(!isAnimating);
    }
    let postType
    switch (data.type) {
        case "qna":
            postType = 'Answer a question'
            break;
        case "liveChat":
            postType = 'Live Chat'
            break;
        case "meetup":
            postType = 'Meetup'
            break;
        case "learningSession":
            postType = 'Learning Session'
            break;

        default:
            break;
    }

    function handelRegModule() {
        // console.log(data?.type);
        if (data?.type == 'meetup') {
            return Navigation.navigate(navigationStrings.MEETUP, {
                data: data,
            });
        }
        if (data?.type == 'learningSession') {
            return Navigation.navigate(navigationStrings.LEARNINGSESSION, {
                data: data,
            });
        }
        if (data?.type == 'qna') {
            return Navigation.navigate(navigationStrings.QNA, {
                data: data,
            });
        }
        if (data?.type == 'liveChat') {
            return Navigation.navigate(navigationStrings.LIVECHAT, {
                data: data,
            });
        }
        if (data?.type == 'audition') {
            return Navigation.navigate(navigationStrings.AUDITIONREGISTER, {
                data: data,
            });
        }
        if (data?.type == 'fangroup') {
            return Navigation.navigate(navigationStrings.FANGROUP, {
                data: data,
            });
        }
    }


    return (
        <Animatable.View style={[styles.postbag, !isAnimating && styles.postBagBorder, { transform: [{ translateX: windowWidth - 82 }] }]} animation={!isAnimating ? 'slideInRight' : null} >

            <View style={{ paddingRight: 10 }}>
                <Text style={{ color: '#fff' }}>{postType}</Text>
                <Text style={{ color: '#fff' }}>{"Registration end " + countryDateTime(data?.registration_end_date, 'MMM Do')}</Text>
            </View>


            <TouchableOpacity onPress={handelRegModule} style={{ backgroundColor: colorCode.gold, paddingHorizontal: 10, height: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[{ fontWeight: '500', color: 'black' }]}>REGISTER NOW</Text>
            </TouchableOpacity>
            {/* bag btn */}
            <TouchableOpacity onPress={() => handlePress()} style={styles.postBagBtn}>
                <Animatable.View

                    animation={isAnimating ? "rubberBand" : "pulse"}
                    iterationCount="infinite">
                    {!isAnimating ?
                        <Icon name="chevron-right" color={'#fff'} size={18} />
                        :
                        <Icon name="chevron-left" color={'#fff'} size={18} />
                    }
                </Animatable.View>
            </TouchableOpacity >
        </Animatable.View >
    )
}

export default Postbag

const styles = StyleSheet.create({
    postbag: {
        backgroundColor: colorCode.transparentBlackDark,
        height: 60,
        zIndex: 9,
        position: 'absolute',
        bottom: 5,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    postBagBorder: {
        borderColor: colorCode.gold,
        borderLeftWidth: 5,
        borderTopWidth: 2,
        borderBottomWidth: 0.5,
    },
    postBagBtn: {
        backgroundColor: colorCode.transparentBlackDark, width: 30, height: 30, position: 'absolute', top: -12, left: -10, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderColor: colorCode.gold, borderWidth: 1
    }
})