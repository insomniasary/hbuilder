import request from "./request/request.js"
class LoginInfo{
	async getDevice(){
		return new Promise(
			(resolve, reject)=>{
				plus.device.getOAID({
					success:function(e){
						console.log(e)
						uni.setStorageSync("oaid",e.oaid)
						resolve(e)
					},
					fail:function(e){
						console.log(e)
						plus.device.getInfo({
							success:function(e){
								uni.setStorageSync("imeis",e.imei)
								resolve(e)
							},
							fail:function(e){
								resolve(e)
							}
						})
					}
				})
			}
		);
	}
}
if (!global.LoginInfo) {
  global.LoginInfo = new LoginInfo();
}

export default global.LoginInfo;