import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../Constants/imagePath';
// import imagePath from '../../../Constants/imagePath';
import SeeMore from '../../GLOBAL/Reuseable/SeeMore'

const FanGroupComment = () => {
  return (
    <View
      style={{backgroundColor: '#0b0b0b', margin: 10, flexDirection: 'column'}}>
      <View>
        <View style={styles.commentView}>
          <Image
            source={imagePath.FanProfile2}
            style={styles.fanProfile}
            resizeMode="stretch"
          />
          <TextInput style={styles.textInput} placeholder="Add a comment" />
        </View>

        <View style={styles.commentMainView}>
          <Image
            source={imagePath.FanProfile1}
            style={styles.fanProfile}
            resizeMode="stretch"
          />
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#01D97E', '#01B28D']}
              style={styles.linearView}>
              <Text style={{color: '#fff'}}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                maxime asperiores, corrupti eveniet ab officia!
              </Text>
            </LinearGradient>
            <View style={{marginTop: 5, flexDirection: 'row'}}>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Diamond} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Gold} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Silver} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.commentSecondView}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#DA09F6', '#881AFB']}
                style={styles.linearSecondView}>
                <Text style={{color: '#fff'}}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                  maxime asperiores, corrupti eveniet ab officia!
                </Text>
              </LinearGradient>
            </View>

            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Diamond} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Gold} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.miniView}>
                <Image source={imagePath.Silver} resizeMode="stretch" />
                <Text style={styles.miniFont}>18</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={imagePath.FanProfile1}
            style={styles.fanProfile}
            resizeMode="stretch"
          />
        </View>

        <SeeMore title="See More" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentView: {
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: '#fff',
    width: '85%',
    borderRadius: 10,
    backgroundColor: '#efefef',
    marginLeft: 5,
  },
  linearView: {
    // height: 40,
    // borderWidth: 1,
    width: '80%',
    padding: 10,
    // borderColor: '#fff',
    // width: '85%',
    borderRadius: 10,
    marginLeft: 5,
  },
  linearSecondView: {
    // height: 40,
    // borderWidth: 1,
    width: '80%',
    padding: 10,
    // borderColor: '#fff',
    // width: '85%',
    borderRadius: 10,
    marginRight: 6,
  },
  fanProfile: {
    marginRight: 5,
  },
  commentMainView: {
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    marginTop: 3,
    marginBottom: 3,
  },
  commentSecondView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    position: 'relative',
    marginTop: 3,
    marginBottom: 3,
  },
  miniView: {
    backgroundColor: '#3b3b3b',
    borderRadius: 10,
    width: 35,
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniFont: {
    fontSize: 10,
    marginLeft: 4,
    color: '#fff',
  },
});

export default FanGroupComment;
