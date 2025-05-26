---
url: /plugins/blog/comment/waline/index.md
---
# Waline

A safe comment system with backend.

## Install

```bash
npm i -D @waline/client
```

## LeanCloud Settings (Database)

1. [sign in](https://console.leancloud.app/login) or [sign up](https://console.leancloud.app/register) LeanCloud and enter [Console](https://console.leancloud.app/apps).

2. Click [Create app](https://console.leancloud.app/apps) button to create a new app and enter a name you like:

   ![Create App](./assets/leancloud-app-1.jpg)

3. Enter the app, then select `Settings` > `App Keys` at the left bottom corner. You will see `APP ID`, `APP Key` and `Master Key` of your app. We will use them later

   ![ID and Key](./assets/leancloud-app-2.jpg)

## Deploy to Vercel (Server)

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Click the dark button above, it will redirect you to vercel to deploy with waline template.

   ::: tip

   If you haven't logged in, we recommend you to sign in with GitHub.

   :::

2. Input your Vercel project name then click `Create`.

   ![skip team](/images/comment/vercel-2.png)

3. Repo which named you input before will be created and initialized automatically base on waline example template by Vercel.

   ![deploy](/images/comment/vercel-3.png)

   After one minute or two, vercel should finish the deployment. Click `Go to Dashboard` button to redirect to your application dashboard.

   ![deploy](/images/comment/vercel-4.png)

4. Click `Settings` menu on the top, and `Environment Variables` button on the side to go to environment variables setting page. Then set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY`. The variables' value should be the ones you got in the previous step. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

   ![set environment variables](/images/comment/vercel-5.png)

5. To let your environment variables setting active, you need redeploy your application. Click `Deployments` menu on the top and find the latest deployment at the top of list, click `Redeploy` button in the right dropdown menu.

   ![redeploy](/images/comment/vercel-6.png)

6. If everything is ok, vercel will redirect to `Overview` page to start redeployment. Wait a moment the `STATUS` will change to `Ready`. Now you can click `Visit` to visit the site. This link is your server address.

   ![redeploy success](/images/comment/vercel-7.png)

## Assign Domain (Optional)

1. Click `Settings` - `Domains` to go to domain setting page.

2. Input domain you want to assign and click `Add` button.

   ![Add domain](/images/comment/vercel-8.png)

3. Add a new `CNAME` record in your domain service server.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

4. You can use your own domain to visit waline comment system after go into effect. :tada:

   * serverURL：example.your-domain.com
   * admin panel：example.your-domain.com/ui

   ![success](/images/comment/vercel-9.png)

## Client

### Using plugin

Set `provider: "Waline"` in the plugin options, and set `serverURL` as the link obtained in the previous step.

Then, place the `<CommentService>` component at a suitable location in your site (usually at the bottom of the page), you will be able to see the comment box.

::: tip

You can also pass in other options supported by Waline (except `el`). For details, see [Waline Config](config.md)

:::

## Comment Management (Management)

1. After the deployment is complete, please visit `<serverURL>/ui/register` to register. The first person to register will be set as an administrator.
2. After you log in as administrator, you can see the comment management interface. You can edit, mark or delete comments here.
3. Users can also register their account through comment box, and they will be redirected to their profile page after logging in.
