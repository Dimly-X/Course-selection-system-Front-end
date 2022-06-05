<template>
    <div>
      <el-dialog
          :title="'编辑成绩: '+this.rowSelected.name"
          :visible.sync="isShow"
          style="width: 500px;margin-left: 400px;margin-top: 100px"
          :close-on-click-modal="false">
        <el-input type="number"
                  v-model="operationForm.usual"
                  min="0" max="100"
                  placeholder="平时"
                  style="margin-left:20px;width: 80px"></el-input>
        <el-input type="number"
                  v-model="operationForm.final"
                  min="0" max="100"
                  placeholder="期末"
                  style="margin-left:20px;width: 80px"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">提交</el-button>
        </div>
      </el-dialog>
        <div class="sticky" style="margin-left: 25px;margin-top: 5px">
            <br>请选择要查看的课程：
            <el-select v-model="class_selected" placeholder="请选择" @change="changeData" v-loading>
                <el-option
                    v-for="item in this.curriculumList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          <transition name="el-fade-in-linear">
            <download-excel
                style="display: inline-block"
                v-if="this.tableData.length"
                class = "export-excel-wrapper"
                :data = "this.tableData"
                :fields = "this.tableLabelOut"
                :name = "this.getCurriculumNameById(this.class_selected) + '_学生名单'">
              <el-button  type="primary" style="margin-left: 20px">导出学生名单</el-button>
            </download-excel>

          </transition>
        </div>
        
        <div style="width: 800px" class="table">
            <el-table
                v-loading="config.loading"
                :data="tableData"
                style="width: 100%"
                border>

                <el-table-column
                v-for="item in tableLabel"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                align="center"
                header-align="center"
                >
                </el-table-column>

                <el-table-column
                label="成绩 (平时/期末)"
                align="center"
                header-align="center"
                >
                <template slot-scope="scope">
                   <el-button size="mini"
                              :key="scope.row"
                              v-if="!scope.row.score"
                   @click="setscoreclick(scope.row)">评分
                   </el-button>
                   <span v-if="scope.row.score" :key="scope.row">{{scope.row.score}}</span>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>

import axios from "axios"
import CommonForm from '@/components/CommonForm'
import {getCurriculumList, getData, getRelease, setScore} from '../../api/data'
import { getStudentList } from '../../api/data'
import CONST from '@/assets/consts'
export default{

    name:'Release',
    components:{
        CommonForm
    },
    data(){
        return{
            operationForm:{
              usual: '',
              final: ''
            },
            rowSelected: '',
            curriculumList:[],
            tableLabelOut: {
              "院系": 'department',
              "年级": 'grade',
              "学号": 'id',
              "性别": 'gender',
              "姓名": 'name',
              "成绩 (平时/期末)": 'score'
            },
            tableLabel: [
              {
                label: '院系',
                prop: 'department',
                width: 180
              },
              {
                label: '年级',
                prop: 'grade',
                width: 100
              },
              {
                label: '学号',
                prop: 'id',
                width: 180
              },
              {
                label: '性别',
                prop: 'gender',
                width: 60
              },
              {
                label: '姓名',
                prop: 'name',
                width: 150
              },

            ],
            class_selected: '',
            tableData:[],
            isShow: false,
            config:{
              options_loading: false,
              loading: false
            }
        }
    },
    methods:{

      setscoreclick(row){
        this.operationForm={usual:'', final:''};
        this.isShow = true;
        this.rowSelected = row;
      },
        confirm(){
            if( this.operationForm.usual === '' ||
                this.operationForm.usual < 0 ||
                this.operationForm.usual > 100 ||
                this.operationForm.final === '' ||
                this.operationForm.final < 0 ||
                this.operationForm.final > 100){
              this.$message.warning("请输入正确的分数信息")
              return
            }
            setScore({
              student_id: this.rowSelected.id,
              curriculum_id: this.class_selected,
              usual: this.operationForm.usual,
              final: this.operationForm.final
            }).then( (res) => {
              const data = getData(res.data)
              this.$message({
                type: data.status ? 'success' : "warning",
                message: data.message
              })
              if(data.status === CONST.RESPONSE_STATUS.POSITIVE) {
                this.$set(this.rowSelected, 'score', this.operationForm.usual + ' / ' + this.operationForm.final)
              }
            })
            this.isShow = false
        },
        getCurriculumNameById(id){
          for(const item of this.curriculumList){
            if(id === item.id){
              return item.name
            }
          }
        },
        getClass(){
          this.config.options_loading = true
            getCurriculumList().then((res) => {
              this.curriculumList = getData(res.data)
                console.log(res,'res')
              this.config.options_loading = false
            })
        },
        changeData(){
          this.config.loading = true
            console.log('okkk','res')
            getStudentList({
                curriculum_id:this.class_selected
            }).then((res) => {
                this.tableData = getData(res.data).map(item => {
                  item.department = CONST.departmentList[item.department]
                  if(item.score){
                    item.score = item.score.usual + ' / ' + item.score.final
                  }
                  return item
                });
                console.log('res',JSON.stringify(this.tableData))
              this.config.loading = false
            })
        },
    },
    created() {
        this.getClass() 
    }
}
</script>

<style lang="less" scoped>

.table{
    margin: 20px auto auto 20px;
}
.p1{
    display: inline;
}
.input1{
    width: 60px;
}
.p2{
    display: inline;
    margin: 0 0 0 20px;
}
.input2{
    width: 60px;
}
.buttonEdit{
    margin: 0 0 0 20px;
}
</style>