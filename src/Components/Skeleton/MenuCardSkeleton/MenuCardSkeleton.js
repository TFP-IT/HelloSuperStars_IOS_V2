import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MenuCardSkeleton = () => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View
      style={
        windowWidth > 700 ? styles.containerWidthScreen : styles.container
      }>
      <Animatable.View animation="pulse" iterationCount="infinite">
        <SkeletonPlaceholder
          backgroundColor="#2e2e2e"
          highlightColor="#3d3d3d"
          height="200">
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop={15}>
            <SkeletonPlaceholder.Item
              width={80}
              marginHorizontal={2}
              height={100}
              borderRadius={7}
            />
            <SkeletonPlaceholder.Item
              width={80}
              marginHorizontal={2}
              height={100}
              borderRadius={7}
            />
            <SkeletonPlaceholder.Item
              width={80}
              marginHorizontal={2}
              height={100}
              borderRadius={7}
            />
            <SkeletonPlaceholder.Item
              width={50}
              marginHorizontal={2}
              height={100}
              borderRadius={7}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  containerWidthScreen: {
    backgroundColor: '#171717',
    marginHorizontal: 90,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 25,
  },
});

export default MenuCardSkeleton;
