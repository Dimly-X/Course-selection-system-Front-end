<template>
  <div class="outer">
    <div>
      <br>请选择学年与学期：
      <el-select v-model="search_year" placeholder="请选择" @change="changeSemester">
        <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search_semester" placeholder="请选择" style="margin-left: 20px;" @change="changeSemester">
        <el-option
            v-for="it in semesters"
            :key="it.value"
            :label="it.label"
            :value="it.value">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-table class="table"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                stripe
                :data="tableData"
                border>
        <el-table-column
            v-for="item in tableLabel"
            :key="item.id"
            :prop="item.id"
            :label="item.text"
            :width="item.width"
            align="center"
            header-align="center"
        >
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<style>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  z-index: 9999;
  top: 0px;
  padding: 5px;
}
.outer{
  display: flex;
  flex-direction: column;
}
</style>


<script>
import { getScore } from '../../api/data'
import {getData} from '../../api/data'
import CONST from '@/assets/consts'

export default {
  data() {
    return {
      years: [{
        value: '2018-2019',
        label: '2018-2019'
      }, {
        value: '2019-2020',
        label: '2019-2020'
      }, {
        value: '2020-2021',
        label: '2020-2021'
      }, {
        value: '2021-2022',
        label: '2021-2022'
      }, {
        value: '2022-2023',
        label: '2022-2023'
      }],

      search_year: '',

      search_semester: '',

      semesters: [{
        value: '1',
        label: '第一学期'
      }, {
        value: '2',
        label: '第二学期'
      }, {
        value: '3',
        label: '暑期学期'
      }],

      tableData: [],
      tableLabel: [
        {
          text: '学年学期',
          id: 'semester',
          width: 120
        },
        {
          text: '课程名称',
          id: 'curriculum_name',
          width: 300
        },
        {
          text: '课程类别',
          id: 'category_label',
          width: 150
        },
        {
          text: '学分',
          id: 'credit',
          width: 80
        },
        {
          text: '平时成绩',
          id: 'usual',
          width: 80
        },
        {
          text: '期末成绩',
          id: 'final',
          width: 80
        },
        {
          text: '总评成绩',
          id: 'total',
          width: 80
        },
        {
          text: '等级',
          id: 'grade',
          width: 50
        },
        {
          text: '绩点',
          id: 'GP',
          width: 50
        }
      ]

    }
  },
  methods:{
    getList(){
            // curriculum_name ? (this.config.page = 1) : '' //搜索
            getScore({
              search_year: this.search_year,
              search_semester: this.search_semester,
            }).then(( res ) => {
                console.log('result',res)
                const data = getData(res.data);
                console.log('dataaa',data)
                this.tableData = data.list.map(item => {
                    item.category_label = CONST.categoryList[item.category];
                    return item
                })
            })
    },
    changeSemester(){
      this.getList()
    },
  },
  created(){
    this.getList()
  }
}
</script>
<style>
.table {
  margin-top: 20px;
  width: fit-content;
  height: inherit;
}

</style>