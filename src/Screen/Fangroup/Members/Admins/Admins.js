import React from 'react';
import { Image, Text, View } from 'react-native';

import imagePath from '../../../../Constants/imagePath';
import AppUrl from '../../../../RestApi/AppUrl';
import styles from './Styles';
const data = [
  {
    name1: 'Asif Rahman',
    name2: 'Asma khatun',
    key: 1,
    fan1: imagePath.fan1,
    fan2: imagePath.fan2,
  },
];
const Admins = ({ fangroup }) => {



  return (
    <>
      <View style={styles.mainRow}>
        <View style={styles.row2}>
          <View style={{ justifyContent: 'center' }}>
            <Image source={fangroup.my_superstar?.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.my_superstar.image }} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.fontStyle}>{fangroup.my_superstar.first_name}</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={{ justifyContent: 'center' }}>
            <Image source={fangroup.another_superstar?.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.another_superstar.image }} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.fontStyle}>{fangroup.another_superstar.first_name}</Text>
          </View>
        </View>
      </View>

      {data.map(item => {
        return (
          <View key={item.key} style={styles.mainRow}>
            <View style={styles.normalRow}>
              <View style={{ justifyContent: 'center' }}>
                <Image source={fangroup.my_admin.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.my_admin.image }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 6 }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.fontStyle}>{fangroup.my_admin.first_name + " " + fangroup.my_admin?.last_name}</Text>
              </View>
            </View>
            <View style={styles.normalRow}>
              <View style={{ justifyContent: 'center' }}>
                <Image source={fangroup.another_admin.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.another_admin.image }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 6 }} />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.fontStyle}>{fangroup.another_admin.first_name + " " + fangroup.another_admin?.last_name}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default Admins;
