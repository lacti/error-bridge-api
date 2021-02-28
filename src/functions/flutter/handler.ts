import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import minifyFlutterStackTrace from "../../support/minifyFlutterStackTrace";
import sendSlackMessage from "../../support/sendSlackMessage";

interface ReportLog {
  error: string;
  stackTrace: string;
  deviceParameters?: { [key: string]: string };
  applicationParameters?: { [key: string]: string };
  customParameters?: { [key: string]: string };
  dateTime: string;
}

const OK = { statusCode: 200, body: "" };

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
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
    const log: ReportLog = JSON.parse(event.body);
    if (!log.error) {
      console.info("No 'error' in body", event.body);
      return OK;
    }
    console.info({ log, packageName });
    const minifiedTrace = minifyFlutterStackTrace(
      log.stackTrace ?? "",
      packageName
    );
    await sendSlackMessage({
      username: packageName,
      icon_url: ":broken_heart:",
      text: [
        "Message:",
        "```",
        log.error || "<Empty error>",
        "```",
        "Stacktrace:",
        "```",
        minifiedTrace || "<Empty Stacktrace>",
        "```",
        `Date: ${log.dateTime ?? new Date().toISOString()}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error(`Invalid payload`, event.body, error);
  }
  return OK;
};
