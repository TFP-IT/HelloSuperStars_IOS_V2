import React from 'react'
import { Text, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder"


const MarketPlaceSkeleton = () => {
    return (
        <SkeletonPlaceholder
            backgroundColor='#2e2e2e'
            highlightColor="#3d3d3d"


        >
            <View style={{ borderWidth: 1, height: 170, flexDirection: 'row', alignItems: 'center', padding: 10, marginVertical: 5 }}>
                <View>
                    <SkeletonPlaceholder.Item width={145} height="100%" borderRadius={4} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <SkeletonPlaceholder.Item width={180} height={25} borderRadius={4} />
                    <SkeletonPlaceholder.Item width={120} height={15} borderRadius={4} marginTop={6} />
                    <SkeletonPlaceholder.Item width={100} height={15} borderRadius={4} marginTop={6} />
                    <SkeletonPlaceholder.Item width={60} height={25} borderRadius={4} marginTop={6} />
                    <SkeletonPlaceholder.Item width="100%" height={35} borderRadius={4} marginTop={6} />
                </View>
            </View>
        </SkeletonPlaceholder>
    )


}

export default MarketPlaceSkeleton