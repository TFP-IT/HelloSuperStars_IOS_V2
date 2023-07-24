import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoaderComp from '../../../Screen/LoaderComp/LoaderComp';
import imagePath from '../../../Constants/imagePath';


/**
 * @returns Home Page 33
 */

const AuditionLoaderTitleTime = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.body}>
        {/* <HeaderComp /> */}
        <View style={styles.imageBg}>
          <ImageBackground
            style={styles.imageBgStyle}
            source={imagePath.AuditionTitleBanner}
            resizeMode="cover">
            <View style={styles.titleView}>
              <View>
                <LinearGradient
                  style={styles.timeBgColor}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={styles.textCenter}>2</Text>
                  <Text style={styles.textCenter}>DAYS</Text>
                </LinearGradient>
              </View>
              <View>
                <LinearGradient
                  style={styles.timeBgColor}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={styles.textCenter}>2</Text>
                  <Text style={styles.textCenter}>HOURS</Text>
                </LinearGradient>
              </View>
              <View>
                <LinearGradient
                  style={styles.timeBgColor}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={styles.textCenter}>2</Text>
                  <Text style={styles.textCenter}>SEC</Text>
                </LinearGradient>
              </View>
            </View>
            <View>
              <Text style={styles.textTitle}>AUDITION TITLE NAME</Text>
            </View>
          </ImageBackground>
        </View>





      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  // imageBg: {
  //   flexDirection: 'row',
  // },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  textCenter: {
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 28,
    color: '#ddd',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default AuditionLoaderTitleTime;
