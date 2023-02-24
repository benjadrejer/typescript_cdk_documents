# Welcome to your CDK TypeScript project

This is a CDK app that spins up the following infrastructure:
An S3 bucket, and uploads all the content of 'documents' into it.
A Lambda to provide signed urls to access the documents, as the bucket is not public.
An APIGateway providing an endpoint to hit the lambda.
A VPC containing a fargate deployment with a basic webserver, serving the documents from the bucket fetched through the lambda.
Also a loadbalancer in front of the fargate cluster, permissions set on the lambda, and more.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Be sure to have aws-cdk installed, as well as aws cli configured to a specific AWS account.

## Useful commands

- `npm install` install dependencies
- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
