import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import sendSlackMessage from "../../support/sendSlackMessage";

const OK = { statusCode: 200, body: "" };

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const { body } = event;
  if (!body) {
    console.info("No body");
    return OK;
  }
  const { packageName } = event.queryStringParameters ?? {};
  if (!packageName) {
    console.info("No package name");
    return OK;
  }
  console.info({ packageName });
  try {
    console.info({ body, packageName });
    await sendSlackMessage({
      username: packageName,
      icon_url: ":deciduous_tree:",
      channel: "C01VC14T3L7",
      text: body,
    });
  } catch (error) {
    console.error(`Invalid payload`, event.body, error);
  }
  return OK;
};
