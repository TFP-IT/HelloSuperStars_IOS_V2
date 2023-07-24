import React from 'react';
import {StyleSheet, View} from 'react-native';
import PureChart from 'react-native-pure-chart';
const Analytics = () => {
  var data = [
    {seriesName: 'series1', data: [30, 100, 170, 250, 70], color: '#297AB1'},
    {seriesName: 'series2', data: [40, 200, 110, 240, 14], color: '#ffaa00'},
  ];

  return (
    <View style={{margin: 10, borderRadius: 10, overflow: 'hidden'}}>
      <PureChart backgroundColor={'#fff'} height={280} data={data} type="bar" />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({});
