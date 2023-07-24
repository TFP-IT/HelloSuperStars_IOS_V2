import { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';
import Toast from 'react-native-root-toast';


export const useMediaUploadS3 = (folderName) => {

    const [isLoading, setIsLoading] = useState(false);
    const [buffer, setBuffer] = useState(0)
    const [isDone, setIsDone] = useState(false);
    const bucketName = "tfp-hellosuperstars-videos"

    const s3 = new S3({
        accessKeyId: 'AKIAXO5VROGD723N6YM6',
        secretAccessKey: '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',
        region: 'ap-southeast-1',
    });

    const deleteFile = (key) => {
        console.log('file going to delete____', key)
        // try {
        s3.deleteObject({
            Bucket: bucketName,
            Key: key,
        }, (err, data) => {
            if (err) {

                console.log('delete file', err)
                return
            }

            console.log('File delete successfully', data)
        });

    }



    const uploadFile = async (filePath, mediaType = null, key = null) => {
        setIsDone(false)
        const url = filePath;
        const type = mediaType;


        const extension = 'mp4';
        const videoName = new Date().getTime() + "." + extension;

        const response = await fetch(url);
        const blob = await response.blob();
        const fileKey = `${folderName + "/" + videoName}`;


        const fileUploadStatus = new Promise((resolve, reject) => {
            try {
                const uploadMnage = s3.upload({
                    Bucket: bucketName,
                    Key: fileKey,
                    Body: blob,
                    ContentType: type,
                }, (err, data) => {
                    if (err) {
                        reject(err)
                        console.log('error uplaod', err)
                        return
                    }

                    key !== null && deleteFile(key)
                    Toast.show("video uploaded successfully", Toast.durations.SHORT);
                    console.log('File uploaded successfully')
                    resolve(data)
                    setIsDone(true)
                });


                uploadMnage.on('httpUploadProgress', (progress) => {

                    const progressPercentage = parseInt(
                        (progress.loaded * 100) / progress.total
                    );
                    setBuffer((progressPercentage / 100).toFixed(1))
                    setIsLoading(progressPercentage)
                });

            } catch (error) {
                console.log('Error uploading file:', error);
                reject(error)
                setIsDone(true)
            }

        })
        return fileUploadStatus

    };


    return { isLoading, uploadFile, isDone, buffer };
}
