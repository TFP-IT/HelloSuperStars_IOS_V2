import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  row1: {
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  fontTitle: {
    color: 'white',
    fontSize: 19,
  },
  fontSubtitle: {
    color: '#FFAD00',
    fontSize: 11,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routerow2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  row3: {
    position: 'relative',
    width: '33%',
  },
  joinNowBtn: {
    justifyContent: 'center',
    backgroundColor: '#FFAD00',
    borderRadius: 3,
    flexDirection: 'row',
  },
  joinNowText: {
    color: 'rgba(65, 57, 6, 1)',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  routeTxt: {
    color: 'white',
  },
  routeTxtActive: {
    color: '#FFAD00',
  },
  postRow: {
    backgroundColor: '#282828',
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 16,
  },
  subRow: {
    padding: 10,
  },
  postInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 40,
    marginVertical: 10,
    color: 'white',
    paddingLeft: 10,
  },
  postView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3,
  },
  postBtns: {
    flexDirection: 'row',
    backgroundColor: '#35353C',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 3,
  },
  postNowBtn: {
    marginVertical: 8,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;
