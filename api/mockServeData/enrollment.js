import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 3

List.push(
    Mock.mock({
        enrollment_id: Mock.Random.guid(),
        enrollment_name: "第一轮选课",
        start_time: Mock.Random.datetime(),
        end_time: Mock.Random.datetime()
    })
)
List.push(
    Mock.mock({
        enrollment_id: Mock.Random.guid(),
        enrollment_name: "第二轮选课",
        start_time: Mock.Random.datetime(),
        end_time: Mock.Random.datetime()
    })
)
List.push(
    Mock.mock({
        enrollment_id: Mock.Random.guid(),
        enrollment_name: "第三轮选课",
        start_time: Mock.Random.datetime(),
        end_time: Mock.Random.datetime()
    })
)


export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getEnrollmentList: config => {
        console.log("get", JSON.parse(config.body))
        const { page = 1, limit = 10 } = param2Obj(config.url)
        const mockList = List
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * 增加申请
     * @param  name, department, category, credit, teacher, requirement, introduction, remark
     * @return {{code: number, data: {message: string}}}
     */
    createEnrollment: config => {
        const { enrollment_name, start_time, end_time } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            enrollment_id: Mock.Random.guid(),
            enrollment_name: enrollment_name,
            start_time: start_time,
            end_time: end_time
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    /**
     * 删除用户
     * @param id
     * @return {*}
     */
    deleteEnrollment: config => {
        //const { apply_id } = param2Obj(config.url)
        const body = JSON.parse(config.body)
        const enrollment_id = body.params.enrollment;
        if (!enrollment_id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.enrollment_id !== enrollment_id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },

    /**
     * 修改用户
     * @param name, department, category, credit, teacher, requirement, introduction, remark
     * @return {{code: number, data: {message: string}}}
     */
    updateEnrollment: config => {
        const { enrollment_id, enrollment_name, start_time, end_time } = JSON.parse(config.body)
        List.some(u => {
            if (u.enrollment_id === enrollment_id) {
                u.enrollment_name = enrollment_name
                u.start_time = start_time
                u.end_time = end_time
                console.log("编辑完成", u.apply_state)
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }
}