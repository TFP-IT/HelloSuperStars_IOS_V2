import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CardSkeleton = () => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder backgroundColor="#2e2e2e" highlightColor="#3d3d3d">
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={120}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={80}
              height={10}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width="100%"
          height={12}
          borderRadius={4}
          marginTop={8}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={12}
          borderRadius={4}
          marginTop={8}
        />
        <SkeletonPlaceholder.Item
          width="80%"
          height={12}
          borderRadius={4}
          marginTop={8}
        />
        <View
          style={
            windowWidth > 700
              ? styles.imageheightWidthScreen
              : styles.imageheight
          }></View>
        <SkeletonPlaceholder.Item
          width="100%"
          height={35}
          borderRadius={30}
          marginTop={15}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    paddingVertical: 20,
    borderRadius: 5,
    padding: 10,
    // marginTop: 15,
    borderRadius: 15,
  },
  containerWidthScreen: {
    borderRadius: 15,
    paddingVertical: 20,
    backgroundColor: '#171717',
    marginHorizontal: 90,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 25,
  },
  imageheight: {
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  imageheightWidthScreen: {
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default CardSkeleton;
