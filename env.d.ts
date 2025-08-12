declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL_TO: string;
      GMAIL_USER: string;
      GMAIL_PASS: string;
    }
  }
}

export {};
