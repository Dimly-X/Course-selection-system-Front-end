<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px">
            <el-card class="user_card" >
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name" >{{ data.personal_name }}</p>
                        <p class="access">{{ data.user_role }}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>院系:<span>{{ data.user_school }}</span></p>
                    <p>编号:<span>{{ data.user_id }}</span></p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { getHomeData } from '../../api/data.js';
import { getData } from '../../api/data.js'
import CONST from '@/assets/consts'
export default{
    name:'Home',
    data(){
      return{
            userImg: require('@/assets/images/commonPortrait.png'),
            data: {
              personal_name: '',
              user_role: '',
              user_school: '',
              user_id: ''
            }
        }
    },
    mounted(){
        getHomeData().then(res => {
          this.data = getData(res.data)
          if(this.data.user_role === CONST.USER_ROLE.ADMIN){
            this.data.user_role = '教务'
          }else if(this.data.user_role === CONST.USER_ROLE.TEACHER){
            this.data.user_role = '教师'
          }else if(this.data.user_role === CONST.USER_ROLE.STUDENT){
            this.data.user_role = '学生'
          }else{
            this.data.user_role = '未知'
          }
        })
    }
}
</script>

<style>
.user_card{
  shadow: hover;
  width: 300px;
}
</style>