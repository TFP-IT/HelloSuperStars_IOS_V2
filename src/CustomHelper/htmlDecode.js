
import React from 'react';
import he from 'he';
export const htmlDecode = (htmlData) => {
    const descriptionText = he.decode(htmlDecode).replace(/<[^>]+>/g, '');
    return descriptionText
}