import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DropDown = ({title, titleIcon, menuData, onSelect = () => {}}) => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const onSelectedItem = item => {
    // setOpenDropDown(false)
    onSelect(item);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpenDropDown(!openDropDown)}>
        <View style={styles.menuTab}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.menuSubTab}>
              <Text style>
                <MaterialIcons name={titleIcon} color={'#ffaa00'} size={22} />
              </Text>
            </View>

            <View style={styles.menuSubTab}>
              <Text style={{fontSize: 15, color: '#ffaa00'}}>{title.toUpperCase()}</Text>
            </View>
          </View>

          <View style={{marginRight: 10}}>
            <Icon
              style={{transform: [{rotate: openDropDown ? '180deg' : '0deg'}]}}
              name="angle-down"
              size={25}
              color="gray"
            />
          </View>
        </View>
      </TouchableOpacity>

      {openDropDown && (
        <View style={{margin: 10}}>
          {menuData.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  // backgroundColor:value.id===item.id?'#ffaa00':"#303030",
                  backgroundColor: '#303030',
                  paddingVertical: 13,
                  borderRadius: 4,
                  marginHorizontal: 5,
                  paddingHorizontal: 4,
                  marginVertical: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                 

                }}
                onPress={() => onSelectedItem(item)}
                key={String(index)}>
                <Text style={{marginRight: 5,padding:2,fontWeight:'bold',padding:2}}>{item.icon}</Text>
                <Text style={{color: '#E2E2E2', fontSize: 13,fontWeight:'bold',padding:2}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 10,
    borderWidth: 1,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
    marginVertical: 8,
  },

  menuTab: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
  borderRadius:10,
    backgroundColor: '#343434be',
  marginVertical: 3,
    justifyContent: 'space-between',
  },
  menuSubTab: {marginLeft: 10, justifyContent: 'center', alignItems: 'center'},
});
