<template>
    <el-descriptions class="margin-top" title="课程信息" :column="1" :size="size" border>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-user"></i>
            课程名称
        </template>
            {{this.$route.query.curriculum.curriculum_name}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            开设院系
        </template>
            {{getDepartment()}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-location-outline"></i>
            课程类型
        </template>
            {{getCategory()}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            学分
        </template>
            {{this.$route.query.curriculum.credit}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-office-building"></i>
            主讲教师
        </template>
            {{this.$route.query.curriculum.teacher}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            开课学期
        </template>
            {{this.$route.query.curriculum.semester}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            人数上限
        </template>
            {{this.$route.query.curriculum.upper_limit}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            课程要求
        </template>
            {{this.$route.query.curriculum.requirement}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            课程介绍
        </template>
            {{this.$route.query.curriculum.introduction}}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
        </template>
            {{this.$route.query.curriculum.remark}}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>

export default{
    name:'CurriculumDetail',
    data(){
        return{}
    },
    methods:{
        getDepartment(){
            console.log("all",this.$route.query.curriculum)
            console.log("dep",this.$route.query.curriculum.department)
            let res="";
            let departmentList = ['软件工程学院','法学院','马克思主义学院','经济学院','社会发展学院','外语学院','国际汉语文化学院','心理与认知科学学院'];
            let myList=this.$route.query.curriculum.department;
            for (var i=0; i<myList.length; i++){
                res = res + departmentList[myList[i]];
                if(i!=myList.length-1)res+="，";
            }
            return res;
        },
        getCategory(){
            let categoryList = ['专业必修','专业任意选修','学科基础课','分布式课程','体育类','思政类','英语类'];
            return categoryList[this.$route.query.curriculum.category]
        }
    }
}
</script>