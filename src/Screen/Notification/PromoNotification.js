//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
    Modal,
    ScrollView,
    Dimensions
} from 'react-native';
import imagePath from '../../Constants/imagePath';
import Icon from 'react-native-vector-icons/AntDesign';
import colorCode from '../../Constants/colorCode';
import { AuthContext } from '../../Constants/context';
import { useContext } from 'react';
import RenderHtml from 'react-native-render-html';


const PromoNotification = ({ data }) => {
    const windowHeight = Dimensions.get('window').height;
    const { signInPromo, useInfo } = useContext(AuthContext);

    // console.log("jfhkjsdhfjs____", currency?.eventText)

    const titleSource = {
        html: `<div style='color:#e6e6e6;font-size:17px; text-align: justify '>${data?.message ? data?.message : ''
            }</div>`,
    };
    const titleSource1 = {
        html: `<div style='color:#e6e6e6;font-size:17px; text-align: justify'>${data?.message_ex ? data?.message_ex : ''
            }</div>`,
    };






    return (

        <ImageBackground
            style={{
                width: '100%',
                paddingTop: 18,
                marginVertical: 12,
                borderRadius: 15,
                overflow: 'hidden'
            }}
            source={imagePath.cardBg}
            resizeMode="stretch"
        >

            <View style={{ paddingHorizontal: 10 }}>

                <Text style={{ fontSize: 22, marginBottom: 10, paddingHorizontal: 10 }}>
                    <Icon name="checkcircle" color={colorCode.gold} size={20} />
                    <Text style={{ marginLeft: 7, color: colorCode.gold, fontSize: 20 }}> অভিনন্দন। Congratulations </Text>
                </Text>
                <View style={{ backgroundColor: colorCode.transparentBlack, paddingHorizontal: 20, paddingVertical: 20, borderRadius: 10 }}>

                    <View style={{ fontSize: 17, color: colorCode.whiteText, textAlign: 'justify' }}>
                        <RenderHtml contentWidth={"100%"} source={titleSource} />

                        <Text style={{ color: colorCode.gold, fontSize: 17 }}>
                            (HSS{useInfo?.phone})
                        </Text>

                        <RenderHtml contentWidth={"100%"} source={titleSource1} />
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 30 }}>

                <Text style={{ color: colorCode.gold, fontWeight: '900', fontSize: 15 }}>www.hellosuperstars.com</Text>
            </View>
        </ImageBackground>

    );
};

//make this component available to the app
export default PromoNotification;
