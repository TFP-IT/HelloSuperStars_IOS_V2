import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React from 'react'
import HeaderComp from '../../../Components/HeaderComp'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigation } from '@react-navigation/native'
import { useThemeColor } from '../../../CustomHooks/useThemeColor'
import { FlatGrid } from 'react-native-super-grid'
import MarkatePlaceCard from '../../../Components/ActivityCard/MarkatePlaceCard'
import LiveChatCard from '../../../Components/ActivityCard/LiveChatCard'
import QnaCard from '../../../Components/ActivityCard/QnaCard'
import MeetupCard from '../../../Components/ActivityCard/MeetupCard'
import LearningSessionCard from '../../../Components/ActivityCard/LearningSessionCard'

const EventActivites = ({ route }) => {


    const { data, noduleName = null } = route.params;


    console.log('market place darta', data)

    let navigation = useNavigation()
    const { themeBacground } = useThemeColor()

    const renderItem = ({ item, index }) => {
        console.log(item.type)
        return (
            <>
                {item.type == "marketplace" && <MarkatePlaceCard data={item} key={index} />}
                {item.type == "livechat" && <LiveChatCard data={item} key={index} />}
                {item.type == "qna" && <QnaCard data={item} key={index} />}
                {item.type == "meetup" && <MeetupCard data={item} key={index} />}
                {item.type == "learningSession" && <LearningSessionCard data={item} key={index} />}
            </>
        )
    }


    return (
        <View style={[themeBacground, { flex: 1 }]}>
            <SafeAreaView>
                <HeaderComp backFunc={() => navigation.goBack()} />
                <TitleHeader title={noduleName} />
                {/* <MarkatePlaceCard /> */}
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => (
                        <View style={{ height: 200 }}>

                        </View>
                    )}
                />

            </SafeAreaView>
        </View>
    )
}

export default EventActivites

const styles = StyleSheet.create({})