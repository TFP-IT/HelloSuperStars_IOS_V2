import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayerC = () => {

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: 'https://shahadot-tfp-hellosuperstars.s3.ap-southeast-1.amazonaws.com/video/1680674980701.mp4' }}
                useTextureView={true} // enable hardware acceleration on Android
                useNativeControls={true} // enable hardware acceleration on iOS
                bufferConfig={{
                    minBufferMs: 5000,
                    maxBufferMs: 10000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000,
                }} // adjust buffer settings
                style={styles.video}
            />
        </View>
    );

}

export default VideoPlayerC

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
