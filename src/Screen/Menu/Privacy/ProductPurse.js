import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../../Constants/context';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import RenderHTML from 'react-native-render-html';
import TitleHeader from '../../../Components/TitleHeader';
const windowHeight = Dimensions.get('window').height;
function CustomHeader(props) {
  return (
    <View style={{backgroundColor: '#343434', paddingVertical: 10}}>
      <TouchableOpacity
        style={{flexDirection: 'row', marginLeft: 10}}
        onPress={() => props.onPress()}>
        <Text style={{color: 'white'}}>
          <Icon name="arrow-back" size={25} />
        </Text>
        <Text style={{color: 'white', fontSize: 18, marginLeft: 4}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const ProductPurse = ({navigation}) => {
  function handleBack() {
    return navigation.goBack();
  }
  const {axiosConfig} = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [source, setSource] = useState('');
  const {width} = useWindowDimensions();
  useEffect(() => {
    axios.get(AppUrl.productPurchase, axiosConfig).then(res => {
      setTitle(res.data?.data.title);
      setDetails(res.data?.data.details);
    });
  }, []);
  useEffect(() => {
    setSource({
      html: `<div style='color: #959595'>${details}</div>`,
    });
  }, [details]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{margin: 10}}>
         <TitleHeader title={title} />

          <View
            style={{
              backgroundColor: '#1F1F1F',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              height: windowHeight-200,
              overflow: 'scroll',
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

export default ProductPurse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
