import React from 'react'
// import imagePath from './../../Constants/imagePath';

import {
    Image,
    View,
} from 'react-native';
import imagePath from '../../../Constants/imagePath';

function UnderlineImage() {
    return (
        <View style={{ alignItems: 'center' }} >
            <Image source={imagePath.lineMeetup} />
        </View>
    )
}

export default UnderlineImage