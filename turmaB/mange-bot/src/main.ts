import '@/assets/style/global.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18nApplication } from './i18n/i18n';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18nApplication)

app.mount('#app')
