import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function VideoSlot() {
  return (
    <TouchableOpacity
      key={idx}
      onPress={updateData.video.uri === '' ? chosePhoto : uploadVideo}
      style={styles.listParent}>
      <View style={styles.onRight}>
        {progress ? (
          <Image
            source={imagePath.loadingBuffering}
            style={{height: 40, width: 40}}
          />
        ) : (
          <Image source={imagePath.UploadVideoLearning} />
        )}
      </View>
      <View style={styles.middleOne}>
        <Text style={styles.participationText}>
          {updateData.video.uri === '' ? 'Chose Video' : 'Upload Video'} (
          {event?.assignment - assinmentNumebr})
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#343434',
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffad00',
    height: 70,
  },

  participationText: {
    color: '#FFAD00',
    fontSize: 18,
    marginHorizontal: 8,
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
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
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
