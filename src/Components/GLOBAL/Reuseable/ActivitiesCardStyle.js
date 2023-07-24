import {StyleSheet} from 'react-native';

const ActivitiesCardStyle = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },

  Header: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  HeaderImg: {
    width: '100%',
    height: 30,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  HeaderText: {
    textAlign: 'center',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    padding: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Container: {
    marginVertical: 0,
    position: 'relative',
    zIndex: 1,
    height: 148,
    margin: 2,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffaa00',
    overflow: 'hidden',
  },
  ContainerPad: {
    marginVertical: 0,
    position: 'relative',
    zIndex: 1,
    width: 200,
    height: 150,
    margin: 2,
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffaa00',
  },

  ImgBanner: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },

  Title: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  DateBox: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  DateColor: {
    margin: 2,
    width: 35,
    height: 35,
    borderRadius: 3,
    backgroundColor: '#ffaa00',
  },

  JoinNowColor: {
    paddingHorizontal: 18,
    paddingVertical: 5,
    backgroundColor: '#ffaa00',
    borderRadius: 50,
    color: 'black',
    fontWeight: '500',
  },

  DateColorRed: {
    margin: 2,
    width: 35,
    height: 35,
    borderRadius: 3,
    backgroundColor: 'red',
  },

  bannerTag: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  textDay: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: -2.6,
  },
  textSec: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
  },

  textDayColor: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: -2.6,
  },
  textSecColor: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
  },

  Join: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    backgroundColor: '#ffaa00',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
  },

  JoinTextQNA: {
    fontWeight: 'bold',
    width: 'auto',
    padding: 15,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 3,
  },
  JoinText: {
    fontWeight: 'bold',
    width: 'auto',
    padding: 10,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 3,
  },
  JoinTextAuction: {
    fontWeight: 'bold',
    width: 'auto',
    padding: 10,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 3,
    zIndex: 3,
    elevation: 3,
  },

  Activities: {
    marginHorizontal: 10,
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
  },

  ActivitiesText: {
    textAlign: 'center',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    top: '40%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivitiesCardStyle;
