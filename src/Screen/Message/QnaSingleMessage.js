import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppUrl from '../../RestApi/AppUrl';
import { AuthContext } from '../../Constants/context';
import moment from 'moment';
import MicWav from './MicWav';
import loader from '../../Assets/Icons/loading/loading-buffering.gif'

const QnaSingleMessage = ({ data }) => {
  const [music, setMusic] = React.useState(null);
  const [msgIcon, setMsgIcon] = useState(true);
  const { useInfo } = useContext(AuthContext);
  const [soundLoad, setSoundLoad] = useState({
    status: false,
    time: ""
  })
  //<================= Audio playing funciton ==================>
  const play = () => {
    let summer = new Sound(
      AppUrl.MediaBaseUrl + data?.media,
      Sound.MAIN_BUNDLE,
      // loaded successfully

      err => {

        if (err) {
          console.log('error', err);
          return;
        }
        setSoundLoad({
          status: true,
          time: summer.getDuration()
        })
        console.log('duration in seconds: ' + summer.getDuration() + 'number of channels: ' + summer.getNumberOfChannels());
        summer.play(success => {
          console.log('music push', success);
          setMsgIcon(true)
        });
      },
    );
    console.log('success,', summer)

    setMusic(summer);
  };
  function handlePlayMusic() {
    play();
    setMsgIcon(false);
  }
  function handlePauseMusic() {
    music.stop();
    setMsgIcon(true);
  }
  //<================= Audio playing funciton ==================>
  return (
    <View
      style={
        data.sender_id === useInfo.id
          ? styles.remoteChatStyle
          : styles.ownChatStyle
      }>
      <Image
        source={{
          uri: AppUrl.MediaBaseUrl + data.sender_image,
        }}
        style={styles.UserImg}
      />

      <View
        style={
          data.sender_id === useInfo.id
            ? styles.remoteChatBodyAudio
            : styles.ownChatBodyAudio
        }>
        {data.msg_type === 'text' ? (
          <View style={{ color: '#000', width: 200, paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ color: '#f8f8f8' }}>{data.text}</Text>
            <Text style={{ color: '#00000083' }}>{moment(data?.created_at).subtract(6, 'days').calendar()}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={msgIcon ? handlePlayMusic : handlePauseMusic}>
            <Text style={{ color: 'black', marginLeft: 5, padding: 5, paddingHorizontal: 20, height: 50 }}>

              {msgIcon ?

                <Icon
                  name='play-circle'
                  size={40}
                  color={'white'}
                />
                :
                <>
                  {!soundLoad.status ?
                    <ActivityIndicator size="large" color="#ffaa00" />
                    :
                    <Icon
                      name='pause-circle'
                      size={40}
                      color={'white'}
                    />
                  }
                </>
              }
            </Text>
            {/* {soundLoad.status && <Text style={{ paddingLeft: 20, color: '#00000083' }}>{soundLoad.time.toFixed(0)} s</Text>} */}
          </TouchableOpacity>
        )}
      </View>

      {/* <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'gray' }}>12.3</Text>
      </View> */}
    </View >
  );
};

export default QnaSingleMessage;

const styles = StyleSheet.create({
  sendIconStyle: {
    borderWidth: 1,
    borderColor: 'white',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
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
    marginTop: -15,
    marginRight: 10
  },
  UserImgTyping: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 0.3,
    borderColor: 'gold',
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
    marginVertical: 8,
    // justifyContent: 'flex-end',
    marginLeft: 10,
  },
  remoteChatStyle: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
  },

  ownChatBody: {
    backgroundColor: '#E4E3E9',
    justifyContent: 'center',
    marginHorizontal: 8,
    width: '50%',
    borderRadius: 20,
  },
  remoteChatBody: {
    backgroundColor: '#0E82FD',
    justifyContent: 'center',
    marginHorizontal: 8,
    width: '50%',
    borderRadius: 20,
  },
  remoteChatBodyAudio: {
    backgroundColor: '#7e7e7e70',
    justifyContent: 'center',
    marginHorizontal: 8,
    // padding: 3,
    // paddingHorizontal: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    alignItems: 'flex-start',
    marginLeft: 10,

  },

  ownChatBodyAudio: {
    backgroundColor: '#1cff075e',
    justifyContent: 'center',
    // marginHorizontal: 8,
    // width: '20%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
    // marginLeft: 10
  },
});
