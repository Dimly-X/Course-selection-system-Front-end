<template>
  <div class="body">
    <el-dialog
        title="请选择想要投入的意愿值"
        :visible.sync="isShow"
    >
      <!-- 通过ref拿到当前组件的实例 -->
      <common-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="false"
          ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirmWillingness(operateForm.curriculum_id)">提交</el-button>
      </div>
    </el-dialog>
    <!--:class哪里是通过动态改变class的方式让这个空状态消失 -->
    <el-empty
        :class="{ 'notEmpty': notEmpty }"
        ref="emptyState"
        description="当前不在选课时间内">
    </el-empty>
    <el-tabs v-if="notEmpty" type="border-card"  style="width: fit-content" v-loading="config.loading">
      <el-tab-pane label="可选课程">
        <div class="optional_outer">
          <div class="optional_table">
            <el-table :data="tableDataShow" stripe border>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  header-align="center"
                  v-for="item in tableLabelAll"
                  :key="item.prop"
                  :label="item.label"
                  :width="item.width"
              >
                <template slot="header" slot-scope="scope">
                  <span>{{ item.label }}</span>
                  <el-input
                      v-if="item.sub === 'input'"
                      :style="{width: item.sub_width, marginLeft:'15px'}"
                      v-model="searchKey"
                      size="mini"
                      placeholder="筛选"/>
                </template>
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
                  <el-link type="primary" @click="handleLook(scope.row)">查看</el-link>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  :width="90"
                  align="center"
                  header-align="center">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleSelect(scope.row)">选课
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- @current-change是改变页数的时候的回调函数 -->
          </div>
          <div class="optional_pager">
            <el-pagination
                layout="prev, pager, next"
                :total="optional_config.total"
                :current-page.sync="optional_config.page"
                @current-change="updateShow"
                :page-size=10
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已选课程">
        <div class="selected_outer">
          <div class="selected_table">
            <el-table :data="tableDataSelected" stripe border>
              <el-table-column
                  show-overflow-tooltip
                  align="center"
                  header-align="center"
                  v-for="item in tableLabelAll"
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
                  <el-link type="primary" @click="handleLook(scope.row)">查看</el-link>
                </template>
              </el-table-column>
              <el-table-column
                  label="意愿值"
                  align="center"
                  header-align="center"
                  :width="80"
              >
                <template slot-scope="scope">
                  <div class="input-suffix">
                    {{ scope.row.willingness }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  :width="90"
                  align="center"
                  header-align="center">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleDropOut(scope.row)">退课
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- @current-change是改变页数的时候的回调函数 -->
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm'
import CONST from '@/assets/consts'
import {delSelected, getData, getEnrollmentList, getSelectedList, selectCurriculum} from "../../api/data";

export default {
  name: 'Select',
  components: {
    CommonForm
  },
  data() {
    return {
      config:{
        loading: false
      },
      cnDay: CONST.dayList,
      cnNum: CONST.cnNumber,
      //7行10列。tableData[星期][第几节]
      isEmpty: 'none',
      notEmpty: true,
      tableDataShow: [],
      tableDataCached: [],
      tableDataAll: [],
      tableLabelAll: [
        {
          prop: "name",
          label: "课程名称",
          width: 300,
          sub: 'input',
          sub_width: '180px'
        },
        {
          prop: "category",
          label: "课程类型",
          width: 120
        },
        {
          prop: "teacher",
          label: "主讲教师",
          width: 150
        },
        {
          prop: "credit",
          label: "学分",
          width: 50
        },
        {
          prop: "number",
          label: "人数",
          width: 80
        }
      ],
      tableDataSelected: [

      ],
      selected_tableLabel: [
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
          prop: "teacher",
          label: "主讲教师",
          width: 150
        },
        {
          prop: "credit",
          label: "学分",
          width: 50
        },
        {
          prop: "number",
          label: "人数",
          width: 80
        }
      ],
      optional_config: {
        total: 10,
        page: 1,
        entry_per_page: 10
      },
      selected_config: {
        total: 20,
        page: 1,
        entry_per_page: 10
      },
      searchKey: '',
      isShow: false,
      operateFormLabel: [
        {
          model: 'willingness',
          label: '意愿值',
          type: 'inputNum',
        }
      ],
      operateForm: {
        willingness: 0
      }

    }
  },
  methods: {
    getTableDataAll(){
      this.config.loading = true
      console.log("getdata")
      getEnrollmentList().then((res) => {
        const data = getData(res.data)
        this.notEmpty = data.status
        //回调函数，res是接口的响应值
        this.optional_config.total = data.total
        this.tableDataAll = data.list.map(item => {
          const categoryList = CONST.categoryList;
          item.category = categoryList[item.category];
          return item
        })
        this.tableDataCached = JSON.parse(JSON.stringify(this.tableDataAll))
        this.updateShow()
        this.config.loading = false
      })
    },
    getSelected(){
      getSelectedList({
        page: this.selected_config.page,
        entry_per_page: this.selected_config.entry_per_page
      }).then((res) => {
        const data = getData(res.data)
        //回调函数，res是接口的响应值
        this.tableDataSelected = data.list.map(item => {
          const categoryList = CONST.categoryList;
          item.category = categoryList[item.category];
          return item
        })
      })
    },
    updateShow() {
      const list = this.tableDataCached
      this.optional_config.total = list.length
      const page = this.optional_config.page
      const per = this.optional_config.entry_per_page
      const start = (page - 1) * per
      this.tableDataShow = list.slice(start, start + per)
    },
    handleLook(row) {
      const to = this.$router.resolve({
        name: 'curriculumDetail',
        query: {curriculum_id: row.curriculum_id}
      })
      window.open(to.href, '_blank')
    },
    handleSelect(row) {
      this.operateForm = {
        willingness: 0,
        curriculum_id: row.curriculum_id
      }
      this.isShow = true
    },
    handleDropOut(row) {
      this.$confirm("确定退课吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          delSelected({curriculum_id: row.curriculum_id}).then((res) => {
            const data = getData(res.data)
            if(data.status === CONST.RESPONSE_STATUS.POSITIVE){
              this.getSelected()
            }
            this.$message({
              message: data.message,
              type: data.status ? 'success' : 'warning'
            })
          })
      })
    },
    getOptionalList(curriculum_name = '') {
      this.config.loading = true
      curriculum_name ? (this.config.page = 1) : '' //搜索
      //调接口

    },
    confirmWillingness(curriculum_id) {
      this.isShow = false
      console.log("data", curriculum_id)
      selectCurriculum({
        curriculum_id: curriculum_id,
        willingness: this.operateForm.willingness
      })
          .then((res) => {
            const data = getData(res.data)
            if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
              this.getSelected()
            }
            this.$message({
              message: data.message,
              type: data.status ? 'success' : 'warning'
            })
          })
      //调接口
    }
  },
  created() {
    this.getTableDataAll()
    this.getSelected()
  },
  watch:{
    searchKey: function (){
      let list = JSON.parse(JSON.stringify(this.tableDataAll));
      if (this.searchKey) {
        list = list.filter(item => item.name.indexOf(this.searchKey) >= 0)
      }
      this.tableDataCached = list
      this.optional_config.page = 1
      this.updateShow()
    }
  }
}
</script>

<style scoped>
.electableCell {
  border-width: 1px;
  border-style: solid;
  border-color: black;
  width: 99px;
  height: 30px;
  align-content: center;
  vertical-align: middle;
}

.gridcell {
  border-width: 1px;
  border-style: solid;
  border-color: black;
  height: fit-content;
  align-content: center;
  vertical-align: middle;
  padding: 15px;
}

.subsection {
  background: #DEEDF7;
}

.week {
  border-width: 1px;
  border-style: solid;
  border-color: black;
  width: 99px;
  height: 20px;
  background: #DEEDF7;
  align-content: center;
  vertical-align: middle;
}

.notEmpty {
  display: none;
}

.optional_table {
  height: calc(100% - 62px);
  position: relative;
}

.optional_pager {
  margin-top: 5px;
}

.optional_outer {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.selected_table {
  height: calc(100% - 62px);
  position: relative;
}

.selected_pager {
  margin-top: 5px;
}

.selected_outer {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>