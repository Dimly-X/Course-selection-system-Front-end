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
                  @click="dealApplication(scope.row, POSITIVE)">通过
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="dealApplication(scope.row, NEGATIVE)">拒绝
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
            page-size:10

        >
        </el-pagination>
      </div>
  </div>
</template>

<script>

import {getApplication, getData, responseToApplication} from '../../api/data'
import CurriculumDetail from '../Anyone/curriculumDetail.vue'
import CONST from '@/assets/consts'
export default{
    name:'Examine',
    data(){
        return{
            POSITIVE: CONST.RESPONSE_STATUS.POSITIVE,
            NEGATIVE: CONST.RESPONSE_STATUS.NEGATIVE,
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
                page: 1,
                entry_per_page: 10
            }
        }
    },
    methods:{
        getList(curriculum_name = ''){
            this.config.loading =true
            curriculum_name ? (this.config.page = 1) : '' //搜索
            getApplication({
                page: this.config.page,
                entry_per_page: this.config.entry_per_page
            }).then( (res) => {
                const data = getData(res.data)
                //回调函数，res是接口的响应值
                this.tableData = data.list.map(item => {
                    const categoryList = CONST.categoryList;
                    item.category_label = categoryList[item.category];
                    return item
                })
                this.config.total = data.count
                this.config.loading = false
            })
        },
      lookApplication(row){
        const to = this.$router.resolve({
          name: 'curriculumDetail',
          query: { apply_id: row.apply_id }
        })
        window.open(to.href, '_blank')
      },
        dealApplication(row, op){
            this.$prompt("确定" + (op?"接受":"拒绝") + "该课程申请","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                inputValue: '无反馈',
                type:"warning"
            }).then( (feedback) => {
                const para = {
                  apply_id: row.apply_id,
                  operation: op,
                  feedback: feedback.value
                }
                responseToApplication(para).then((res) =>{
                  const data = getData(res.data)
                  this.$message({
                        message: data.message,
                        type: data.status?'success':'warning'
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
