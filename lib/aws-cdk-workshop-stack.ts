import * as cdk from "aws-cdk-lib";
import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

export class AwsCdkWorkshopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const bucket = new Bucket(this, 'Bucket', {
      removalPolicy: RemovalPolicy.DESTROY
    })

    const fn = new NodejsFunction(this, "workshop", {
      environment: {
        BUCKET_NAME: bucket.bucketName
      }
    });
    bucket.grantRead(fn);

    new BucketDeployment(this, 'AddNotes', {
      sources: [
        Source.data('MyNote', "hello"),
        Source.data('MyOtherNote', "hello"),
      ],
      destinationBucket: bucket
    })

    const fnUrl = fn.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    new CfnOutput(this, "lambdaUrl", { value: fnUrl.url });
  }
}
