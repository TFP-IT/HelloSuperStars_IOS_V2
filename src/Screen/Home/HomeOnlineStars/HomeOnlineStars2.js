import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import imagePath from '../../../Constants/imagePath';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';

const HomeOnlineStars2 = () => {
  const [loader, setLoader] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const {themeCardColor, themeTextColor, themeImgBgColor, themeIconColor} =
    useThemeColor();
  return (
    <View style={[styles.topContainer, themeCardColor]}>
      <ScrollView horizontal style={{marginHorizontal: 4}}>
        {loader &&
          [1, 2, 3, 4, 5, 6, 7].map(index => (
            <View key={index} style={[styles.container, themeCardColor]}>
              <SkeletonPlaceholder
                backgroundColor="#2e2e2e"
                highlightColor="#3d3d3d"
                height="100">
                <SkeletonPlaceholder.Item
                  width={46}
                  height={46}
                  borderRadius={23}
                  marginLeft={5}
                  marginRight={3}
                />
              </SkeletonPlaceholder>
            </View>
          ))}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(index => (
          <TouchableOpacity activeOpacity={0.6}>
            <View style={[styles.container, themeCardColor]}>
              <Image style={styles.starCardImg} source={imagePath.notify2} />
            </View>
            {isActive && <View style={styles.dot}></View>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeOnlineStars2;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#242424',
    marginBottom: 5,
    marginTop: 3,
  },
  container: {
    height: 46,
    width: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
    marginVertical: 6,
    marginHorizontal: 4,
    borderRadius: 23,
    position: 'relative',
    padding: 2,
    borderWidth: 1,
    borderColor: '#FFAD00',
  },
  starCardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  dot: {
    height: 6,
    width: 6,
    backgroundColor: '#01FF67',
    position: 'absolute',
    borderRadius: 3,
    right: 8,
    top: 10,
  },
});
