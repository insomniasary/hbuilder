import request from "../util/request/request.js"
class BaseApi {
	deviceId
	constructor() {
		this.init()
	}
	async init() {
		var that = this

		var Build = plus.android.importClass("android.os.Build");
		var androidosv = Build.VERSION.SDK_INT;
		if (androidosv >= 29) {
			plus.device.getOAID({
				success: function(e) {
					uni.setStorageSync("oaid", e.oaid)
					that.Login(e.oaid)
				},
				fail: function(e) {
					console.log('getOAID failed: ' + JSON.stringify(e));
				}
			});
		} else {
			plus.device.getInfo({
				success: function(e) {
					var imeilist = e.imei.split(',')
					that.Login(imeilist[0])
					uni.setStorageSync("imei", imeilist[0])
					if (imeilist.length == 2) {
						uni.setStorageSync("imei2", imeilist[1])
					}
				},
				fail: function(e) {
					console.log('getDeviceInfo failed: ' + JSON.stringify(e));
				}
			});
		}
	}
	async Login(device_id) {
		var token = uni.getStorageSync('X-Api-Token')
		if (token == '') {
			var rest = await request.get("/apiV1/login?device_id=" + device_id)
			token = rest.APIDATA.token
			uni.setStorageSync('X-Api-Token', token)
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}

	}
}
if (!global.BaseApi) {
	global.BaseApi = new BaseApi();
}

export default global.BaseApi;
