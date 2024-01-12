/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  // .env.xx 全局环境变量
  VITE_APP_ENV: 'dev' | 'prod' | 'staging' | 'analyze';
  VITE_APP_NAME: string;
  VITE_API_PREFIX: string;
  VITE_USEMOCK: 'true' | 'false';
}
