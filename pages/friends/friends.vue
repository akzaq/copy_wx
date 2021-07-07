<template>
	<view class="friend">
		<v-header class="header" title='我的好友' @rightItem="rightItem" />
		<search class="search" v-show="showSearch" />
		<chunLei-popups v-model="showMore" :popData="popData" @tapPopup="tapPopup" :x="344" :y="30" placement="top-end" theme="dark">
		</chunLei-popups>
		<view @tap="tapNews">
			<item-block class="news" :data="news" :border="false" :showHint="true" hintStr="*"/>
		</view>
		
		<view class="line">全部好友</view>
		<item-block 
		class="item_block"
		:data="data"
		:showContent="false"
		:height="itemBlcokH"
		@tapMessage="tapMessage"
		/>
	</view>
</template>

<script>
	import vHeader from '../../components/vHeader.vue'
	import itemBlock from '../../components/itemBlock.vue'
	import search from '@/components/search.vue'
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue"
	import { friendData } from '../data.js'
	export default {
		data() {
			return {
				data: friendData,
				news: [
					{
						name: '新的朋友',
						icon: '/static/img/news.png',
					}
				],
				showSearch: false, //搜索开关
				itemBlcokH: '', //item_blcok的高度
				showMore: false, //更多选项开关
				popData: [
					{title: '发起群聊'},
					{title: '添加朋友'},
					{title: '扫一扫'},
				], //更多选项
			};
		},
		components:{
			itemBlock,
			vHeader,
			search,
			chunLeiPopups,
		},
		mounted(){
			// 页面第一次加载时设置高度
			this.setHeight()
		},
		methods: {
			//点击新的朋友
			tapNews(){
				uni.navigateTo({
					url: '../newFriend/newFriend'
				})
			},
			
			//监听v-header组件
			rightItem(e){
				let name = 'show'+e
				this[name] = !this[name]
				this.setHeight()
			},
			
			//点击更多选项气泡框
			tapPopup(e){
				console.log(e.title)
			},
			
			//监听itemBlock组件
			tapMessage(e){
				let fid = this.data[e].fid
		
				//进入聊天页面
				uni.navigateTo({
					url: `../chat/chat?fid=${fid}`,
					
				})
			},
			
			//获取节点
			queryDom(name) {
				//移动端是异步
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select(name).boundingClientRect(data => {
						// console.log("得到布局位置信息" + JSON.stringify(data));
						// console.log(name+"的高度" + data.height);
						resolve(data.height);
					}).exec();
				});
			},
			
			//设置item_lcok高度
			async setHeight(){
				//获取可用窗口高度
				let windowHeight
				try {
					windowHeight = wx.getSystemInfoSync().windowHeight
				} catch (e) {
				}
				
				let header = await this.queryDom('.header')
				let search = await this.queryDom('.search')
				let news = await this.queryDom('.news')
				let line = await this.queryDom('.line')
				this.itemBlcokH = windowHeight - header - search - news - line + 'px'
				
				console.log(this.itemBlcokH)
			},
		}
	}
</script>

<style lang="scss" scoped>
.friend {
	width: 100%;
	// height: 100vh;
	
	.line {
		widht: 100%;
		height: 40rpx;
		background: $uni-text-color-disable;
	}
}
</style>
