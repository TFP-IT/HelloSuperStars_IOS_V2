import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#343434',
      backgroundColor: 'black',
  },
  fonts: {

    textAlign: 'center',
    fontSize: 18,
    color: '#FFD910',
  },
  fonts2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    color: '#DE5500',
  },
  mainRow: {
    marginVertical: 3,
    width: 115,
    height: 90,
    borderWidth: 1,
    borderColor: '#F6EA45',
    backgroundColor: 'rgba(0, 0, 0, 0.452)',
    borderRadius: 5,
    margin: 6,
  },
  mainRowActive: {
    marginVertical: 3,
    width: 115,
    height: 90,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.753)',
    borderColor: 'rgba(255, 255, 255, 0.753)',
    borderRadius: 5,
    color: 'white',
    margin: 6,

  },

  fontsActive: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
  },

  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  cardText: {
    color: '#F0E25E', fontSize: 18, marginHorizontal: 10, marginVertical: 5
  },
  cardRow2: {
    backgroundColor: '#3C1919', position: 'relative'
  },
  CardRow3: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
  },
  text: {
    color: 'white',
  },

  row: {
    marginVertical: 1,
    marginTop: 5,
    backgroundColor: '#343434',
  },
  content: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ContentItems: {
    flexDirection: 'row',
  },
  ContentItems2: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
    color: 'white',
  },
  contentText2: {
    fontSize: 12,
    color: 'gray',
  },

  titelText: {
    marginTop: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFAD00',
  },

  menuCrosalItem: {
    backgroundColor: '#343434be',
    borderRadius: 10,
    marginBottom: 10
  },
  carouselContainer_gray: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    // minHeight: 145,
    flexDirection: 'row'
  },
  Wallet: {
    flexDirection: 'row',
    backgroundColor: 'black',
    // borderBottomWidth:1,
    borderTopWidth: .2,
    borderColor: 'gray',
    padding: 15,
  },
  Wallet1: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderBottomWidth: .2,
    borderTopWidth: .2,
    borderColor: 'gray',
    padding: 15,
  },
  TextW: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gold',
  },
  TextWT: {
    color: '#DE5500',
    fontSize: 12,
  },
  TextWTS: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffaa00',
    paddingTop: 5,
  },
  menuTab:{flexDirection:'row',paddingVertical:10,borderWidth:1,borderTopColor:'gray',borderBottomColor:'gray',marginVertical:8},
  menuSubTab:{marginLeft:10,justifyContent:'center',alignItems:'center'},

});

export default styles;
