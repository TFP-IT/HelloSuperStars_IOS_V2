import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

  topContainer: {
    flex: 1.5,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 400,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  postContainer: {
    // flex: 2,
    backgroundColor: 'black',
  },
  banner: {
    flex: 2,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFAD00',
    minHeight: 150
  },
  bannerImage: {
    height: '100%'
  },
  profileImageContainer: {
    // flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15

  },
  postNavigator: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20

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
    color: 'white'
  },
  ProfileItemTextActive: {
    fontSize: 11,
    paddingTop: 5,
    color: '#171717'
  },
  proImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    resizeMode: 'cover'

  },

  roundImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#FFAD00'
  },
  title: {
    fontSize: 19,
    color: 'white'
    // color: '#00000'
  },
  active: {
    color: '#FFAD00',
  },
  //updated navbar
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  iconView: {
    height: 55,
    width: 55,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView2: {
    height: 50,
    width: 50,

    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextView: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },

  sliderItem: {
    height: 80,
    width: 80,
    margin: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  }


});

export default styles;