
import React, { useRef, useState } from 'react';
import {
    Image,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
} from 'react-native';
import AppUrl from '../../../RestApi/AppUrl';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import styles from './Styles';
import Video from 'react-native-video';
import colorCode from '../../../Constants/colorCode';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const PromoItemV1 = ({ item, index, isMuted, setIsMuted, currentIndex, setCurrentIndex, totalVideoLength, scrollToIndex }) => {

    const [visibleView, setVisibleView] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef(null);
    const Navigation = useNavigation()
    const [isPlaying, setIsPlaying] = useState(false);
    useFocusEffect(
        React.useCallback(() => {

            if (index === currentIndex) {
                setVisibleView(true)
                setIsLoading(true)
                setIsPlaying(true)
            } else {
                setVisibleView(false)
                setIsPlaying(false)
                setIsLoading(false)
            }

        }, [currentIndex])
    );



    function handleImageVisibility(visible) {
        setVisibleView(visible);
    }
    //handle load
    const handleLoad = () => {
        setIsLoading(false);
    };
    //handle mute
    const handleMutePress = () => {
        if (isMuted) {
            setIsMuted(false);
            //setVolume(0);
        } else {
            setIsMuted(true);
            //setVolume(1);
        }
    };


    const videoEndIndex = () => {


        if (currentIndex !== totalVideoLength - 1) {

            setCurrentIndex((prev) => prev + 1)
            scrollToIndex(currentIndex + 1)
        } else {
            scrollToIndex(0)
        }





    }


    return (
        <VisibilitySensor onChange={handleImageVisibility}>
            <TouchableOpacity
                // onPress={() => {
                //   handelShowPromo(item.id, index);
                // }}
                onPress={() => Navigation.navigate('StoryPromov1', { data: item })}
                style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: colorCode.transparentGold,
                    borderRadius: 10,
                    marginHorizontal: 2,
                }}>
                <View

                    style={styles.item}>

                    <ImageBackground source={{ uri: AppUrl.imageCdn + item?.thumbnail }} style={[{ justifyContent: 'center', alignItems: 'center' }, styles.item]}>
                        {visibleView &&
                            <Video
                                source={{ uri: AppUrl.videoCdn + item?.video_url }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                useTextureView={true}
                                preload={true}
                                bufferConfig={{
                                    minBufferMs: 5000,
                                    maxBufferMs: 10000,
                                    bufferForPlaybackMs: 2500,
                                    bufferForPlaybackAfterRebufferMs: 5000,
                                }}
                                onEnd={videoEndIndex}
                                playInBackground={false}
                                maxBitRate={1000000}
                                resizeMode={'contain'}
                                onLoad={handleLoad}
                                onReadyForDisplay={() => setIsLoading(false)}
                                paused={!isPlaying}
                                onBuffer={() => console.log('buffering')}
                                onError={error => console.error(error)}
                                ref={videoRef}
                                posterResizeMode={'cover'}
                                // repeat
                                muted={!isMuted}
                            />
                        }
                    </ImageBackground>



                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: colorCode.transparentGold,
                            position: 'absolute',
                            top: 5,
                            right: 5,
                        }}>
                        <Image
                            source={{ uri: AppUrl.imageCdn + item?.star?.image }}
                            style={{ width: '100%', height: '100%', borderRadius: 50 }}
                        />
                    </View>
                    {/* loading */}
                    {isLoading && (
                        <View style={styles.loading}>
                            <Image
                                source={{
                                    uri: 'https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif',
                                }}
                                style={{ width: 20, height: 20 }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )}
                </View>
                {/* mute press */}
                {!isLoading && (
                    <TouchableWithoutFeedback onPress={handleMutePress}>
                        <View style={styles.volumeButtonOutside}>
                            <Ionicons
                                name={isMuted ? 'volume-medium-sharp' : 'volume-mute'}
                                size={24}
                                color={colorCode.whiteText}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}

            </TouchableOpacity>
        </VisibilitySensor>
    )
}

export default PromoItemV1