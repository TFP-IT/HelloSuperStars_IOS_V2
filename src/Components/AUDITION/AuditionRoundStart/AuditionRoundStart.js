import React from 'react';
import { ScrollView } from 'react-native';
import AuditionRoundCompBackup from '../../AUDITION/AuditionRoundCompBackup/AuditionRoundCompBackup';
import HeaderComp from '../../HeaderComp';
import AuditionRoundTitleTime from '../AuditionRoundTitleTime/AuditionRoundTitleTime';
import AuditionTitleRoundBar from '../AuditionTitleRoundBar/AuditionTitleRoundBar';

const AuditionRoundStart = () => {
  return (
    <SafeAreaView>
      <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
        <HeaderComp />
        <AuditionRoundTitleTime />
        <AuditionTitleRoundBar />
        {/* <AuditionRoundComp />   */}
        <AuditionRoundCompBackup />
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   roundOneText: {
//     textAlign: 'center',
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   roundText: {
//     backgroundRadius: 50,
//   },
//   resizeImage: {
//     // width: 50h
//     height: 40,
//   },
//   listParent: {
//     flexDirection: 'row',
//     margin: 10,
//     backgroundColor: '#0b0b0b',
//     padding: 5,
//   },
//   onLeft: {
//     flex: 1,
//   },
//   participationText: {
//     color: '#ff0',
//   },
//   middleOne: {
//     flex: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   onRight: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   textColor: {
//     color: '#ddd',
//     textAlign: 'center',
//   },
//   textColorCenter: {
//     textAlign: 'center',
//     color: '#ddd',
//     fontWeight: 'bold',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: '#000000',
//   },
//   imageBg: {
//     flexDirection: 'row',
//   },
//   imageBgStyle: {
//     flex: 1,
//     paddingTop: 10,
//     paddingBottom: 10,
//     height: 100,
//     margin: 10,
//     borderRadius: 20,
//     borderWidth: 2,
//     overflow: 'hidden',
//     borderColor: 'gold',
//   },
//   titleView: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   timeBgColor: {
//     borderRadius: 50,
//     padding: 10,
//     margin: 5,
//     position: 'absolute',
//     left: '70%',
//   },
//   textCenter: {
//     backgroundColor: 'rgba(196, 196, 196, 0.78)',
//     width: '80%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     textAlign: 'center',
//     color: '#ffffff',
//     fontSize: 23,
//     fontWeight: 'bold',
//   },
//   textTitle: {
//     flexDirection: 'row',
//     fontSize: 15,
//     alignItems: 'center',
//     height: 80,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     position: 'relative',
//   },
//   roundImage: {
//     flexDirection: 'row',
//   },
//   roundOne: {
//     flex: 1,
//     margin: 5,
//     // width: 200,
//     height: 120,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   roundOneSize: {
//     // width: 200,
//     // height: 100,
//   },
// });

export default AuditionRoundStart;
