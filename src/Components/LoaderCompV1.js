import React from 'react';
import {Image, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const LoaderCompV1 = ({text = null}) => {
  return (
    <Spinner
      visible={true}
      //   textContent={text == null ? 'Loading...' : text}
      //   textStyle={{color: '#757575', fontSize: 12}}
      //   size="large"
      //   color="#757575"
      customIndicator={
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif',
            }}
            style={{width: 40, height: 40}}
          />
        </View>
      }
      overlayColor="rgba(0, 0, 0, 0.733)"
    />
  );
};

export default LoaderCompV1;
