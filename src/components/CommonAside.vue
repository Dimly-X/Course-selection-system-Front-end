<template>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
     <h3 style="white-space:nowrap">{{isCollapse ? '数据库' : '华东师范大学数据库'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
         <i :class="'el-icon' + '-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: #fff;
      text-align: center;
      line-height:48px
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu: []
        //     {
        //         path:'/home',
        //         name:'home',
        //         label:'首页',
        //         icon:'s-home',
        //         url:'Home/Home'
        //     },
        //     {
        //         path:'/appliaction',
        //         name:'application',
        //         label:'开课申请',
        //         icon:'notebook-1',
        //         url:'Application/Application'
        //     },
        //     {
        //         path:'/release',
        //         name:'release',
        //         label:'成绩发布',
        //         icon:'document-checked',
        //         url:'Release/Release'
        //     },
        //     {
        //         path:'/manage',
        //         name:'manage',
        //         label:'课程管理',
        //         icon:'notebook-2',
        //         url:'Manage/Manage'
        //     },
        //     {
        //         path:'/examine',
        //         name:'examine',
        //         label:'新课程审核',
        //         icon:'edit',
        //         url:'Examine/Examine'
        //     },
        //     {
        //         path:'/score',
        //         name:'score',
        //         label:'成绩',
        //         icon:'document-checked',
        //         url:'Score/Score'
        //     },
        //     {
        //         path:'/select',
        //         name:'select',
        //         label:'选课',
        //         icon:'reading',
        //         url:'Select/Select'
        //     }
        // ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
          name: item.name
        })
      }

    },
    //计算属性
    computed:{
        noChildren(){
            //return this.menu.filter(item => !item.children)
            return this.asyncMenu.filter(item => !item.children)
        },
        hasChildren(){
            //return this.menu.filter(item => item.children)
            return this.asyncMenu.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
    }
  }
</script>