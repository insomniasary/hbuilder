import request from "../util/request/request.js"
import BaseApi from "./BaseApi.js"
class userApi {
	header
	token
	data
	constructor() {

	}
	before() {
		this.token = uni.getStorageSync('X-Api-Token')
		this.data = {
			oaid: uni.getStorageSync('oaid'),
			imei: uni.getStorageSync("imei"),
			imei2: uni.getStorageSync("imei2"),
			"X-Api-Token": this.token,
		}
	}
	async UserInfo(){
		await this.before()
		var query = this.jsonToParams(this.data)
		var rest =  await request.get("apiv1/userInfo?"+query)
		console.log(rest)
		return rest
	}
	jsonToParams(data){
		return Object.keys(data).map(function (key) {
		        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
		    }).join("&");
			
	}
}
export default new userApi();