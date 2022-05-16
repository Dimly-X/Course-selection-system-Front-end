import Mock from 'mockjs'
import applicationApi from './mockServeData/application'
import homeApi from './mockServeData/home'

//接受一个函数，调用这个函数的适合就能拿到我们响应的数据（通过mock模拟的）事实上就是在它尝试真的去找api之前就先拦住它
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/application\/add', applicationApi.createApplication)
Mock.mock('/application\/edit', applicationApi.updateApplication)