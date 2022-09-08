// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as AwsCdkWorkshop from '../lib/aws-cdk-workshop-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/aws-cdk-workshop-stack.ts
import {App} from 'aws-cdk-lib';
import {AwsCdkWorkshopStack} from '../lib/aws-cdk-workshop-stack';
import {Template} from 'aws-cdk-lib/assertions';

describe('Stack', () => {
  it('contains a lambda', () => {
    const app = new App();
      // WHEN
    const stack = new AwsCdkWorkshopStack(app, 'MyTestStack');
      // THEN
    const template = Template.fromStack(stack);

    template.hasResource('AWS::Lambda::Function', {});
  });
});
