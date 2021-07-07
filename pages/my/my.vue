<template>
	<view class="info">
		<v-header title="我的" :show="false"></v-header>
		<view class="user-img">
			<view class="left">头像</view>
			<view class="right">
				<image class="img" src="/static/test/2.jpg" mode="aspectFill"></image>
				<image class="icon" src="/static/img/right.png"></image>
			</view>
		</view>
		<view class="user-info">
			<view class="left">昵称</view>
			<view class="right">
				<text>div</text>
				<image class="icon" src="/static/img/right.png"></image>
			</view>
		</view>
		<view class="user-info">
			<view class="left">个人简介</view>
			<view class="right">
				<text v-show="false">向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property </text>
				<image class="icon" src="/static/img/right.png"></image>
			</view>
		</view>
		<view class="user-info">
			<view class="left">注册时间</view>
			<view class="right">
				<text>2021-6-19</text>
				<image class="icon" src="/static/img/right.png"></image>
			</view>
		</view>
		<view class="user-info">
			<view class="left">邮箱</view>
			<view class="right">
				<text>2461179819@qq.com</text>
				<image class="icon" src="/static/img/right.png"></image>
			</view>
		</view>
		
		<view class="bottom">
			<button type="default">修改密码</button>
			<button type="warn">退出登录</button>
		</view>
	</view>
</template>

<script>
import vHeader from '../../components/vHeader.vue'
export default {
	data() {
		return {};
	},
	components:{
		vHeader
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.info {
	.user-img {
		width: 100%;
		height: $uni-item-size-base;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 $uni-spacing-row-sm;
		border-bottom: 1rpx solid $uni-border-color;
		font-weight: $uni-text-weight;
		box-sizing: border-box;
		

		.left {
			font-size: $uni-font-size-lg;
			margin-left: $uni-spacing-row-sm;
		}
		
		.right {
			display: flex;
			align-items: center;
			.img {
				width: $uni-img-size-xlg;
				height: $uni-img-size-xlg;
				margin-right: $uni-spacing-row-sm;
				border-radius: $uni-border-radius-lg;
			}

			.icon {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}
		}
	}
	
	.user-info {
		width: 100%;
		height: $uni-item-size-sm;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 $uni-spacing-row-sm;
		border-bottom: 1rpx solid $uni-border-color;
		font-weight: $uni-text-weight;
		box-sizing: border-box;
		
		.left {
			font-size: $uni-font-size-lg;
			margin-left: $uni-spacing-row-sm;
		}
		
		.right {
			display: flex;
			
			align-items: center;
			.img {
				
				margin-right: $uni-spacing-row-sm;
				
			}
		
			.icon {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
			}
		}
	}
	
	.bottom {
		position: absolute;
		width: 100%;
		bottom: 0rpx;
	}
}
</style>
