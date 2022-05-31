<template>
  <div class="body">
    <!--:class哪里是通过动态改变class的方式让这个空状态消失 -->
    <el-empty
        :class="{ 'notEmpty': notEmpty }"
        ref="emptyState"
        description="当前不在选课时间内">
    </el-empty>
    <el-tabs type="border-card">
      <el-tab-pane label="可选课程">
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"

            @changePage="getList()"
        >
        </common-table>
      </el-tab-pane>
      <el-tab-pane label="已选课程">
        <common-table
            :tableData="tableData"
            :tableLabel="tableLabel"
            :config="config"

            @changePage="getList()"
        >
        </common-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable.vue'
import CONST from '@/assets/consts'
export default {
  name: 'Select',
  components: {
    CommonTable
  },
  data() {
    return {
      cnDay: CONST.dayList,
      cnNum: CONST.cnNumber,
      //7行10列。tableData[星期][第几节]
      isEmpty: 'none',
      mycolor: 'blue',
      notEmpty: true,
      tableData: [],
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
      config: {
        total: 10,
        page: 1,
        entry_per_page: 10
      }

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
</style>