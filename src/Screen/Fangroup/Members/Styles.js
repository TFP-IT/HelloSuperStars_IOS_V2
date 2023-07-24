import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#3E3E3E',
    marginHorizontal: 10,
    marginTop: 8,
    borderRadius: 5,
  },
  TopRow: {
    flexDirection: 'row', padding: 10,
    justifyContent: 'space-around'
  },
  activeStyle: {
    color: 'white',
    borderBottomColor: '#FFAD00',
    borderWidth: 1,
    borderLeftColor: '#3E3E3E',
    borderRightColor: '#3E3E3E',
    borderTopColor: '#3E3E3E',
    fontWeight: 'bold'
  },
  fontStyle: {
    color: 'white',
    padding: 10
  }

});

export default styles;
