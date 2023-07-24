import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    // backgroundColor: '#242424',
    // marginBottom: 5,
    // marginTop: 3,



  },
  textContainer: {
    justifyContent: 'center',
  },
  onlineText: {
    fontWeight: '900',
    color: '#01FF67',
    fontSize: 11,
    backgroundColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 7,
  },
  container: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 100,
    padding: 2,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: '#01FF67',
    position: 'absolute',
    borderRadius: 3,
    right: 0,
    top: 0,
  },
  text: {
    color: 'pink',
  },
  starCardImg: {
    width: 44,
    height: 44,
    borderRadius: 50
  },
});

export default styles;
