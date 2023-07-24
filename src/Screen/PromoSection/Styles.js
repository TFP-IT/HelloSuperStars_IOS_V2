import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#343434',
        height: windowHight,
        width: windowWidth
    },

    RightSideVideoButton: {
        width: 5,
        height: 300,
        marginLeft: '80%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around', borderRadius: 8,
        position: 'absolute',
        marginTop: windowHight - 550
    },
    profileImageContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topInforamtion: {
        width: "100%",
        backgroundColor: '#00000036',
        height: 50,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    buttomInformation: {
        width: "100%",
        backgroundColor: '#0000005b',
        marginTop: 20,
        paddingHorizontal: 25,
        paddingHorizontal: 25,
        paddingBottom: 15,
        paddingVertical: 30,
        position: 'absolute',
        marginTop: windowHight - 200,
        borderRadius: 10
    },
    backgroundVideo: {
        position: 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

})
export default styles