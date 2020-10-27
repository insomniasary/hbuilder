<template>
	<view class="main">
		
		<view>
			<v-tabs :pills="true" line-height="0" activeColor="#fff" v-model="activeTab" :scroll="false" fontSize="35rpx" @change=changeTab :tabs="tabs"></v-tabs>
		</view>
		<view v-show="activeTab===0">
			<uni-list :border='false'>
				<uni-list-item v-for="item in lists" :thumb="item.product_icon" thumbSize="lg" :key="item.advert_id" :title="item.title"
				 :rightText="item.price_desc+'万元'" :note="item.product_introduction" :showArrow='false' :clickable='true' @click="jumpTo(item.advert_id)"
				 :showBadge='true'>

				</uni-list-item>
			</uni-list>
		</view>
		<view v-show="activeTab===1">
			<uni-list :border='false'>
				<uni-list-item v-for="item in appCpxLists" :thumb="item.logo" thumbSize="lg" :key="item.id" :title="item.name"
				 :rightText="item.award+'元'" :note="item.guide" :showArrow='false' :clickable='true' @click="jumpAppcpx(item.id)"
				 :showBadge='true'>
		
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import navTab from "@/components/navTab.vue"
	import gameApi from "../../api/GameApi.js"
	export default {
		components: {
			uniNavBar,
			navTab
		},
		data() {
			return {
				isActive:true,
				currentTab: 0,
				headers: {},
				firstButton: "primary",
				activeTab: 0,
				lists: [],
				appCpxLists :[],
				tabs: ['游戏任务','高额任务'],
				
			}
		},
		onShow() {

		},
		onLoad() {
			
		},
		async mounted() {
			this.getNewsList()
		},
		
		methods: {
			async jumpAppcpx(id){
				uni.navigateTo({
					url: '/pages/webview/appcpx?id='+id,
				})
				console.log(id)
			},
			async jumpTo(advert_id) {
				
				var data = await gameApi.getDetail({
					advert_id: advert_id
				})
				uni.setStorageSync("duomob",data.APIDATA)
				
				uni.navigateTo({
					url: '/pages/webview/webview'
				})

			},
			async getNewsList() {
				var data = await gameApi.gameList({
					page: 1
				})
				this.lists = data.APIDATA.duomob
			},
			async changeTab(index) {
				this.currentTab = index;
			
				if (this.currentTab == 0) {
					this.getNewsList()
				}
				if (this.currentTab == 1) {
					var data = await gameApi.getAppcpxList({
						page:1
					})
					
					this.appCpxLists = data.APIDATA.data
					
				}
			},
		}
	}
</script>

<style>
	.main{
		margin-top: 100upx;
	}
	button {
		background-color: "#FFFFFF";
	}

	button:after {
		border: none;
	}

	.example-body {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 20rpx;
	}
</style>
