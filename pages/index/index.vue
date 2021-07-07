<template>
	<view class="home">
		<v-header class="header" title='微信' @rightItem="rightItem"/>
		<search class="search" v-show="showSearch" />
		<chunLei-popups v-model="showMore" :popData="popData" @tapPopup="tapPopup" :x="344" :y="30" placement="top-end" theme="dark">
		</chunLei-popups>
		<item-block 
		class="item_blcok" 
		:data="data" 
		:height="itemBlcokH"
		@tapMessage="tapMessage"></item-block>
	</view>
</template>

<script>
import vHeader from '@/components/vHeader.vue'
import search from '@/components/search.vue'
import itemBlock from '@/components/itemBlock.vue'
import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue"
import { friendData } from '../data.js'
import { formatDate } from '@/utils/formatDate.js';
export default {
	data() {
		return {
			data: friendData,
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
		chunLeiPopups
	},
	mounted(){		
		// 页面第一次加载时设置高度
		this.setHeight()
		// console.log(this.$safeTop)
	},
	computed: {},
	methods: {
		getDate(time) {
			return formatDate(time);
		},
		
		//监听v-header组件
		rightItem(e){
			let name = 'show'+e
			this[name] = !this[name]
			this.setHeight()
		},
		
		//监听itemBlock组件
		tapMessage(e){
			let fid = this.data[e].fid
			//消息未读数清零
			this.data[e].tip = 0
			
			//进入聊天页面
			uni.navigateTo({
				url: `../chat/chat?fid=${fid}`,
				
			})
		},
		
		//点击更多选项气泡框
		tapPopup(e){
			console.log(e.title)
			if(e.title === '发起群聊'){
				uni.navigateTo({
				    url: '/pages/creatGroup/creatGroup'
				});
			}
			else if(e.title === '添加朋友') {
				uni.navigateTo({
				    url: '/pages/addFriend/addFriend'
				});
			}
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
			this.itemBlcokH = windowHeight - header - search + 'px'
			
			// console.log(this.itemBlcokH)
		},
	}
};
</script>

<style lang="scss" scoped>
.home {
	position: relative;
	// height: 100vh;
}
</style>
