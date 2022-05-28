import axios from './axios';
import CONST from "@/assets/consts";
import user from "@/store/user";
import router from "../router";

export const getCurriculumDetail = (params) => {
    console.log("para", JSON.stringify(params))
    return axios.request({
        url: '/application/curriculum/detail',
        method: 'get',
        params
    })
}

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getHomeData = () => {
    return axios.request({
        url: '/home',
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

export const getScore = (params) => {
    console.log("data.js", params)
    return axios.request({
        url: '/score/getScore',
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
export const getData = (datapackage) => {
    if (datapackage.code === CONST.RESPONSE_CODE.ACCEPTED) {
        return datapackage.data
    }
    if (datapackage.code === CONST.RESPONSE_CODE.EXCEPTION) {
        if (datapackage.message) {
            alert(datapackage.message)
        } else {
            alert(CONST.STRING.ERROR);
        }
        return null
    }
    if (datapackage.code === CONST.RESPONSE_CODE.UNAUTHORIZED) {
        if (datapackage.message) {
            alert(datapackage.message)
        } else {
            alert(CONST.STRING.UNAUTHORIZED);
        }
        user.mutations.clearToken(user.state)
        router.push({
            name: 'login'
        })
    }
}