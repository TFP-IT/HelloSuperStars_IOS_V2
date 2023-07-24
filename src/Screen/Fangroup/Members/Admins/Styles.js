import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    fontStyle: {
        fontSize: 12,
        color: 'white',
        marginHorizontal: 2
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,
    },
    row2: {
        width: 150, backgroundColor: '#26BA88', padding: 4, flexDirection: 'row', borderRadius: 3
    },
    row3: {
        width: 150, backgroundColor: '#CC0CF7', padding: 4, flexDirection: 'row', borderRadius: 3
    },
    normalRow: {
        width: 150, backgroundColor: '#282828', padding: 4, flexDirection: 'row', borderRadius: 3
    },

});

export default styles;
