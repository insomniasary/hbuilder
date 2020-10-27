
import request from "../util/request/request.js"
import BaseApi from "./BaseApi.js"


class gameApi{
	header
	token
	data
	constructor() {

	}
	before(){
			this.token = uni.getStorageSync('X-Api-Token')
			this.data = {
				oaid:uni.getStorageSync('oaid'),
				imei:uni.getStorageSync("imei"),
				imei2:uni.getStorageSync("imei2"),
				"X-Api-Token":this.token,
			}
		}
	async gameList(c){
		await this.before()
		const data = {
			...this.data,
			...c
		}
		var query = this.jsonToParams(data)
		var rest =  await request.get("apiV1/gameList?"+query)
		
		return rest
	}
	
	async getDetail(c){
		await this.before()
		const data = {
			...this.data,
			...c
		}
		var query = this.jsonToParams(data)
		var rest = await request.get("/apiV1/gameDetail?"+query)
		return rest
	}
	
	async getAppcpxList(c){
		await this.before()
		const data = {
			...this.data,
			...c
		}
		var query = this.jsonToParams(data)
		var rest = await request.get("/apiV1/cpxGame?"+query)
		return rest
	}
	async getAppcpxDetail(c){
		await this.before()
		const data = {
			...this.data,
			...c
		}
		var query = this.jsonToParams(data)
		console.log(query)
		var rest = await request.get("/apiV1/cpxDetail?"+query)
		return rest
	}
	jsonToParams(data){
		return Object.keys(data).map(function (key) {
		        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
		    }).join("&");
			
	}

}

export default new gameApi();