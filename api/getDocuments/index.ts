import { _Object, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { s3Client } from './client';

const bucketName = process.env.DOCUMENTS_BUCKET_NAME;

export const getDocuments = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
  console.log(`Bucket Name: ${bucketName}`)
  try {
    const { Contents: results } = await s3Client.listObjects({ Bucket: bucketName! });
    const documents = await Promise.all(results!.map(async r => generateSignedURL(r)));
    return {
      statusCode: 200,
      body: JSON.stringify(documents),
    }
  } catch(err: any) {
    return {
      statusCode: 500,
      body: err.message,
    }
  }
}

const generateSignedURL = async (object: _Object): Promise<{ filename: string, url: string}> => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: object.Key!
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });

  return {
    filename: object.Key!,
    url: url,
  }
}