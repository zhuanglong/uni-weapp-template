export function getAppInfo() {
  const env = import.meta.env;
  return {
    appName: env.VITE_APP_NAME || '',
    appEnv: env.VITE_APP_ENV || '',
    apiPrefix: env.VITE_API_PREFIX || '',
  };
}

export function isDevMode() {
  // node 的编译环境
  return import.meta.env.DEV;
}

export function isProdMode() {
  // node 的编译环境
  return import.meta.env.PROD;
}

// 是否使用 mock 代替 api 返回
export function useMock() {
  return import.meta.env.VITE_USEMOCK === 'true';
}
