import axios from './axios';
import CONST from "@/assets/consts";
import user from "@/store/user";
import router from "../router";

/**
 * Appliaction
 */
//over
export const responseToApplication = (params) => {
        console.log(JSON.stringify(params))
        return axios.request({
            url: '/admin/application',
            method: 'put',
            data: params
        })
    }
    //over
export const getApplication = () => {
        return axios.request({
            url: '/admin/application/list',
            method: 'get',
        })
    }
    //

export const delApplication = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/teacher/application',
        method: 'delete',
        params
    })
}

export const selectCurriculum = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/student/enrollment/select',
        method: 'post',
        data: params
    })
}

export const getEnrollmentList = () => {
    return axios.request({
        url: '/student/enrollment/list',
        method: 'get',
    })
}
export const getSelectedList = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/student/enrollment/selected',
        method: 'get',
        params
    })
}
export const delSelected = (params) => {
    console.log(JSON.stringify(params))
        return axios.request({
            url: '/student/enrollment',
            method: 'delete',
            params
        })
    }
    //over
export const getCurriculumDetail = (params) => {
    console.log(JSON.stringify(params))
        if (params.curriculum_id) {
            return axios.request({
                url: '/curriculum/detail',
                method: 'get',
                params
            })
        } else if (params.apply_id) {
            return axios.request({
                url: '/admin/application',
                method: 'get',
                params
            })
        }
    }
    /**
     * Curriculum
     */
export const getCurriculum = () => {
    return axios.request({
        url: '/admin/curriculum/list',
        method: 'get',
    })
}
export const delCurriculum = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/admin/curriculum',
        method: 'delete',
        params
    })
}

export const editApplication = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/teacher/application',
        method: 'put',
        data: params
    })
}

export const createApplication = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/teacher/application',
        method: 'post',
        data: params
    })
}

export const editCurriculum = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/admin/curriculum',
        method: 'put',
        data: params
    })
}
export const createCurriculum = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/admin/curriculum',
        method: 'post',
        data: params
    })
}

export const createEnrollment = (params) => {
    console.log(JSON.stringify(params))
        return axios.request({
            url: '/admin/enrollment',
            method: 'post',
            data: params
        })
    }
    /**
     * Menu
     */
export const tryLogin = (params) => {
        console.log(JSON.stringify(params))
        return axios.request({
            url: '/login',
            method: 'post',
            data: params
        })
    }
    // export const tryLogout = () => {
    //     return axios.request({
    //         url: '/logout',
    //         method: 'post'
    //     })
    // }


/**
 * Any_Home
 */
export const getHomeData = () => {
    return axios.request({
        url: '/anyone/home',
        method: 'get'
    })
}

/**
 * Enrollment
 */
export const getEnrollment = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/admin/enrollment/list',
        method: 'get',
        params
    })
}
export const editEnrollment = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/admin/enrollment',
        method: 'put',
        data: params
    })
}
export const deleteEnrollment = (params) => {
    console.log(JSON.stringify(params))
        return axios.request({
            url: '/admin/enrollment',
            method: 'delete',
            params
        })
    }
    /**
     * Student_Score
     */
export const getScore = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/student/score',
        method: 'get',
        params
    })
}

/**
 * ScoreRelease
 */
export const getCurriculumList = () => {
    return axios.request({
        url: '/teacher/curriculum/list',
        method: 'get'
    })
}

export const setScore = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/teacher/curriculum/setscore',
        method: 'post',
        data: params
    })
}

export const getStudentList = (params) => {
    console.log(JSON.stringify(params))
    return axios.request({
        url: '/teacher/curriculum/studlist',
        method: 'get',
        params
    })
}
export const getMyCurriculumTable = () => {
    return axios.request({
        url: '/anyone/table',
        method: 'get'
    })
}

export const getMyApplications = () => {
    return axios.request({
        url: '/teacher/application/list',
        method: 'get'
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