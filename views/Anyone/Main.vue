<template>
    <el-container style="height:100%">
    <el-aside width="auto">
        <common-aside></common-aside>
    </el-aside>
    <el-container>
        <el-header>
            <common-header></common-header>
        </el-header>
        <el-main>
            <!-- 嵌套路由的好处 -->
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>
<script>

import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader'
export default{
    name:'Home',
    components:{
        CommonAside,
        CommonHeader
    },
    data(){
        return{}
    },
    created() {
      this.$router.push({
        name: 'home'
      })
    }
}
</script>

<style lang="less" scoped>
.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0;
}
</style>