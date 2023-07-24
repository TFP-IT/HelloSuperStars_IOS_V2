import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainRow: {
    backgroundColor: '#343434',
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
  },
  secondRow: { width: '60%', alignItems: 'center' },
  smallContent: {
    height: 60,
    width: 60,
    backgroundColor: '#222222',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  thirdRow: {
    flexDirection: 'row',
    backgroundColor: '#484848',
    borderRadius: 25,
    marginVertical: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 4
  },
  fourthRow: {
    height: 20,
    width: 20,
    
    borderRadius: 100,
    margin: 8,
    borderWidth: 0.8,
    borderColor: '#ffaa00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //packages
  vlLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
  },
  cardGrid: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardGrid2: {
    width: '55%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
