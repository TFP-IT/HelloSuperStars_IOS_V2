import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',

  },
  text: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: 'white',
  },
  warning_modal: {
    width: 300,
    height: 260,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#FFAD00',

  },

  warning_body: {
    width: '100%',
    justifyContent: 'center',

  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  clgBtn: {
    position: 'absolute', right: 0, margin: 10
  },
  checkbox1: {
    backgroundColor: 'rgba(0, 167, 145, 1)',
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10
  },
  strTxt: {
    color: 'white', padding: 8
  },
  checkBtntouch: {
    backgroundColor: 'rgba(80, 37, 254, 1)',
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10
  }

});

export default styles;
