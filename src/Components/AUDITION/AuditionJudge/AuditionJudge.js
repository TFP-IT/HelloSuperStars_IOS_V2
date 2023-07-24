import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../Constants/imagePath';
import Heading from '../../GLOBAL/Reuseable/Heading';
import UnderlineImage from '../../GLOBAL/Reuseable/UnderlineImage';
// import Heading from '../../Reuseable/Heading';

// import UnderlineImage from '../../Reuseable/UnderlineImage';

const AuditionJudge = () => {
  return (
    <View>
      <View style={{backgroundColor: '#0b0b0b', margin: 10}}>
        <View>
          <Heading heading="Who will judge you?" />
          <UnderlineImage />
          <View style={{flexDirection: 'row'}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ffa825', '#ffce48', '#ab6616']}
              style={styles.jamesBg}>
              <View style={styles.jamesImg}>
                <Image resizeMode="stretch" source={imagePath.JamesBg} />
              </View>
              <View>
                <Image source={imagePath.BlackBg} resizeMode="cover" />

                <View style={styles.centerElement}>
                  <Text style={{color: '#fff'}}>Super Star</Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>James</Text>
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ffa825', '#ffce48', '#ab6616']}
              style={styles.jamesBg}>
              <View style={styles.jamesImg}>
                <Image resizeMode="stretch" source={imagePath.JamesBg} />
              </View>
              <View>
                <Image source={imagePath.BlackBg} resizeMode="cover" />

                <View style={styles.centerElement}>
                  <Text style={{color: '#fff'}}>Super Star</Text>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>James</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>

      <View style={{backgroundColor: '#0b0b0b', margin: 10}}>
        <Heading heading="Incredible jury waiting for you" />
        <UnderlineImage />
        <View style={{flexDirection: 'row'}}>
          
          <View style={styles.borderBg}>
            <View style={styles.jamesImg}>
              <Image resizeMode="stretch" source={imagePath.JamesBg} />
            </View>
            <View>
              <View style={styles.centerElement}>
                <Text style={{color: '#fff'}}>Super Star</Text>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>James</Text>
              </View>
            </View>
          </View>
          <View style={styles.borderBg}>
            <View style={styles.jamesImg}>
              <Image resizeMode="stretch" source={imagePath.JamesBg} />
            </View>
            <View>
              <View style={styles.centerElement}>
                <Text style={{color: '#fff'}}>Super Star</Text>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>James</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View>

        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jamesImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  blackBg: {
    // flex: 1,
    position: 'absolute',
    width: '100%',
    top: '50%',
  },
  jamesBg: {
    flex: 1,
    margin: 8,
    position: 'relative',
    height: 150,
    overflow: 'hidden',
    borderRadius: 10,
  },
  borderBg: {
    flex: 1,
    margin: 8,
    borderColor: '#ff0',
    borderWidth: 1,
    height: 150,
    overflow: 'hidden',
    borderRadius: 10,
  },
  centerElement: {
    position: 'absolute',
    top: '20%',
    left: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuditionJudge;
