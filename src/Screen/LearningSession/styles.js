import { Dimensions, StyleSheet } from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: "row",
    textAlign: "center",
    width: width,
  },
  contentArea: {
    textAlign: "center",
    backgroundColor: "#282828",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },
  title: {
    textAlign: "center",
    color: '#FFAD00',
    fontSize: 18,
    fontFamily: 'Gilroy-Medium'
  },
  cardCoverImg: {
    width: '100%',
    marginVertical: 4,
  },
  body: {
    padding: 7
  },
  details: {
    width: '100%',
    marginVertical: 4,
    color: "#dedede",
    textAlign: "justify",
    fontSize: 15,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#343434',
    color: '#fff',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 30,
    padding: 8
  },
  labels: {
    color: "#fff",
    fontSize: 17,
    paddingBottom: 5
  },
  information: {
    display: "flex",
    color: '#dcdcdc',
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  info: {
    color: '#dcdcdc',
    fontSize: 17
  }

});

export default styles;
