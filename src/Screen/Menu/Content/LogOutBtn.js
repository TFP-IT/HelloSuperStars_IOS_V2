import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LogOutBtn = props => {
  return (
    <TouchableOpacity>
      <Text
        style={{
          color: 'black',
          backgroundColor: '#FFAD00',
          textAlign: 'center',
          marginBottom: 20,
          padding: 10,
          fontSize: 15,
        }}>
        {' '}
        <MaterialCommunityIcons name="logout" color={'black'} size={15} />
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default LogOutBtn;

const styles = StyleSheet.create({});
