import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import { useAxiosGet } from '../../CustomHooks/useAxiosGet';

const MessageStar = ({ route }) => {
  const { messageInfo } = route.params;
  const { room_id, group_id } = messageInfo;
  const { useInfo, socketData, axiosConfig } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [store, setStore] = React.useState(null);
  const [sendType, setSendType] = React.useState(false);
  const [pick, setPick] = React.useState();
  const { resData, buffer } = useAxiosGet(AppUrl.fanGroupMemeberList + group_id);
  const [mentionStatus, setMentionStatus] = useState(false);
  const [starList, setStarList] = useState();

  const scrollViewRef = useRef();

  // console.log('gggjkgkj', resData.members)

  const openPicker = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setPick(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const [text, setText] = useState();
  const handelType = async e => {
    // console.log(e)
    let eventdata = {
      room_id: room_id,
      status: true,
    };
    await socketData.emit('typing_event_send', eventdata);

    setText(e);
    if (e.length > 0) {
      setSendType(true);
    } else {
      setSendType(false);
    }
  };

  const [msgData, setMsgData] = useState([]);
  const handelSendMessage = async () => {
    let time =
      new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    let messageData = {
      sender_id: useInfo.id,
      room_id: room_id,
      sender_name: useInfo?.first_name,
      sender_image: useInfo.image,
      group_id: group_id,
      position: '',
      text: text,
      time: time,
      status: 1,
    };

    let eventdata = {
      room_id: room_id,
      status: false,
    };

    await socketData.emit('typing_event_send', eventdata);

    await socketData.emit('send_message', messageData);
    setMsgData(prv => {
      return [...prv, messageData];
    });
    setText('');
    setMentionStatus(false);
  };

  /**
   * message history get
   */
  const [messageLoad, setMessageLoad] = useState(true);
  const getMessageHistory = () => {
    axios
      .get(AppUrl.fanChatHistory + group_id, axiosConfig)
      .then(res => {
        setMessageLoad(false);
        if (res.data.status === 200) {
          setMsgData(res.data.chat_history);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [onType, setOnType] = useState(false);
  useEffect(() => {
    socketData.on('recive_message', data => {
      setMsgData(prv => {
        return [...prv, data];
      });
    });

    socketData.on('typing_event_recive', data => {
      setOnType(data.status);
      console.log(data.status);
    });
  }, [socketData]);

  useEffect(() => {
    getMessageHistory();
    socketData.emit('join_room', room_id);
  }, []);

  /**
   * message type
   */
  const [searchName, setSearchName] = useState();
  const HandelTypeMessage = e => {
    handelType(e);

    if (e.includes('@')) {
      setSearchName(e);
      handleFilterData(e, 'first_name', 'last_name');
      setMentionStatus(true);
    } else {
      setMentionStatus(false);
    }
  };

  /**
   * filter data
   */
  const handleFilterData = (value, ...props) => {
    setMentionStatus(false);
    let serachString = value.split('@');
    let stringValue = serachString[1];

    let array = resData.members?.filter(item => {
      let state = false;

      props.forEach(property => {
        if (
          item.user[property].toLowerCase().includes(stringValue.toLowerCase())
        ) {
          state = true;
        }
      });

      return state;
    });
    if (value.length > 0) {
      setStarList(array);
    } else {
      setStarList([]);
    }
  };

  /**
   * handel press to menation
   */
  const HandelPressMentaion = value => {
    let serachString = text.split('@');
    let stringValue = serachString[0];
    setText(stringValue + value);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View
          style={{
            backgroundColor: 'black',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* <Image source={imagePath.logo} style={{ height: 30, width: 30 }} /> */}

            <MatarialIcon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              height: 30,
              width: 30,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>
              <MaterialCommunityIcons
                name="android-messages"
                color={'#FFAD00'}
                size={20}
              />
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View
          style={{ backgroundColor: '#343434', marginVertical: 3, padding: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '15%' }} onPress={() => navigation.goBack()}>
              <View>
                <Image
                  style={{ height: 40, width: 40, borderRadius: 50 }}
                  source={{ uri: AppUrl.MediaBaseUrl + useInfo.image }}
                />
              </View>
            </View>
            <TouchableOpacity style={{ width: '70%', justifyContent: 'center' }}>
              <Text style={styles.Name}>{useInfo.first_name + " " + useInfo?.last_name}</Text>
           
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '20%' }}>
              <Text style={styles.Name}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  color={'white'}
                  size={30}
                />
              </Text>
             
            </TouchableOpacity>
          </View>
        </View> */}
        <ImageBackground
          source={imagePath.VoiceChatBg}
          style={{ flex: 1, paddingBottom: 60 }}>
          {messageLoad ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}>
              <Image
                source={imagePath.lazyDog}
                style={{ height: 100, width: 200 }}
              />
              <Text style={{ color: '#ffaa00', fontSize: 15 }}>
                Try to finding your message!
              </Text>
            </View>
          ) : (
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }>
              <View>
                {showEmoji && (
                  <EmojiSelector
                    onEmojiSelected={emoji => {
                      setStore(emoji);
                      setShowEmoji(false);
                    }}
                  />
                )}

                {msgData &&
                  msgData.map((item, index) => (
                    <View
                      key={index}
                      style={
                        item.sender_id === useInfo.id
                          ? styles.remoteChatStyle
                          : styles.ownChatStyle
                      }>
                      <Image
                        source={{ uri: AppUrl.MediaBaseUrl + item?.sender_image }}
                        style={styles.UserImg}
                      />
                      <View
                        style={
                          item.sender_id === useInfo.id
                            ? styles.ownChatBody
                            : styles.remoteChatBody
                        }>
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 5,
                            paddingVertical: 12,
                          }}>
                          {item.text}
                        </Text>

                        {/* <View style={{ backgroundColor: `${item.sender_id === useInfo.id ? '#ffaa00' : 'white'}`, height: 20, position: 'absolute', right: '0%', bottom: 18, borderRadius: 15, justifyContent: 'center', alignItems: 'center', top: -10 }}>
                      <Text style={{ fontSize: 10, paddingHorizontal: 5 }}>Baler group</Text>
                    </View> */}
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'gray' }}>{item?.time}</Text>
                      </View>
                    </View>
                  ))}

                {onType && (
                  <View style={styles.ownChatStyle}>
                    <View style={styles.UserImgTyping}>
                      <Image
                        source={imagePath.loadingGif}
                        style={{ height: 10, width: 20 }}
                      />
                    </View>
                    <View
                      style={[
                        styles.remoteChatBody,
                        { backgroundColor: '#ffff004b' },
                      ]}>
                      <Text
                        style={{
                          color: 'black',
                          marginLeft: 5,
                          padding: 5,
                          color: 'white',
                        }}>
                        Some one typing...
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </ImageBackground>

        {mentionStatus && (
          <View
            style={{
              backgroundColor: 'black',
              borderTopColor: 'gray',
              borderWidth: 1,
              paddingBottom: 50,
            }}>
            <ScrollView>
              {starList &&
                starList.map(item => {
                  return (
                    <>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', margin: 10 }}
                        onPress={() =>
                          HandelPressMentaion(
                            `@${item.user?.first_name + ' ' + item.user?.last_name
                            }`,
                          )
                        }>
                        <View
                          style={{
                            height: 30,
                            width: 30,
                            backgroundColor: 'red',
                            borderRadius: 100,
                          }}>
                          <Image
                            source={imagePath.SakibBalHasan}
                            style={{ height: 30, width: 30 }}
                          />
                        </View>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 5,
                          }}>
                          <Text style={{ color: '#fff' }}>
                            {item.user?.first_name + ' ' + item.user?.last_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />
                    </>
                  );
                })}
            </ScrollView>
          </View>
        )}

        <View style={styles.bottomContainer}>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <TouchableOpacity onPress={() => setShowEmoji(true)}>
                <Icon name="smile-o" color={'gray'} size={28} />
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: '75%',
              position: 'relative',
            }}>
            <TextInput
              onChangeText={e => HandelTypeMessage(e)}
              value={text}
              placeholder="Type your message here..."
              placeholderTextColor={'gray'}
              style={styles.inputTxt}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              right: '18%',
              top: '25%',
            }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <TouchableOpacity >
                <Icon name="camera" color={'gray'} size={20} />
              </TouchableOpacity> */}
            </View>
          </View>

          {sendType ? (
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handelSendMessage}>
                <Icon name="send" color={'white'} size={15} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity style={styles.sendBtn}>
                <Icon name="microphone" color={'white'} size={15} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Name: {
    color: 'white',
    fontSize: 20,
  },

  BorderA: {
    flex: 2,
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',
  },
  UnderLine: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  starNameT: {
    fontSize: 15,
    color: 'gray',
    paddingHorizontal: 10,
  },
  starName: {
    fontSize: 25,
    color: 'white',
    paddingHorizontal: 10,
  },

  starCardImgS: {
    borderRadius: 100,
  },

  StarPro: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    //    height:200,
  },

  UserImg: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gold',
  },
  UserImgTyping: {
    width: 30,
    height: 30,
    borderRadius: 100,
    // borderWidth: 0.3,
    // borderColor: 'gold',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  StarImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gold',
  },

  inputTxt: {
    paddingLeft: 10,
    backgroundColor: '#2C323A',
    height: 39,
    borderRadius: 20,
    color: 'white',
  },
  sendBtn: {
    backgroundColor: '#1DAECA',
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    borderTopColor: 'gray',
    borderWidth: 1,
  },
  ownChatStyle: {
    flexDirection: 'row',
    marginVertical: 15,
    // justifyContent: 'flex-end',
    marginLeft: 10,
  },
  remoteChatStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  ownChatBody: {
    backgroundColor: '#E4E3E9',
    justifyContent: 'center',
    marginHorizontal: 8,
    width: '50%',
    borderRadius: 10,
  },
  remoteChatBody: {
    backgroundColor: '#0E82FD',
    justifyContent: 'center',
    marginHorizontal: 8,
    width: '50%',
    borderRadius: 10,
  },
});

export default MessageStar;
