<template>
  <div class="application">
    <el-dialog
        :title="operateType === 'add' ? '新课程创建' : '编辑课程' "
        :visible.sync="isShow"
        style="width: 1600px;"
    >
      <!-- 通过ref拿到当前组件的实例 -->
      <my-form
          v-loading="this.config.form_loading"
          :form="operateFormLabel"
          :formData="operateForm"
          :inline="false"
          ref="form"
          style="width: 700px"
      ></my-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </div>
    </el-dialog>
    <div class="application-header">
      <el-button type="primary" @click="newApplication">+ 课程</el-button>
      <common-form
          :formLabel="searchFormLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="updateKey">搜索</el-button>
      </common-form>
    </div>
    <div>
      <common-table

          :tableData="tableDataShow"
          :tableLabel="tableLabel"
          :config="config"

          @changePage="updateShow"
          @look="lookCurriculum"
          @edit="edittCurriculum"
          @del="deleteCurriculum"
      >
      </common-table>
    </div>
  </div>
</template>

<script>

import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable.vue'
import {getCurriculum, getCurriculumDetail} from '../../api/data'
import {delCurriculum} from '../../api/data'
import {editCurriculum} from '../../api/data'
import {createCurriculum} from '../../api/data'

import {getData} from '../../api/data'
import CurriculumDetail from '../Anyone/curriculumDetail.vue'
import CONST from '@/assets/consts'
import MyForm from "@/components/MyForm";
import Form from '@/assets/create_curriculum';

export default {
  name: 'Manage',
  components: {
    MyForm,
    CommonForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: Form.form,
      // operateFormLabel: [
      //   {
      //     model: 'curriculum_name',
      //     label: '课程名称',
      //     type: 'input'
      //   },
      //   {
      //     model: 'department',
      //     label: '开设院系',
      //     type: 'multiSelect',
      //     opts: this.transDept()
      //   },
      //   {
      //     model: 'category',
      //     label: '课程类别',
      //     type: 'select',
      //     opts: this.transCat()
      //   },
      //   {
      //     model: 'credit',
      //     label: '学分',
      //     type: 'input'
      //   },
      //   {
      //     model: 'teacher',
      //     label: '教师',
      //     type: 'input'
      //   },
      //   {
      //     model: 'semester',
      //     label: '开课学期',
      //     type: 'select',
      //     opts: [
      //       {
      //         label: '2021-2022 1',
      //         value: 0
      //       },
      //       {
      //         label: '2021-2022 2',
      //         value: 1
      //       },
      //       {
      //         label: '2021-2022 3',
      //         value: 2
      //       }
      //     ]
      //   },
      //   {
      //     model: 'upper_limit',
      //     label: '人数上限',
      //     type: 'input'
      //   },
      //   {
      //     model: 'requirement',
      //     label: '课程要求',
      //     type: 'textInput'
      //   },
      //   {
      //     model: 'introduction',
      //     label: '课程简介',
      //     type: 'textInput'
      //   },
      //   {
      //     model: 'remark',
      //     label: '备注',
      //     type: 'textInput'
      //   }
      // ],
      //双向绑定↓
      operateForm: {
        curriculum_name: '',
        department: '',
        category: '',
        credit: '',
        teacher: '',
        semester: '',
        upper_limit: '',
        requirement: '',
        introduction: '',
        remark: '',
        time: ''
      },
      searchFormLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableDataAll: [],
      tableDataCached: [],
      tableDataShow: [],
      tableLabel: [
        {
          prop: "create_time",
          label: "创建时间",
          width: 120
        },
        {
          prop: "curriculum_name",
          label: "课程名称",
          width: 300
        },
        // {
        //     prop:"department",
        //     label:"开设院系"
        // },
        {
          prop: "category_label",
          label: "课程类型",
          width: 120
        },
        // {
        //     prop:"credit",
        //     label:"学分"
        // },
        {
          prop: "teacher",
          label: "主讲教师",
          width: 150
        },
        {
          prop: "credit",
          label: "学分",
          width: 50
        }
      ],
      config: {
        total: 30,
        page: 1,
        entry_per_page: 10,
        loading: false,
        form_loading: false
      },
      rowSelected: ''
    }
  },
  methods: {
    transDept(){
      var list = []
      for(var i = 0; i < CONST.departmentList.length; i ++){
        list.push({
          label: CONST.departmentList[i],
          value: i
        })
      }
      return list
    },
    confirm() {
      // 要说明的是，这里不是调用了接口吗，真正的接口定义应该是在/api/data.js里
      // 但是因为我是用mock模拟的接口，所以这里暂时是在mock.js里面把接口拦住了（之前课程管理页也是用的这个方法）
      const callback = (res) => {
        const data = getData(res.data);
        if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
          this.isShow = false
          this.delFromListById(data.curriculum_id)
          this.addToList({
            curriculum_id: data.curriculum_id,
            curriculum_name: this.operateForm.curriculum_name,
            category: CONST.categoryList[this.operateForm.category],
            teacher: this.operateForm.teacher,
            apply_time: data.apply_time
          })
        }
        this.$message({
          type: data.status ? 'success' : "warning",
          message: data.message
        })
      };
      if (this.operateType === 'edit') {
        editCurriculum(
            this.operateForm
        ).then(callback)
      } else {
        createCurriculum(
            this.operateForm
        ).then(callback)
      }
    },
    clearForm(){
      this.operateForm = {
        curriculum_name: '',
        department: '',
        category: '',
        credit: '',
        teacher: '',
        semester: '',
        upper_limit: '',
        requirement: '',
        introduction: '',
        remark: '',
        time: ''
      }
    },
    newApplication() {
      this.isShow = true
      this.operateType = 'add'
      this.clearForm()
    },

    updateKey(){
      this.config.loading = true
      this.tableDataCached = JSON.parse(JSON.stringify(this.tableDataAll))
      if(!this.searchForm.keyword){
        this.updateShow()
        return
      }
      this.tableDataCached = this.tableDataCached.filter((item) => item.curriculum_name.indexOf(this.searchForm.keyword) >= 0)
      this.config.page = 1
      this.updateShow()
      this.config.loading = false
    },
    updateShow() {
      const list = this.tableDataCached
      this.config.total = list.length
      const page = this.config.page
      const per = this.config.entry_per_page
      const start = (page - 1) * per
      this.tableDataShow = list.slice(start, start + per)
    },
    getList() {
      this.config.loading = true
      getCurriculum().then((res) => {
        const data = getData(res.data);
        this.tableDataAll = data.list.map(item => {
          item.category_label = CONST.categoryList[item.category];
          return item
        })
        this.config.loading = false
        this.tableDataCached = this.tableDataAll
        this.updateShow()
      })
    },
    lookCurriculum(row) {
      const to = this.$router.resolve({
        name: 'curriculumDetail',
        query: {curriculum_id: row.curriculum_id}
      })
      window.open(to.href, '_blank')
    },
    edittCurriculum(row) {
      this.clearForm()
      this.config.form_loading = true
      this.isShow = true
      this.operateType = 'edit'
      this.rowSelected = row
      getCurriculumDetail({
        curriculum_id: row.curriculum_id
      }).then((res) => {
        const data = getData(res.data)
        this.operateForm = data
        this.operateForm.curriculum_id = row.curriculum_id
        this.config.form_loading = false
      })
      //this.operateForm = JSON.parse(JSON.stringify(row));//不能直接=row，因为这是vue 的双向数据绑定的弊端，实时更新数据，因为是一个数据源，因为在修改对象的时候，对象的指针直接指向页面数据了
    },
    deleteCurriculum(row) {
      this.$confirm("此操作将永久删除该课程，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delCurriculum({
          curriculum_id: row.curriculum_id
        }).then((res) => {
          const data = getData(res.data);
          this.$message({
            type: data.status? 'success': 'warning',
            message: data.message
          })
          this.delFromListById(row.curriculum_id)
        })
      })
    },
    delFromListById(id){
      this.tableDataAll = this.tableDataAll.filter(item => item.curriculum_id !== id)
      this.updateShow()
    },
    addToList(item){
      this.tableDataAll.push(item)
      this.updateShow()
    }
  },
  //（生命周期）创造的时候就要调用
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.application-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; //对齐
  margin-top: 20px;
}

.application {
  width: fit-content;
}
</style>
