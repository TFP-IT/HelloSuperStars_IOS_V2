import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePath from '../../../../Constants/imagePath';
import { styles } from './styles';

const ChatWithStar = ({navigation}) => {
  return (
    <View style={styles.chatContainer}>
      {/* <View style={styles.topHeader}>
        <Image
          style={styles.logo}
          resizeMode="stretch"
          source={imagePath.logo}
        />
        <TouchableOpacity style={{ marginTop: 3 }}>
          <AntDesign style={styles.icon} name={'message1'} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.chatHeader}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginTop: 3 }} onPress={()=>navigation.goBack()}>
            <Ionicons style={styles.icon} name={'arrow-back'} />
          </TouchableOpacity>
          <Text style={[styles.text, { marginTop: 5, marginLeft: 5 }]}>
            Aktaruzzaman Joti
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginTop: 3, marginRight: 3 }}>
            <Entypo style={styles.icon} name={'dots-three-vertical'} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 3 }}>
            <MaterialCommunityIcons style={styles.icon} name={'video-plus'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ margin: 13 }}>
        <TouchableOpacity style={styles.cardImg}>
          <Image
            style={styles.starCardImg}
            source={imagePath.greetingsHomePageStar}
          />
        </TouchableOpacity>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Shakib Al Hasan</Text>
        <Text style={{ color: '#FFAD00' }}>@shakibalhasan</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            borderColor: 'gray',
            borderBottomWidth: 2,
            width: '40%',
            marginBottom: 5,
          }}></View>
        <Text
          style={{
            color: 'white',
            marginTop: 10,
            marginRight: 8,
            marginLeft: 8,
          }}>
          Jan 9, 2021
        </Text>
        <View
          style={{
            borderColor: 'gray',
            borderBottomWidth: 2,
            width: '40%',
            marginBottom: 5,
          }}>
          <Text></Text>
        </View>
      </View>

      <View style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Image
              source={imagePath.greetingsHomePageStar}
              style={{ width: 34, height: 34, borderRadius: 50 }}
            />
          </TouchableOpacity>

          <View
            style={{
              width: 210,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={[styles.text, { fontWeight: '500' }]}>
              Shakib Al Hasan
            </Text>
            <Text style={{ color: '#ffffff', marginTop: 8 }}>
              Hi Joti, Here I attachted our greetings.
            </Text>
            <View style={{ position: 'relative', marginTop: 8 }}>
              <Image style={{ width: '100%' }} source={imagePath.greetingStar} />
              <Image
                source={imagePath.greetingsPauseCircle}
                style={{ position: 'absolute', left: '48%', top: '40%' }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 7,
            }}>
            <Entypo
              style={{
                fontSize: 30,
                color: '#ff0',
                marginBottom: 10,
                marginTop: 10,
              }}
              name={'facebook-with-circle'}
            />
            <Entypo
              style={{ fontSize: 30, color: '#ff0', marginBottom: 10 }}
              name={'instagram'}
            />
            <AntDesign
              style={{ fontSize: 30, color: '#ff0', marginBottom: 10 }}
              name={'star'}
            />
            <Feather
              style={{ fontSize: 30, color: '#ff0' }}
              name={'corner-up-right'}
            />
          </View>

          <View>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>Yesterday</Text>
            <Text style={{ color: '#ffffff', fontSize: 12 }}>10.00 AM</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity>
            <Image
              source={imagePath.greetingsJoti}
              style={{ width: 34, height: 34, borderRadius: 50 }}
            />
          </TouchableOpacity>

          <View style={{ width: 220, marginLeft: 10 }}>
            <Text style={[styles.text, { fontWeight: '500' }]}>
              Aktaruzzaman Joti
            </Text>
            <Text style={{ color: '#ffffff' }}>Thank you Shakib vai</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderColor: 'gray',
          borderBottomWidth: 2,
          width: '100%',
          marginBottom: 5,
        }}></View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 13,
        }}>
        <AntDesign style={{ color: 'white', fontSize: 35 }} name={'pluscircle'} />
        <TextInput
          placeholder="Write a message..."
          style={{ width: '70%', backgroundColor: '#ffffff', borderRadius: 10 }}
        />
        <FontAwesome5
          style={{ color: 'white', fontSize: 35 }}
          name={'microphone'}
        />
      </View>
    </View>
  );
};

export default ChatWithStar;
