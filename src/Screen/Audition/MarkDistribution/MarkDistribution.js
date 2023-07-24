import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HeaderComp from '../../../Components/HeaderComp';
import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import RoundTopBanner from '../../Audition/Round1/RoundTopBanner';
import TitleHeader from '../../../Components/TitleHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
const MarkDistribution = ({navigation, route}) => {
  const {
    userMarks,
    juryOrJudge,
    roundName,
    auditionTitle,
    auditionImage,
    remainingTime,
  } = route.params;
  return (
    <View style={styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />

      <RoundTopBanner
        title={`AUDITION ${roundName} ROUND ENDING TIME`}
        RoundName={roundName}
        auditionTitle={auditionTitle}
        auditionImage={auditionImage}
        remainingTime={remainingTime}
      />
      <TitleHeader title={'Audition Mark Distribution'} />
      <View style={{backgroundColor: '#343434', borderRadius: 10,marginHorizontal:10,marginTop:10}}>
        {/* <Heading heading="Audition Mark Distribution" />
        <UnderlineImage /> */}
        <View style>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.userVote}>
            <Ionicons name='person' size={20} color='#ffaa00' />
              {/* <Image resizeMode="stretch" source={imagePath.UserVote} />
               */}
           
            </View>
            <View style={styles.userVoteView}>
              <Text style={{color: '#fff', paddingLeft: 5}}>User Vote</Text>
            </View>
            <View style={styles.userVoteMarkView}>
              <Text style={styles.userVoteMarkTxt}>{userMarks}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.userVote}>
            <Fontisto name='persons' size={20} color='#ffaa00' />
            </View>
            <View style={styles.userVoteView}>
              <Text style={{color: '#fff', paddingLeft: 5}}>Jury Mark</Text>
            </View>
            <View style={styles.userVoteMarkView}>
              <Text style={styles.userVoteMarkTxt}>{juryOrJudge}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MarkDistribution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  userVote: {
    flex: 1,
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userVoteView: {
    flex: 3,
    margin: 6,
    backgroundColor: '#000000',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userVoteMarkView: {
    flex: 1,
    margin: 6,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  userVoteMarkTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});
