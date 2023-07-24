import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import imagePath from '../../../Constants/imagePath';
// import imagePath from '../../Constants/imagePath';

import ActivitiesCard from '../../GLOBAL/Reuseable/ActivitiesCard';

const ActivityEventList = ({
  childActivityEventList,
  childActivityEventType,
}) => {
  console.log(childActivityEventType);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.Header}>
        <Image source={imagePath.BgLane} style={styles.HeaderImg} />
        <Text style={styles.HeaderText}>{childActivityEventType}</Text>
      </View>
      <ActivitiesCard />
      {/* {childActivityEventList && childActivityEventList.map((activity, index) =>
         <ActivityEventItem key={index} activity={activity} eventType={childActivityEventType}/>
      )} */}
      {/* <View style={styles.topCard}>

        <Image source={imagePath.AuditionTitle} style={styles.AudiImg} />
        <Text style={styles.fonts}>audition Title name</Text>

        <View style={styles.BannerCsText}>
          <View style={styles.SText}>
            <Text style={styles.ext}>4</Text>
            <Text style={styles.ext}>Days</Text>
          </View>

          <View style={styles.SText}>
            <Text style={styles.ext}>2</Text>
            <Text style={styles.ext}>Hours</Text>
          </View>

          <View style={styles.SText}>
            <Text style={styles.ext}>15</Text>
            <Text style={styles.ext}>Min</Text>
          </View>
        </View>
      </View>

      <View style={styles.topCard}>
        <Image source={imagePath.AuditionTitle1} style={styles.AudiImg} />
        <Text style={styles.fonts}>audition Title name</Text>

        <View style={styles.BannerCsText1}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.AUDITIONROUND)}
            style={styles.STextA}>
            <Text style={styles.ext}>Running</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default ActivityEventList;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: 'black',
    margin: 8,
    borderWidth: 2,
    borderColor: 'gold',
    borderRadius: 37,
    position: 'relative',
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
