import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vProtectImage } from './directives/protectImage'
import './assets/index.css'

const app = createApp(App)

// 全局注册图片防护指令
app.directive('protect-image', vProtectImage)

app.use(router)

app.mount('#app')