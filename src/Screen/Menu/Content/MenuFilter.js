import * as React from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';

export default function MenuFilter(props) {
  const {categoryData} = props;
  const {selectHandaler} = props;
  const {loader} = props;

  const [isEnabled, setIsEnabled] = React.useState(false);

  const category = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={item.isSelected ? styles.mainRowActive : styles.mainRow}
          onPress={() => selectHandaler(index)}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{height: 40, width: 40, marginTop: 5,borderRadius:100}}
              source={{uri: AppUrl.MediaBaseUrl + item.icon}}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 11}}>
              {item.name.substring(0, 8)} {item.isSelected}
            </Text>

            <Switch
              style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={item.isSelected}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{minHeight: 10, paddingLeft: 5, alignItems: 'center'}}>
        {loader && (
          <Image
            source={imagePath.loadingGif}
            style={{height: 10, width: 20}}
          />
        )}
      </View>
      <SwiperFlatList
        autoplay
        autoplayDelay={5}
        autoplayLoop
        // index={4}
        // showPagination
        data={categoryData}
        renderItem={category}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  fonts: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFAD00',
  },
  fonts2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    color: '#DE5500',
  },
  mainRow: {
    marginVertical: 3,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#ffffff69',
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: '#0000004f',
  },
  mainRowActive: {
    marginVertical: 3,
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 100,
    marginHorizontal: 3,
    // backgroundColor: '#ffd71073',
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  cardText: {
    color: '#F0E25E',
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardRow2: {
    backgroundColor: '#3C1919',
    position: 'relative',
  },
  CardRow3: {
    height: 10,
    width: 10,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
  },
});
