import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import imagePath from '../../../Constants/imagePath';
import Heading from '../../GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../GLOBAL/Reuseable/UnderlineImage';
// import imagePath from '../../../Constants/imagePath';
// import Heading from '../../Reuseable/Heading';
// import UnderlineImage from '../../Reuseable/UnderlineImage';


const AuditionInstruction = () => {
  return (
    <View>
      <View style={styles.auditionDescription}>
        <Heading heading="Guitar Audition Description" />
        <UnderlineImage />
        <View style={{ padding: 10 }}>
          <Text style={{ color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            libero beatae suscipit dolor voluptatibus ad, alias qui sed
            repellendus mollitia modi obcaecati possimus voluptatem fugit autem
            quae. Pariatur aspernatur maiores odit quis omnis, voluptas
            accusantium.
          </Text>
        </View>
      </View>

      <View style={styles.auditionDescriptionRound}>
        <Heading heading="Guitar Auditions Instruction For 1st Round" />
        <UnderlineImage />

        <View style={{ margin: 5 }}>
          <View style={{ padding: 10 }}>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <Image
                style={styles.imageWidth}
                source={imagePath.AuditionInstruction}
                resizeMode="stretch"
              />
              <Text style={{ color: '#fff', marginLeft: 4, marginRight: 4 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <Image
                style={styles.imageWidth}
                source={imagePath.AuditionInstruction}
                resizeMode="stretch"
              />
              <Text style={{ color: '#fff', marginLeft: 4, marginRight: 4 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <Image
                style={styles.imageWidth}
                source={imagePath.AuditionInstruction}
                resizeMode="stretch"
              />
              <Text style={{ color: '#fff', marginLeft: 4, marginRight: 4 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <Image
                style={styles.imageWidth}
                source={imagePath.AuditionInstruction}
                resizeMode="stretch"
              />
              <Text style={{ color: '#fff', marginLeft: 4, marginRight: 4 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <Image
                style={styles.imageWidth}
                source={imagePath.AuditionInstruction}
                resizeMode="stretch"
              />
              <Text style={{ color: '#fff', marginLeft: 4, marginRight: 4 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ margin: 10, position: 'relative' }}>
          <Image
            source={imagePath.AuditionInstructionVideo}
            style={styles.video}
            resizeMode="stretch"
          />
          <Image source={imagePath.PauseIcon} style={styles.pauseImg} />
        </View>

        <View style={styles.rowStyle}>
          <View style={styles.startBg}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={imagePath.Flags} style={styles.flagImg} />
            </View>
            <View>
              <Text style={styles.starts}>Starts</Text>
              <Text style={styles.aprilTxt}>2 April 2022</Text>
            </View>
          </View>
          <View style={styles.endBg}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={imagePath.Flags} style={styles.flagImg} />
            </View>
            <View>
              <Text style={styles.starts}>End</Text>
              <Text style={styles.aprilTxt}>8 April 2022</Text>
            </View>
          </View>
          <View style={styles.startBg}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={imagePath.Flags} style={styles.flagImg} />
            </View>
            <View>
              <Text style={styles.starts}>Starts</Text>
              <Text style={styles.aprilTxt}>2 April 2022</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
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
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  endBg: {
    backgroundColor: '#806e08',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  video: {
    width: '100%',
  },
  auditionDescriptionRound: {
    margin: 10,
    backgroundColor: '#0b0b0b',
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

export default AuditionInstruction;
