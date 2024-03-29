// Create service client module using ES6 syntax.
import { S3 } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "eu-west-2";
// Create an Amazon S3 service client object.
const s3Client = new S3({ region: REGION });
export { s3Client };