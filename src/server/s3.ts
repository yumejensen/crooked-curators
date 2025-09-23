import aws from 'aws-sdk';
import dotenv from 'dotenv'

import crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const {
  region,
  bucketName,
  accessKeyId,
  secretAccessKey
} = process.env;

export const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {

  // UNIQUE NAME THAT WILL NOT OVERWRITE ANYTHING IN BUCKET
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}
