<template>
	<view class="member_all">
		<view class="header">
			<image src="/static/img/left.png" mode="widthFix" @tap="close"></image>
			<text class="title">聊天成员({{100}})</text>
		</view>
		<!-- <view class="search">
			<image src="/static/header/search.png" mode="widthFix"></image>
			<input type="text">
		</view> -->
		<search class="search" />
		<scroll-view class="scroll-view" :style="{'height': scroll_view}" :scroll-y="true" :scroll-with-animation="true">
			<view class="main">
				<view class="user_detail" v-for="item in 100" :key="item">
					<image></image>
					<text>小明</text>
				</view>
				<view class="user_detail user_add"><image src="/static/group/user_add.png"></image></view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
import search from '@/components/search.vue'
export default {
	props: {
	},
	data(){
		return {
			scroll_view: '', //scroll_view高度
		}
	},
	components: {
		search
	},
	mounted(){
		//若该组件不为v-if，则考虑使用watch或计算属性监听控制组件显示隐藏的开关
		this.$nextTick(function(){
			this.setHeight()
		})
			
	},
	methods: {
		//关闭页面
		close(){
			this.$emit('closeMemberAll')
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
		
		//设置main高度
		async setHeight(){
			let member_all = await this.queryDom('.member_all')
			let header = await this.queryDom('.header')
			let search = await this.queryDom('.search')
			this.scroll_view = await member_all - header - search + 'px'
		},
	}
}
</script>

<style lang="scss" scoped>
.member_all {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	background: #fff;
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	padding-top: $uni-spacing-col-safe-top; //刘海屏占位
	overflow: hidden;
	
	.header {
		height: 80rpx;
		background: $uni-bg-color-grey;
		display: flex;
		// justify-content: center;
		text-align: center;
		align-items: center;
		font-size: $uni-font-size-lg;
		font-weight: $uni-text-weight-unblod;
		position: relative;
		
		image {
			position: absolute;
			left: 10rpx;
			width: 40rpx;
			height: 40rpx;
		}
		
		text {
			width: 100%;
		}
	}
	
	
	.main {
		display: flex;
		// justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		flex-wrap: wrap;
		padding: 20rpx 40rpx;
		margin-bottom: 20rpx;
		box-shadow: $uni-view-shadow-base;
		
		.user_detail {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 134rpx;
			// border: 1rpx solid black;
			margin: 20rpx 0;
		
			image {
				background: #ccc;
				width: 100rpx;
				height: 100rpx;
			}
		
			text {
				// border: 1rpx solid blue;
				// margin-top: 20rpx;
				width: 100rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
			}
		}
		
		.user_add {
			image {
				background: none;
				border: 1rpx dotted $uni-text-color-grey;
			}
		}
	}
}
</style>
