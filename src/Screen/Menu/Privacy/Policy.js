import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../../Constants/context';
import RenderHTML from 'react-native-render-html';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import TitleHeader from '../../../Components/TitleHeader';

function CustomHeader(props) {
  return (
    <View style={{ backgroundColor: '#343434', paddingVertical: 10 }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: 10 }}
        onPress={() => props.onPress()}>
        <Text style={{ color: 'white' }}>
          <Icon name="arrow-back" size={25} />
        </Text>
        <Text style={{ color: 'white', fontSize: 18, marginLeft: 4 }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function Subtitle({ title }) {
  return <Text style={{ fontSize: 17, color: '#ffaa00' }}>{title}</Text>;
}

const Policy = ({ navigation }) => {
  function handleBack() {
    return navigation.goBack();
  }
  const { axiosConfig } = useContext(AuthContext);
  const [policy, setPolicy] = useState('');
  const [source, setSource] = useState('');
  const { width } = useWindowDimensions();
  const windowHeight = Dimensions.get('window').height;
  useEffect(() => {
    axios.get(AppUrl.policy, axiosConfig).then(res => {
      setPolicy(res.data.data[0].details);
      //console.log(res.data.data[0].details);
    });
  }, []);
  useEffect(() => {
    setSource({
      html: `<div style='color: #959595'>${policy}</div>`,
    });
  }, [policy]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <TitleHeader title={'Privacy Policy'} />
          {/* <View>
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Privacy policy
            </Text>
          </View> */}

          <View
            style={{
              backgroundColor: '#1F1F1F',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              overflow: 'scroll',
              height: windowHeight - 200,
            }}>
            <ScrollView>
              <RenderHTML contentWidth={width} source={source} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Policy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
