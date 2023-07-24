import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  greetingsBody: {
    backgroundColor: '#343434',
    flex: 1,
    paddingBottom: 50,
  },
  greetingsBanner: {
    margin: 10,
  },
  greetingsRequest: {
    backgroundColor: '#282828',
    margin: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 300,
  },
  greetingsRequestHeader: {
    textAlign: 'center',
    color: '#FFAD00',
    fontSize: 20,
    margin: 10,
  },
  requestImg: {
    // margin: 10,
    // height: '100%',
    width: '100%',
    marginBottom: 15,
  },
  colorWhite: {
    color: 'white',
    marginTop: 10,
  },
  costBg: {
    borderRadius: 15,
    // borderBottomRightRadius: 15,
    // overflow: 'hidden',
    // height: 280,
  },
  twoFiftySix: {
    fontSize: 25,
  },
  greetingsCostText: {
    fontSize: 18,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    margin: 10,
    width: 200,
  },
  dateStyle: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerStyle: {
    width: 150,
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#343434',
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemPickerStyle: {
    // width: '100%',
    borderColor: '#ffad00',
    borderWidth: 3,
    borderBottomColor: '#ffad00',
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#343434',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
