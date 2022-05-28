<template>
    <div class="application">
        <el-dialog 
            :title="operateType === 'add' ? '新课程申请' : '编辑申请' "
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
            <el-button type="primary" @click="newApplication">+ 申请</el-button>
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
                @look="lookApplication()"
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
import { getApplication } from '../../api/data'
import CurriculumDetail from '../curriculumDetail/curriculumDetail.vue'
import CONST from '@/assets/consts'

export default{
    name:'Application',
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
                    prop:"apply_time",
                    label:"申请时间",
                    width: 120
                },
                {
                    prop:"curriculum_name",
                    label:"课程名称",
                    width: 300
                },
                {
                    prop:"category_label",
                    label:"课程类型",
                    width: 120
                },
                {
                    prop:"teacher",
                    label:"主讲教师",
                    width: 150
                },
                {
                    prop:"apply_state_label",
                    label:"申请状态",
                    width: 80
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
            if (this.operateType === 'edit'){
                this.$http.post('/application/edit', this.operateForm).then(res => {
                    console.log(this.operateForm)
                    console.log(res)
                    this.isShow= false
                    this.getList()
                })
            } else {
                this.$http.post('/application/add', this.operateForm).then(res => {
                    console.log(this.operateForm)
                    console.log(res)
                    this.isShow= false
                    this.getList()
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
            getApplication({
                page: this.config.page,
                curriculum_name
            }).then(({ data:res }) => {
                console.log(res,'res')
                //回调函数，res是接口的响应值
                this.tableData = res.list.map(item => {
                    item.category_label = CONST.categoryList[item.category];
                    item.apply_state_label = CONST.statusList[item.apply_state];
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
        },
        lookApplication(row){
            console.log("before",row)
            this.$router.push({
                name: 'curriculumDetail',
                query: { curriculum: JSON.parse(JSON.stringify(row)) }
            })
        },
        editApplication(row){
            this.isShow = true
            this.operateType = 'edit'
            this.operateForm = JSON.parse(JSON.stringify(row));//不能直接=row，因为这是vue 的双向数据绑定的弊端，实时更新数据，因为是一个数据源，因为在修改对象的时候，对象的指针直接指向页面数据了
        },
        delApplication(row){
            this.$confirm("此操作将永久删除该申请，是否继续？","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then( () => {
                const apply_id = row.apply_id
                this.$http.post("/application/del",{
                    params: { apply_id }
                }).then(() =>{
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getList()
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
