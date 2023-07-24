import {Dimensions, StyleSheet} from 'react-native';

import colorCode from '../../../Constants/colorCode';
const {width} = Dimensions.get('window');

const promoWidth = (width / 3.8).toFixed(0);
let widthPromo = parseInt(promoWidth);
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  //     position: 'relative',
  //     backgroundColor: colorCode.transparentBlackDark,
  //     overflow: 'hidden',
  //     borderRadius: 15,
  //   },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',

    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  containerWidthScreen: {
    // backgroundColor: 'pink',
    backgroundColor: '#343434',
    paddingVertical: 10,
    borderRadius: 10,
    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  item: {
    width: widthPromo,
    height: 218,

    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      width: '100%',
      height: 50,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'stretch',

      width: '100%',
    },
    profileImage: {
      height: 50,
      width: 50,
      position: 'absolute',
      right: 0,
      // left:0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    child: {width, justifyContent: 'center'},
    text: {fontSize: width * 0.5, textAlign: 'center'},

    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  containerWidthScreen: {
    // backgroundColor: 'pink',
    backgroundColor: '#343434',
    paddingVertical: 10,
    borderRadius: 10,
    // borderColor: '#2c2c2cb6',
    // borderWidth: 3
  },
  item: {
    width: widthPromo,
    minHeight: 180,
    maxHeight: 180,
    position: 'relative',
    backgroundColor: colorCode.transparentBlackDark,
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    height: 50,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'stretch',

    width: '100%',
  },
  profileImage: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    // left:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},

  loading: {
    position: 'absolute',
    top: '45%',
    left: '35%',
  },
  volumeButtonOutside: {
    width: 24,
    height: 24,
    right: 5,
    position: 'absolute',
    bottom: 10,
    zIndex: 9,
  },
});

export default styles;
