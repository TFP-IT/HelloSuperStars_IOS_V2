import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';
// import imagePath from '../../Constants/imagePath';

import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../../Constants/imagePath';
const data=[1,2,3,4,5,7,8]
const MessengerCom = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#343434',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={imagePath.logo} style={{height: 30, width: 30}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>
            <MaterialCommunityIcons
              name="android-messages"
              color={'#FFAD00'}
              size={25}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.messageInfo}>
        <View style={styles.messageInfoView1}>
          <Text style={{color: 'white', fontSize: 18}}>Group Inbox</Text>
        </View>

        <View style={styles.messageInfoView1}>
          <View style={styles.imageMsgTop}>
            <Image source={imagePath.msgTop1} />
            <Image source={imagePath.msgTop2} />
            <Image source={imagePath.msgTop3} />
            <Image source={imagePath.msgTop4} />
            <Image source={imagePath.msgTop5} />
            <View style={styles.dot}></View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 15}}>& 230 more</Text>
            </View>
          </View>
        </View>
      </View>
    
    <View style={{ flex:1, }}>
      <ScrollView>

      {data.map((item, index)=>{
        return <>
        <View key={index} style={{ flexDirection:'row',marginVertical:8 ,marginLeft:10}}>
         <Image source={imagePath.msgPerson1} />
         <View style={{ backgroundColor:'#25B78B',justifyContent:'center',marginHorizontal:8,width:'50%',borderRadius:5 }}>
           <Text style={{ color:'white',marginLeft:5 }}>Some Text
           text here...</Text>
         </View>
         <View style={{ justifyContent:'center' }}>
           <Text style={{ color:'gray' }}>Today | 5pm</Text>
         </View>
       </View>


       <View style={{ flexDirection:'row',marginVertical:8,justifyContent:'flex-end',marginRight:10 }}>
       <View style={{ justifyContent:'center' }}>
           <Text style={{ color:'gray' }}>Today | 5pm</Text>
         </View>
         <View style={{ backgroundColor:'#9B17FB',justifyContent:'center',marginHorizontal:8,width:'50%',borderRadius:5 }}>
           <Text style={{ color:'white',marginLeft:5 }}>Some Text
           text here...</Text>
         </View>
        
         <Image source={imagePath.msgPerson3} />
       </View>
        </>
      })}
      
      </ScrollView>
    </View>


      <View style={styles.bottomContainer}>
        <View style={{justifyContent: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="plus-circle"
                color={'gray'}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: 8}}>
              <MaterialCommunityIcons name="image" color={'gray'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="smile-o" color={'gray'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{justifyContent: 'center', width: '50%'}}>
          <TextInput
            placeholder="Type your message here..."
            style={styles.inputTxt}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.sendBtn}>
            <Icon name="send" color={'gold'} size={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessengerCom;
