import React from 'react'
// import imagePath from './../../Constants/imagePath';

import {
    View,
    ImageBackground,
    Text,
} from 'react-native';
import imagePath from '../../../Constants/imagePath';


function NotAvailable({description}) {
    return (
        <View >
            <View
                style={{
                    borderColor: '#FFAD00',
                    borderWidth: 1,
                    padding: 1,
                    borderRadius: 3,
                }}>
                <ImageBackground
                    style={{ flexDirection: 'column', justifyContent:'center' ,textAlign:'center', height: 350, backgroundColor: 'coral', borderWidth: 1, borderColor: '#000', borderRadius: 20, }}
                    source={imagePath.background}
                    resizeMode="cover">
                    <View style={{ marginTop: 30 }}>
                        {/* <Image source={imagePath.sorry} style={{  justifyContent:'center', width: 300, height: 150 }} /> */}
                        <Text
                            style={{ color: '#FFAD00', textAlign: 'center', fontSize: 30 }}>
                            Sorry !
                        </Text>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                            {description}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}

export default NotAvailable