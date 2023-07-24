import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../Constants/navigationStrings';

const AuditionUploadRound = ({ participation, setParticipation }) => {
  const navigation = useNavigation();
  const [pick, setPick] = React.useState('');

  const options = {
    title: 'Video Picker',
    // mediaType: 'video',
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openPicker = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setPick(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: '#000000' }}>
        {/* <HeaderComp /> */}
        {/* <AuditionRoundTitleTime /> */}
        {/* <AuditionRoundSideNav /> */}
        {/* <AuditionTitleRoundBar /> */}
        {/* <AuditionTitleBannerRound /> */}
        {/* <UploadedVideoRound /> */}
        {/* <AuditionRoundComp /> */}
        {/* <AuditionUploadRound />  */}
        {/* <AuditionUploadRound /> */}
        <View
          style={{ backgroundColor: '#272727', borderRadius: 10, marginTop: 10 }}>
          <View ><Text style={[styles.textColor, { textAlign: 'center', paddingVertical: 10, fontSize: 18 }]}>
            Video Details
          </Text></View>
          <View style={{ borderWidth: 0.5, borderBottomColor: 'black' }} />
          <View style={styles.uploadStyle}>
            <View>
              <Text style={styles.textColor}>Video Submission Date</Text>
              <Text style={styles.textColor}>Video Submission Time</Text>
              <Text style={styles.textColor}>Fee</Text>
            </View>
            <View>
              <Text style={{ color: '#ddd' }}>15-062022</Text>
              <Text style={{ color: '#ddd' }}>10:45 PM</Text>
              <Text style={{ color: '#ddd' }}>250 BDT</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#272727',
            marginVertical: 10,
            borderRadius: 10,
          }}>
          <View style={styles.uploadVideoStyle}>
            <View style={styles.pickVideo}>
              <TouchableOpacity onPress={openPicker} style={styles.uploadBtn}>
                <View style={styles.browse}>
                  <AntDesign name="upload" color="#FFAD00" size={20} />
                  <Text style={{ color: '#FFAD00' }}>Browse</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.pickVideo}>
            <TouchableOpacity style={styles.uploadBtn}>
              <View style={styles.browse}>
                <AntDesign name="upload" color="#FFAD00" size={20} />
                <Text style={{color: '#FFAD00'}}>Browse</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.pickVideo}>
            <TouchableOpacity style={styles.uploadBtn}>
              <View style={styles.browse}>
                <AntDesign name="upload" color="#FFAD00" size={20} />
                <Text style={{color: '#FFAD00'}}>Browse</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.pickVideo}>
            <TouchableOpacity style={styles.uploadBtn}>
              <View style={styles.browse}>
                <AntDesign name="upload" color="#FFAD00" size={20} />
                <Text style={{color: '#FFAD00'}}>Browse</Text>
              </View>
            </TouchableOpacity>
          </View> */}
          </View>
          {pick ? (
            <View style={styles.uploadVideoStyle}>
              <View style={styles.pickVideo}>
                <Image style={{ height: '100%' }} source={pick} />
              </View>
              {/* <View style={styles.pickVideo}>
              <Image style={{height: '100%'}} source={pick} />
            </View>
            <View style={styles.pickVideo}>
              <Image style={{height: '100%'}} source={pick} />
            </View>
            <View style={styles.pickVideo}>
              <Image style={{height: '100%'}} source={pick} />
            </View> */}
            </View>
          ) : null}

          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(navigationStrings.UPLOADVIDEOROUND)
              }
              style={styles.btnStyle}>
              <LinearGradient
                colors={['#343434', '#343434']}
                style={styles.uploadMainBtn}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <AntDesign name="cloudupload" size={25} color={'#FFAD00'} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.uploadTxt}>Upload Video</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
  },
  uploadTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    width: 80,
    color: '#FFAD00',
  },
  uploadMainBtn: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textColor: {
    color: '#E6E6E6',
  },
  browse: {
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtn: {
    height: 100,
    borderColor: '#FFAD00',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderRadius: 10,
  },
  uploadVideoStyle: {
    flexDirection: 'row',
  },
  uploadStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  pickVideo: {
    height: 100,
    flex: 1,
    margin: 5,
  },
});

export default AuditionUploadRound;
