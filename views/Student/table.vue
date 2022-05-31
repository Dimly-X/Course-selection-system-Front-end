<template>
  <div class="body">
    <div id="courseTable" class="tableOuter">
      <table id="colorfultable" class="gridtable" style="width:99%;text-align:center;" :key = "refresh">
        <thead class="gridhead">
        <tr>
          <th class="week" style="height: 30px">时间  \  星期</th>
          <th class="week" v-for="day in [0,1,2,3,4,5,6]" :key="day">{{cnDay[day]}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="num in [0,1,2,3,4,5,6,7,8,9]" :key="num">
          <th class="subsection gridcell">{{'第'+cnNum[num]+'节'}}</th>
          <td class="gridcell" v-for="day in [0,1,2,3,4,5,6]" :key="day"
              style="border: 1px solid black;
              white-space:pre-wrap;
              height: fit-content;
              display:table-cell;
              vertical-align:middle;
              ;
               ">{{tableData[day][num]}}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import CommonTable from '@/components/CommonTable.vue'
import CONST from '@/assets/consts'
import Vue from 'vue'
import {getData, getMyCurriculumTable} from "../../api/data";
export default {
  name: 'Table',
  components: {
    CommonTable
  },
  data() {
    return {
      cnDay: CONST.dayList,
      cnNum: CONST.cnNumber,
      //7行10列。tableData[星期][第几节]
      tableData: this.emptyTable(),
      isEmpty: 'none',
      mycolor: 'blue',
      notEmpty: true,
      tableData1111: [],
    }
  },
  methods: {
    transTable: function (data){
      this.tableData = this.emptyTable()
      for(const item of data){
        for(const time of item.time){
          this.tableData[parseInt(time/10)][time%10] =
              '[' + item.id + '] ' +
              item.name + '\n' + '(' + item.teacher + ', ' + CONST.categoryList[item.category] + ')';
        }
      }
    },
    emptyTable:function (){
      return [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
      ]
    },
    getTable: function (){
      getMyCurriculumTable().then(
          (res) => {
            const data = getData(res.data)
            this.transTable(data)
            this.changeColor()
            document.getElementById("colorfultable")
            this.$forceUpdate()
          }
      )
    },
    changeColor:function (){
      var table = document.getElementById("colorfultable");
      for(const i of [0,1,2,3,4,5,6]){
        for(const j of [0,1,2,3,4,5,6,7,8,9]){
          if(this.tableData[i][j] !== ''){
            console.log("changing")
            table.rows[j+1].cells[i+1].style.background = '#94AEF3'
          }
        }
      }
    }
  },
  created() {
    this.getTable()
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
  padding: 10px;
}
.subsection {
  background: #DEEDF7;
}
.tableOuter{
  clear:left;
  margin-top:30px;
  margin-left:10px;
  width: 1500px
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