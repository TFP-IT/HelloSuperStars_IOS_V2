import * as React from 'react';
import {
    FlatList, Image, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../../Components/HeaderComp';
import imagePath from '../../../Constants/imagePath';
import styles from './styles';
const starNotify = [
    {
        key: 1,
        img: imagePath.activities1,
        name: 'Live Now',
        title: 'No activities available now',
        time: '10 min ago',
    },
    {
        key: 2,
        img: imagePath.activities2,
        name: 'Learning Sessions',
        title: '1 activities available now',
        time: '4 min ago',
    },
    {
        key: 3,
        img: imagePath.activities2,
        name: 'Live Chat',
        title: '1 activities available now',
        time: '4 min ago',
    },
    {
        key: 4,
        img: imagePath.activities3,
        name: 'Upcoming Auditions',
        title: 'No activities available now',
        time: '12 min ago',
    },
    {
        key: 5,
        img: imagePath.activities4,
        name: 'Meetup Events',
        title: 'No activities available now',
        time: '7 min ago',
    },

];
const Activities = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <HeaderComp />

                <TouchableOpacity style={{
                    backgroundColor: '#343434',
                    marginVertical: 3,
                    flexDirection: 'row',
                    paddingVertical: 4,
                    borderRadius: 5,
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 8,
                    }}>
                        <Image source={imagePath.menuUser} />
                    </View>
                    <View style={{ marginLeft: 7 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>User Name</Text>
                        <Text style={{ color: 'gray' }}>See your profile</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <ScrollView horizontal>

                        <TouchableOpacity style={styles.mainRow}>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Image source={imagePath.menuIconActivity} />
                            </View>
                            <View>
                                <Text style={styles.fonts}>Activities</Text>
                                <Text style={styles.fonts2}>4 activities</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.mainRow}>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Image source={imagePath.menuIconStar} />
                            </View>
                            <View>
                                <Text style={styles.fonts}>Followers</Text>
                                <Text style={styles.fonts2}>20305 followers</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mainRow}>
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Image source={imagePath.menuIconGroup} />
                            </View>
                            <View>
                                <Text style={styles.fonts}>Fan Group</Text>
                                <Text style={styles.fonts2}>6 activities</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                </View>
                <View style={{
                    height: 1,
                    backgroundColor: '#d4bc7b',
                    alignSelf: 'stretch',
                    marginTop: 10,
                }} />

                <FlatList data={starNotify} renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.BorderBottom}>
                            <View style={styles.row}>
                                <View style={styles.content}>
                                    <View style={styles.ContentItems}>
                                        <Image style={styles.starCardImg} source={item.img} />
                                        <View style={styles.ContentItems2}>
                                            <TouchableOpacity>
                                                <Text style={styles.contentText}>{item.name}</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.contentText2}>{item.title}</Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={styles.contentText2}>{item.time}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                height: 1,
                                backgroundColor: '#d4bc7b',
                                alignSelf: 'stretch'
                            }} />

                        </TouchableOpacity>
                    );
                }}
                />
            </ScrollView>

        </View>
    );
};

export default Activities;