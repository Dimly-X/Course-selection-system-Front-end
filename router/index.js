//路由逻辑写在这里！按什么跳转什么之类的，页面登记的感觉

import Vue from 'vue';
import VueRouter from 'vue-router';
//import Any_Home from '../views/Any_Home.vue'

//全局引入
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Anyone/Main.vue'), //其他界面继承Main的侧边栏布局
        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () =>
            //         import ('../views/Any_Home')
            // },
            // {
            //     path: '/application',
            //     name: 'application',
            //     component: () =>
            //         import ('../views/Teacher_Application')
            // },
            // {
            //     path: '/release',
            //     name: 'release',
            //     component: () =>
            //         import ('../views/Teacher_Release')
            // },
            // {
            //     path: '/manage',
            //     name: 'manage',
            //     component: () =>
            //         import ('../views/Admin_Manage')
            // },
            // {
            //     path: '/examine',
            //     name: 'examine',
            //     component: () =>
            //         import ('../views/Admin_Examine')
            // },
            // {
            //     path: '/score',
            //     name: 'score',
            //     component: () =>
            //         import ('../views/Student_Score')
            // },
            // {
            //     path: '/select',
            //     name: 'select',
            //     component: () =>
            //         import ('../views/Student_Select')
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Public/login.vue')
    },
    {
        path: '/Anyone',
        name: 'curriculumDetail',
        component: () =>
            import ('../views/Anyone/curriculumDetail.vue')
    }
]

//相关配置
const router = new VueRouter({
    mode: 'history',
    routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//向外暴露
export default router