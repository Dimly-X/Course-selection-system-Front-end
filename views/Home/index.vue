<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card class="user_card" >
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name" >Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2021-7-19</span></p>
                    <p>上次登录地点:<span>武汉</span></p>

                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { getData } from '../../api/data.js';

export default{
    name:'Home',
    data(){
        return{
            userImg: require('@/assets/images/commonPortrait.png')
        }
    },
    mounted(){
        getData().then(res => {
            const{ code, data } = res.data
            if(code === 20000){
                this.tableData = data.tableData
            }
            console.log(res)
        })
    }
}
</script>

<style>
.user_card{
  shadow: hover;
  width: fit-content;
}
</style>