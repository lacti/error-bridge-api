# Error bridge API

Simple API to send error message via Slack.

## Development

```bash
yarn         # Install dependencies
yarn deploy  # Deploy this stack.
```

### Environment variables

| Name           | Value                               |
| -------------- | ----------------------------------- |
| SLACK_HOOK_URL | Slack Hook URL (required)           |
| SLACK_CHANNEL  | Default Slack channel ID (optional) |

## API

### Flutter

```
curl -XPOST "https://API-URL/STAGE/flutter?packageName=PACKAGE_NAME" -H "application/json" -d @payload.json
```

For example, a format of `payload.json` is like this.

```json
{
  "error": "...",
  "dateTime": "...",
  "stackTrace": "..."
}
```

## License

MIT
