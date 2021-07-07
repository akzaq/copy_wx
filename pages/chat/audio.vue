<template>
	<view class="audio-view" v-show="showVoice2">
		<view class="top">
			<!-- 录音动画 -->
			<view class="jump">
				<view class="list">
					<view></view>
					<view></view>
					<view></view>
					<view></view>
				</view>
			</view>
			<image class="bubble" src="../../static/chat/bubble.png" mode="widthFix"></image>
		</view>
		<view :class="{ center: true, 'center-active': showVoice3 }">
			<view class="tip1" v-show="showVoice3">松开取消</view>
			<view class="tip1" v-show="!showVoice3">松开发送</view>
			<image class="cancel" src="../../static/chat/cancel.png" mode="widthFix"></image>
		</view>
		<view class="bottom">
			<image class="audio_bottom" src="../../static/chat/audio_bottom.png" mode="widthFix">
				<image class="audio_voice" src="../../static/chat/audio_voice.png" mode="widthFix"></image>
			</image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		showVoice2: {
			type: Boolean
		},
		showVoice3: {
			type: Boolean
		}
		
	}
};
</script>

<style lang="scss" scoped>
.audio-view {
	z-index: 99;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: $uni-bg-color-mask;
	overflow: hidden;

	.top {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);

		//录音动画
		.jump {
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;

			@-webkit-keyframes list {
				0% {
					-webkit-transform: scaley(1);
					transform: scaley(1);
				}

				50% {
					-webkit-transform: scaley(0.4);
					transform: scaley(0.4);
				}
				100% {
					-webkit-transform: scaley(1);
					transform: scaley(1);
				}
			}
			@keyframes list {
				0% {
					-webkit-transform: scaley(1);
					transform: scaley(1);
				}

				50% {
					-webkit-transform: scaley(0.4);
					transform: scaley(0.4);
				}

				100% {
					-webkit-transform: scaley(1);
					transform: scaley(1);
				}
			}

			.list > view {
				margin: 0 $uni-spacing-row-sm;
				background-color: #0b0b0b;
				width: 10rpx;
				height: 40rpx;
				border-radius: $uni-border-radius-lg;
				-webkit-animation-fill-mode: both;
				animation-fill-mode: both;
				display: inline-block;
				-webkit-animation: list 0.9s 0s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
				animation: list 0.9s 0s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
			}
			.list > view:nth-child(1) {
				-webkit-animation-delay: 0.2s !important;
				animation-delay: 0.2s !important;
			}
			.list > view:nth-child(2) {
				-webkit-animation-delay: 0.4s !important;
				animation-delay: 0.4s !important;
			}
			.list > view:nth-child(3) {
				-webkit-animation-delay: 0.6s !important;
				animation-delay: 0.6s !important;
			}
			.list > view:nth-child(4) {
				-webkit-animation-delay: 0.8s !important;
				animation-delay: 0.8s !important;
			}
		}

		.bubble {
			width: 50%;
		}
	}
	.center-active {
		background: #333 !important;
	}
	.center {
		z-index: 1;
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 140rpx;
		height: 140rpx;
		border-radius: $uni-border-radius-circle;
		background: #555;

		.cancel {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.tip1 {
			text-align: center;
			width: 100%;
			color: $uni-text-color-grey;
			position: absolute;
			top: -35%;
			padding-bottom: $uni-spacing-col-lg;
		}

		// .tip2 {
		// 	text-align: center;
		// 	width: 100%;
		// 	color: $uni-text-color-grey;
		// 	position: absolute;
		// 	bottom: -40%;
		// 	left: 50%;
		// 	transform: translateX(-50%);
		// 	padding-top: 50rpx;
		// }
	}

	.bottom {
		position: absolute;
		left: 0;
		bottom: -25%;
		width: 100%;
		// heigth: 100rpx;

		.audio_voice {
			width: 60rpx;
			height: 60rpx;
			z-index: 99;
			position: absolute;
			top: 30% !important;
			left: 50%;
			transform: translateX(-50%);
		}

		.audio_bottom {
			// display: block;
			width: 100%;
			position: relative;

			.audio_voice {
				width: 60rpx;
				height: 60rpx;
				z-index: 5;
				position: relative;
				top: 0 !important;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
}
</style>
