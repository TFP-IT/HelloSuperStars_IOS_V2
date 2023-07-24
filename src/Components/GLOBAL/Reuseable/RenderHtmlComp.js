import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

function RenderHtmlComp({description}) {
    const { width } = useWindowDimensions();
    //post content
    const contentSource = {
        html: `<div style='color:#e6e6e6;'>${description ? description : ''
            }</div>`,
    };
    return (
        <View style={{ width: '100%' }}>
            <RenderHtml contentWidth={width} source={contentSource} />
        </View>
    )
}

export default RenderHtmlComp