<template>
    <Header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <h3 style="color: #fff">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span> 
                    <img class="user" :src="userImg">
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </Header>
</template>

<!-- 把头像动态引入进来 -->
<script>
import {tryLogout} from '../../api/data'
import {getData} from '../../api/data'

    export default{
        name: 'CommonHeader' ,
        data(){
            return{
                userImg: require('../assets/images/commonPortrait.png')
            }
        },
        methods: {
            handleMenu(){
                this.$store.commit('collapseMenu')
            },
            logOut(){
                tryLogout().then(res => {
                    const data = getData(res.data)
                    this.$message({
                        message: data.message,
                        type: data.status ? 'success' : 'warning'
                    })
                })
                // this.$store.commit('clearToken')
                this.$store.commit('clearMenu')
                this.$router.push('/login')
            }
        },
    }
</script>

<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
    .user{
        width:40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>