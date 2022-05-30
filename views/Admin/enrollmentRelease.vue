<template>
  <div class="enrollment">
    <el-dialog
        :title="operateType === 'add' ? '选课时间发布' : '修改选课时间' "
        :visible.sync="isShow"
        style="width: 1050px;margin-top: 100px;margin-left: 300px;"
    >
      <!-- 通过ref拿到当前组件的实例 -->
      <MyForm ref="form" label-width="100px"
              :form-data="formData"
              :form="form">

      </MyForm>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </div>
    </el-dialog>
    <div class="enrollment-header">
      <el-button type="primary" @click="newEnrollment">+ 发布</el-button>
    </div>
    <div class="outer">
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
              label="操作"
              :width="180"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="editEnrollment(scope.row)">编辑
              </el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="delEnrollment(scope.row)">删除
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
  </div>
</template>

<script>

import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable.vue'
import {getApplication, getData} from '../../api/data'
import {getEnrollment} from '../../api/data'
import CurriculumDetail from '../Anyone/curriculumDetail.vue'
import MyForm from "@/components/MyForm";

export default {
  name: 'Application',
  components: {
    MyForm,
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      //双向绑定↓
      formData: {
        enrollment_type: '',
        enrollment_name: '',
        enrollment_time: []
      },
      form: [
        {
          gutter: 20,
          items: [
            {
              offset: 1,
              type: 'input',
              span: 12,
              item: {
                type: 'input',
                label: '名称',
                model: 'enrollment_name'
              }
            },
            {
              span: 10,
              item: {
                type: 'select',
                label: '方式',
                model: 'enrollment_type',
                opts: [
                  {
                    label: '志愿',
                    value: 0
                  },
                  {
                    label: '秒杀',
                    value: 1
                  }
                ]
              }
            }
          ]
        },
        {
          gutter: 20,
          items: [
            {
              span: 23,
              offset: 1,
              item: {
                type: 'datePicker',
                itype: 'datetimerange',
                label: '时间',
                model: 'enrollment_time',
                rangeSeparator: '至',
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间'
              }
            },
          ]
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "enrollment_name",
          label: "选课名称",
          width: 200
        },
        {
          prop: "enrollment_type",
          label: "选课方式",
          width: 100
        },
        {
          prop: "start_time",
          label: "开启时间",
          width: 250
        },
        {
          prop: "end_time",
          label: "结束时间",
          width: 250
        }
      ],
      config: {
        total: 30,
        page: 1
      }
    }
  },
  methods: {
    confirm() {
      // 要说明的是，这里不是调用了接口吗，真正的接口定义应该是在/api/data.js里
      // 但是因为我是用mock模拟的接口，所以这里暂时是在mock.js里面把接口拦住了（之前课程管理页也是用的这个方法）
      if (this.operateType === 'edit') {
        this.$http.post('/enrollment/edit', this.operateForm).then(res => {
          console.log(this.operateForm)
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/enrollment/add', this.operateForm).then(res => {
          console.log("add", this.operateForm)
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    newEnrollment() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        enrollment_name: '',
        enrollment_time: '',
      }
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
      }
      ;
      return fmt;
    },
    getList(curriculum_name = '') {
      console.log("aaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.config.loading = true
      curriculum_name ? (this.config.page = 1) : '' //搜索
      getEnrollment({
        page: this.config.page,
        curriculum_name
      }).then((res) => {
        const data = getData(res.data)
        //回调函数，res是接口的响应值
        this.tableData = data.list.map(item => {
          if (item.enrollment_time[0]) {
            var date = new Date(item.enrollment_time[0]);
            item.start_time = this.dateFormat("YYYY-mm-dd HH:MM:SS", date);
          }
          if (item.enrollment_time[1]) {
            date = new Date(item.enrollment_time[1]);
            item.end_time = this.dateFormat("YYYY-mm-dd HH:MM:SS", date);
          }
          if(item.enrollment_type === 0){
            item.enrollment_type = '志愿'
          }else{
            item.enrollment_type = '秒杀'
          }
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editEnrollment(row) {
      this.isShow = true
      this.operateType = 'edit'
      this.operateForm = JSON.parse(JSON.stringify(row));//不能直接=row，因为这是vue 的双向数据绑定的弊端，实时更新数据，因为是一个数据源，因为在修改对象的时候，对象的指针直接指向页面数据了
      console.log("aaaaaaedit", JSON.parse(JSON.stringify(row)));
      console.log("aaaaaaedit", row.start_time);
    },
    delEnrollment(row) {
      this.$confirm("此操作将永久删除该申请，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const enrollment_id = row.enrollment_id
        this.$http.post("/enrollment/del", {
          params: {enrollment_id}
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
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
.enrollment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; //对齐
  margin-top: 20px;
  margin-bottom: 20px;
}

.enrollment {
  width: fit-content;
}

.common-table {
  height: calc(100% - 62px);
  position: relative;
}

.pager {
  margin-top: 5px;
}

.outer {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
