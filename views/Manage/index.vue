<template>
  <el-table
    :data="tableData"
    class="table"
    stripe
    border>
    <el-table-column
      label="创建时间"
      sortable
      align="center"
      header-align="center"
      width="120"
      prop="date">
    </el-table-column>

    <el-table-column
      v-for="item in tableLabel"
      :key="item.id"
      :prop="item.id"
      :label="item.text"
      align="center"
      header-align="center"
      :width=item.width
      >
    </el-table-column>

    <el-table-column
      label="操作"
      align="center"
      header-align="center"
      width="130px"
      >
      <template>
        <div class="operation">
            <el-link type="primary" class="l-content">修改</el-link>
            <el-link type="danger" class="r-content" style="margin-left: 10px">删除</el-link>
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
        tableLabel: [
            //date: '创建时间',
          {
            text: '课程名称',
            width: 300,
            id: 'name'
          },
          {
            text: '课程类别',
            width: 120,
            id: 'classification'
          },
          {
            text: '学分',
            width: 50,
            id:  'point'
          },
          {
            text: '主讲教师',
            width: 150,
            id: 'teacher'
          }
        ],
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
<style>
.table{
  width: fit-content;
  margin: 30px auto auto 30px;
}
</style>