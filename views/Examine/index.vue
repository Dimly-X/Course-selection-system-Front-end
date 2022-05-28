<template>
    <div class="examine_outer application">
      <div class="common-table">
        <el-table :data="tableData" stripe border>
          <el-table-column
              show-overflow-tooltip
              align="center"
              header-align="center"
              v-for="item in tableLabel"
              :key="item.prop"
              :label="item.label"
              :width="item.width"
          >
            <template slot-scope="scope">
              <span>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="详情"
              align="center"
              header-align="center"
              :width="70"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="lookApplication(scope.row)">查看</el-link>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              :width="180"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="success"
                  @click="applyApplication(scope.row)">通过
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="refuseApplication(scope.row)">拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- @current-change是改变页数的时候的回调函数 -->
      </div>
      <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync="config.page"
            @current-change="getList()"
            page-size="10"

        >
        </el-pagination>
      </div>
  </div>
</template>

<script>

import { getApplication } from '../../api/data'
import CurriculumDetail from '../curriculumDetail/curriculumDetail.vue'

export default{
    name:'Examine',
    data(){
        return{
            tableData:[],
            tableLabel:[
                {
                    prop:"apply_time",
                    label:"申请时间",
                    width: 120
                },
                {
                    prop:"curriculum_name",
                    label:"课程名称",
                    width: 300
                },
                {
                    prop:"category_label",
                    label:"课程类型",
                    width: 120
                },
                {
                    prop:"teacher",
                    label:"主讲教师",
                    width: 150
                }
               ],
            config: {
                total: 30,
                page: 1
            }
        }
    },
    methods:{
        getList(curriculum_name = ''){
            console.log("aaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            this.config.loading =true
            curriculum_name ? (this.config.page = 1) : '' //搜索
            getApplication({
                page: this.config.page,
                curriculum_name
            }).then(({ data:res }) => {
                console.log(res,'res')
                //回调函数，res是接口的响应值
                this.tableData = res.list.map(item => {
                    let categoryList = ['专业必修','专业任意选修','学科基础课','分布式课程','体育类','思政类','英语类'];
                    item.category_label = categoryList[item.category];
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
        },
        lookApplication(row){
            console.log("before",row)
            this.$router.push({
                name: 'curriculumDetail',
                query: { curriculum: JSON.parse(JSON.stringify(row)) }
            })
        },
        applyApplication(row){
            this.$confirm("确定接受该课程申请？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then( () => {
                const apply_id = row.apply_id
                this.$http.post("/application/del",{
                    params: { apply_id }
                }).then(() =>{
                    this.$message({
                        type: 'success',
                        message: '通过成功'
                    })
                    this.getList()
                })
            })
        },
        refuseApplication(row){
            this.$confirm("确定拒绝该课程申请？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then( () => {
                const apply_id = row.apply_id
                this.$http.post("/application/del",{
                    params: { apply_id }
                }).then(() =>{
                    this.$message({
                        type: 'success',
                        message: '拒绝成功'
                    })
                    this.getList()
                })
            })
        },
    },
    //（生命周期）创造的时候就要调用
    created() {
        this.getList() 
    }
}
</script>

<style lang="less" scoped>
.application{
  width: fit-content;
  margin: 30px auto auto 10px;
}
.pager {
  margin-top: 5px;
}
.examine_outer{
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
