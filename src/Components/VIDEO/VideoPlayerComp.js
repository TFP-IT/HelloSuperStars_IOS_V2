import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'

import Video from 'react-native-video'
import { useRef } from 'react'
import { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import VideoPlayer from 'react-native-video-player'


const windowHeight = Dimensions.get('window').height;
let videoHeight = (windowHeight / 3.6).toFixed();


const VideoPlayerComp = ({ url, thumbnail }) => {
  const [play, setPlay] = useState(false)
  const [sound, setSound] = useState(true);
  const videoRef = useRef(null)

  function handlePlayButton() {
    setPlay((prev) => !prev)
  }
  function handleBuffer() {
    console.log('Post video Buffering...')
  }
  function handleError() {
    console.log('Video Error detected (post)')
  }
  return (
    <TouchableOpacity onPress={handlePlayButton} style={{ position: 'relative' }}>


      <VideoPlayer
        // onLoad={() => console.log('video Loading.....component')}
        // onReadyForDisplay={() => console.log('Video Ready for display...')}
        video={{ uri: url }}
        style={{ height: 200 }}
        thumbnail={{ uri: thumbnail }}
        endThumbnail={{ uri: thumbnail }}
        showDuration={true}
        resizeMode={'stretch'}
        blurRadius={15}
        pauseOnPress={true}

      />



      {/* <Video
        blurRadius={15}
        autoplay={false}
        source={{
          uri: url,
        }}
        muted={!sound}
        poster={thumbnail}
        posterResizeMode='stretch'
        onBuffer={handleBuffer}
        onError={handleError}
        ref={videoRef}
        resizeMode='stretch'
        paused={play ? false : true}
        style={{ height: parseInt(videoHeight) }}
      />


      <TouchableOpacity style={{ position: 'absolute', right: '5%', bottom: 10,  padding: 5, borderRadius: 50 }} onPress={() => setSound(!sound)}>
        <Octicons name={!sound ? 'mute' : 'unmute'} color={'#fff'} size={18} />
      </TouchableOpacity>

      {!play && <View style={{ position: "absolute", left: '44%', bottom: '43%' }}>

        <TouchableOpacity onPress={handlePlayButton} style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffaa00', borderRadius: 50 / 2 }} >

          <AntDesign
            name="playcircleo"
            size={35}
            color='#fff'
          />
        </TouchableOpacity>
      </View>
      } */}




    </TouchableOpacity>









  )
}

export default VideoPlayerComp

const styles = StyleSheet.create({})