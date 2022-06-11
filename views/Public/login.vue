<template>
  <body class="background">
  <!-- <img src="../../src/assets/images/70.jpg" height="60%" width="20%" > -->
  <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      class="login-container"
      v-loading="config.loading"
  >
    <img src="../../src/assets/images/university_logo.png" class="logo">
    <!-- <h3 class="login_title">系统登录</h3> -->
    <div class="input_area">
      <div class="input_left">
        <el-form-item
            prop="user_name"
            class="user_input"
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
            prop="password"
            class="user_input"
        >
          <el-input
              type="password"
              v-model="form.password"
              auto-complete="off"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </div>
      <div class="input_right">
        <el-form-item>
          <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
  </body>
</template>

<script>

import Mock from 'mockjs'
import { tryLogin} from '../../api/data'
import {getData} from '../../api/data'
import CONST from '@/assets/consts'
export default {
  name: 'Login',
  data() {
    return {
      config:{
        loading: false
      },
      form: {
      },
      rules: {
        //校验规则
        user_name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
  login() {
      this.config.loading = true
      //then就是说，调用接口之后会得到回应,res是接口的返回
      //{ data:res }这里是es6的语法，是把data先从res里面解构出来，让它（之前的res.data）作为res
      tryLogin(this.form).then((res) => {
        this.config.loading = false
        const data = getData(res.data);
        if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', CONST.menuList[data.user_role])
          console.log("menu",CONST.menuList[data.user_role])
          this.$store.commit('setToken', data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({name: 'Main'})
        } else {
          this.$message.warning(data.message)
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

.background {
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

.login-container {
  position: relative;
  bottom: 12%;
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto auto;
  width: 350px;
  height: 260px;
  padding: 35px 35px 35px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

}

.logo {
  height: 30px;
  width: 200px;
  display: block;
  margin: 0 auto;
}
.input_area{
  display: flex;
  margin: 20px auto 0px auto;
  height: 130px;
}
.input_left {
  margin: 14px auto 14px 10px;
  width: 200px;

}
.input_right{
  margin: 14px auto 14px 10px;
  width: 45px;
}
.login_title {
  margin: 20px auto 40px auto;
  text-align: center;
  color: #505458;
}

.user_input {
  margin: auto auto 18px auto;
}

.login_submit {
  padding: 0px;
  text-align: center;
  height: 95px;
  width: 50px;
  margin: 0px auto;
}
</style>