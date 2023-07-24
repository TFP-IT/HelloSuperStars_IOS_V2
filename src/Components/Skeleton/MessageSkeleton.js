import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
const MessageSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#2e2e2e" highlightColor="#3d3d3d">
    <View style={{marginVertical:10,borderBottomWidth:1,borderColor:'white'}}>
    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', paddingBottom:5}}>

       <View style={{flexDirection:'row',alignItems: 'center',}}>
       <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 8}}>
          <View style={{width: 150, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 80, height: 10, borderRadius: 4}}
          />
        </View>
       </View>
      

   

     
        
      </View>
    </View>
    </SkeletonPlaceholder>
  )
}

export default MessageSkeleton

const styles = StyleSheet.create({})