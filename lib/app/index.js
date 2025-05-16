import { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET } from '#config/index.js'
import { App } from 'octokit';

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  webhooks: {
    secret: WEBHOOK_SECRET,
  },
});

app.webhooks.onError((error) => {
  if ('name' in error && error.name === "AggregateError") {
    console.error(`Error: ${error.event}`);
  } else {
    console.error(error);
  }
});

export { app };
