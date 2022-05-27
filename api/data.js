import axios from './axios';

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

export const getApplication = (params) => {
    return axios.request({
        url: '/application/getApplication',
        method: 'get',
        params
    })
}

export const getEnrollment = (params) => {
    return axios.request({
        url: '/enrollment/getEnrollment',
        method: 'get',
        params
    })
}

export const getRelease = () => {
    return axios.request({
        url: 'http://localhost:8080/register/getRelease',
        method: 'get',
    })
}

export const getStudentList = (params) => {
    return axios.request({
        url: 'http://localhost:8080/register/getStudentList',
        method: 'get',
        params
    })
}