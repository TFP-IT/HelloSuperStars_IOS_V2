import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import { useAxiosPost } from '../../../CustomHooks/useAxiosPost';
import MenuStackScreen from '../../../Navigation/MenuStack/MenuStackScreen';
import AppUrl from '../../../RestApi/AppUrl';
imagePath;
const FanBaseModal2 = props => {

  const { starName, setStarName, fanGroup, setJoinStatus, starInfo, HandelGetData } = props;
  let data = {
    'fan_group_id': fanGroup.id,
    'star_name': starInfo.first_name,
    'star_id': starInfo.id


  }
  const { resData, buffer, error, HandelSubmit } = useAxiosPost(AppUrl.JoinGroup, data)
  const { waletInfo } = useContext(AuthContext)


  const navigation = useNavigation();

  console.log(fanGroup)
  const HandelJoin = () => {
    if (fanGroup?.club_points <= waletInfo?.club_points) {

      HandelSubmit()
      HandelGetData()
      fanGroup.join_approval_status != 0 ? setJoinStatus(true) : null
      // 
    } else {
      navigation.navigate(navigationStrings.MENUSTACKSCREENV2, { screen: navigationStrings.WALLET })
    }
    props.closeModal();
  }

  return (
    <View
      style={{
        marginTop: 25,
      }}>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={imagePath.afterfanModal}
          style={{ height: 80, width: 80 }}
        />
      </View>
      <View>
        <Text style={{ color: '#FFAD00', textAlign: 'center', fontSize: 12 }}>
          You need {fanGroup?.club_points} points, you have {waletInfo?.club_points} points
        </Text>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Are you sure want to join {starName} group?
        </Text>
        <Text style={{ color: 'gray', textAlign: 'center', fontSize: 12 }}>
          Be carefull once you select you can not go back!
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 5 }}>
        <TouchableOpacity
          onPress={() => {
            HandelJoin()
            setStarName(starName);
          }}
          style={{
            backgroundColor: "#FFAD00",
            borderWidth: 1,
            width: '50%',
            borderRadius: 5,
          }}>
          <Text style={{ color: 'white', padding: 5, textAlign: 'center' }}>
            {fanGroup?.club_points <= waletInfo?.club_points ?
              "Join Now" : "Buy Package"
            }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => {
            props.onPress(false)
            props.closeModal(true)
          }}
          style={{
            borderColor: "#FFAD00",
            borderWidth: 1,
            width: '50%',
            borderRadius: 5,
            marginTop: 7
          }}>
          <Text style={{ color: 'white', padding: 5, textAlign: 'center' }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FanBaseModal2;

const styles = StyleSheet.create({});
