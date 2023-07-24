import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Admins from './Admins/Admins';
import AllMembers from './AllMembers/AllMembers';
import styles from './Styles';
const Members = ({ memberInfos, fangroup }) => {
  const [grpType, setGrpType] = useState('Members');

  return (
    <View
      style={styles.mainView}>
      <View style={styles.TopRow}>
        <TouchableOpacity onPress={() => setGrpType('Members')}>
          <Text
            style={
              grpType == 'Members'
                ? styles.activeStyle
                : { color: 'gray' }
            }>
            Members({memberInfos.length}){' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGrpType('Admins')}>
          <Text
            style={
              grpType == 'Admins'
                ? {
                  color: 'white',
                  borderBottomColor: '#FFAD00',
                  borderWidth: 1,
                  borderLeftColor: '#3E3E3E',
                  borderRightColor: '#3E3E3E',
                  borderTopColor: '#3E3E3E',
                  marginLeft: 20,
                  fontWeight: 'bold'
                }
                : { color: 'gray', marginLeft: 20 }
            }>
            Admins(2)
          </Text>
        </TouchableOpacity>
      </View>

      {/* content start here */}
      {grpType === "Members" ? <AllMembers memberInfos={memberInfos} fangroup={fangroup} /> : null}
      {grpType === "Admins" ? <Admins fangroup={fangroup} /> : null}
    </View>
  );
};

export default Members;
