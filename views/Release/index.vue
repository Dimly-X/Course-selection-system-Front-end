<template>
    <div>
        <div class="sticky">
            <br>请选择要发布成绩的课程：
            <el-select v-model="class_selected" placeholder="请选择" @change="changeData()">
                <el-option
                v-for="item in releaseList"
                :key="item.curriculum_id"
                :label="item.curriculum_name"
                :value="item.curriculum_id">
                </el-option>
            </el-select>
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
                            v-model="input1">
                        </el-input>
                        <p class="p2">期末成绩：</p>
                        <el-input
                            class="input2"
                            placeholder="请输入"
                            v-model="input2">
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
import { getRelease } from '../../api/data'
import { getStudentList } from '../../api/data'

export default{

    name:'Release',
    data(){
        return{
            releaseList:[],
            tableLabel: {
                user_id: '学号',
                user_name: '姓名',
            },
            class_selected: '',
            tableData:[],
            input1: '',
            input2: '',
        }
    },
    methods:{
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
</style>