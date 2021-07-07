<template>
	<view class="header">
		<perch-top />
		<view class="main">
			<view class="left" v-if="back" @tap="tapBack"><image src="../static/img/left.png" mode="aspectFill"></image></view>
			<view class="left" v-else></view>
			<view class="title">
				<text>{{ title }}</text> 
			</view>
			<view class="right" v-if="show">
				<image src="/static/header/search.png" mode="aspectFill" @tap="search"></image>
				<image src="/static/header/add.png" mode="aspectFill" @tap="more"/></image>
			</view>
			<view class="right" v-else></view>
			<view class="right" v-show="otherShow">
				<image src="/static/header/other.png" mode="aspectFill" @tap="other"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import perchTop from './perchTop.vue'
export default {
	name: 'vHeader',
	props: {
		title: {
			type: String,
			default: '默认'
		},
		show: {
			type: Boolean,
			default: true
		},
		back: {
			type: Boolean,
			default: false
		},
		otherShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	components: {
		perchTop
	},
	methods: {
		tapBack(){
			this.$emit('listenRouter')
		},
		search(){
			this.$emit('rightItem','Search')
		},
		
		more(){
			this.$emit('rightItem','More')
		},
		
		other(){
			
		},
	}
};
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	.main {
		width: 100%;
		height: 80rpx;
		background: $uni-bg-color-grey;
		display: flex;
		justify-content: space-between;
		font-size: $uni-font-size-lg;
		font-weight: $uni-text-weight-blod;
		border-bottom: $uni-border-color;
		// padding-top: $uni-spacing-col-safe-top; //刘海屏占位
		// padding-bottom: calc($uni-spacing-col-safe-top / 2);
		box-shadow: $uni-view-shadow-base;

		.left {
			width: $uni-item-size-xsm;
			height: 100%;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;

			image {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;			
			}
		}

		.title {
			height: 100%;
			display: flex; 
			flex: 2;
			text-align: center;
			align-items: center;
			justify-content: center;
			min-width: $uni-item-size-base;
			margin: 0 $uni-spacing-row-xxlg;
			// padding-left: $uni-spacing-row-base;
			
			text {
				width: 100%;
			}
		}

		.right {
			height: 100%;
			display: flex;
			flex: 1;
			align-items: center;
			
			image {
				width: $uni-img-size-sm;
				height: $uni-img-size-sm;
				margin-right: $uni-spacing-row-base;
			}
		}
	}
}
</style>
