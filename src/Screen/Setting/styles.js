import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fonts: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFAD00',
  },
  fonts2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    color: '#DE5500',
  },
  mainRow: {
    marginVertical: 3,
    width: 124,
    height: 100,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 5,
    margin: 3,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  cardText: {
    color: '#F0E25E',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardRow2: {
    backgroundColor: '#3C1919',
    position: 'relative',
  },
  CardRow3: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
  },
});

export default styles;
