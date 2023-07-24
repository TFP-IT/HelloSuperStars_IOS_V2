import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Banner: {
    margin: 4.5,
    width: '90%',
  },
  BannerImg: {
    // width:'100%',
  },

  Card: {
    margin: 8,
  },
  Card1: {
    marginHorizontal: 8,
    marginTop: -8,
  },
  CardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  CardTextSm: {
    color: '#FFF500',
    fontSize: 10,
  },
  CardS: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  CardNameActive: {
    fontSize: 15,
    color: 'gold',
    paddingVertical: 4,
  },
  CardName: {
    fontSize: 15,
    color: 'white',
    paddingVertical: 4,
  },

  CardJoin: {
    backgroundColor: '#ffaa00',
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 22,
  },
  CardPost: {
    //  backgroundColor:'gold',
    paddingHorizontal: 3,
  },
  CardPostT: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 4,
    marginBottom: 5,
  },
  CardInput: {
    backgroundColor: '#282828',
    paddingVertical: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingLeft: 8,
    borderColor: '#757575',
    color: 'white',
  },
  CardButtonH: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  MediaUpload: {
    color: 'white',
    backgroundColor: '#282828',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  CardInputButton: {
    marginVertical: 20,
    textAlign: 'center',
    backgroundColor: 'gold',
  },
  CardInputButtonT: {
    textAlign: 'center',
    color: '#402801',
    paddingVertical: 5,
  },
  CardRow: {
    margin: 10,
  },
  MainCard: {
    padding: 5,
    backgroundColor: '#343434',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
  },
  CardContent: {
    padding: 5,
    backgroundColor: '#343434',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 3,
  },
  cardImg: {
    justifyContent: 'center',
  },
  starCardImg: {
    height: 34,
    width: 34,
  },
  cardContentText: {
    color: 'white',
    paddingLeft: 5,
    fontSize: 13,
  },
  time: {
    fontSize: 12,
    margin: 0,
    paddingLeft: 5,
    color: '#AEAEAE',
  },
  cardCoverImg: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  likeBtn: {
    backgroundColor: 'gold',
    borderRadius: 3,
    marginVertical: 3,
  },
  btnText: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    color: 'black',
    fontSize: 13,
  },
  cardInfo: {
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    color: 'white',
    fontSize: 13,
    margin: 3,
  },
});

export default styles;
