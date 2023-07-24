import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AuditionJudge from '../../Components/AuditionComp/AuditionJudge/AuditionJudge';
import AuditionMarkDistribution from '../../Components/AuditionComp/AuditionMarkDistribution/AuditionMarkDistribution';
import AuditionRoundSideNav from '../../Components/AuditionComp/AuditionRoundSideNav/AuditionRoundSideNav';
import AuditionUploadRound from '../../Components/AuditionComp/AuditionUploadRound/AuditionUploadRound';
import AuditionInstruction from '../../Components/AuditionInstruction/AuditionInstruction';
import imagePath from '../../../Constants/imagePath';

const AuditionRoundComp = () => {
  const [roundState, setRoundState] = useState(null);
  const [change, setChange] = React.useState(0);

  return (
    <View style={{ backgroundColor: '#000000', flex: 1 }}>
      <View style={styles.roundImage}>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setRoundState('roundOne')}>
          <ImageBackground
            style={styles.roundOne}
            source={
              roundState === 'roundOne'
                ? imagePath.auditionRoundCardActive
                : imagePath.auditionRoundCard
            }
            resizeMode="stretch">
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>1</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setRoundState('roundTwo')}>
          <ImageBackground
            style={styles.roundOne}
            source={
              roundState === 'roundTwo'
                ? imagePath.auditionRoundCardActive
                : imagePath.auditionRoundCard
            }
            resizeMode="stretch">
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>2</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundBtn}
          onPress={() => setRoundState('roundThree')}>
          <ImageBackground
            style={styles.roundOne}
            source={
              roundState === 'roundThree'
                ? imagePath.auditionRoundCardActive
                : imagePath.auditionRoundCard
            }
            resizeMode="stretch">
            <Text style={styles.textColorCenter}>ROUND</Text>
            <Text style={styles.textColorCenter}>3</Text>
          </ImageBackground>
        </TouchableOpacity>
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

          {/* <AuditionRoundStart /> */}
          {/* <AuditionInstruction /> */}
          {/* <AuditionUploadRound /> */}
          {/* <AuditionJudge /> */}
          {/* <AuditionMarkDistribution /> */}
          {/* <UploadedVideoRound /> */}
          {/* <LoaderComp /> */}
        </>
      ) : null}
      {roundState === 'roundTwo' ? (
        <>
          <View>
            <Text style={{ color: '#ddd' }}>This is Round two</Text>
          </View>
        </>
      ) : null}
      {roundState === 'roundThree' ? (
        <>
          <View>
            <Text style={{ color: '#ddd' }}>This is Round three</Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  roundImage: {
    flexDirection: 'row',
  },
  roundBtn: {
    flex: 1,
  },
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
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#0b0b0b',
    padding: 5,
  },
  onLeft: {
    flex: 1,
  },
  participationText: {
    color: '#ff0',
  },
  middleOne: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  roundOne: {
    flex: 1,
    margin: 5,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default AuditionRoundComp;
