<template>
    <div>
        <div class="sticky">
            <br>请选择要发布成绩的课程：
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in releaseList"
                :key="item"
                :label="item"
                :value="item">
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
                label="操作"
                align="center"
                header-align="center"
                >
                <template>
                    <div class="operation">
                        <el-link type="primary" class="l-content">打分</el-link>
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

export default{

    name:'Release',
    data(){
        return{
            releaseList:[],
            tableLabel: {
                user_id: '学号',
                user_name: '姓名'
            },
            value: '',
            tableData:[
                {
                    user_id: '10195101564',
                    user_name: 'xxx'
                }
            ],
        }
    },
    methods:{
        getClass(){
            getRelease().then(({ data:res }) => {
                this.releaseList = res
                console.log(res,'res')
            })
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

</style>