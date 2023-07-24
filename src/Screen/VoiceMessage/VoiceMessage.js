import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Image, ImageBackground,
  ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import HeaderCom from '../../Components/HeaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import styles from './Styles';
const VoiceMessage = () => {
  const { socketData, useInfo } = useContext(AuthContext);
  const [mic, setMic] = useState(false);
  const [sendMessageData, setSendMessageData] = useState();
  const [reciveMessageData, setReciveMessageData] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();


  /**
   * initial load 
   */
  useEffect(() => {

    handelReciveMessage()

  }, [])

  /**
   * message arry add
   */
  useEffect(() => {
    if (reciveMessageData) {
      setMessages((prev) => [...prev, reciveMessageData])
    }
  }, [reciveMessageData])


  /**
   * voice message recive
   */
  const handelReciveMessage = () => {

    socketData.on("getMessage", (data) => {
      setReciveMessageData(data)
    })

  }

  /**
   * voice message send 
   */
  const handelSendText = () => {

    socketData.emit("sendMessage", {
      senderInfo: {
        userId: useInfo.id,
        name: useInfo.username,
        image: useInfo.image
      },
      receiverId: 11,
      text: sendMessageData,
    });
    setSendMessageData("")
  }


  // console.log(messages)

  return (
    <View style={styles.container}>
      <HeaderCom />
      <ImageBackground
        source={imagePath.VoiceChatBg}
        style={{ flex: 1, marginTop: -2 }}>
        <ScrollView
          style={{ marginBottom: 50 }}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {messages.map((item, key) =>
            <>
              {/* recive text */}
              {item.senderInfo.userId === useInfo.id ?
                <>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 8,
                      justifyContent: 'flex-end',
                      marginRight: 10,
                    }}>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: 'gray' }}>Today | 12am </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#FFAD00',
                        justifyContent: 'center',
                        marginHorizontal: 8,
                        width: '50%',
                        borderRadius: 20,
                      }}>
                      <Text style={{ color: 'black', fontWeight: "bold", marginLeft: 10 }}>
                        {item.text}
                      </Text>
                    </View>

                    <Image source={{ uri: AppUrl.MediaBaseUrl + item.senderInfo.image }} style={styles.StarImg} />
                  </View>

                </>
                :

                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 8,
                      marginLeft: 10,
                    }}>
                    <Image source={{ uri: AppUrl.MediaBaseUrl + item.senderInfo.image }} style={styles.StarImg} />
                    <View
                      style={{
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        marginHorizontal: 8,
                        width: '50%',
                        borderRadius: 20,
                      }}>
                      <Text style={{ color: 'white', fontWeight: "bold", marginLeft: 10 }}>
                        <Text>{item.text}</Text>
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: 'gray' }}>Today | 5pm</Text>
                    </View>
                  </View>
                </>


              }
            </>

          )}


        </ScrollView>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'relative' }}>
          <TextInput style={{ backgroundColor: 'red', width: 300 }} onChangeText={(mes => setSendMessageData(mes))} value={sendMessageData} />
          <TouchableOpacity style={{ backgroundColor: 'green', width: 70 }} onPress={handelSendText}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={() => setMic(!mic)} style={{ justifyContent: 'center' }}>

          <View style={styles.sendBtn2}>
            <Icon name="microphone" color={'white'} size={15} />
          </View>

        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            width: '75%',
            position: 'relative',
          }}>
          {mic ? <Image source={imagePath.wave} style={{ height: 25, width: '100%' }} /> : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ borderWidth: 1, borderColor: '#1DAECA', width: '80%' }} />
          </View>}




        </View>

        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity style={styles.sendBtn}>
            <Icon name="send" color={'white'} size={15} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default VoiceMessage;
