import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import imagePath from '../../Constants/imagePath';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CardSkeleton from '../../Components/Skeleton/CardSkeleton/CardSkeleton';
import MessageSkeleton from '../../Components/Skeleton/MessageSkeleton';
import HeaderComp from '../../Components/HeaderComp';
import {useAxiosGet} from '../../CustomHooks/useAxiosGet';
import AppUrl from '../../RestApi/AppUrl';
import ChatBox from './ChatBox';

const Message = ({navigation}) => {
  const {resData, setResData, buffer, error, HandelGetData} = useAxiosGet(
    AppUrl.chatList,
  );

  console.log('mychat list', resData);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <HeaderComp backFunc={() => navigation.goBack()} />

      <View style={{backgroundColor: 'black', marginVertical: 3}}>
        <View style={{backgroundColor: 'black', padding: 10}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Messaging
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{marginHorizontal: 5}}>
              <MaterialIcons name="search" color={'white'} size={25} />
            </Text>
          </View>

          <TextInput
            placeholder="Search Message"
            placeholderTextColor={'#fff'}
            style={{
              color: 'white',
              fontSize: 18,
              width: '80%',
              height: 40,
            }}></TextInput>
        </View>
      </View>
      {/*============= Skeleton start here =============== */}
      {buffer &&
        [1, 2, 3, 4, 5].map(() => (
          <View style={{padding: 8}}>
            <MessageSkeleton />
          </View>
        ))}
      {!buffer && (
        <FlatList
          data={resData.chatList}
          renderItem={({item, index}) => {
            return (
              <>
                <ChatBox data={item} key={index} />
              </>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  starCardImg: {
    padding: 3,
  },
  SearchBar: {
    borderColor: '#FFAD00',
    borderWidth: 1,
    height: 28,
    padding: 3,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  row: {
    marginVertical: 1,
    backgroundColor: 'black',
    marginVertical: 3,
    marginHorizontal: 3,
    borderWidth: 1,
    borderBottomColor: 'gray',
  },
  content: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ContentItems: {
    flexDirection: 'row',
  },
  ContentItems2: {
    marginLeft: 5,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
    color: 'white',
  },
  contentText2: {
    fontSize: 12,
    color: 'gray',
  },
});
export default Message;
