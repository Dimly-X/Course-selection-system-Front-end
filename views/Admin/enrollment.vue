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
        <el-table :data="tableData" stripe border v-loading="config.loading">
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
              <span>{{ item.prop === 'type' ? (scope.row['type'] === 0 ? '志愿' : '秒杀') : scope.row[item.prop] }}</span>
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
                  @click="edittEnrollment(scope.row)">编辑
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
    </div>
  </div>
</template>

<script>

import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable.vue'
import {
  createEnrollment,
  createRelease,
  deleteEnrollment,
  editEnrollment,
  getApplication,
  getData
} from '../../api/data'
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
        type: '',
        name: '',
        time: ''
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
                model: 'name'
              }
            },
            {
              span: 10,
              item: {
                type: 'select',
                label: '方式',
                model: 'type',
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
                model: 'time',
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
          prop: "name",
          label: "选课名称",
          width: 200
        },
        {
          prop: "type",
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
        page: 1,
        loading: false
      }
    }
  },
  methods: {
    confirm() {
      // 要说明的是，这里不是调用了接口吗，真正的接口定义应该是在/api/data.js里
      // 但是因为我是用mock模拟的接口，所以这里暂时是在mock.js里面把接口拦住了（之前课程管理页也是用的这个方法）
      console.log(JSON.stringify(this.formData))
      if(!this.formData.time || !this.formData.name || this.formData.type === ''){
        this.$message.warning("请输入完整信息")
        return
      }
      if (this.operateType === 'create') {
        this.formData.time[0] = Number(this.formData.time[0])
        this.formData.time[1] = Number(this.formData.time[1])
        createEnrollment(this.formData).then(res => {
          const data = getData(res.data)
          this.$message({
            message: data.message,
            type: data.status ? 'success' : 'warning'
          })
          this.isShow = false
          this.getList()
        })
      } else {
        editEnrollment(this.formData).then(res => {
          const data = getData(res.data)
          this.$message({
            message: data.message,
            type: data.status ? 'success' : 'warning'
          })
          this.isShow = false
          this.getList()
        })
      }
      this.formData = {
        name: '',
        time: '',
        type: '',
      }
    },
    newEnrollment() {
      this.isShow = true
      this.operateType = 'create'
      this.formData = {
        name: '',
        time: '',
        type: ''
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

      }

      return fmt;
    },
    getList() {
      this.config.loading = true
      getEnrollment({page: this.config.page}).then((res) => {
        const data = getData(res.data)
        //回调函数，res是接口的响应值
        this.tableData = data.list.map(item => {
          if (item.time[0]) {
            var date = new Date(item.time[0]);
            item.start_time = this.dateFormat("YYYY-mm-dd HH:MM:SS", date);
          }
          if (item.time[1]) {
            date = new Date(item.time[1]);
            item.end_time = this.dateFormat("YYYY-mm-dd HH:MM:SS", date);
          }

          return item
        })
        this.config.total = data.count
        this.config.loading = false
      })
    },
    edittEnrollment(row) {
      this.formData = {
        type: row.type,
        time: row.time,
        name: row.name
      }
      this.isShow = true
      this.operateType = 'edit'
    },
    delEnrollment(row) {
      this.$confirm("此操作将永久删除该申请，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteEnrollment({name: row.name}).then(
            (res) => {
              const data = getData(res.data)
              this.$message({
                message: data.message,
                type: data.status ? 'success' : 'warning'
              })
            })
        this.getList()
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
