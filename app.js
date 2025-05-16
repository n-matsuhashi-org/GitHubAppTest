import { app } from '#lib/app/index.js';
import {createNodeMiddleware} from '@octokit/webhooks';
import http from 'http';

// webhookイベントで発火するアクションの定義
import '#actions/devProjectItems/index.js'


const port = 3000;
const path = "/api/webhook";

const middleware = createNodeMiddleware(app.webhooks, {path});

// サーバの起動
http.createServer(middleware).listen(port, () => {
  console.log(`Server is listening for events at: ${port}`);
});

