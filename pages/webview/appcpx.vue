<template>
	<view id="container">
		<uni-card title="至尊鸡庄园" thumbnail="https://ipa.xy599.com/xiaoyu_1599460642_696716.png" :is-shadow="true" extra="+1.5元">

			<view class="foots">
				<text class="text">无恶意收费</text>
				<text class="text">人工检测无毒</text>
				<text class="text">加密防泄露</text>
				<text class="text">审核成功率67.4%</text>
			</view>
		</uni-card>
		<view>


		</view>
		<button class="main-button" type="primary">领取任务</button>
	</view>
</template>

<script>
	import gameApi from "../../api/GameApi.js"
	export default {
		data() {
			return {
				id: 0,
				detailData: {},
				k: {
					id: 1
				}
			}
		},
		async onLoad(option) {
			this.id = option.id
			var that = this
			var data = await gameApi.getAppcpxDetail({
				id: that.id
			})
			this.detailData = data.APIDATA.data
			console.log(this.detailData)
			console.log(this.detailData.taskInfo.name)
		},
		async mounted() {

		},

		methods: {

		}
	}
</script>


<style>
	.foot {
		min-height: 100upx;
	}

	.text {
		float: left;
		font-size: 24upx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(61, 188, 133, 1);
		height: 0.34rem;
		line-height: 0.34rem;
		padding-left: 0.32rem;
		background: url("http://xyzqdsp.niaogebiji.com/sdk/images/sTipslable.png") no-repeat left center;
		background-size: 0.35rem 0.35rem;
		margin-right: 0.32rem;
	}

	#container {
		margin-top: 100upx;
	}

	#container .main-button {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
