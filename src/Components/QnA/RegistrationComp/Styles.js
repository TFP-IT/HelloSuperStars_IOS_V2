import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
    paddingBottom: 20,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
  },
  lineImgView: {
    alignItems: 'center',
  },
  lineImg: {
    marginVertical: 3,
  },
  bannerRow: {alignItems: 'center', position: 'relative', paddingBottom: 15},
  imgRow: {marginVertical: 2, width: '90%'},
  imgRow2: {marginVertical: 2, position: 'absolute', top: '45%', left: '50%'},
  infoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  infoViewSize: {
    color: 'white',
    width: '30%',
  },
  infoViewSize2: {
    color: 'white',
    width: '60%',
  },
  fontInstruction: {
    color: 'white',
    marginLeft: 13,
    marginBottom: 15,
  },
  formText: {
    color: '#ffaa00',
    marginLeft: 13,
    marginBottom: 5,
  },
  formText2: {
    color: '#ffaa00',
    margin: 10,
    marginBottom: 5,
  },
  textInputStyle: {
    borderWidth: 0.5,
    borderColor: '#FFAD00',
    borderRadius: 20,
    backgroundColor: 'black',
    height: 38,
    color: '#9e9e9e',
    paddingLeft: 18,
  },
  textInputStyleTime: {
    width: 160,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: '#fff',
    paddingLeft: 10,
  },
  textInputView2: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: 'white',
  },
  textInputView: {
    alignItems: 'center',
  },
  textInputView3: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#FFAD00',
    width: '35%',
    borderRadius: 5,
  },

  textInputPass: {
    textAlign: 'center',
    paddingVertical: 4,
    fontWeight: 'bold',
  },

  //modal work start here
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  Icon: {
    marginTop: 8,
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 350,
    backgroundColor: 'coral',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default styles;
