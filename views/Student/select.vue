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
            <el-button type="primary" @click="confirmWillingness">提交</el-button>
        </div>
    </el-dialog>
    <!--:class哪里是通过动态改变class的方式让这个空状态消失 -->
    <el-empty
        :class="{ 'notEmpty': notEmpty }"
        ref="emptyState"
        description="当前不在选课时间内">
    </el-empty>
    <el-tabs type="border-card">
      <el-tab-pane label="可选课程">
          <div class="optional_outer">
            <div class="optional_table">
              <el-table :data="optional_tableData" stripe border>
                <el-table-column
                    show-overflow-tooltip
                    align="center"
                    header-align="center"
                    v-for="item in optional_tableLabel"
                    :key="item.prop"
                    :label="item.label"
                    :width="item.width"
                >
                  <template slot="header">
                    <span>{{item.label}}</span>
                    <el-input
                      v-if="item.sub === 'input'"
                      :style="{width: item.sub_width, marginLeft:'15px'}"
                      v-model="searchKey"
                      size="mini"
                      placeholder="筛选"
                      @change="search"/>
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
                    label="意愿值"
                    align="center"
                    header-align="center"
                    :width="80"
                >
                  <template slot-scope="scope">
                    <div class="input-suffix">
                        <el-input
                            class="inputWillingness"
                            placeholder="请输入"
                            v-model="scope.row.willingness"
                            @change="getList(searchkey)">
                        </el-input>
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
                  @current-change="getOptionalList"
                  :page-size=10
              >
              </el-pagination>
            </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="已选课程">
        <div class="selected_outer">
            <div class="selected_table">
              <el-table :data="selected_tableData" stripe border>
                <el-table-column
                    show-overflow-tooltip
                    align="center"
                    header-align="center"
                    v-for="item in selected_tableLabel"
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
            <div class="selected_pager">
              <el-pagination
                  layout="prev, pager, next"
                  :total="selected_config.total"
                  :current-page.sync="selected_config.page"
                  @current-change="getSelectedList"
                  :page-size=10
              >
              </el-pagination>
            </div>
          </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import CommonForm from '@/components/CommonForm'
import CONST from '@/assets/consts'
export default {
  name: 'Select',
  components: {
    CommonForm
  },
  data() {
    return {
      cnDay: CONST.dayList,
      cnNum: CONST.cnNumber,
      //7行10列。tableData[星期][第几节]
      isEmpty: 'none',
      notEmpty: true,
      optional_tableData: [
          {
              curriculum_name:"高级编程",
              category_label:"专业任意选修",
              teacher:"陈老师",
              credit:2,
              number:"40/80",
              willingness:30
          }
      ],
      optional_tableLabel: [
        {
          prop: "curriculum_name",
          label: "课程名称",
          width: 300,
          sub: 'input',
          sub_width: 100
        },
        {
          prop: "category_label",
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
      selected_tableData: [
          {
              curriculum_name:"高级编程",
              category_label:"专业任意选修",
              teacher:"陈老师",
              credit:2,
          }
      ],
      selected_tableLabel: [
        {
          prop: "curriculum_name",
          label: "课程名称",
          width: 300
        },
        {
          prop: "category_label",
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
      searchKey:'',
      isShow: false,
      operateFormLabel: [
          {
              model: 'willingness',
              label: '意愿值',
              type: 'input'
          }
      ],
      operateForm: {
          willingness: ''
      }

    }
  },
  methods:{
    handleLook(row){
      console.log("look","look")
    },
    handleSelect(row){
      this.isShow = true
      this.operateForm = {
          willingness: ''
      }
    },
    handleDropOut(row){
      this.$confirm("确定退课吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //调接口
      })
    },
    changeWillingness(row){
      console.log("change","change")
    },
    getOptionalList(curriculum_name = '') {
        this.config.loading = true
        curriculum_name ? (this.config.page = 1) : '' //搜索
        //调接口
        
    },
    getSelectedList() {
        this.config.loading = true
        this.config.page = 1
        //调接口
        
    },
    confirmWillingness(){
      this.isShow= false
      //调接口
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
.gridcell{
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
.optional_outer{
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
.selected_outer{
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>