import { StyleSheet, Dimensions } from 'react-native'
const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let halfWidth = (windowWidth / 2) - 20;
let halfHight = (windowHight / 2) - 20;
const styles = StyleSheet.create({
    VideoContainer: {
        width: windowWidth,
        height: windowHight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    TouchAbleViedo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    PushImage: {
        fontSize: 40,
        color: 'rgba(255, 255, 255, 0.473)',
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.6)',
        borderRadius: 100,
        padding: 20,
    },
    LeftSideBar: {
        top: "53%",
        position: 'absolute',
        backgroundColor: 'rgba(31, 31, 31, 0.473)',
        transform: [{ translateX: -halfWidth }],
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 10,
        paddingLeft: 35
    },
    RightSideBar: {
        top: "56%",
        position: 'absolute',
        // backgroundColor: 'rgba(31, 31, 31, 0.473)',
        transform: [{ translateX: halfWidth }],
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 50,
        paddingVertical: 20,
        borderRadius: 10,
        paddingRight: 40,

    },
    CommentSection: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: '80%',
        transform: [{ translateY: 290 }],
        height: 120,
        position: 'absolute',

    },
    promoVideoHader: {
        position: 'absolute',
      backgroundColor:'#0000005e',
        width: '100%', flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: [{ translateY: -halfHight }],
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    CommentInput: {
        width: windowWidth - 100,
        backgroundColor: '#EFEFEF',
        borderRadius: 50,
        height: 40,
        color: '#FFAD00',
        paddingLeft: 15
    },
    UserImage: {
        width: '100%',
        top: "85%",
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    SentIcon: {
        backgroundColor: '#EFEFEF',
        borderRadius: 50,
        height: 40,
        width: 40,
        paddingRight: 10,
        justifyContent: 'center',
        paddingLeft: 10
    }

})

export default styles;