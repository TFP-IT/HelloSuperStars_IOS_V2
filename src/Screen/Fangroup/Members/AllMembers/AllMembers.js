import React from 'react';
import { Image, Text, View } from 'react-native';
import imagePath from '../../../../Constants/imagePath';
import AppUrl from '../../../../RestApi/AppUrl';
import styles from './Styles';

const AllMembers = ({ fangroup, memberInfos }) => {

  return (
    <>
      <View style={styles.mainRow}>
        <View style={styles.row2}>
          <View style={{ justifyContent: 'center' }}>
            <Image source={fangroup.my_superstar?.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.my_superstar.image }} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.fontStyle}>{fangroup.my_superstar?.first_name}</Text>
          </View>
        </View>
        <View style={styles.row3}>
          <View style={{ justifyContent: 'center' }}>
            <Image source={fangroup.another_superstar?.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + fangroup.another_superstar.image }} style={{ height: 40, width: 40 }} />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.fontStyle}>{fangroup.another_superstar?.first_name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={{ width: 150 }}>
          {memberInfos && memberInfos.map(item => {
            return (
              <>
                {item.star_id === fangroup.my_superstar.id &&
                  <View style={styles.normalRow}>
                    <View style={{ justifyContent: 'center' }}>
                      <Image source={item.user.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + item.user?.image }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 6 }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={styles.fontStyle}>{item.user?.first_name + " " + item.user?.last_name}</Text>
                    </View>
                  </View>
                }
              </>
            );
          })}
        </View>
        <View style={{ width: 150 }}>
          {memberInfos && memberInfos.map(item => {
            return (
              <>
                {item.star_id === fangroup.another_superstar.id &&
                  <View style={styles.normalRow}>
                    <View style={{ justifyContent: 'center' }}>
                      <Image source={item.user.image === null ? imagePath.noImage : { uri: AppUrl.MediaBaseUrl + item.user?.image }} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 6 }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={styles.fontStyle}>{item.user?.first_name + " " + item.user?.last_name}</Text>
                    </View>
                  </View>
                }
              </>
            );
          })}
        </View>



      </View>


    </>
  );
};

export default AllMembers;
