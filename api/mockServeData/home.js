// mock数据模拟
import Mock from 'mockjs'
import CONST from '@/assets/consts'
// 图表数据
export default {
    getStatisticalData: () => {
        return {
            code: CONST.RESPONSE_CODE.ACCEPTED,
            data: {
                personal_name: 'apple',
                user_role: CONST.USER_ROLE.STUDENT,
                user_school: 'college',
                user_id: '123456'
            }
        }
    }
}