<template>
	<view class="friend_block">
		<view class="main" v-for="(item,index) in data" :key="index" :animation="current === index ? animationData : ''">
			<view class="top">
				<view class="reject" @tap="tapReject(index)">拒绝</view>
				<view class="icon"><image :src="item.icon" mode="aspectFill"></image></view>
				<view class="resolve" @tap="tapResolve(index)">同意</view>
			</view>
			<view class="center">
				<text class="name">{{item.name}}</text>
				<text class="time">{{item.register | format}}</text>
			</view>
			<view class="bottom">{{item.des}}</view>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '@/utils/formatDate.js'
	export default {
		props: {
			data: {
				type: Array,
				default: ()=>[]
			}
		},
		data(){
			return {
				current: '',
				animation: {},
				animationData: {}
			}
		},
		filters: {
			format(time){
				return formatDate(time)
			}
		},
		mounted(){
			//动画
			var animation = uni.createAnimation({
			      duration: 1000,
			        timingFunction: 'ease',
			    })
			    this.animation = animation
		},
		methods: {
			//点击拒绝
			tapReject(index){
				this.current = index
				let old = index
				this.toast('已同意!')
				this.animation.opacity(0).translateX(-50).step()
				this.animation.translateX(0).step()
				this.animation.opacity(1).step()
				this.animationData = this.animation.export()
				
				setTimeout(()=>{
					this.current = ''
					this.$emit('listenFriendBlock',old)
				},1900)
			},
			
			//点击同意
			tapResolve(index){
				this.current = index
				let old = index
				this.toast('已同意!')
				this.animation.opacity(0).translateX(50).step()
				this.animation.translateX(0).step()
				this.animation.opacity(1).step()
				this.animationData = this.animation.export()
				
				setTimeout(()=>{
					this.current = ''
					this.$emit('listenFriendBlock',old)
				},1900)
				
			},
			
			//toast
			toast(e){
				uni.showToast({
				    title: e,
				    duration: 2000,
					icon : 'success'
				});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.friend_block {
	padding: 20rpx 20rpx;
	.main {
		margin-bottom: 20rpx;
		padding: 40rpx 20rpx;
		box-shadow: 0 10rpx 10rpx 10rpx #ccc;
		border-radius: 24rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 24rpx;
				width: 140rpx;
				height: 60rpx;
				margin: 0 40rpx;
			}

			.reject {
				background: LightSalmon;
			}

			.resolve {
				background: $uni-bg-color-base;
			}

			.icon {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 160rpx;
					height: 160rpx;
					// border-radius: 50%;
				}
			}
		}

		.center {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40rpx 0 30rpx 0;

			.name {
				font-size: $uni-font-size-xlg;
				font-weight: $uni-text-weight-unblod;
			}

			.time {
				margin-top: 10rpx;
				font-size: $uni-font-size-sm;
				color: #808080;
			}
		}

		.bottom {
			overflow: hidden;
			padding: 20rpx;
			height: 200rpx;
			background: $uni-bg-color-input;
			border-radius: 24rpx;
			font-size: $uni-font-size-base;
			color: $uni-text-color-grey;
		}
	}
}
</style>
