import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './Styles';
import Video from 'react-native-video';

const PromoItem = ({ item, index, handleImageVisibility, currIndex }) => {
    const [videoLoad, setVideoLoad] = useState(false)
    const videoRef = useRef(null);
    return (
        <VisibilitySensor onChange={handleImageVisibility}>
            <TouchableOpacity
                onPress={() => {
                    handelShowPromo(item.id, index)

                    // alert(index)
                }}
                style={{ paddingHorizontal: 5 }}>
                <ImageBackground
                    source={
                        !videoLoad && { uri: `${AppUrl.MediaBaseUrl + item.thumbnail}` }
                    }
                    style={styles.item}
                    resizeMode={'cover'}>
                    <Video
                        source={{ uri: `${AppUrl.MediaBaseUrl + item.video_url}` }}
                        poster={`${AppUrl.MediaBaseUrl + item.thumbnail}`}
                        posterResizeMode="cover"
                        // onBuffer={onBuffer}
                        // onError={onError}
                        ref={videoRef}
                        resizeMode={'contain'}
                        onLoad={() => setVideoLoad(true)}
                        repeat
                        paused={currIndex !== index || !visibleView}
                        // paused={false}
                        onChangeIndex={changeIndex}
                        // style={styles.backgroundColor}
                        muted={false}
                        style={{ height: '100%' }}
                    />

                    <ImageBackground
                        source={imagePath.ProImageBackground}
                        style={styles.profileImage}>
                        <Image
                            source={{ uri: `${AppUrl.MediaBaseUrl + item.star?.image}` }}
                            style={{ height: 35, width: 35, borderRadius: 50 }}
                        />
                    </ImageBackground>
                </ImageBackground>
            </TouchableOpacity>
        </VisibilitySensor>
    );
};

export default PromoItem;
