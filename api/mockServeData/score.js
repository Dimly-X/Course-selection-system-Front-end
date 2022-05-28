import Mock from 'mockjs'
import CONST from '@/assets/consts'

let List = []
const count = 5
let grades = "ABCF"
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2021-2022 2",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2020-2021 2",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2021-2022 1",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2020-2021 1",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2021-2022 3",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            curriculum_id: Mock.Random.guid(),
            curriculum_name: Mock.Random.cword(4, 8),
            category: Mock.Random.integer(0, 6),
            credit: Mock.Random.integer(1, 5),
            semester: "2020-2021 3",
            usual: Mock.Random.integer(60, 100),
            final: Mock.Random.integer(60, 100),
            total: Mock.Random.integer(60, 100),
            grade: Mock.Random.character(grades),
            GP: 4.0
        })
    )
}

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

export default {
    getScore: config => {
        console.log("score.js", config)
        const { search_year, search_semester } = param2Obj(config.url)
        const mockList = List.filter(curriculum => {
            if (search_year && curriculum.semester.substring(0, 9) != search_year) return false
            if (search_semester && curriculum.semester.substring(10, 11) != search_semester) return false
            return true
        })
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                list: mockList
            }
        }
    }
}