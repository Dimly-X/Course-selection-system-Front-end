import Mock from 'mockjs'
import applicationApi from './mockServeData/application'
import curriculumApi from './mockServeData/curriculium'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'
import enrollmentApi from './mockServeData/enrollment'
import curriculumDetailApi from './mockServeData/curriculumDetail'
import scoreApi from './mockServeData/score'

//接受一个函数，调用这个函数的适合就能拿到我们响应的数据（通过mock模拟的）事实上就是在它尝试真的去找api之前就先拦住它
// Mock.mock('/home', homeApi.getStatisticalData)
// Mock.mock(/login/, 'post', permissionApi.tryLogin)
//
//
//
// Mock.mock(/admin\/application\/list/, 'get', applicationApi.getApplicationList)
// Mock.mock(/admin\/application\/deal/, 'post', applicationApi.dealApplication)
// Mock.mock(/admin\/application\/detail*/, 'get', curriculumDetailApi.getStatisticalData)
//
//
// Mock.mock(/admin\/curriculum\/list/, 'get', curriculumApi.getCurriculumList)
// Mock.mock(/admin\/curriculum\/detail*/, 'get', curriculumDetailApi.getStatisticalData)
// Mock.mock(/admin\/curriculum\/del/, 'post', curriculumApi.deleteCurriculum)
// Mock.mock(/admin\/curriculum\/edit/, 'post', curriculumApi.updateCurriculum)
// Mock.mock(/admin\/curriculum\/add/, 'post', curriculumApi.updateCurriculum)
//
//
// Mock.mock(/admin\/enrollment\/list/, 'get', enrollmentApi.getEnrollmentList)
//
//
//
// Mock.mock(/application\/del/, 'post', applicationApi.deleteApplication)
//
//
//
//
//
//
//
// Mock.mock(/enrollment\/add/, 'post', enrollmentApi.createEnrollment)
// Mock.mock(/enrollment\/edit/, 'post', enrollmentApi.updateEnrollment)
//
// Mock.mock(/enrollment\/del/, 'post', enrollmentApi.deleteEnrollment)
//
//
// Mock.mock(/score\/getScore/, 'get', scoreApi.getScore)
//
//
// Mock.mock(/curriculum\/add/, 'post', curriculumApi.createCurriculum)
//
//
// Mock.mock(/application\/add/, 'post', applicationApi.createApplication)
// Mock.mock(/application\/edit/, 'post', applicationApi.updateApplication)
