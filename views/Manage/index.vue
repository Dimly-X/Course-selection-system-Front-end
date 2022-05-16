<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border>
    <el-table-column
      label="创建时间"
      sortable
      align="center"
      header-align="center"
      prop="date">
    </el-table-column>

    <el-table-column
      v-for="(val,key) in tableLabel"
      :key="key"
      :prop="key"
      :label="val"
      align="center"
      header-align="center"
      >
    </el-table-column>

    <el-table-column
      label="操作"
      align="center"
      header-align="center"
      >
      <template>
        <div class="operation">
            <el-link type="primary" class="l-content">修改</el-link>
            <br>
            <el-link type="danger" class="r-content">删除</el-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="less" scoped>

el-table{
    display: flex;
}
.el-table-column{
    display: flex;
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
}

</style>


<script>

import { getData } from '../../api/data.js';

  export default {
    data() {
      return {
        tableData: [],
        tableLabel: {
            //date: '创建时间',
            name: '课程名称',
            classification: '课程类别',
            point:'学分',
            teacher:'教师'
        },
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
