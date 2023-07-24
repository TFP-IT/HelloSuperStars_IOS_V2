import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },

  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    // marginVertical: 10,
    // width: '40%',
  },
  lineText: {
    // width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  followMainrow: {

    flexDirection: 'row',
 
 
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  followCard: {
    backgroundColor: '#202020',
    borderRadius: 10,

margin:5,
 
    // marginHorizontal: 3,
   
    // borderColor: 'gold',
  },
  followContents: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  followImage: {
    height: 80,
    width: 80,
    borderRadius: 100,

    margin:10,

 
  },
  followText: {
    color: 'white',
    marginVertical: 2,
    fontSize: 10,
  },
  unfollowButton: {


    borderRadius: 1,
    paddingBottom: 2,
  },
  followButton: {
  

    borderRadius: 1,
    // backgroundColor: 'gold',
  },
  followBtnText: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
    backgroundColor:'#ffaa00'
    ,
    opacity:0.8
    ,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  
});

export default styles;
