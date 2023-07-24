import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderComp from '../../../Components/HeaderComp';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RoundTopBanner from './RoundTopBanner';

const Round1 = ({route}) => {
  const Navigation = useNavigation();
  const [remainTime, setRemainTime] = useState(0);
  const [isStarted, setIsStarted] = useState(true);
  const {
    auditionInfo,
    auditionTitle,
    auditionImage,
    auditionId,
    roundId,
    judges,
    juries,
  } = route.params;
  const remainingTime = time => {
    const startTime = new Date(time.concat(' 00:00:00')).getTime();
    const currentTime = new Date().getTime();
    if (startTime >= currentTime) {
      setRemainTime((startTime - currentTime) / 1000);
      return (startTime - currentTime) / 1000;
    }
    return 0;
  };
  useEffect(() => {
    remainingTime(auditionInfo.round_start_date);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <HeaderComp backFunc={() => Navigation.goBack()} />

      <ScrollView>
        {isStarted ? (
          <RoundTopBanner
            title={`AUDITION ${auditionInfo.round_num} ROUND ENDING TIME`}
            RoundName={auditionInfo.round_num}
            auditionTitle={auditionTitle}
            auditionImage={auditionImage}
            remainingTime={remainTime}
          />
        ) : (
          <RoundTopBanner
            title={`AUDITION ${auditionInfo.round_num} ROUND STARTING IN`}
            RoundName={auditionInfo.round_num}
            auditionTitle={auditionTitle}
            auditionImage={auditionImage}
            remainingTime={remainTime}
          />
        )}

        <View
          style={{
            backgroundColor: '#272727',
            marginVertical: 5,
            borderRadius: 5,
            marginHorizontal:10
          }}>
          <TouchableOpacity
            style={styles.listParent}
            onPress={() =>
              Navigation.navigate(navigationStrings.PARTICIPATION, {
                title: `VIDEO UPLOAD REMAINING TIME`,
                roundName: auditionInfo.round_num,
                auditionTitle: auditionTitle,
                auditionImage: auditionImage,
                roundInformation: auditionInfo,
                auditionId,
                roundId,
              })
            }>
            <View style={styles.onLeft}>
            <View style={{height:32,width:32,backgroundColor:'#2D2F33',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
<FontAwesome5 name='hand-sparkles' size={18} color='#ffaa00'/>
            </View>
              {/* <Image
                style={styles.resizeImage}
                source={imagePath.participation}
                resizeMode="stretch"
              /> */}
            </View>
            <View style={styles.middleOne}>
              <Text style={styles.participationText}>Participation</Text>
            </View>
            <View style={styles.onRight}>
              <AntDesign name="rightcircleo" color="gray" size={20} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listParent}
            onPress={() =>
              Navigation.navigate(navigationStrings.INSTRUCTION, {
                title: `AUDITION ${auditionInfo.round_num} ROUND ENDING TIME`,
                roundName: auditionInfo.round_num,
                auditionTitle: auditionTitle,
                auditionImage: auditionImage,
                remainingTime: remainTime,
                instruction: auditionInfo?.round_instruction,
                startDate: auditionInfo.round_start_date,
                endDate: auditionInfo.round_end_date,
              })
            }>
            <View style={styles.onLeft}>
            <View style={{height:32,width:32,backgroundColor:'#2D2F33',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
<FontAwesome5 name='chalkboard-teacher' size={16} color='#ffaa00'/>
            </View>
              {/* <Image
                style={styles.resizeImage}
                source={imagePath.instruction}
                resizeMode="stretch"
              /> */}
            </View>
            <View style={styles.middleOne}>
              <Text style={styles.participationText}>Instruction</Text>
            </View>
            <View style={styles.onRight}>
              <AntDesign name="rightcircleo" color="gray" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listParent}
            onPress={() =>
              Navigation.navigate(navigationStrings.JUDGES, {
                title: `AUDITION ${auditionInfo.round_num} ROUND ENDING TIME`,
                roundName: auditionInfo.round_num,
                auditionTitle: auditionTitle,
                auditionImage: auditionImage,
                remainingTime: remainTime,
                roundInformation: auditionInfo,
                judges,
                juries,
              })
            }>
            <View style={styles.onLeft}>
            <View style={{height:32,width:32,backgroundColor:'#2D2F33',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
<FontAwesome5 name='person-booth' size={16} color='#ffaa00'/>
            </View>
              {/* <Image
                style={styles.resizeImage}
                source={imagePath.judges}
                resizeMode="stretch"
              /> */}
            </View>
            <View style={styles.middleOne}>
              <Text style={styles.participationText}>Judges</Text>
            </View>
            <View style={styles.onRight}>
              <AntDesign name="rightcircleo" color="gray" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listParent}
            onPress={() =>
              Navigation.navigate(navigationStrings.MARKDISTIBUTION, {
                userMarks: auditionInfo.user_vote_mark,
                juryOrJudge: auditionInfo.jury_or_judge_mark,
                title: `AUDITION ${auditionInfo.round_num} ROUND ENDING TIME`,
                roundName: auditionInfo.round_num,
                auditionTitle: auditionTitle,
                auditionImage: auditionImage,
                remainingTime: remainTime,
                roundInformation: auditionInfo,
              })
            }>
            <View style={styles.onLeft}>
            <View style={{height:32,width:32,backgroundColor:'#2D2F33',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
<FontAwesome5 name='landmark' size={16} color='#ffaa00'/>
            </View>
              {/* <Image
                style={styles.resizeImage}
                source={imagePath.markDistribution}
                resizeMode="stretch"
              /> */}
            </View>
            <View style={styles.middleOne}>
              <Text style={styles.participationText}>Mark Distribution</Text>
            </View>
            <View style={styles.onRight}>
              <AntDesign name="rightcircleo" color="gray" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listParent}
            onPress={() =>
              Navigation.navigate(navigationStrings.RESULT, {
                title: `AUDITION ${auditionInfo.round_num} ROUND ENDING TIME`,
                roundName: auditionInfo.round_num,
                auditionTitle: auditionTitle,
                auditionImage: auditionImage,
                remainingTime: remainTime,
                roundInformation: auditionInfo,
                auditionId,
                roundId,
              })
            }>
            <View style={styles.onLeft}>
            <View style={{height:32,width:32,backgroundColor:'#2D2F33',borderRadius:100,justifyContent:'center',alignItems:'center'}}>
<FontAwesome5 name='newspaper' size={16} color='#ffaa00'/>
            </View>
              {/* <Image
                style={styles.resizeImage}
                source={imagePath.result}
                resizeMode="stretch"
              /> */}
            </View>
            <View style={styles.middleOne}>
              <Text style={styles.participationText}>Result</Text>
            </View>
            <View style={styles.onRight}>
              <AntDesign name="rightcircleo" color="gray" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 30,
    width:30
  },
  listParent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#0b0b0b',
    padding: 3,
    borderRadius: 12,
  },
  onLeft: {
    flex: 1,
    padding:3
  },
  participationText: {
    color: '#fff',
    fontWeight:'bold'
  },
  middleOne: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    right:5
  },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
  roundImage: {
    flexDirection: 'row',
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roundOneSize: {
    // width: 200,
    // height: 100,
  },
});

export default Round1;
