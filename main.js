import Vue from 'vue'
import App from './App'
import request from "./util/request/request.js"
import LoginInfo from "./util/device.js"

request.setConfig({

	baseUrl: 'http://118.190.27.135:8900', // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
	dataType: 'json', // 可删除，默认为json
	responseType: 'text', // 可删除，默认为text
})
request.interceptors.response(res => {
	if (res.statusCode == 200) {
		return res.data
	}
	return res; // 原样返回
})


Vue.prototype.$request = request;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
