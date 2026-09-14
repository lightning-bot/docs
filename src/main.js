import {createApp} from 'vue'
import {createRouter,createWebHistory} from 'vue-router'
import App from './App.vue'
import './style.css'
const router=createRouter({history:createWebHistory(),routes:[{path:'/:pathMatch(.*)*',component:{template:'<div />'}}],scrollBehavior(to,from,saved){return saved || (to.hash?{el:to.hash,top:100}:{top:0})}})
createApp(App).use(router).mount('#app')
