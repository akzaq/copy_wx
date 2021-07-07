<template>
	<view class="emojiView" v-show="showEmoji">
		<view class="emoji-item" v-for="(item, index) in emoji" :key="index">
			<view class="emoji" v-for="(it, indx) in item" :key="indx" @tap="tapEmoji(it)">{{ it }}</view>
		</view>
		<view class="btn">
			<image src="../../static/chat/del.png" mode="widthFix" v-if="showEmojiBt" @tap="delMsg"></image>
			<image src="../../static/chat/del1.png" mode="widthFix" v-else></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		emoji: {
			type: Array
		},
		showEmoji: {
			type: Boolean
		},
		msg: {
			type: String
		}
	},
	data(){
		return {
			currentEmoji: '' ,//当前选中的表情
		}
	},
	computed: {
		//表情删除按钮是否可用
		showEmojiBt() {
			let show = false;
			this.emoji.forEach(item => {
				if (item.includes(this.currentEmoji)) {
					show = true;
				}
			});
			if (this.msg.length === 0) {
				show = false;
			}

			return show;
		},
	},
	methods: {
		//点击表情
		tapEmoji(emoji) {
			this.currentEmoji = emoji
			this.$emit('listenEmoji',{name:'tapEmoji',data:emoji})
		},
		
		//逐字删除
		delMsg(){
			this.$emit('listenEmoji',{name:'delMsg',data:''})
		}
	}
	
};
</script>

<style lang="scss" scoped>
.emojiView {
	width: 100%;
	height: $uni-item-size-emoji;
	transform: translateZ(1);
	overflow-y: scroll;

	.emoji-item {
		font-size: $uni-font-size-xlg;
		margin: $uni-spacing-row-base 0;
		width: 100%;

		.emoji {
			display: inline-block;
			width: calc(750rpx / 8);
			text-align: center;
		}
	}

	.btn {
		background: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		width: $uni-item-size-btn;
		height: $uni-item-size-xsm;
		margin-right: $uni-spacing-row-base;
		position: fixed; //相对于父元素固定定位，必须将父元素的transform不为none
		bottom: $uni-view-offset-two;
		right: $uni-view-offset-one;

		image {
			width: $uni-img-size-smx;
			height: $uni-img-size-smx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
