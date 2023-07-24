import { Animated } from 'react-native';
import React from 'react';
export const useAnimationEffect = () => {
    const opacityAnim = React.useRef(new Animated.Value(1)).current;
    const YAnimHide = React.useRef(new Animated.Value(0)).current;

    const YAnimShow = React.useRef(new Animated.Value(-100)).current;

    const hideComponent = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(YAnimHide, {
                toValue: -100,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

    };

    const showComponent = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(YAnimShow, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

    };

    return { opacityAnim, YAnimHide, YAnimShow, showComponent, hideComponent }
}