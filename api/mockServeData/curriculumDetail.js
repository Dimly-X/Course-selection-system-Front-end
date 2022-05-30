import Mock from 'mockjs'
import CONST from '@/assets/consts'
// 图表数据
export default {
    getStatisticalData: config => {
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                category: 1,
                credit: 2,
                curriculum_name: config.url,
                department: [0, 1, 2],
                introduction: 'xxx',
                remark: 'xx',
                requirement: 'xx',
                semester: 'xx',
                time: [4,5,11,12],
                teacher: 'xx',
                upper_limit: 12,
            }
        }
    }
}