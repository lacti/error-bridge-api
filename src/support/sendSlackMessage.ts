import fetch, { Response } from "node-fetch";

const slackHookUrl = process.env.SLACK_HOOK_URL!;
const slackChannel = process.env.SLACK_CHANNEL;

export default async function sendSlackMessage({
  username,
  icon_url,
  channel,
  blocks,
  text,
}: {
  username?: string;
  icon_url?: string;
  channel?: string;
  blocks?: unknown[];
  text?: string;
}): Promise<Response> {
  console.info("Send via Slack", slackHookUrl, channel ?? slackChannel);
  return await fetch(slackHookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      icon_url,
      channel: channel ?? slackChannel,
      blocks,
      text,
    }),
  });
}
