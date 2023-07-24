import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    CardRow: {
        margin: 10,
        marginTop:20
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
        marginBottom:8
      },
      time: {
        fontSize: 12,
        margin: 0,
        paddingLeft: 5,
        color: '#AEAEAE',
      },
      cardCoverImg: {
        width: '100%',
        height:250,
        borderRadius: 10,
        marginVertical: 4,
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
        paddingHorizontal: 10,
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
    
      // Meet up cards
      mainMeetUpView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.9,
      },
      meetupBtn: {
        backgroundColor: '#FFAD00',
        justifyContent: 'center',
        margin: 3,
        paddingHorizontal: 5,
        borderRadius: 3,
        paddingVertical: 5,
      },
      meetupTxt: {
        color: 'brown',
        fontWeight: 'bold',
      },
});

export default styles;
