import React from 'react';
import {View} from 'react-native';
import OnlineSession from '../../Components/LEARNINGSESSION/OnlineSession/OnlineSession';
import imagePath from '../../Constants/imagePath';

const OnlineLearning = () => {
  return (
    <View>
      <OnlineSession
        name="Shakib Al Hasan"
        image={imagePath.ImgBanner}
        image_pro={imagePath.ImgPro}
        date="April 30, 2022"
      />
    </View>
  );
};

export default OnlineLearning;
