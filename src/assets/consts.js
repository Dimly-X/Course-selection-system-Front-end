export default {
    name: 'CONST',
    RESPONSE_CODE: {
        EXCEPTION: -2,
        UNAUTHORIZED: -1,
        ACCEPTED: 0
    },
    RESPONSE_STATUS: {
        POSITIVE: true,
        NEGATIVE: false
    },
    USER_ROLE: {
        STUDENT: 1,
        TEACHER: 2,
        ADMIN: 3
    },
    STRING: {
        ERROR: '未知错误',
        UNAUTHORIZED: '没有权限'
    },
    categoryList: ['专业必修', '专业任意选修', '学科基础课', '分布式课程', '体育类', '思政类', '英语类'],
    departmentList: ['软件工程学院', '法学院', '马克思主义学院', '经济学院', '社会发展学院', '外语学院', '国际汉语文化学院', '心理与认知科学学院'],
    statusList: ['待处理', '通过', '拒绝']
}