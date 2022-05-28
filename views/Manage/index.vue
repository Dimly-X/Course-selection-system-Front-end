<template>
    <div class="application">
        <el-dialog 
            :title="operateType === 'add' ? '新课程创建' : '编辑课程' "
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
        <div class="application-header" >
            <el-button type="primary" @click="newApplication">+ 课程</el-button>
            <common-form
                :formLabel="searchFormLabel"
                :form="searchForm"
                :inline="true"
                ref="form"
            >
                <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
            </common-form>
        </div>
        <div>
            <common-table
                :tableData="tableData"
                :tableLabel="tableLabel"
                :config="config"

                @changePage="getList()"
                @look="lookApplication"
                @edit="editApplication"
                @del="delApplication"
            >
            </common-table>
        </div>
    </div>
</template>

<script>

import CommonForm from '@/components/CommonForm'
import CommonTable from '@/components/CommonTable.vue'
import { getCurriculum } from '../../api/data'
import { delCurriculum } from '../../api/data'
import { editCurriculum } from '../../api/data'
import { createCurriculum } from '../../api/data'

import {getData} from '../../api/data'
import CurriculumDetail from '../curriculumDetail/curriculumDetail.vue'
import CONST from '@/assets/consts'

export default{
    name:'Manage',
    components:{
        CommonForm,
        CommonTable
    },
    data(){
        return{
            operateType: 'add',
            isShow: false,
            operateFormLabel: [
                    {
                        model: 'curriculum_name',
                        label: '课程名称',
                        type: 'input'
                    },
                    {
                        model: 'department',
                        label: '开设院系',
                        type: 'multiSelect',
                        opts: [
                            {
                                label: '软件工程学院',
                                value: 0
                            },
                            {
                                label: '法学院',
                                value: 1
                            },
                            {
                                label: '马克思主义学院',
                                value: 2
                            },
                            {
                                label: '经济学院',
                                value: 3
                            },
                            {
                                label: '社会发展学院',
                                value: 4
                            },
                            {
                                label: '外语学院',
                                value: 5
                            },
                            {
                                label: '国际汉语文化学院',
                                value: 6
                            },
                            {
                                label: '心理与认知科学学院',
                                value: 7
                            }
                        ]
                    },
                    {
                        model: 'category',
                        label: '课程类别',
                        type: 'select',
                        opts: [
                            {
                                label: '专业必修',
                                value: 0
                            },
                            {
                                label: '专业任意选修',
                                value: 1
                            },
                            {
                                label: '学科基础课',
                                value: 2
                            },
                            {
                                label: '分布式课程',
                                value: 3
                            },
                            {
                                label: '体育类',
                                value: 4
                            },
                            {
                                label: '思政类',
                                value: 5
                            },
                            {
                                label: '英语类',
                                value: 6
                            }
                        ]
                    },
                    {
                        model: 'credit',
                        label: '学分',
                        type: 'input'
                    },
                    {
                        model: 'teacher',
                        label: '教师',
                        type: 'input'
                    },
                    {
                        model: 'semester',
                        label: '开课学期',
                        type: 'select',
                        opts: [
                            {
                                label: '2021-2022 1',
                                value: 0
                            },
                            {
                                label: '2021-2022 2',
                                value: 1
                            },
                            {
                                label: '2021-2022 3',
                                value: 2
                            }
                        ]
                    },
                    {
                        model: 'upper_limit',
                        label: '人数上限',
                        type: 'input'
                    },
                    {
                        model: 'requirement',
                        label: '课程要求',
                        type: 'textInput'
                    },
                    {
                        model: 'introduction',
                        label: '课程简介',
                        type: 'textInput'
                    },
                    {
                        model: 'remark',
                        label: '备注',
                        type: 'textInput'
                    }
                ],
            //双向绑定↓
            operateForm: {
                curriculum_name: '',
                department: '',
                category: '',
                credit: '',
                teacher: '',
                requirement: '',
                introduction: '',
                remark: '',
                apply_state: '',
            },
            searchFormLabel: [
                {
                    model: 'keyword',
                    label: '',
                    type: 'input'
                }
            ],
            searchForm: {
                keyword: ''
            },
            tableData:[],
            tableLabel:[
                {
                    prop:"create_time",
                    label:"创建时间",
                    width: 120
                },
                {
                    prop:"curriculum_name",
                    label:"课程名称",
                    width: 300
                },
                // {
                //     prop:"department",
                //     label:"开设院系"
                // },
                {
                    prop:"category_label",
                    label:"课程类型",
                    width: 120
                },
                // {
                //     prop:"credit",
                //     label:"学分"
                // },
                {
                    prop:"teacher",
                    label:"主讲教师",
                    width: 150
                },
                {
                    prop:"credit",
                    label:"学分",
                    width: 50
                }
               ],
            config: {
                total: 30,
                page: 1
            }
        }
    },
    methods:{
        confirm(){
            // 要说明的是，这里不是调用了接口吗，真正的接口定义应该是在/api/data.js里
            // 但是因为我是用mock模拟的接口，所以这里暂时是在mock.js里面把接口拦住了（之前课程管理页也是用的这个方法）
            if (this.operateType === 'edit'){
                editCurriculum(
                    {operateForm: this.operateForm}
                ).then(res => {
                    const data = getData(res.data);
                    if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
                        this.isShow= false
                        this.getList()
                    }else{
                        this.$message.warning(data.message)
                    }
                })
            } else {
                createCurriculum(
                    {operateForm: this.operateForm}
                ).then(res => {
                    const data = getData(res.data);
                    if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
                        this.isShow= false
                        this.getList()
                    }else{
                        this.$message.warning(data.message)
                    }
                })
            }
        },
        newApplication(){
            this.isShow = true
            this.operateType = 'add'
            this.operateForm = {
                curriculum_name: '',
                department: '',
                category: '',
                credit: '',
                teacher: '',
                semester:'',
                upper_limit:'',
                requirement: '',
                introduction: '',
                remark: ''
            }
        },

        getList(curriculum_name = ''){
            this.config.loading =true
            curriculum_name ? (this.config.page = 1) : '' //搜索
            getCurriculum({
                page: this.config.page,
                curriculum_name
            }).then((res) => {
                const data = getData(res.data);
                if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
                    this.tableData = data.list.map(item => {
                        item.category_label = CONST.categoryList[item.category];
                        return item
                    })
                    this.config.total = data.count
                    this.config.loading = false
                }else{
                    this.$message.warning(data.message)
                }
            })
        },
        lookApplication(row){
            console.log("before",JSON.parse(JSON.stringify(row)))
            const to = this.$router.resolve({
                name: 'curriculumDetail',
                query: { curriculum_id: row.curriculum_id }
            })
            window.open(to.href, '_blank')
        },
        editApplication(row){
            this.isShow = true
            this.operateType = 'edit'
            this.operateForm = JSON.parse(JSON.stringify(row));//不能直接=row，因为这是vue 的双向数据绑定的弊端，实时更新数据，因为是一个数据源，因为在修改对象的时候，对象的指针直接指向页面数据了
        },
        delApplication(row){
            this.$confirm("此操作将永久删除该课程，是否继续？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then( () => {
                const curriculum_id = row.curriculum_id
                delCurriculum({
                    curriculum_id: curriculum_id
                }).then((res) =>{
                    const data = getData(res.data);
                    if (data.status === CONST.RESPONSE_STATUS.POSITIVE) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    }else{
                        this.$message.warning(data.message)
                    }
                })
            })
        },
    },
    //（生命周期）创造的时候就要调用
    created() {
        this.getList() 
    }
}
</script>

<style lang="less" scoped>
.application-header{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;//对齐
    margin-top: 20px;
}
.application{
  width: fit-content;
}
</style>
