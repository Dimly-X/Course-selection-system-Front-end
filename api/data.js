import axios from './axios';
import CONST from "@/assets/consts";
import user from "@/store/user";
import router from "../router";

/**
 * Appliaction
 */
//over
export const responseToApplication = (params) => {
        return axios.request({
            url: '/admin/application/deal',
            method: 'post',
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
    return axios.request({
        url: '/teacher/application/del',
        method: 'post',
        data: params
    })
}

export const selectCurriculum = (para) => {
    return axios.request({
        url: '/student/enrollment/select',
        method: 'post',
        data: para
    })
}

export const getEnrollmentList = () => {
    return axios.request({
        url: '/student/enrollment/list',
        method: 'get',
    })
}
export const getSelectedList = (params) => {
    return axios.request({
        url: '/student/enrollment/selected',
        method: 'get',
        params
    })
}
export const delSelected = (params) => {
        return axios.request({
            url: '/student/enrollment/cancel',
            method: 'post',
            data: params
        })
    }
    //over
export const getCurriculumDetail = (params) => {
        if (params.curriculum_id) {
            return axios.request({
                url: '/curriculum/detail',
                method: 'get',
                params
            })
        } else if (params.apply_id) {
            return axios.request({
                url: '/admin/application/detail',
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
    return axios.request({
        url: '/admin/curriculum/del',
        method: 'post',
        data: params
    })
}

export const editApplication = (params) => {
    return axios.request({
        url: '/teacher/application/edit',
        method: 'post',
        data: params
    })
}

export const createApplication = (params) => {
    return axios.request({
        url: '/teacher/application/create',
        method: 'post',
        data: params
    })
}

export const editCurriculum = (params) => {
    return axios.request({
        url: '/admin/curriculum/edit',
        method: 'post',
        data: params
    })
}
export const createCurriculum = (params) => {
    return axios.request({
        url: '/admin/curriculum/create',
        method: 'post',
        data: params
    })
}

export const createEnrollment = (params) => {
        return axios.request({
            url: '/admin/enrollment/create',
            method: 'post',
            data: params
        })
    }
    /**
     * Menu
     */
export const tryLogin = (param) => {
        console.log("参数", param)
        return axios.request({
            url: '/login',
            method: 'post',
            data: param
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
        url: '/home',
        method: 'get'
    })
}

/**
 * Enrollment
 */
export const getEnrollment = (params) => {
    return axios.request({
        url: '/admin/enrollment/list',
        method: 'get',
        params
    })
}
export const editEnrollment = (params) => {
    return axios.request({
        url: '/admin/enrollment/edit',
        method: 'post',
        data: params
    })
}
export const deleteEnrollment = (params) => {
        return axios.request({
            url: '/admin/enrollment/del',
            method: 'post',
            data: params
        })
    }
    /**
     * Student_Score
     */
export const getScore = (params) => {
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
    return axios.request({
        url: '/teacher/curriculum/setscore',
        method: 'post',
        data: params
    })
}

export const getStudentList = (params) => {
    return axios.request({
        url: '/teacher/curriculum/studlist',
        method: 'get',
        params
    })
}
export const getMyCurriculumTable = () => {
    return axios.request({
        url: '/student/table',
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