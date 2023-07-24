import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import SkeletonPlaceholder from "react-native-skeleton-placeholder"


const ActivityListSkeleton = () => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={windowWidth > 700 ? styles.containerWidthScreen : styles.container}>
            <Animatable.View
                animation="pulse"
                iterationCount="infinite"
            >
                <SkeletonPlaceholder
                    backgroundColor='#2e2e2e'
                    highlightColor="#3d3d3d"
                    height="200"
                >
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent="flex-start" marginTop={15} paddingHorizontal={5}>
                        <SkeletonPlaceholder.Item width={80} height={60} borderRadius={7} marginLeft={5} marginRight={3}  />
                        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center" marginRight={30}  justifyContent="space-evenly">
                            <SkeletonPlaceholder.Item width={160} height={22} borderRadius={4} />
                            <SkeletonPlaceholder.Item width={170} height={12} marginTop={10} borderRadius={4} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item width={70} height={12} borderRadius={4} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder >
            </Animatable.View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        marginHorizontal: 10,
        borderRadius: 4,
        paddingBottom: 5,
        marginTop: 5,
    },
    containerWidthScreen: {
        backgroundColor: '#171717',
        marginHorizontal: 50,
        borderRadius: 5,
        paddingBottom: 7,
        marginTop: 6,
    },

});

export default ActivityListSkeleton

