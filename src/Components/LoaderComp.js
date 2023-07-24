//import liraries
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const LoaderComp = ({ text = null }) => {
  return (
    <Spinner
      visible={true}
      textContent={text == null ? 'Loading...' : text}
      textStyle={{ color: '#757575', fontSize: 12 }}
      size="large"
      color="#757575"
      overlayColor="rgba(0, 0, 0, 0.733)"
    />
  );
};

//make this component available to the app
export default LoaderComp;
