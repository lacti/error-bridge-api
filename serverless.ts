import * as functions from "./src/functions";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "error-bridge-api",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      SLACK_HOOK_URL: process.env.SLACK_HOOK_URL,
      SLACK_CHANNEL: process.env.SLACK_CHANNEL,
    },
    lambdaHashingVersion: "20201221",
  },
  functions,
};

module.exports = serverlessConfiguration;
