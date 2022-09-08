import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { CfnOutput } from "aws-cdk-lib";

export class AwsCdkWorkshopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const fn = new NodejsFunction(this, "workshop");
    const fnUrl = fn.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    new CfnOutput(this, "lambdaUrl", { value: fnUrl.url });
  }
}
