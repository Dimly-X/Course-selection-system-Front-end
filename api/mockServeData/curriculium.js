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
const count = 300

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            teacher: Mock.Random.cname(),
            create_time: Mock.Random.date(),
        })
    )
}
import CONST from '@/assets/consts'
export default {

    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getCurriculumList: config => {
        console.log("get", JSON.stringify(config))
        const { search_key, page, entry_per_page } = param2Obj(config.url)
        console.log('name:' + search_key, 'page:' + page, '分页大小limit:' + entry_per_page)
        const mockList = List.filter(curriculum => {
            if (search_key && curriculum.curriculum_name.indexOf(search_key) === -1 && curriculum.teacher.indexOf(search_key)
                === -1 && CONST.categoryList[curriculum.category].indexOf(search_key) === -1) return false
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
     * 增加课程
     * @param  curriculum_name, department, category, credit, teacher, semester, upper_limit, requirement, introduction, remark, curriculum_time
     * @return {{code: number, data: {message: string}}}
     */

    createCurriculum: config => {
        const { curriculum_name, department, category, credit, teacher, semester, upper_limit, requirement, introduction, remark, curriculum_time } = JSON.parse(config.body).operateForm
        console.log(JSON.parse(config.body))
        List.unshift({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: curriculum_name,
            department: department,
            category: category,
            credit: credit,
            teacher: teacher,
            semester: semester,
            upper_limit: upper_limit,
            create_time: Date(),
            requirement: requirement,
            introduction: introduction,
            remark: remark,
            curriculum_time: curriculum_time,
            selected: 0
        })
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                message: '添加成功',
                status: CONST.RESPONSE_STATUS.POSITIVE
            }
        }
    },
    /**
     * 删除课程
     * @param curriculum_id
     * @return {*}
     */
    deleteCurriculum: config => {
        //const { apply_id } = param2Obj(config.url)
        const body = JSON.parse(config.body)
        const curriculum_id = body.curriculum_id;
        console.log("del", body)
        if (!curriculum_id) {
            return {
                code: CONST.RESPONSE_CODE.ACCEPTED,
                data: {
                    status: CONST.RESPONSE_STATUS.NEGATIVE,
                    message: '参数不正确'
                }
            }
        } else {
            List = List.filter(u => u.curriculum_id !== curriculum_id)
            return
        }
    },

    /**
     * 修改课程
     * @param name, department, category, credit, teacher, requirement, introduction, remark
     * @return {{code: number, data: {message: string}}}
     */
    updateCurriculum: config => {
        console.log("updata", config.body)
        const { curriculum_id, curriculum_name, department, category, credit, teacher, semester, upper_limit, requirement, introduction, remark, curriculum_time } = JSON.parse(config.body).operateForm
        const category_num = parseInt(category)
        const credit_num = parseInt(credit)
        List.some(u => {
            if (u.curriculum_id === curriculum_id) {
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
                u.curriculum_time = curriculum_time
                    // return true？？？
            }
        })
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                message: '编辑成功',
                status: CONST.RESPONSE_STATUS.POSITIVE
            }
        }
    }
}