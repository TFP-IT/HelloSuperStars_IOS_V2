import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  Header: {
    height: 50,
    // backgroundColor:'#2E2F36',
    borderWidth: 0.2,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    width: '90%',
    justifyContent: 'center',
  },
  backArrow: {
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
  font: {
    color: 'white',

  },
  searchField: {
    padding: 10,
    height: 37,
    fontSize: 12,
    borderWidth: 0.5,
    // borderColor:'#ffaa00',
    borderRadius: 20,
    backgroundColor: '#161B22',
    width: '95%',
    color: '#fff'
  },
  subContent: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  topTitle: {
    fontSize: 18
  },
  profileImg: { height: 35, width: 35, backgroundColor: 'red', borderRadius: 50 },
  follow: {
    fontSize: 10,

  }
});
export default styles;
