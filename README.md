# punitshah-dev-v2

## Local development

Requires [Node.js](https://nodejs.org/en/download) 24 or higher, and a Vercel account.

- Install dependencies

  ```
  npm install
  ```

- Link with a Vercel project

  ```
  npx vercel
  ```

- Start development environment

  ```
  npm start
  ```

### Environment setup

The contact API requires the following environment variables to be set:

```sh
## .env.local

# Recipient email address for contact form messages
EMAIL_TO=recipient@example.com

# Gmail account username
GMAIL_USER=gmail-username@gmail.com

# Gmail app password
GMAIL_PASS=gmail-app-password
```
