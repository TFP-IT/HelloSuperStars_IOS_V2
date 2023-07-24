import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import imagePath from '../../../Constants/imagePath';
const windowWidth = Dimensions.get('window').width;
const MenuFanGroup = () => {
  const Navigation = useNavigation();
  return (
    <View>
      {/* line row start  */}
      <View style={{flexDirection: 'row', marginVertical: 12}}>
        <View style={styles.line} />
        <View style={styles.lineText}>
          <Text style={styles.text}>Already Enrolled</Text>
        </View>

        <View style={styles.line} />
      </View>
      {/* line row end  */}

      {/* fan versus start  */}
      <View style={styles.followMainrow}>
        <View style={styles.followCard}>
          <View style={styles.followContents}>
            <Image
              style={
                windowWidth > 600 ? styles.followImage2 : styles.followImage
              }
              source={imagePath.srkVssal}
            />
          </View>
          <LinearGradient
            colors={['#F5EA45', '#DDA336', '#E7A725']}
            style={[styles.linearGradient, {position: 'relative'}]}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followBtnText}>Shrukh khan </Text>
              {/* <Text style={styles.followBtnText2}>VS</Text> */}

              <Text style={styles.followBtnText}>Salman khan </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Image
            source={imagePath.VersusImg}
            style={
              windowWidth > 600
                ? {
                    position: 'absolute',
                    bottom: -10,
                    left: '40%',
                    height: 70,
                    width: 40,
                  }
                : {
                    position: 'absolute',
                    bottom: '3%',
                    left: '36%',
                    height: 40,
                    width: 40,
                  }
            }
          />
        </View>

        <View style={styles.followCard}>
          <View style={styles.followContents}>
            <Image
              style={
                windowWidth > 600 ? styles.followImage2 : styles.followImage
              }
              source={imagePath.messiVsronaldo}
            />
          </View>
          <LinearGradient
            colors={['#F5EA45', '#DDA336', '#E7A725']}
            style={[styles.linearGradient, {position: 'relative'}]}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followBtnText}>Messi </Text>
              {/* <Text style={styles.followBtnText2}>VS</Text> */}

              <Text style={styles.followBtnText}>Ronaldo </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Image
            source={imagePath.VersusImg}
            style={
              windowWidth > 600
                ? {
                    position: 'absolute',
                    bottom: -10,
                    left: '40%',
                    height: 70,
                    width: 40,
                  }
                : {
                    position: 'absolute',
                    bottom: '3%',
                    left: '36%',
                    height: 40,
                    width: 40,
                  }
            }
          />
        </View>
      </View>
      {/* fan versus end  */}

      {/* .............Fangroup card  start................... */}

      <View style={styles.CardRow}>
        <View style={styles.MainCard}>
          <TouchableOpacity style={styles.cardImg}>
            <Image
              style={styles.starCardImg}
              source={imagePath.srkProfileLogo}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.cardText}>Fangroup admin</Text>
            <Text style={styles.time}>5.31pm 2nd july</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CardContent}>
          <Text style={styles.cardContentText}>
            Which movie is best sultan or fan, share now!
          </Text>

          <View style={{position: 'relative'}}>
            <Image
              style={
                windowWidth > 600 ? styles.followImage2 : styles.followImage
              }
              source={imagePath.srkVsSalman}
            />
            <View style={styles.mainMeetUpView}>
              <View style={{paddingVertical: 2}}>
                <Text style={{color: '#FFAD00', fontSize: 15}}>Fangroup</Text>
                <Text
                  style={{color: '#FFAD00', fontWeight: 'bold', fontSize: 18}}>
                  Explore fan group by joining now!
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  // onPress={() =>
                  //   Navigation.navigate(navigationStrings.FANGROUP)
                  // }
                  style={styles.meetupBtn}>
                  <Text style={styles.meetupTxt}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.infoText}>
                <FontAwesome5 name={'heart'} />
                240
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.infoText}>16 Comments</Text>
              </View>
              <View>
                <Text style={styles.infoText}>106 Share</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.7,
              margin: 10,
            }}
          />
          <View style={styles.cardButtons}>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <Icon name="heart" color={'red'} />
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'share'} />
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* .............Fangroup card  end................... */}
    </View>
  );
};

export default MenuFanGroup;

const styles = StyleSheet.create({
  CardRow: {
    margin: 10,
  },
  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '35%',
  },
  lineText: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },

  //star category
  followMainrow: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  followCard: {
    backgroundColor: '#202020',
    borderRadius: 10,
    width: '48%',
    marginHorizontal: 3,
  },
  followContents: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
  },

  followImage: {
    // height: 80,
    width: '100%',

    // borderRadius: 100,
    // marginVertical: 10,
  },
  followImage2: {
    // height: 80,
    width: '100%',
    height: 380,

    // borderRadius: 100,
    // marginVertical: 10,
  },
  followText: {
    color: 'white',
    marginVertical: 5,
    fontSize: 10,
  },
  unfollowButton: {
    borderColor: 'gold',
    borderWidth: 1,
    borderRadius: 7,
  },
  followButton: {
    flexDirection: 'row',
    borderWidth: 1,
    // borderRadius:7,
    // backgroundColor: 'gold',
    paddingVertical: 10,
    borderColor: 'gold',
  },
  followBtnText: {
    textAlign: 'center',
    color: 'white',
    padding: 3,
    fontSize: 12,
    width: '48%',
  },
  followBtnText2: {
    textAlign: 'center',
    color: 'white',
    padding: 3,
    fontSize: 13,
    backgroundColor: 'red',
    borderRadius: 100,
  },

  //meetup

  MainCard: {
    padding: 5,
    backgroundColor: '#121620',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
  },
  CardContent: {
    padding: 5,
    backgroundColor: '#121620',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 3,
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 34,
    width: 34,
  },
  cardContentText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 5,
    color: '#AEAEAE',
  },
  cardCoverImg: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  likeBtn: {
    backgroundColor: '#FFAD00',
    borderRadius: 3,
    marginVertical: 3,
  },
  btnText: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    color: 'black',
    fontSize: 13,
  },
  cardInfo: {
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: 'white',
    fontSize: 13,
    margin: 3,
  },

  // Meet up cards
  mainMeetUpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  meetupBtn: {
    backgroundColor: '#FFAD00',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 5,
  },
  meetupTxt: {
    color: 'brown',
    fontWeight: 'bold',
  },
});
