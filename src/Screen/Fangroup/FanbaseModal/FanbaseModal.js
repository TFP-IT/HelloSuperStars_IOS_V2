import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FanBaseModal2 from './FanBaseModal2';
import styles from './Styles';

const FanbaseModal = props => {
  const { starName, setStarName, fanGroup, setJoinStatus, starInfo, HandelGetData } = props;

  const [Next, setNext] = React.useState(false);
  function handlePress(check) {
    console.log(check)
    if (check === false) {

    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <TouchableOpacity style={styles.clgBtn} onPress={props.CloseModal}>
            <MaterialCommunityIcons
              name="close-thick"
              color={'#FFAD00'}
              size={15}
            />
          </TouchableOpacity>

          <FanBaseModal2
            onPress={handlePress}
            starName={starName}
            setStarName={setStarName}
            closeModal={props.CloseModal}
            fanGroup={fanGroup}
            setJoinStatus={setJoinStatus}
            starInfo={starInfo}
            HandelGetData={HandelGetData}

          />
        </View>
      </View>
    </View>
  );
};

export default FanbaseModal;
