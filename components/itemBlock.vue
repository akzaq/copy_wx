<template>
	<scroll-view 
	class="item-block" 
	:scroll-y="true" 
	:scroll-with-animation="true"
	:style="{'height': height}"
	>
		<view class="message" v-for="(item, index) in data" :key="index" @tap="tapMessage(index),tapCheck(index)">
			<view v-show="showCheck" :class="{'check': true,'check_active': checkItem.includes(index)}" >
				<image v-show="checkItem.includes(index)" src="../static/group/check.png" mode="widthFix"></image>
			</view>
			<view class="left">
				<image :src="item.icon" mode="aspectFill"></image>
				<view v-show="item.tip" class="tip" v-if="showContent">{{ item.tip }}</view>
			</view>
			<view :class="{ right: showContent || true, right1: !showContent, ' border': border }">
				<view class="top">
					<view class="name">{{ item.name }}</view>
					<view v-if="item.time" class="time" v-show="showContent">{{ getDate(item.time) }}</view>
				</view>

				<view class="bottom" v-show="showContent">{{ item.content }}</view>
				<view class="bottom" v-show="true">{{item.mail}}</view>
			</view>
			<view class="hint" v-show="showHint">
				<view class="hint_info">{{hintStr}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import { formatDate } from '../utils/formatDate.js';
export default {
	name: 'itemBlock',
	props: {
		data: {
			type: Array,
			default: () => []
		},
		border: {
			type: Boolean,
			default: true
		},
		showContent: {
			type: Boolean,
			default: true
		},
		showCheck: {
			type: Boolean,
			default: false
		},
		showHint: {
			type: Boolean,
			default: false
		},
		hintStr: {
			type: String,
			default: ''
		},
		height: {
			type: String
		}
	},
	data() {
		return {
			checkItem: [], //选中集合
		};
	},
	methods: {
		getDate(time) {
			return formatDate(time);
		},
		
		//点击选中,选中取消
		tapCheck(index){
			this.checkItem.indexOf(index) === -1 
			? this.checkItem.push(index) 
			: this.checkItem.splice(this.checkItem.indexOf(index),1)
			
			//传递当前选中项
			this.$emit('checkItem',this.checkItem)
		},
		
		//点击查看消息
		tapMessage(index){
			this.$emit('tapMessage',index)
		},
		
	}
};
</script>

<style lang="scss" scoped>
.item-block {
	.message {
		widht: 100%;
		height: $uni-item-size-base;
		display: flex;
		
		background: $uni-bg-color;
		
		.check {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
			align-self: center;
			border: 1rpx solid $uni-text-color-placeholder;
			border-radius: $uni-border-radius-circle;
			
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
		
		.check_active {
			border: 1rpx solid #fff;
			
		}

		.left {
			margin: 0 $uni-spacing-row-base;
			padding: $uni-spacing-col-base 0;
			position: relative;

			image {
				width: $uni-img-size-base;
				height: $uni-img-size-base;
				border-radius: $uni-border-radius-lg;
			}
			.tip {
				position: absolute;
				top: 0;
				right: -10rpx;
				color: $uni-text-color-inverse;
				font-size: $uni-font-size-sm;
				background: $uni-color-error;
				border-radius: $uni-border-radius-circle;
				font-weight: $uni-text-weight;
				text-align: center;
				min-width: 36rpx;
				min-height: 36rpx;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
			box-sizing: border-box;
			padding: $uni-spacing-col-base 0;
			font-size: $uni-font-size-sm;
			flex-grow: 1;

			.top {
				display: flex;
				justify-content: space-between;
				.name {
					font-size: $uni-font-size-base;
					padding-bottom: $uni-spacing-col-base;
					font-weight: $uni-text-weight-unblod;
				}
				.time {
					padding-right: $uni-spacing-row-lg;
				}
			}
		
			.bottom {
				/* 单行显示，溢出隐藏 */
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}

		/* 若上层组件传入数据没有content字段样式 */
		.right1 {
			display: flex;
			align-items: center;
			flex-grow: 1;
			/* border-bottom: 1rpx solid $uni-border-color; */
		}

		/* 底部边框 */
		.border {
			border-bottom: 1rpx solid $uni-border-color;
		}
		
		.hint {
			width: 100rpx;
			position: relative;
			
			.hint_info{
				min-width: 36rpx;
				min-height: 36rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				color: $uni-text-color-inverse;
				font-size: $uni-font-size-sm;
				background: $uni-color-error;
				border-radius: $uni-border-radius-circle;
				font-weight: $uni-text-weight;
				text-align: center;
			}
			
		}
	}
}
</style>
