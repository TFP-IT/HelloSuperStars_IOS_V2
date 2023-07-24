import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

  topContainer: {
    flex: 1.5,
    backgroundColor: '#343434',
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight:400
    
  },
  postContainer: {
    flex: 2,
    backgroundColor: 'rgb(37, 37, 37)',
  },
  banner: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFAD00',
    minHeight:70
  },
  bannerImage: {
    height: '100%'
  },
  profileImageContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  postNavigator: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70
    
  },
  ProfileOption: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  ProfileItem: {
    width: "23%",
    backgroundColor: '#282828',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
   
    
  },
  ProfileItemActive: {
    width: "23%",
    backgroundColor: '#FFAD00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
        
  },
  ProfileItemText: {
    fontSize: 11,
    paddingTop: 5,
    color:'white'
  },
  ProfileItemTextActive: {
    fontSize: 11,
    paddingTop: 5,
    color: '#171717'
  },
  proImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFAD00'
  },
 
  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#FFAD00'
  },
  title:{
    fontSize: 19,
    color:'white'
    // color: '#00000'
  },
  active: {
    color: '#FFAD00',
  }


});