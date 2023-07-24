import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl'
import navigationStrings from '../../Constants/navigationStrings';
import moment from 'moment';

const ActivityEventItem = ({ activity, eventType }) => {
    const navigation = useNavigation();
    let event = {};
    switch (eventType) {
        case 'learningSession':
            event = activity.learning_session;
            break;
        case 'general':
            event = activity.general;
            break;
        case 'meetup':
            event = activity.meetup;
            break;
        case 'liveChat':
            event = activity.livechat;
            break;
    }
    let DummyDate = moment(event?.date).format("YYYY-MM-DD");
    let EndTime = moment('2022-01-20 ' + event?.end_time).format("HH:mm:ss");
    let StartTime = moment('2022-01-20 ' + event?.start_time).format("HH:mm:ss");

    let EventDateWithEndTime = new Date(moment(DummyDate + " " + EndTime));
    let EventDateWithStartTime = new Date(moment(DummyDate + " " + StartTime));
    let CurrentDateWithTime = new Date();

    let days = parseInt((EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60 * 24));
    let hours = parseInt((EventDateWithStartTime - CurrentDateWithTime) / (1000 * 60 * 60) % 24);
    let minutes = parseInt(Math.abs(EventDateWithStartTime.getTime() - EventDateWithStartTime.getTime()) / (1000 * 60) % 60);

    return (
        <>
            <View style={styles.topCard}>
                {event?.banner == null
                    ? <Image source={imagePath.AuditionTitle} style={styles.AudiImg} />
                    : <Image source={{
                        uri: `${AppUrl.MediaBaseUrl + event?.banner}`,
                    }} style={styles.AudiImg}
                    />
                }
                <Text style={styles.fonts}>{event?.title}</Text>
                {EventDateWithEndTime.getTime() < CurrentDateWithTime.getTime() ? (
                    <View style={styles.BannerCsText1}>
                        <TouchableOpacity
                            style={styles.STextA}>
                            <Text style={styles.ext}>Completed </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {EventDateWithStartTime.getTime() > CurrentDateWithTime.getTime() ? (
                            <View style={styles.BannerCsText}>
                                <View style={styles.SText}>
                                    <Text style={styles.ext}>{days}</Text>
                                    <Text style={styles.ext}>Days</Text>
                                </View>
                                <View style={styles.SText}>
                                    <Text style={styles.ext}>{hours}</Text>
                                    <Text style={styles.ext}>Hours</Text>
                                </View>
                                <View style={styles.SText}>
                                    <Text style={styles.ext}>{minutes}</Text>
                                    <Text style={styles.ext}>Min</Text>
                                </View>
                            </View>
                        ) : (
                            <>
                                {EventDateWithStartTime.getTime() < CurrentDateWithTime.getTime() || EventDateWithEndTime.getTime() > CurrentDateWithTime.getTime() ? (
                                    <View style={styles.BannerCsText1}>
                                        <TouchableOpacity
                                            style={styles.STextA}>
                                            <Text style={styles.ext}>Running </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </View>
        </>
    );
};

export default ActivityEventItem;

const styles = StyleSheet.create({
    topCard: {
        backgroundColor: 'black',
        margin: 8,
        borderWidth: 2,
        borderColor: 'gold',
        borderRadius: 37,
        position: 'relative',
        overflow: 'hidden',
    },
    fonts: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
    },
    AudiImg: {
        width: '100%',
        height: 225,
    },
    BannerCsText: {
        flexDirection: 'row',
        position: 'absolute',
        paddingHorizontal: 10,
        top: '50%',
        left: '8%',
    },
    BannerCsText1: {
        flexDirection: 'row',
        position: 'absolute',
        paddingHorizontal: 10,
        top: '60%',
        left: '8%',
    },
    SText: {
        backgroundColor: '#FCB706',
        borderRadius: 10,
        margin: 8,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    ext: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    STextA: {
        backgroundColor: '#FCB706',
        borderRadius: 10,
        width: '85%',
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
});
