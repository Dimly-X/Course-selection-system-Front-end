<template>
    <div>
        <div class="sticky">
            <el-dialog 
                :title='请选择期末分数占比'
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
                    <el-button type="primary" @click="confirm">提交</el-button>
                </div>
            </el-dialog>

            <br>请选择要发布成绩的课程：
            <el-select v-model="class_selected" placeholder="请选择" @change="changeData()">
                <el-option
                v-for="item in releaseList"
                :key="item.curriculum_id"
                :label="item.curriculum_name"
                :value="item.curriculum_id">
                </el-option>
            </el-select>
            <el-button type="primary" class="button" @click="editStrategy">编辑计分规则</el-button>
        </div>
        
        <div style="position:relative" class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
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

                <el-table-column
                label="打分"
                align="center"
                header-align="center"
                >
                <template slot-scope="scope">
                    <div class="input-suffix">
                        <p class="p1">平时成绩：</p>
                        <el-input
                            class="input1"
                            placeholder="请输入"
                            v-model="scope.row.usual_score"
                            @change="ChangeUsual(scope.row)">
                        </el-input>
                        <p class="p2">期末成绩：</p>
                        <el-input
                            class="input2"
                            placeholder="请输入"
                            v-model="scope.row.final_score"
                            @change="ChangeFinal(scope.row)">
                        </el-input>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>

import axios from "axios"
import CommonForm from '@/components/CommonForm'
import { getRelease } from '../../api/data'
import { getStudentList } from '../../api/data'

export default{

    name:'Release',
    components:{
        CommonForm
    },
    data(){
        return{
            releaseList:[],
            tableLabel: {
                user_id: '学号',
                user_name: '姓名',
            },
            class_selected: '',
            tableData:[],
            isShow: false,
            operateFormLabel: [
                {
                    model: 'final_percent',
                    label: '期末占比',
                    type: 'input'
                }
            ],
            operateForm: {
                final_percent: ''
            }
        }
    },
    methods:{
        confirm(){
            this.isShow= false
            //调后端改规则
        },
        editStrategy(){
            this.isShow = true
            this.operateForm = {
                final_percent: ''
            }
        },
        getClass(){
            getRelease().then(({ data:res }) => {
                this.releaseList = res;
                console.log(res,'res')
            })
        },
        changeData(){
            console.log('okkk','res')
            getStudentList({
                curriculum_id:this.class_selected
            }).then(({ data:res }) => {
                this.tableData = res;
                console.log(res,'res')
            })
        },
        changeScore(){

        },
        ChangeUsual(row){
            console.log("row",row);
            //后端
        },
        ChangeFinal(row){
            console.log("row",row);
            //后端
        }
    },
    created() {
        this.getClass() 
    }
}
</script>

<style lang="less" scoped>

.table{
    margin: 20px auto 0px auto;
}
.p1{
    display: inline;
}
.input1{
    width: 80px;
}
.p2{
    display: inline;
    margin: 0 0 0 20px;
}
.input2{
    width: 80px;
}
.button{
    margin: 0 0 0 20px;
}
</style>