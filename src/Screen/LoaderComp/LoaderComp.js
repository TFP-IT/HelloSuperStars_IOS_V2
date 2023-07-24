import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

const LoaderComp = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={100} color="#ffaa00" />
      <Text style={styles.pendingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pendingText: {
    color: '#ddd',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0b0b0b',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 70,
  },
});

export default LoaderComp;
