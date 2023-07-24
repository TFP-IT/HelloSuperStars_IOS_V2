import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import colorCode from '../../Constants/colorCode';




const width = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const JustVideoPlayer = ({ videoUrl = null, thumbnail }) => {


    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [volume, setVolume] = useState(1);
    // const [postConfig.isMuted, postConfig.setIsMuted] = useState(true);
    const [hideControl, setHideControl] = useState(false);
    const [videRender, setVideoRender] = useState(false)
    const [isMuted, setIsMuted] = useState(true)

    const videoPlayer = useRef(null);



    useEffect(() => {
        setVideoRender(true)
    })

    //handle video size according video orientation
    const handleLoad = ({ duration, naturalSize }) => {
        //handle video size
        const { orientation } = naturalSize;
        //check the orientation
        setDuration(duration);
        setIsLoading(false);
    };
    //handle progress
    const handleProgress = ({ currentTime }) => {
        setCurrentTime(currentTime);

    };

    //handle play pause
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };
    //handle video duration slider
    const handleSliderChange = (value) => {
        // videoPlayer.current.seek(value);
        setCurrentTime(value);
    };
    //hide video controller
    const handleHideControl = () => {
        setHideControl(!hideControl);
    };

    const handleMutePress = () => {
        if (isMuted) {
            setIsMuted(false);
            //setVolume(0);
        } else {
            setIsMuted(true);
            //setVolume(1);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleHideControl}>
                {videRender ?

                    <Video
                        source={{ uri: videoUrl }}
                        ref={videoPlayer}
                        style={[
                            styles.videoPlayer,
                            { height: 200 },
                        ]}
                        useTextureView={true}
                        // useNativeControls={true}

                        preload={true}

                        bufferConfig={{
                            minBufferMs: 5000,
                            maxBufferMs: 10000,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000,
                        }}
                        playInBackground={false}
                        maxBitRate={1000000}
                        resizeMode={'contain'}
                        onLoad={handleLoad}
                        onProgress={handleProgress}
                        onReadyForDisplay={() => setIsLoading(false)}
                        paused={isPlaying}
                        muted={!isMuted}
                        onBuffer={() => console.log('buffering')}
                        onError={error => console.error(error)}
                        //repeat
                        //volume={volume}
                        poster={thumbnail}
                        posterResizeMode={'cover'}
                    /> :
                    <></>

                }
            </TouchableWithoutFeedback>


            {/* end video player */}
            {hideControl && (
                <>
                    {!isLoading && (
                        <TouchableWithoutFeedback onPress={handlePlayPause}>
                            <View style={styles.playPauseButton}>
                                {isPlaying ? (
                                    <Ionicons
                                        name="pause-circle-outline"
                                        size={50}
                                        color={colorCode.white}
                                    />
                                ) : (
                                    <Ionicons
                                        name="play-circle-outline"
                                        size={50}
                                        color={colorCode.white}
                                    />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </>
            )}

            {/* lodaer */}
            {isLoading && (
                <View style={styles.loading}>
                    <Image
                        source={{ uri: 'https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif' }}
                        style={{ width: 20, height: 20 }}
                    // resizeMode={Image.resizeMode.contain}
                    />
                </View>
            )}
            {/* end loader */}

            {/* <>
                {!isLoading && (
                    <View style={styles.controls}>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            value={currentTime}
                            // onValueChange={handleSliderChange}
                            minimumTrackTintColor={colorCode.white}
                            maximumTrackTintColor="white"
                            thumbTintColor="white"
                        />
                    </View>
                )}
            </> */}

            <>
                {videRender &&
                    <>
                        <Text style={styles.time}>
                            {Math.floor(currentTime / 60)}:
                            {('0' + Math.floor(currentTime % 60)).slice(-2)} /{' '}
                            {Math.floor(duration / 60)}:
                            {('0' + Math.floor(duration % 60)).slice(-2)}
                        </Text>
                        <TouchableWithoutFeedback onPress={handleMutePress}>
                            <View style={styles.volumeButtonOutside}>

                                {isMuted ? (
                                    <Ionicons
                                        name="volume-medium-sharp"
                                        size={26}
                                        color={colorCode.white}
                                    />
                                ) : (
                                    <Ionicons name="volume-mute" size={26} color={colorCode.white} />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                }
                {/* volume */}
                {/* {postConfig.isMuted && (
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={volume}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              value={volume}
              onValueChange={handleVolumeChange}
              vertical
            />
          )} */}
            </>

            {/* end control */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        width: width,
        backgroundColor: '#1b1b1b49',
    },
    controls: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(19, 17, 17, 0.342)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    time: {
        color: colorCode.white,
        position: 'absolute',
        top: 5,
        left: 20,
        fontSize: 10,
        backgroundColor: colorCode.transparentBlackDark,
        padding: 2,
        borderRadius: 5

    },
    playPauseButton: {
        width: 50,
        height: 50,
        position: 'absolute',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
        height: 25,
    },
    cancelBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginRight: 5,
        marginTop: 5,
        zIndex: 9,
    },
    volumeButton: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    volumeButtonOutside: {
        width: 26,
        height: 26,
        right: 20,
        position: 'absolute',
        top: 5,

    },
    volumeSlider: {
        height: 50,
        width: 100,
        transform: [{ rotate: '-90deg' }],
        right: -30,
        position: 'absolute',
        bottom: 40,
    },
});

export default JustVideoPlayer;
