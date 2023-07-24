import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    alignItems: 'stretch',
    // flexDirection: 'row',
    backgroundColor: '#343434',
  },
  topHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 13,
    marginRight: 13,
  },
  chatHeader: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#272727',
    paddingLeft: 13,
    paddingRight: 13,
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  logo: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 65,
    width: 65,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },
});
