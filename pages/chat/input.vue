<template>
	<view class="input">
		<view class="left" @tap="show('showVoice1')">
			<image src="../../static/chat/keyboard.png" mode="widthFix" v-show="showVoice1"></image>
			<image src="../../static/chat/voice.png" mode="widthFix" v-show="!showVoice1"></image>
		</view>
		<view class="center">
			<textarea maxlength="140" auto-height="true" v-model="msg" cursor="500" v-if="!showVoice1" />
			<view class="voice" v-else @longtap="record" @touchend="touchend" @touchmove="recordMove">按住说话</view>
		</view>
		<view class="right">
			<image src="../../static/chat/meme.png" mode="widthFix" @tap="show('showEmoji')"></image>
			<image src="../../static/header/add.png" mode="widthFix" @tap="show('showMore')" v-if="showSend"></image>
			<button class="send" type="default" size="default" v-else @tap="sendMsg">发送</button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		showVoice1: {
			type: Boolean,
			// default: false
		},
		// msg: {
		// 	type: String,
		// },
		// showSend: {
		// 	type: Boolean
		// }
		
	},
	data() {
		return {
			msg:'',
		};
	},
	computed:{
		//发送按钮显示开关
		showSend() {
			//不输入或只输入空格和回车时，发送按钮不显示
			let count = 0;
			for (let i = 0; i < this.msg.length; i++) {
				if (this.msg[i] === ' ' || this.msg[i] === '\n') {
					count++;
				}
			}
			return this.msg.length > count ? false : true;
		}
	},
	methods: {
		//点击图标
		show(name){
			this.$emit('inputShow',name)
		},
		
		//点击长按
		record(e){
			this.$emit('inputRecord',{name:'record',event:e})
		},
		
		//取消长按
		touchend(e){
			this.$emit('inputRecord',{name:'touchend',event:e})
		},
		
		//长按移动
		recordMove(e){
			this.$emit('inputRecord',{name:'recordMove',event:e})
		},
		
		//点击发送
		sendMsg(){
			this.$emit('inputRecord','sendMsg')
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	width: 100%;
	min-height: 100rpx;
	background: $uni-bg-color-input;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: $uni-view-shadow-grey;

	.left {
	}
	.center {
		flex: auto;
		padding: 0 10rpx;
	}
	.right {
		display: flex;
		align-items: center;
	}
	image {
		width: $uni-img-size-input-img;
		height: $uni-img-size-input-img;
		margin: 0 10rpx;
	}

	.send {
		display: flex;
		text-align: center;
		align-items: center;
		height: $uni-img-size-input-img;
		background: $uni-color-success;
		color: $uni-text-color-inverse;
	}

	textarea {
		background: $uni-bg-color;
		font-size: $uni-font-size-base;
		line-height: auto;
		width: 100%;
		padding: 10rpx;
		border-radius: $uni-border-radius-lg;
	}

	.voice {
		padding: 10rpx;
		text-align: center;
		background: $uni-bg-color;
		font-size: $uni-font-size-lg;
		border-radius: $uni-border-radius-lg;
	}
}
</style>
