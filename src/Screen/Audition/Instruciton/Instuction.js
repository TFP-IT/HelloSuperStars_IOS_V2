import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import HeaderComp from '../../../Components/HeaderComp';
import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import RoundTopBanner from '../../Audition/Round1/RoundTopBanner';
import VideoPlayer from 'react-native-video-player';
import navigationStrings from '../../../Constants/navigationStrings';
import RenderHtml from 'react-native-render-html';
import AppUrl from '../../../RestApi/AppUrl';
import TitleHeader from '../../../Components/TitleHeader';
const Instuction = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const {
    title,
    roundName,
    auditionTitle,
    auditionImage,
    remainingTime,
    instruction,
    startDate,
    endDate,
  } = route.params;

  const instructionHTML = {
    html: `<div style=color:#fff;'>${instruction?.instruction}</div>`,
  };

  console.log(route.params);
  return (
    <View style={styles.container}>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView>
        <RoundTopBanner
          title={`AUDITION ${roundName} ROUND ENDING TIME`}
          RoundName={roundName}
          auditionTitle={auditionTitle}
          auditionImage={auditionImage}
          remainingTime={remainingTime}
        />
        <TitleHeader title='Instructions' />
        <View style={styles.auditionDescriptionRound}>
          {/* <Heading heading="Instructions" /> */}
          {/* <UnderlineImage /> */}
          {instruction !== null ? (
            <>
              <View style={{ marginLeft: 0, marginRight: 15 }}>
                <View style={{ padding: 0 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: -20,
                      marginBottom: 10,
                    }}>
                    {/* <Image
                  style={styles.imageWidth}
                  source={imagePath.AuditionInstruction}
                  resizeMode="stretch"
                /> */}
                    <View style={{ marginLeft: 5, marginRight: 15, padding: 5 }}>

                      <RenderHtml

                        contentWidth={width}
                        source={instructionHTML}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ margin: 10, position: 'relative' }}>
                {/* <Image
              source={imagePath.AuditionInstructionVideo}
              style={styles.video}
              resizeMode="stretch"
            />
            <Image source={imagePath.PauseIcon} style={styles.pauseImg} /> */}

                <VideoPlayer
                  style={styles.video}
                  video={{
                    uri: `${AppUrl.MediaBaseUrl}${instruction?.video}`,
                  }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={{
                    uri: `${AppUrl.MediaBaseUrl}${instruction?.image}`,
                  }}
                  blurRadius={10}
                />
              </View>

              <View style={styles.rowStyle}>
                <View style={styles.startBg}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={imagePath.Flags} style={styles.flagImg} />
                  </View>
                  <View>
                    <Text style={styles.starts}>Starts</Text>
                    <Text style={styles.aprilTxt}>{startDate}</Text>
                  </View>
                </View>
                <View style={styles.endBg}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={imagePath.Flags} style={styles.flagImg} />
                  </View>
                  <View>
                    <Text style={styles.starts}>End</Text>
                    <Text style={styles.aprilTxt}>{endDate}</Text>
                  </View>
                </View>
                <View style={styles.startBg}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={imagePath.Flags} style={styles.flagImg} />
                  </View>
                  <View>
                    <Text style={styles.starts}>Starts</Text>
                    <Text style={styles.aprilTxt}>{startDate}</Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={{ margin: 2 }}>
              <View style={{ padding: 5 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: -20,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: '#fff', marginTop: 20 }}>
                      No instruction yet
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Instuction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10
  },
  flagImg: {
    width: 25,
    height: 25,
  },
  starts: {
    fontSize: 12,
    color: '#fff',
  },
  aprilTxt: {
    fontSize: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  startBg: {
    backgroundColor: '#1d4779',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  endBg: {
    backgroundColor: '#806e08',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  video: {
    width: '100%',
  },
  auditionDescriptionRound: {
    margin: 10,
    backgroundColor: '#343434',
    padding: 5,
    borderRadius: 10,
  },
  imageWidth: {
    width: 20,
    height: 20,
    // margin: 5,
  },
  roundImage: {
    flexDirection: 'row',
    // padding: 8,
    backgroundColor: 'red',
  },
  auditionDescription: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b0b0b',
    margin: 10,
  },
  pauseImg: {
    position: 'absolute',
    left: '46%',
    top: '40%',
  },
});
