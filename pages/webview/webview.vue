<template>
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				imei: null,
				wv: null,
				url: uni.getStorageSync("duomob"),
				currentWebview:null
			}
		},
		onShow() {
			var wv = plus.webview.create('', "dy");
			wv.loadURL(
				this.url
			)
			wv.addEventListener("loaded", (function() { //android 可写外面   ios的js注入必须在页面加载完成后
				console.log("开始注入js");
				// 这里的JS目录不能随便修改，否则会报错！！！！！！
				wv.appendJsFile('_www/hybrid/html/duoliang.js');

			}));


			wv.show();
			var currentWebview = this.$mp.page.$getAppWebview(); //获取当前页面的webview对象
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			this.currentWebview = currentWebview
			this.wv = wv
		},
		onLoad() {

		},
		onBackPress(options) {
			if (this.wv) {
				this.goback(2);
				return true;
			}
			return false
		},
		methods: {

			goback(delta) {
				const _this = this;
				if (_this.wv) {
					_this.wv.canBack(function(events) {
						if (events.canBack) {
							_this.wv.back();
						} else {
							_this.wv.close();
							_this.currentWebview.remove(_this.wv);
							_this.wv = null;
							uni.navigateBack({
								delta: delta
							})
						}
					})
				}
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
