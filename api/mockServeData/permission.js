import Mock from 'mockjs'
import CONST from '@/assets/consts'
export default {
    tryLogin: (config) => {
        console.log(config);
        const { user_name, password } = JSON.parse(config.body)
        console.log("body", JSON.parse(config.body))
            // 先判断用户是否存在
            // 判断账号和密码是否对应
        console.log("username", user_name)
        console.log("password", password)
        if (user_name === 'admin' && password === 'admin') {
            return{
                code: CONST.RESPONSE_CODE.ACCEPTED,
                data: {
                    status: true,
                    user_role: 2,
                    token: Mock.Random.guid(),
                    message: '教务登录成功'
                }
            }
        } else if (user_name === 'teacher' && password === 'teacher') {
            return {
                code: CONST.RESPONSE_CODE.ACCEPTED,
                data: {
                    status: true,
                    user_role: 1,
                    token: Mock.Random.guid(),
                    message: '教师登录成功'
                }
            }
        } else if (user_name === 'student' && password === 'student') {
            return {
                code: CONST.RESPONSE_CODE.ACCEPTED,
                data: {
                    status: true,
                    user_role: 0,
                    token: Mock.Random.guid(),
                    message: '学生登录成功'
                }
            }
        }else {
            return {
                code: CONST.RESPONSE_CODE.ACCEPTED,
                data: {
                    status: false,
                    message: '账户或密码错误'
                }
            }
        }

    }
}