import AWS from "aws-sdk";

// AWS Login
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

let S3 = new AWS.S3();

// upload file functoin
export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}_${Date.now()}_${filename}`;
  // AWS Upload nned bucket, fileName, and just send
  const upload = await new AWS.S3()
    .upload({
      Bucket: "plat-uploads",
      // fileName
      Key: objectName,
      // obects privacy
      ACL: "public-read",
      // Body는 여러가지일 수 있음. 여기선 stream
      Body: readStream,
    })
    .promise();
  //console.log(upload);
  return decodeURI(upload.Location);
};

export const deleteInS3 = async file => {
  const Key = file.replace(
    "https://plat-uploads.s3.ap-northeast-2.amazonaws.com/",
    ""
  );
  //console.log(Key);
  await S3.deleteObject({
    Bucket: "plat-uploads",
    Key,
  }).promise();
};
