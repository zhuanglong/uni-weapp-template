import { createSSRApp } from 'vue';
import SvgIcon from '~virtual/svg-component';

import App from './App.vue';
import { setupStore } from './stores';

// unocss
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.component(SvgIcon.name, SvgIcon);
  setupStore(app);
  return {
    app,
  };
}
