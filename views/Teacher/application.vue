<template>
  <div class="application">
    <el-dialog
        :title="operateType === 'add' ? '新课程申请' : '编辑申请' "
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
      <el-button type="primary" @click="newApplication">+ 申请</el-button>
    </div>
    <div>
      <common-table
          style="margin-top: 10px"
          :tableData="tableData"
          :tableLabel="tableLabel"
          :config="config"

          @look="lookApplication"
          @edit="editApplication"
          @del="delApplication"
      >
      </common-table>
    </div>
  </div>
</template>

<script>

import MyForm from "@/components/MyForm";
import CommonTable from '@/components/CommonTable.vue'
import {
  createApplication,
  createCurriculum,
  delApplication, editApplication,
  editCurriculum,
  getCurriculumDetail,
  getData,
  getMyApplications
} from '../../api/data'
import CONST from '@/assets/consts'
import Form from '@/assets/create_curriculum'
export default {
  name: 'Application',
  components: {
    MyForm,
    CommonTable
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: Form.form,
      //双向绑定↓
      operateForm: {
        curriculum_name: '',
        department: '',
        category: '',
        credit: '',
        teacher: '',
        semester: '',
        requirement: '',
        introduction: '',
        remark: '',
        time: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: "apply_time",
          label: "申请时间",
          width: 120
        },
        {
          prop: "name",
          label: "课程名称",
          width: 300
        },
        {
          prop: "category",
          label: "课程类型",
          width: 120
        },
        {
          prop: "apply_status",
          label: "申请状态",
          width: 80
        }
      ],
      config: {
        loading: false,
        form_loading: false
      }
    }
  },
  methods: {
    transDept() {
      var list = []
      for (var i = 0; i < CONST.departmentList.size; i++) {
        list.push({
          label: CONST.departmentList[i],
          value: i
        })
      }
      // return list
    },
    confirm() {
      const callback = (res) => {
        const data = getData(res.data);
        if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
          this.isShow = false
          if('apply_id' in this.operateForm){
            this.delFromListById(this.operateForm.apply_id)
          }
          this.addToList({
            apply_id: data.apply_id,
            name: this.operateForm.curriculum_name,
            category: CONST.categoryList[this.operateForm.category],
            apply_status: '-',
            apply_time: data.apply_time
          })
        }
        this.$message({
          type: data.status ? 'success' : "warning",
          message: data.message
        })
      };
      if (this.operateType === 'edit') {
        editApplication(
            this.operateForm
        ).then(callback)
      } else {
        console.log(JSON.stringify(this.operateForm))
        createApplication(
            this.operateForm
        ).then(callback)
      }
    },
    newApplication() {
      this.isShow = true
      this.operateType = 'add'
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
    getTableData(){
      this.config.loading = true
      getMyApplications().then( (res) => {
        this.tableData = getData(res.data)
        this.tableData = this.tableData.filter( (item) => {
          item.category = CONST.categoryList[item.category]
          if('apply_status' in item) {
            item.apply_status = item.apply_status ? '通过' : '驳回'
          }else{
            item.apply_status = '-'
          }
          return item
        })
        this.config.loading = false
      })
    },
    lookApplication(row){
      console.log(JSON.stringify(row))
      const to = this.$router.resolve({
        name: 'curriculumDetail',
        query: { apply_id: row.apply_id }
      })
      window.open(to.href, '_blank')
    },
    editApplication(row) {
      this.clearForm()
      this.config.form_loading = true
      this.isShow = true
      this.operateType = 'edit'
      this.rowSelected = row
      getCurriculumDetail({
        apply_id: row.apply_id
      }).then((res) => {
        const data = getData(res.data)
        this.operateForm = data
        this.operateForm.apply_id = row.apply_id
        this.config.form_loading = false
      })
    },
    delApplication(row) {
      this.$confirm("此操作将永久删除该申请，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delApplication({apply_id: row.apply_id}).then((res) => {
          const data = getData(res.data)
          this.$message({
            type: data.status === CONST.RESPONSE_STATUS.POSITIVE? 'success': 'warning',
            message: data.message
          })
          if(data.status){
            this.tableData = this.tableData.filter(item => item !== row)
          }
        })
      })
    },
    delFromListById(id){
      this.tableData = this.tableData.filter(item => item.apply_id !== id)
    },
    addToList(item){
      this.tableData.push(item)
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
  },
  //（生命周期）创造的时候就要调用
  created() {
    this.getTableData()
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
