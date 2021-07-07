<template>
	<view class="new_friend">
		<!-- <perchTop /> -->
		<view class="header">
			<search class="search"  @listenSearch="listenSearch" />
		</view>
		<scroll-view class="scroll-view" 
		scroll-y="true" 
		:scroll-with-animation="true"
		:style="{'height': scrollViewH}"
		>
			<friend-block :data="data" @listenFriendBlock="listenFriendBlock"/>
		</scroll-view>
		
	</view>
</template>

<script>
	import perchTop from '@/components/perchTop.vue';
	import search from '@/components/search.vue';
	import friendBlock from './friendBlock.vue'
	import { usersData } from 'pages/data.js';
	import { queryDom } from '../../utils/queryDom.js'
	export default {
		data() {
			return {
				data: usersData,
				searchStr: '' ,//保存search组件传递的str
				scrollViewH: '', //scroll-view的高度
			}
		},
		components: {
			perchTop,
			search,
			friendBlock
		},
		computed: {
			searchData() {
				return this.data.filter(item => {
					if (item.name.search(this.searchStr) != -1 || item.mail.search(this.searchStr) != -1) {
						return item;
					}
				});
			},
		},
		mounted(){
			this.setScrollView()
		},
		methods: {
			//设置scroll-view高度
			async setScrollView(){
				let header = await queryDom('.header')
				
				// console.log(header)
				this.scrollViewH = this.$safeBottom - this.$safeTop - header + 'px'
			},
			//监听search组件
			listenSearch(e) {
				this.searchStr = e;
			},
			
			//监听friendBlock
			listenFriendBlock(index){
				this.getData(index)
			},
			
			//获得新的data
			getData(index){
				this.data.splice(index,1)
			},
		}
	}
</script>

<style lang="scss" scoped>
.new_friend {
	
	.header {
		padding: 10rpx;
	}
}
</style>
