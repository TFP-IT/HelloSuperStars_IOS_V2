import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    overflow: 'scroll'
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
  bannerRow: { alignItems: 'center', position: 'relative', paddingBottom: 15 },
  imgRow: { marginVertical: 2, width: '90%' },
  imgRow2: { marginVertical: 2, position: 'absolute', top: '45%', left: '50%' },
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
    color: '#b8b8b8',
    marginBottom: 15,


  },
  formText: {
    color: '#b8b8b8',
    marginBottom: 5,
  },
  formText2: {
    color: '#b8b8b8',
    marginBottom: 5,
    width: 150

  },
  TotalCost: {
    borderWidth: 1, borderColor: '#FFAD00', borderRadius: 10, backgroundColor: '#343434', height: 38, color: '#b8b8b8',
    paddingLeft: 15, paddingHorizontal: 100

  },
  textInputStyle: {
    borderWidth: 1, borderColor: '#FFAD00', borderRadius: 10, backgroundColor: '#343434', height: 38, color: '#b8b8b8',
    paddingLeft: 15
  },
  itemPickerStyle: {
    paddingHorizontal: 80
  },

  dropDownSlection: {
    borderWidth: 1, borderColor: '#FFAD00', borderRadius: 10, backgroundColor: '#343434', color: '#b8b8b8',
    paddingLeft: 15,
  },

  textInputView2: { borderWidth: 1, borderColor: '#FFAD00', borderRadius: 10, backgroundColor: '#343434', height: 38, color: '#b8b8b8' },
  textInputView: {
    alignItems: 'center', marginVertical: 5
  },
  textInputView3: {
    color: '#b8b8b8', margin: 10, marginBottom: 5, backgroundColor: '#FFAD00',
    width: '50%',
    borderRadius: 5,
    paddingVertical: 8
  },

  textInputPass: {
    textAlign: 'center', paddingVertical: 3,
    fontWeight: 'bold',
    color: '#171717'
  }

});

export default styles;
