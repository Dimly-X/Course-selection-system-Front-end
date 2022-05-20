<template>
<body class="background">
    <!-- <img src="../../src/assets/images/70.jpg" height="60%" width="20%" > -->
    <el-form 
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="login-container"
    >
        <img src="../../src/assets/images/university_logo.png" height="30px" width="200px" >
        <!-- <h3 class="login_title">系统登录</h3> -->
      <el-form-item 
            label="用户名"
            label-width="80px"
            prop="user_name"
            class="user_name"
        >
        <!-- v-model是把它和form.user_name做双向绑定 -->
            <el-input 
                type="input"
                v-model="form.user_name" 
                auto-complete="off"
                placeholder="请输入账号"
            ></el-input>
        </el-form-item>
        <el-form-item 
            label="密码"
            label-width="80px"
            prop="password"
            class="password"
        >
            <el-input 
                type="password"
                v-model="form.password" 
                auto-complete="off"
                placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
   </body>
</template>

<script>

import Mock from 'mockjs'
import {getMenu} from '../../api/data'

export default{
    name:'Login',
    data(){
        return{
            form: {

            },
            rules: {
                //校验规则
                user_name: [
                    {required: true, message:'请输入用户名', trigger: 'blur'},
                    {
                        min: 3,
                        message:'用户名长度不能小于3位',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {required: true, message:'请输入密码', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        login(){
            //then就是说，调用接口之后会得到回应,res是接口的返回
            //{ data:res }这里是es6的语法，是把data先从res里面解构出来，让它（之前的res.data）作为res
            getMenu(this.form).then(({ data:res }) => {
                if(res.code === 20000){
                    this.$store.commit('clearMenu')
                    this.$store.commit('setMenu',res.data.menu)
                    this.$store.commit('setToken',res.data.token)
                    this.$store.commit('addMenu',this.$router)
                    this.$router.push({name: 'home'})
                }else{
                    this.$message.warning(res.data.message)
                }
            })
            // const token = Mock.random.guid()
            // this.$store.commit('setToken',token)
            // this.$router.push({name: 'home'})
        }
    },
}
</script>

<style lang="less" scoped>

.background{
    //height: 100%;
    display: flex;
    /* 加载背景图 */
    background-image: url(../../src/assets/images/bg.jpg);
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #464646;
}
.login-container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    //height: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title{
    margin: 20px auto 40px auto;
    text-align: center;
    color: #505458;
}
.user_name{
    margin: 25px auto 20px auto;
}
.login_submit{
    margin: 10px auto 0px auto;
}
</style>