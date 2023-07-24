import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  row1: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // linearGradient:{
  //   width: 200,
  //   height:40,
  //   justifyContent: 'center',
  //   alignItems:'center',
  //   paddingVertical: 5,
  //   borderRadius: 20,

  // },
  marketBtn: {
    width: '48%',

    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 18,
  },
  marketBtn2: {
    width: '48%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 18,
  },
  Fonts: {
    color: 'black',
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 12,
  },
  Fonts2: {
    color: 'white',
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 12,
  },
  //marketPlace comp style
});

export default styles;
