<template>
	<view class="member">
		<view v-if="item < 20" class="user_detail" v-for="item in sum" :key="item">
			<image></image>
			<text>小明</text>
		</view>
		<view v-if="true" class="user_detail user_add"><image src="../../static/group/user_add.png"></image></view>
		<view v-show="sum > 19" class="tip"  @tap="memberAll">
			查看更多成员
			<image src="/static/img/right.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				sum: 29,
			}
		},
		methods: {
			memberAll(){
				this.$emit('memberAll')
			}
		}
	}
</script>

<style lang="scss" scoped>
.member {
	background: #fff;
	max-height: 840rpx;
	display: flex;
	// justify-content: space-between;
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

	.tip {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
		width: 100%;
		height: 40rpx;
		color: $uni-text-color-grey;

		image {
			width: 36rpx;
		}
	}
}
</style>
