import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  CardRow: {
    // margin: 10,
    marginVertical: 6,
    borderRadius: 15,
    overflow: 'hidden',
    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  CardRowWidscreen: {
    margin: 10,
    marginHorizontal: 90,
    borderRadius: 15,
    overflow: 'hidden',
    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  MainCard: {
    // padding: 5,
    backgroundColor: '#343434',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingTop: 5,
  },
  CardContent: {
    paddingVertical: 5,
    backgroundColor: '#343434',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 5,
  },
  cardText: {
    color: 'white',
    paddingLeft: 10,
    fontSize: 18,
    marginTop: 3,
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 34,
    width: 34,
    borderRadius: 50,
  },
  cardContentText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 9,
    color: '#FFAD00',
  },
  cardCoverImg: {
    height: 230,
    width: '100%',
    // borderRadius: 10,
    marginVertical: 4,
    resizeMode: 'stretch'
  },
  cardCoverImgLock: {
    height: 230,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
    pointerEvents: 'none',
  },
  cardCoverImgWithScreen: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardCoverImgWithScreenLock: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
    pointerEvents: 'none',
  },
  lockImageBtn: {
    position: 'absolute',
    top: '19%',
    left: '37%',
  },
  lockImage: {
    width: 100,
    height: 100,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 13,
    backgroundColor: '#474747',
    marginTop: 9,
    borderRadius: 50,
    paddingBottom: 5,
    paddingVertical: 2,
    borderColor: '#00000027',
    borderWidth: 1,
  },

  userProfileButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 13,
    backgroundColor: '#474747',
    marginTop: 9,
    borderRadius: 50,
    paddingBottom: 5,
    paddingVertical: 2,
    borderColor: '#00000027',
    borderWidth: 1,
  },

  likeBtn: {
    //backgroundColor: '#FFAD00',
    borderRadius: 50,
    marginVertical: 3,
  },
  btnText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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
    marginTop: 4,
  },
  icon: {
    marginHorizontal: 10,
  },

  lessText: {
    height: 136,
    overflow: 'hidden',
  },

  // Meet up cards
  mainMeetUpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    width: '100%',
    bottom: 4,
    backgroundColor: '#00000065',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    minHeight: 20,

  },

  // learning session video modified 
  mainMeetUpViewlearningSession: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // position: 'absolute',
    width: '100%',
    bottom: 3,
    backgroundColor: '#00000065',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,



  },

  meetupBtn: {
    backgroundColor: '#FFAD00',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 15,
    borderRadius: 50,
    paddingVertical: 5,
    borderWidth: 0.8,
    borderColor: '#000',
  },
  meetupTxt: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 0.5,
    borderColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: '#ffaa00',
  },

  // Learn Card
  LearnCardRow: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },
  LearnCoverImg: {
    height: 180,
    width: '100%',
    borderRadius: 5,
  },
  mainLearnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingVertical: 12,
    backgroundColor: 'black',
    opacity: 1,
  },

  LearnBtn: {
    backgroundColor: 'green',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 5,
  },
  LearnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },

  LearnFooter: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  TimeHead: {
    backgroundColor: '#FDFFCF',
    position: 'absolute',
    margin: 5,
    flexDirection: 'row',
    borderRadius: 5,
  },
  TimeText: {
    color: '#ED9B52',
    margin: 5,
    paddingEnd: 5,
  },

  LearnTimeImg: {
    height: 20,
    width: 20,
    borderRadius: 5,
    margin: 5,
  },

  // Upcoming Audition

  BannerCardImg: {
    borderRadius: 0,
    overflow: 'hidden',
    width: '100%',

    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // cardCoverImg:{
  //     position: 'relative',
  // },
  TextBanner: {
    fontSize: 20,
    color: '#ffaa00',
    fontWeight: 'bold',
    paddingVertical: 3,
    height: 30
  },

  BannerCs: {
    position: 'absolute',
    backgroundColor: '#00000099',
    borderRadius: 10,
    paddingHorizontal: 5,
    // opacity: 0.80,
    borderWidth: 1,
    borderColor: '#024E8C',
    top: '50%',
    left: '25%',
    flexDirection: 'row',
  },

  BannerCsText: {
    color: '#ffaa00',
    paddingTop: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  SText: {
    paddingHorizontal: 2,
    paddingVertical: 5,

  },

  starCardImgA: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  starCardImg: {
    paddingTop: 15,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#dadada27',
  },
  starCardImg2: {
    paddingTop: 15,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#dadada27',
    zIndex: 10
  },

  mainMeetUpViewA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.9,
  },

  BannerCse: {
    backgroundColor: '#00000099',
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#024E8C',
    flexDirection: 'row',
    margin: 0
  },

  BannerCseText: {
    color: '#ffaa00',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
});

export default styles;
