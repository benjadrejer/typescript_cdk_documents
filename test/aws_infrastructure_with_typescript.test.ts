import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AwsInfrastructureWithTypescript from '../lib/aws_infrastructure_with_typescript-stack';

test('', () => {
  const app = new cdk.App();

  const stack = new AwsInfrastructureWithTypescript.AwsInfrastructureWithTypescriptStack(app, 'MyTestStack');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketEncryption: {
      "ServerSideEncryptionConfiguration": [
       {
        "ServerSideEncryptionByDefault": {
         "SSEAlgorithm": "AES256"
        }
       }
      ]
     },
  });
});
