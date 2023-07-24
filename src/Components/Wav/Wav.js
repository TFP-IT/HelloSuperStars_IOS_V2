import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

// const SIZE = 100;



const Wav = ({ index, size = null }) => {

    // const { index } = props;

    let btnHeight = size != null ? size : 50
    let btnwidth = size != null ? size : 100

    const opacityValue = useSharedValue(0.7);
    const scaleValue = useSharedValue(1);

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleValue.value,
                },
            ],
            opacity: opacityValue.value,
        };
    });

    useEffect(() => {
        opacityValue.value = withDelay(
            index * 400,
            withRepeat(
                withTiming(0, {
                    duration: 2000,
                }),
                -1,
                false,
            ),
        );
        scaleValue.value = withDelay(
            index * 400,
            withRepeat(
                withTiming(6, {
                    duration: 2000,
                }),
                -1,
                false,
            ),
        );


    }, [opacityValue, scaleValue, index]);



    return (<Animated.View style={[styles.dot, rStyle, { height: btnHeight, width: btnwidth }]} />);
};


const styles = StyleSheet.create({
    dot: {
        // height: btnHeight,
        // width: btnwidth,
        borderRadius: 50 / 2,
        backgroundColor: '#FFAA00',
        position: 'absolute',
    },
});

export default Wav;