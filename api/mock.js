import Mock from 'mockjs'
import applicationApi from './mockServeData/application'
import curriculumApi from './mockServeData/curriculium'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'
import enrollmentApi from './mockServeData/enrollment'
import curriculumDetailApi from './mockServeData/curriculumDetail'
import scoreApi from './mockServeData/score'

//接受一个函数，调用这个函数的适合就能拿到我们响应的数据（通过mock模拟的）事实上就是在它尝试真的去找api之前就先拦住它
Mock.mock('/home', homeApi.getStatisticalData)


Mock.mock(/application\/add/, 'post', applicationApi.createApplication)
Mock.mock(/application\/edit/, 'post', applicationApi.updateApplication)
Mock.mock(/application\/getApplication/, 'get', applicationApi.getApplicationList)
Mock.mock(/application\/deal/, 'post', applicationApi.dealApplication)




Mock.mock(/application\/del/, 'post', applicationApi.deleteApplication)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

Mock.mock(RegExp('/application/curriculum_detail*'), 'get', curriculumDetailApi.getStatisticalData)




Mock.mock(/enrollment\/add/, 'post', enrollmentApi.createEnrollment)
Mock.mock(/enrollment\/edit/, 'post', enrollmentApi.updateEnrollment)
Mock.mock(/enrollment\/getEnrollment/, 'get', enrollmentApi.getEnrollmentList)
Mock.mock(/enrollment\/del/, 'post', enrollmentApi.deleteEnrollment)


Mock.mock(/score\/getScore/, 'get', scoreApi.getScore)


Mock.mock(/curriculum\/add/, 'post', curriculumApi.createCurriculum)
Mock.mock(/curriculum\/edit/, 'post', curriculumApi.updateCurriculum)
Mock.mock(/curriculum\/getCurriculum/, 'get', curriculumApi.getCurriculumList)
Mock.mock(/curriculum\/del/, 'post', curriculumApi.deleteCurriculum)