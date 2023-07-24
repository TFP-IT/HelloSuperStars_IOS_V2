import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    width: '100%',
    height: 150,
    paddingHorizontal: 10,
    // marginBottom: 100,
    position: 'relative',
    backgroundColor: 'black',
    marginTop: 10,
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  Text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 3,
  },
  //Name and go back
  topView: {
    flexDirection: 'row',
    marginVertical: 5,
    margin: 10,
  },
  topArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  topName: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  cameraIcon: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 100,
  },

  profileView: {
    position: 'absolute',
    bottom: -40,
    left: '35%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileViewTab: {
    position: 'absolute',
    bottom: -40,
    left: '43%',
  },
  ProfileImg: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },
  cameraIcon2: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 10,
    backgroundColor: '#333333',
    padding: 7,
    borderRadius: 100,
  },

  // profile name section
  nameView: {
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextView2: {
    color: '#626262',
    marginVertical: 4,
    fontSize: 12,
    textAlign: 'center',
  },

  //information section start
  infoView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  infoChild: {
    flexDirection: 'row',
  },
  infoTextmain: { color: 'white', marginHorizontal: 5, fontWeight: 'bold' },

  bgNav: {
    backgroundColor: '#343434',
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  editTxt: {
    backgroundColor: '#343434',
    marginLeft: 10,
    paddingHorizontal: 5,
    fontSize: 10,
    color: 'gray',
    marginTop: 5,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
