import { createSSRApp } from 'vue';
// @ts-ignore
import uView from 'vk-uview-ui';
import App from './App.vue';
import { setupStore } from './stores';

// unocss
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  setupStore(app);
  app.use(uView);
  return {
    app,
  };
}
