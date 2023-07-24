import { S3 } from 'aws-sdk';
import { FileNameToDateStringWithExtensions } from '../Components/FileNameToDateStringWithExtensions';

export const useFileUploadS3 = async (
  fileUri,
  fileName,
  bucketName,
  contentType,
  progressCallback,
  prefix = '',
) => {
  //aws s3 configuration
  const s3 = new S3({
    accessKeyId: 'AKIAXO5VROGDSZOY5JUX',
    secretAccessKey: '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',
    region: 'ap-southeast-1',
  });

  const newFilename = FileNameToDateStringWithExtensions(fileName);
  //fetch the url
  const response = await fetch(fileUri);
  const blob = await response.blob();
  const fileKey = `${newFilename}`;

  //upload params
  const uploadParams = {
    Bucket: bucketName,
    Key: `profile/user/${prefix}/${fileKey}`,
    Body: blob,
    ContentType: contentType,
    ACL: 'public-read',
  };
  //console.log('prefix', prefix);
  //upload files
  try {
    // Check if previous file exists and delete it
    const listParams = {
      Bucket: bucketName,
      Prefix: `profile/user/${prefix}/`,
    };
    const fileList = await s3.listObjects(listParams).promise();
    const deleteKeys = fileList.Contents.filter(
      file =>
        file.Key.includes(`${contentType}/`) &&
        file.Key !== `${contentType}/${fileKey}`,
    ).map(file => ({ Key: file.Key }));
    if (deleteKeys.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: deleteKeys,
          Quiet: false,
        },
      };
      //console.log('fileList =>', fileList);
      //   delete previous file
      const deleteResponse = await s3.deleteObjects(deleteParams).promise();
      console.log('Previous file(s) deleted successfully', deleteResponse);
    }

    // Upload the new file with progress
    const uploadResponse = await s3
      .upload(uploadParams)
      .on('httpUploadProgress', progress => {
        const uploadedBytes = progress.loaded;
        const totalBytes = progress.total;
        const percentCompleted = Math.round((uploadedBytes / totalBytes) * 100);
        console.log(`Uploaded ${percentCompleted}%`);
        const progressData = uploadedBytes / totalBytes;
        progressCallback(progressData);
      })
      .promise();
    console.log('File uploaded successfully', uploadResponse);

    //clear the cache
    // RNFetchBlob.fs.unlink(filePath?.path);
    // Return the URL of the new file
    return { uploadResponse };
  } catch (error) {
    console.error('Error updating file', error);
  }
};
