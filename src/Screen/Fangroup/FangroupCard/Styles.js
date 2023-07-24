import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  CardRow: {
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  MainCard: {
    padding: 5,
    backgroundColor: '#343434',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  cardText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 5,
    color: '#AEAEAE',
  },
  CardContent: {
    padding: 5,
    backgroundColor: '#343434',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardContentText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 13,
  },
  cardCoverImg: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginVertical: 4,
  },
  meetupBtn: {
    backgroundColor: '#FFAD00',
    justifyContent: 'center',
    margin: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
    paddingVertical: 5,
  },
  mainMeetUpView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  cardInfo: {
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meetupTxt: {
    color: 'brown',
    fontWeight: 'bold',
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  likeBtn: {
    backgroundColor: '#FFAD00',
    borderRadius: 3,
    marginVertical: 3,
  },
  btnText: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    color: 'black',
    fontSize: 13,
  },
  infoText: {
    color: 'white',
    fontSize: 13,
    margin: 3,
  },
});

export default styles;
