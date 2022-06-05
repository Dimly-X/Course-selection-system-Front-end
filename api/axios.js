import axios from "axios";
import config from "../config";

//拿到请求的接口地址
const baseUrl = 'https://api.virapi.com/vir_github1d2e1gfa4ba78/course'
    //'/course'
    //'http://brog.rainspace.cn:8080/course'
    //'https://api.virapi.com/vir_github1d2e1gfa4ba78/course'
class HttpRequest {

    constructor(url) {
        this.baseUrl = url
    }
    getInsideConfig() {
            const config = {
                baseUrl: this.baseUrl,
                header: {}
            }
            return config
        }
        //拦截器
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function(config) {
            // 在发送请求之前做些什么
            config.headers['app-token'] = '$2a$10$lBIab5K2jhEEiU21jE06b.r56UQMv2I80z8ecoPILM.HVzE0cc50m'
            config.baseURL = baseUrl
            return config;
        }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response) {
            console.log(response, 'response')
                // 对响应数据做点什么
            return response;
        }, function(error) {
            console.log(error, 'error')
                // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(options) {
        const instance = axios.create()
        options = {...this.getInsideConfig(), ...options }
        this.interceptors(instance)
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)