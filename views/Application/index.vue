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
                <el-button type="primary" @click="getList">搜索</el-button>
            </common-form>
        </div>
        <div class="application-table" >
            <el-table

                :data="tableData"
                height="height:100%"
                style="width: 100%"
                border>
                <el-table-column
                    label="申请时间"
                    sortable
                    align="center"
                    header-align="center"
                    prop="date">
                </el-table-column>
                <el-table-column
                    label="课程名称"
                    align="center"
                    header-align="center"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="开设院系"
                    align="center"
                    header-align="center"
                    prop="department">
                </el-table-column>
                <el-table-column
                    label="课程类别"
                    align="center"
                    header-align="center"
                    prop="category">
                </el-table-column>
                <el-table-column
                    label="学分"
                    align="center"
                    header-align="center"
                    prop="credit">
                </el-table-column>
                <el-table-column
                    label="教师"
                    align="center"
                    header-align="center"
                    prop="teacher">
                </el-table-column>
                <el-table-column
                    label="详情"
                    align="center"
                    header-align="center"
                >
                <template>
                    <el-link type="primary">查看</el-link>
                </template>
                </el-table-column>
                <el-table-column
                label="操作"
                align="center"
                header-align="center">
                <template>
                    <el-button
                        size="mini"
                        @click="handleEdit">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- @current-change是改变页数的时候的回调函数 -->
            <el-pagination
                class="pager"
                layout="prev, pager, next"
                :total="config.total"
                :current-page.sync="config.page"
                @current-change="changePage"
                page-size="20"
                >
            </el-pagination>
        </div>
    </div>
</template>
<script>

import CommonForm from '@/components/CommonForm'
export default{
    name:'Application',
    components:{
        CommonForm
    },
    data(){
        return{
            operateType: 'add',
            isShow: false,
            operateFormLabel: [
                    {
                        model: 'name',
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
                name: '',
                department: '',
                category: '',
                credit: '',
                teacher: '',
                requirement: '',
                introduction: '',
                remark: ''
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
            tableData:[{
                date: '2016-05-02',
                name: '高级编程',
                department: '软件工程学院',
                category: '专业任意选修',
                credit: '2',
                teacher: '陈老师',
                requirement: '无',
                introduction: '无',
                remark: '无'
            }],
            config: {
                total: 1,
                page: 1
            }
        }
    },
    methods:{
        confirm(){
            // 要说明的是，这里不是调用了接口吗，真正的接口定义应该是在/api/data.js里
            // 但是因为我们是用mock模拟的接口，所以这里暂时是在mock.js里面把接口拦住了（之前课程管理页也是用的这个方法）
            if (this.operateType === 'edit'){
                this.$http.post('/application/edit', this.operateForm).then(res => {
                    console.log(res)
                    this.isShow= false
                })
            } else {
                this.$http.post('/application/add', this.operateForm).then(res => {
                    console.log(res)
                    this.isShow= false
                })
            }
        },
        newApplication(){
            this.isShow = true
            this.operateType = 'add'
            this.operateForm = {
                name: '',
                department: '',
                category: '',
                credit: '',
                teacher: '',
                requirement: '',
                introduction: '',
                remark: ''
            }
        },
        getList(){

        },
        changePage(){
            
        },
        handleEdit(){

        },
        handleDelete(){

        }
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
.application-table{
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;
    .pager{
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>
