import path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import * as S3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Networking } from './networking';
import { DocumentManagementAPI } from './api';
import { DocumentManagementWebServer } from './webserver'
import { Tags } from 'aws-cdk-lib';

export class AwsInfrastructureWithTypescriptStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'DocumentsBucket', {
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new S3Deploy.BucketDeployment(this, 'DocumentsDeployment', {
      sources: [
        S3Deploy.Source.asset(path.join(__dirname, '..', 'documents')),
      ],
      destinationBucket: bucket,
      memoryLimit: 512,
    })

    new cdk.CfnOutput(this, 'DocumentsBucketNameExport', {
      value: bucket.bucketName,
      exportName: 'DocumentsBucketName',
    });

    const networkingStack = new Networking(this, 'Networkingonstruct', {
      maxAzs: 2,
    });

    Tags.of(networkingStack).add('Module', 'Networking');

    const api = new DocumentManagementAPI(this, 'DocumentManagementAPI', {
      documentBucket: bucket
    });

    Tags.of(api).add('Module', 'API');

    const webserver = new DocumentManagementWebServer(this, 'DocumentManagementWebserver', {
      vpc: networkingStack.vpc,
      api: api.httpApi,
    });

    Tags.of(webserver).add('Module', 'Webserver');
  }
}
