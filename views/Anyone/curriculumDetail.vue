<template>
  <div class="detail_outer">
    <el-descriptions class="margin-top"
                     v-loading="config.loading"
                     title="课程信息"
                     :column="1"
                     :size="size" border
                     labelStyle="word-break:keep-all"
                     contentStyle="max-width: 400px; word-break: break-all">
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          课程名称
        </template>
        {{ curriculum.curriculum_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          开设院系
        </template>
        {{ curriculum.department }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          课程类型
        </template>
        {{ curriculum.category }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          学分
        </template>
        {{ curriculum.credit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          主讲教师
        </template>
        {{ curriculum.teacher }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          开课学期
        </template>
        {{ curriculum.semester }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          课程时间
        </template>
        {{ curriculum.time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          人数上限
        </template>
        {{ curriculum.upper_limit }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          课程要求
        </template>
        {{ curriculum.requirement }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          课程介绍
        </template>
        {{ curriculum.introduction }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ curriculum.remark }}
      </el-descriptions-item>
      <el-descriptions-item v-if="curriculum.status">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ curriculum.status?'通过':'驳回' }}
      </el-descriptions-item>
      <el-descriptions-item v-if="curriculum.feedback">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          反馈
        </template>
        {{ curriculum.feedback }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

import {getCurriculumDetail, getData} from '../../api/data'
import CONST from '@/assets/consts'

export default {
  name: 'CurriculumDetail',
  data() {
    return {
      config:{
        loading: false
      },
      curriculum: {
        category: '',
        credit: '',
        curriculum_name: '',
        department: '',
        introduction: '',
        remark: '',
        requirement: '',
        semester: '',
        time: '',
        teacher: '',
        upper_limit: '',
      }
    }
  },
  methods: {
    transTime() {
      this.curriculum.time.sort((a, b) => {
        return a - b
      })
      var last = ''
      var timeStr = ''
      for (var i = 0; i < this.curriculum.time.length; i++) {
        const day = CONST.getDay(this.curriculum.time[i])
        const time = CONST.getTime(this.curriculum.time[i])
        if (last !== day) {
          timeStr += day + ': '
          last = day
        }
        timeStr += time + ', '
      }
      this.curriculum.time = timeStr
    },
    transDept() {
      var dept_str = ''
      for (var i = 0; i < this.curriculum.department.length; i++) {
        dept_str += CONST.departmentList[this.curriculum.department[i]]
        if (i < this.curriculum.department.length - 1) {
          dept_str += ', '
        }
      }
      this.curriculum.department = dept_str
    },
    pullData() {
      this.config.loading = true
      getCurriculumDetail(this.$route.query).then((res) => {
        this.curriculum = getData(res.data)
        this.curriculum.category = CONST.categoryList[this.curriculum.category]
        this.transDept()
        this.transTime()
        this.config.loading = false
      })
    }
  },
  created() {
    this.pullData()
  }

}

</script>
<style>
.detail_outer {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 100px auto;
}
</style>