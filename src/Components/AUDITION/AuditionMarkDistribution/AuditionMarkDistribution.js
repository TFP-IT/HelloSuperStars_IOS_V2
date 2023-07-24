import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import imagePath from '../../../Constants/imagePath';
import Heading from '../../GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../GLOBAL/Reuseable/UnderlineImage';
// import Heading from '../../Reuseable/Heading';

// import UnderlineImage from '../../Reuseable/UnderlineImage';

const AuditionMarkDistribution = () => {
  return (
    <View style={{backgroundColor: '#0b0b0b', margin: 10}}>
      <Heading heading="Audition Mark Distribution" />
      <UnderlineImage />
      <View style>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.userVote}>
            <Image resizeMode="stretch" source={imagePath.UserVote} />
          </View>
          <View style={styles.userVoteView}>
            <Text style={{color: '#fff', paddingLeft: 5}}>User Vote</Text>
          </View>
          <View style={styles.userVoteMarkView}>
            <Text style={styles.userVoteMarkTxt}>30</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.userVote}>
            <Image resizeMode="stretch" source={imagePath.JuryMark} />
          </View>
          <View style={styles.userVoteView}>
            <Text style={{color: '#fff', paddingLeft: 5}}>Jury Mark</Text>
          </View>
          <View style={styles.userVoteMarkView}>
            <Text style={styles.userVoteMarkTxt}>30</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.userVote}>
            <Image resizeMode="stretch" source={imagePath.StarMark} />
          </View>
          <View style={styles.userVoteView}>
            <Text style={{color: '#fff', paddingLeft: 5}}>Star Mark</Text>
          </View>
          <View style={styles.userVoteMarkView}>
            <Text style={styles.userVoteMarkTxt}>30</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AuditionMarkDistribution;
