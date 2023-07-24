import { Platform, Alert } from 'react-native'
import { useState, useContext } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../permission';
import RNFS from 'react-native-fs';




export const useMediaPicker = () => {
    const [imgSrc, setImgSrc] = useState()
    const [pickFile, setPickFile] = useState(false)

    const [responceData, setResponceData] = useState()
    const [errorMesg, setErrorMesg] = useState(null)
    const [imageUpload, setimageUpload] = useState({
        uri: "",
        type: "",
        base64: "",
        oldImage: "",
    })

    /**
     * source selection 
     */
    const onSelectImage = async () => {
        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert(
                'Profile Picture',
                'Choose an option',
                [
                    { text: 'Camera', onPress: onCamera },
                    { text: 'Gallery', onPress: onGallery },
                    { text: 'Cancel', onPress: () => { } }
                ]
            )
        }
    }

    /**
     * open camera
     */
    const onCamera = () => {
        ImagePicker.openCamera({
            width: 4000,
            height: 2300,
            cropping: true,
        }).then(image => {
            // console.log(image)
            setImgSrc(image.path)
            setPickFile(true)
            // setimageUpload({
            //     ...imageUpload,
            //     uri: image.path,
            //     type: image.mime
            // })

            RNFS.readFile(image.path, 'base64')
                .then(res => {
                    setimageUpload({
                        ...imageUpload,
                        base64: res,
                        uri: image.path,
                        type: image.mime
                    })
                });
        });
    }

    /**
     * open gallery
     */
    const onGallery = () => {
        ImagePicker.openPicker({
            width: 4000,
            height: 2300,
            cropping: true
        }).then(image => {
            // console.log("selected Image", image.path)
            setImgSrc(image.path)
            setPickFile(true)
            // setimageUpload({
            //     ...imageUpload,
            //     uri: image.path,
            //     type: image.mime
            // })

            RNFS.readFile(image.path, 'base64')
                .then(res => {
                    setimageUpload({
                        ...imageUpload,
                        base64: res,
                        uri: image.path,
                        type: image.mime
                    })
                });

        });
    }




    return { onSelectImage, imgSrc, imageUpload, setImgSrc }
}