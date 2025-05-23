---
url: /ecosystem/plugins/blog/comment/twikoo/index.md
---
# Twikoo

A concise, safe and free static site commenting system, based on [Tencent Cloud Development](https://curl.qcloud.com/KnnJtUom).

## Install

```bash
npm i -D twikoo
```

## Getting started

1. Apply for [MongoDB](https://www.mongodb.com/cloud/atlas/register) account

2. Create a free MongoDB database, the recommended region is `AWS / N. Virginia (us-east-1)`

3. Click CONNECT on the Clusters page, follow the steps to allow connections from all IP addresses ([Why?](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)), create Database user, and record the database connection string, please change the `<password>` in the connection string to the database password

4. Sign up for a [Vercel](https://vercel.com/signup) account

5. Click the button below to deploy Twikoo to Vercel in one click

   [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/dev/src/vercel-min)

6. Go to Settings - Environment Variables, add the environment variable `MONGODB_URI`, the value is the database connection string in step 3

7. Go to Overview, click the link under Domains, if the environment configuration is correct, you can see the prompt "Twikoo cloud function is running normally"

8. Vercel Domains (with `https://` prefix, e.g. `https://xxx.vercel.app`) is your environment ID

## Configuration

Please set `provider: "Twikoo"` and set `envId` in the plugin options.

For other configuration items, see [Twikoo Config](./config.md).
