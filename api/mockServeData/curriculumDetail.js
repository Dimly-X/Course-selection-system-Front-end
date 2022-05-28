import Mock from 'mockjs'
import CONST from '@/assets/consts'
// 图表数据
export default {
    getStatisticalData: options => {
        console.log("log",JSON.stringify(options))
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                apply_id: 'config.apply_id',
                apply_state: '234',
                apply_state_label: '345',
                apply_time: '123',
                category: '1',
                category_label: '123',
                credit: '123',
                curriculum_name: '123',
                department: '123',
                introduction: //'12312333333333333333333333333333333333333333333333333333333333333333333333' +
                    //'123333333333333333333333333333333333333333333333333333333333333' +
                   // '123333333333333333333333333333333333333333333333333333333333333' +
                   // '333333333333333333333333333333333333333333333' +
                    '33333333333333333333333333333333312333333333',
                remark: '123',
                requirement: '123',
                semester: '123',
                teacher: '123',
                upper_limit: '123',
            }
        }
    }
}