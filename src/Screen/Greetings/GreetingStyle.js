import {StyleSheet} from 'react-native';

const stylesActive = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fonts: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    color: '#ffaa00',
  },

  Bar: {
    height: 38,
    width: 3,
    marginRight: 10,
    backgroundColor: '#ffaa00',
    alignSelf: 'stretch',
  },
  ActiveNew: {
    margin: 12,
  },
  LaneBg: {
    width: '100%',
    height: 30,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  LaneText: {
    textAlign: 'center',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LagEr: {
    marginVertical: 8,
    position: 'relative',
    zIndex: 1,
    margin: 2,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gold',
    backgroundColor: '#ffaa00',
  },
  LagEr2: {
    marginVertical: 8,
    position: 'relative',
    zIndex: 1,
    margin: 2,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gold',
    backgroundColor: 'black',
  },

  ImgLan: {
    width: '100%',
    borderRadius: 15,
    height: 200,
    // marginBottom:25,
  },
  ImgLanB: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    // marginBottom:25,
  },
  LearnText: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 10,
  },

  LajFS: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BgLang: {
    margin: 2,
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: 'gold',
  },

  autionTitleText: {
    position: 'absolute',
    bottom: '83%',
    textAlign: 'center',
    color: 'white',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 24,
  },
  textLearM: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: -2.6,
  },

  textLear: {
    fontSize: 5,
    textAlign: 'center',
    color: 'black',
  },
});

export default stylesActive;
