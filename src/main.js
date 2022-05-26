//整个项目的入口文件
import Vue from 'vue'
import App from './App.vue'
import { Button, Radio, Container, Main, Aside, Header, Menu, Submenu, MenuItem, MenuItemGroup, Icon, Dropdown, DropdownItem, DropdownMenu, Row, Col, Card, Table, TableColumn, Input, Link, Select, Option, Form, FormItem, Switch, DatePicker, Dialog, Pagination, MessageBox, Message, Descriptions, DescriptionsItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'

import router from '../router'
import store from '../src/store'
import http from 'axios'
import '../api/mock.js'


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Link)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)


//因为axios不是插件，所以想使用的话需要把它绑定在vue的prototype这个属性上
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.user.token
    if (!token && to.name != 'login') {
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        next({ name: 'home' })
    } else {
        next()
    }
})


new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        //动态路由设置，这样每次刷新都会去调用
        this.$store.commit('addMenu', router)
    }
}).$mount('#app')