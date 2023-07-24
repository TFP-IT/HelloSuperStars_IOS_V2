import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import imagePath from '../../../Constants/imagePath';
import AuditionJudge from '../AuditionJudge/AuditionJudge';
import AuditionMarkDistribution from '../AuditionMarkDistribution/AuditionMarkDistribution';
import AuditionRoundSideNav from '../AuditionRoundSideNav/AuditionRoundSideNav';
import AuditionUploadRound from '../AuditionUploadRound/AuditionUploadRound';
import AuditionInstruction from '../AuditionInstruction/AuditionInstruction';

const AuditionRoundCompBackup = () => {
  const [roundState, setRoundState] = useState(null);
  const [change, setChange] = React.useState(0);

  return (
    <View style={styles.body}>
    
      <View style={styles.roundImage}>
        <ImageBackground
          style={styles.roundOne}
          source={
            roundState === 'roundOne'
              ? imagePath.auditionRoundCardActive
              : imagePath.auditionRoundCard
          }
          resizeMode="stretch">
          <TouchableOpacity onPress={() => setRoundState('roundOne')}>
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>1</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          style={styles.roundOne}
          source={
            roundState === 'roundTwo'
              ? imagePath.auditionRoundCardActive
              : imagePath.auditionRoundCard
          }
          resizeMode="stretch">
          <TouchableOpacity onPress={() => setRoundState('roundTwo')}>
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>2</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          style={styles.roundOne}
          source={
            roundState === 'roundThree'
              ? imagePath.auditionRoundCardActive
              : imagePath.auditionRoundCard
          }
          resizeMode="stretch">
          <TouchableOpacity onPress={() => setRoundState('roundThree')}>
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>3</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {roundState === 'roundOne' ? (
        <>
          {change === 0 ? (
            <AuditionRoundSideNav change={change} setChange={setChange} />
          ) : null}
          {change === 1 ? <AuditionUploadRound /> : null}
          {change === 2 ? <AuditionInstruction /> : null}
          {change === 3 ? <AuditionJudge /> : null}
          {change === 4 ? <AuditionMarkDistribution /> : null}
        </>
      ) : null}
      {roundState === 'roundTwo' ? (
        <>
          <View>
            <Text style={{color: '#ddd'}}>This is Round two</Text>
          </View>
        </>
      ) : null}
      {roundState === 'roundThree' ? (
        <>
          <View>
            <Text style={{color: '#ddd'}}>This is Round three</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  roundImage: {
    flexDirection: 'row',
    backgroundColor:'#272727',
    paddingVertical:5,
    borderRadius:5
  },
  roundBtn: {
    flex: 1,
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
});

export default AuditionRoundCompBackup;
