
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { AuthContext } from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import styles from './Styles';
import Video from 'react-native-video';
import colorCode from '../../../Constants/colorCode';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

const ENTRIES1 = [1, 2, 3, 4];

const StarPromoVideoV1 = props => {
    const [entries, setEntries] = useState([]);
    const { themeCardColor, themeTextColor } = useThemeColor();


    const videoRef = useRef(null);

    const Navigation = useNavigation();



    const changeIndex = ({ index }) => {
        setCurrIndex(index);
    };



    const promoSkaliton = () => {

        return (
            <View style={[styles.item, { marginHorizontal: 5 }]}>

                <SkeletonPlaceholder
                    backgroundColor='#2e2e2e'
                    highlightColor="#3d3d3d"
                >
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                        <View style={{ width: '100%', alignItems: 'flex-end', paddingRight: 8, paddingTop: 8 }}>
                            <SkeletonPlaceholder.Item width={40} height={40} borderRadius={50} />
                        </View>
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder >


            </View >
        )
    }



    //console.log('Entry', entries);
    return (
        <View
            style={[
                {
                    width: '100%',
                    backgroundColor: '#343434',
                    paddingVertical: 8,
                    paddingHorizontal: 5,
                    marginTop: 4,
                    // borderRadius: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    marginHorizontal: 0,
                    marginBottom: 9,
                },
                themeCardColor,
            ]}>
            <SwiperFlatList

                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
                vertical={false}
                autoplay
                autoplayDelay={60}
                autoplayLoop
                keyExtractor={(item, index) => index.toString()}
                // data={promoVideos}
                data={entries}
                // renderItem={renderItem}
                renderItem={promoSkaliton}
                onChangeIndex={changeIndex}
            />
        </View>
    );
};

export default StarPromoVideoV1;
