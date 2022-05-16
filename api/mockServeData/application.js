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
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            date: Mock.Random.date(),
            department: Mock.Random.integer(0, 7),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            teacher: Mock.Random.cname(),
            requirement: Mock.Random.cparagraph(30, 60),
            introduction: Mock.Random.cparagraph(30, 60),
            remark: Mock.Random.cparagraph(20, 80)
        })
    )
}

export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getApplicationList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        const mockList = List.filter(application => {
            if (name && application.name.indexOf(name) === -1 && application.addr.indexOf(name) === -1) return false
            return true
        })
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
    createApplication: config => {
        const { name, department, category, credit, teacher, requirement, introduction, remark } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            date: Date(),
            name: name,
            department: department,
            category: category,
            credit: credit,
            teacher: teacher,
            requirement: requirement,
            introduction: introduction,
            remark: remark
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
    deleteApplication: config => {
        const { id } = param2Obj(config.url)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },
    /**
     * 批量删除
     * @param config
     * @return {{code: number, data: {message: string}}}
     */
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    },
    /**
     * 修改用户
     * @param name, department, category, credit, teacher, requirement, introduction, remark
     * @return {{code: number, data: {message: string}}}
     */
    updateApplication: config => {
        const { name, department, category, credit, teacher, requirement, introduction, remark } = JSON.parse(config.body)
        const category_num = parseInt(category)
        const credit_num = parseInt(credit)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.department = department
                u.category = category_num
                u.credit = credit_num
                u.teacher = teacher
                u.requirement = requirement
                u.introduction = introduction
                u.remark = remark
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