<template>
    <div >
     <div class="sticky">
    <br>请选择学年与学期：
  <el-select v-model="value1" placeholder="请选择">
    <el-option
      v-for="item in years"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
     </el-select>
  <el-select v-model="value2" placeholder="请选择" style="margin-left: 20px;">
    <el-option
      v-for="it in semesters"
      :key="it.value"
      :label="it.label"
      :value="it.value">
    </el-option>
  </el-select>
  </div>
  
  <div style="position:relative">
    <el-table
    :data="tableData"
    height="height:100%"
    style="margin-top: 20px; width: 100%"
    border>
    <el-table-column
      v-for="(val,key) in tableLabel"
      :key="key"
      :prop="key"
      :label="val"
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
  z-index:9999;
  top: 0px;
  padding: 5px;
}
</style>



<script>
  export default {
    data() {
      return {
        years: [{
          value: '选项1',
          label: '2018-2019'
        }, {
          value: '选项2',
          label: '2019-2020'
        }, {
          value: '选项3',
          label: '2020-2021'
        }, {
          value: '选项4',
          label: '2021-2022'
        }, {
          value: '选项5',
          label: '2022-2023'
        }],

        value1: '',

        value2: '',

        semesters: [{
          value: '学期1',
          label: '第一学期'
        }, {
          value: '学期2',
          label: '第二学期'
        }, {
          value: '学期3',
          label: '暑期学期'
        }],

        tableData: [{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        },{
          date: '2019-2020 1',
          name: '体育赛事英语',
          classification: '英语类',
          point:'2.0',
          usual:100,
          final:100,
          total:100,
          grade:'A',
          GP:'4.0'
        }
        
        ],
        tableLabel: {
            date: '学年学期',
            name: '课程名称',
            classification: '课程类别',
            point:'学分',
            usual:'平时成绩',
            final:'期末成绩',
            total:'总评成绩',
            grade:'等级成绩',
            GP:'绩点'
        }

      }
    }
  }
</script>