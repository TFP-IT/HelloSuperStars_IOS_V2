import React from 'react';
import { Image, View, Text } from 'react-native';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles';
import { FlatGrid } from 'react-native-super-grid';
import AppUrl from '../../../RestApi/AppUrl';

const Media = ({ resData }) => {

  console.log(resData.fanPost)

  const RenderImage = ({ item }) => {
    return (
      <View style={{ margin: 5 }}>
        <View>

          <Image
            source={item.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + item.image }}
            style={{ height: 120, width: 180 }}
          />
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={{ margin: 5, backgroundColor: '#343434', borderRadius: 8 }}>
        <View>
          <FlatGrid
            itemDimension={120}
            data={resData.fanPost}
            renderItem={RenderImage}
          />
        </View>

      </View>
    </View>
  );
};

export default Media;
