import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import navigationStrings from '../../../Constants/navigationStrings';
import styles from './styles';
const Ticket = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.HOME)}
            style={{color: '#FFAD00', marginRight: 10}}>
            <Icon name="close" size={30} color="#FFAD00" />
          </TouchableOpacity>
        </View>
        {/* <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://google.com')}>
  Google
</Text> */}
      </SafeAreaView>
    </View>
  );
};

export default Ticket;
