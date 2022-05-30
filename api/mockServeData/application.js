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

let departmentList = ['软件工程学院', '法学院', '马克思主义学院', '经济学院', '社会发展学院', '外语学院', '国际汉语文化学院', '心理与认知科学学院'];
let categoryList = ['专业必修', '专业任意选修', '学科基础课', '分布式课程', '体育类', '思政类', '英语类'];
let statusList = ['待处理', '通', '拒绝'];
let List = []
let ApplicationList = []
const count = 200
for (let i = 0; i < count; i++) {
    ApplicationList.push(
        Mock.mock({
            apply_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            teacher: Mock.Random.cname(),
            apply_time: Mock.Random.date(),
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            apply_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            department: Mock.Random.range(0, 7, 2),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            teacher: Mock.Random.cname(),
            semester: "2021-2022 2",
            upper_limit: Mock.Random.integer(30, 100),
            apply_time: Mock.Random.date(),
            requirement: Mock.Random.cparagraph(1, 3),
            introduction: Mock.Random.cparagraph(1, 3),
            remark: Mock.Random.cparagraph(1, 3),
            apply_state: Mock.Random.integer(0, 2)
        })
    )
}
import CONST from '@/assets/consts'
import App from "@/App";
export default {
    dealApplication: config => {
      return {
          code: CONST.RESPONSE_CODE.ACCEPTED,
          data:{
              status: CONST.RESPONSE_STATUS.NEGATIVE,
              message: JSON.stringify(config.body)
          }
      }
    },
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getApplicationList: config => {
        console.log("get",JSON.stringify(config))
        const { page = 1, entry_per_page = 10 } = param2Obj(config.url)
        console.log( 'page:' + page, '分页大小limit:' + entry_per_page)
        const mockList = ApplicationList
        const pageList = mockList.filter((item, index) => index < entry_per_page * page && index >= entry_per_page * (page - 1))
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                count: mockList.length,
                list: pageList
            }
        }
    },
    getCurricuList: config => {
        console.log("get",JSON.stringify(config))
        const { search_key = '', page = 1, entry_per_page = 10 } = param2Obj(config.url)
        console.log('name:' + search_key, 'page:' + page, '分页大小limit:' + entry_per_page)
        const mockList = List.filter(application => {
            if (search_key && application.curriculum_name.indexOf(search_key) === -1 && application.teacher.indexOf(search_key) === -1 && categoryList[application.category].indexOf(search_key) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < entry_per_page * page && index >= entry_per_page * (page - 1))
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                count: mockList.length,
                list: pageList
            }
        }
    },
    /**
     * 增加申请
     * @param  name, department, category, credit, teacher, requirement, introduction, remark
     * @return {{code: number, data: {message: string}}}
     */
    createApplication: config => {
        const { curriculum_name, department, category, credit, teacher, semester, upper_limit, requirement, introduction, remark } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            apply_id: Mock.Random.guid(),
            curriculum_name: curriculum_name,
            department: department,
            category: category,
            credit: credit,
            teacher: teacher,
            semester: semester,
            upper_limit: upper_limit,
            apply_time: Date(),
            requirement: requirement,
            introduction: introduction,
            remark: remark,
            apply_state: 0,
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
        //const { apply_id } = param2Obj(config.url)
        const body = JSON.parse(config.body)
        const apply_id = body.params.apply_id;
        if (!apply_id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.apply_id !== apply_id)
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
        List = List.filter(u => !ids.includes(u.apply_id))
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
        const { apply_id, curriculum_name, department, category, credit, teacher, semester, upper_limit, requirement, introduction, remark, apply_state } = JSON.parse(config.body)
        const category_num = parseInt(category)
        const credit_num = parseInt(credit)
        const apply_state_num = parseInt(apply_state)
        List.some(u => {
            if (u.apply_id === apply_id) {
                u.curriculum_name = curriculum_name
                u.department = department
                u.category = category_num
                u.credit = credit_num
                u.teacher = teacher
                u.semester = semester
                u.upper_limit = upper_limit
                u.requirement = requirement
                u.introduction = introduction
                u.remark = remark
                u.apply_state = apply_state_num
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