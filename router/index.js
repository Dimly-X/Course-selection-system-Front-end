//路由逻辑写在这里！按什么跳转什么之类的，页面登记的感觉

import Vue from 'vue';
import VueRouter from 'vue-router';
//import Home from '../views/Home.vue'

//全局引入
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'), //其他界面继承Main的侧边栏布局
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () =>
            //         import ('../views/Home')
            // },
            // {
            //     path: '/application',
            //     name: 'application',
            //     component: () =>
            //         import ('../views/Application')
            // },
            // {
            //     path: '/release',
            //     name: 'release',
            //     component: () =>
            //         import ('../views/Release')
            // },
            // {
            //     path: '/manage',
            //     name: 'manage',
            //     component: () =>
            //         import ('../views/Manage')
            // },
            // {
            //     path: '/examine',
            //     name: 'examine',
            //     component: () =>
            //         import ('../views/Examine')
            // },
            // {
            //     path: '/score',
            //     name: 'score',
            //     component: () =>
            //         import ('../views/Score')
            // },
            // {
            //     path: '/select',
            //     name: 'select',
            //     component: () =>
            //         import ('../views/Select')
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login/login.vue')
    }
]


//相关配置
const router = new VueRouter({
    mode: 'history',
    routes
})

//向外暴露
export default router