import { app } from '#lib/app/index.js';
import { DEV_PROJECT_ID } from '#config/index.js';

! function () {
  async function linkItemToDevProject({octokit, payload}) {
    console.log('PR or Issueの作成を検知。開発プロジェクトに紐付け開始。')

    // webhookのpayloadから作成されたアイテム(issue or PR)のnode_idを取得
    const content = payload.pull_request || payload.issue;
    if (content === undefined) return;
    const { node_id } = content;

    try {
      // アイテムを修正リストプロジェクトに紐付ける
      await octokit.graphql(`
        mutation {
          addProjectV2ItemById (input: {projectId: "${DEV_PROJECT_ID}", contentId: "${node_id}"}) {
            item {
              id
            }
          }
        }
      `, {});
    } catch (error) {
      console.error(error);
    }
  }

  // webhookにイベントを付与
  app.webhooks.on('pull_request.opened',  linkItemToDevProject);
  app.webhooks.on('issues.opened',  linkItemToDevProject);

}();
