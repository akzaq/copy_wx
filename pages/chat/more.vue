<template>
	<view class="more" v-show="showMore">
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item class="swiper-item">
				<view class="item">
					<view class="icon" @tap="tapPhoto">
						<image src="../../static/chat/photo.png" mode="widthFix"></image>
					</view>
					<view class="title">相册</view>
				</view>
				<view class="item">
					<view class="icon" @tap="tapCamera">
						<image src="../../static/chat/camera.png" mode="widthFix"></image>
					</view>
					<view class="title">拍摄</view>
				</view>
				<view class="item">
					<view class="icon" @tap="tapVideo">
						<image src="../../static/chat/video.png" mode="widthFix"></image>
					</view>
					<view class="title">视频</view>
				</view>
				<view class="item">
					<view class="icon" @tap="tapPlace">
						<image src="../../static/chat/place.png" mode="widthFix"></image>
					</view>
					<view class="title">定位</view>
				</view>
				<view class="item spe">
					<view class="icon" @tap="tapFile">
						<image src="../../static/chat/file.png" mode="widthFix"></image>
					</view>
					<view class="title">文件</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	props:{
		showMore: {
			type: Boolean
		}
	},
	methods: {
		//相册
		tapPhoto() {
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					// console.log(JSON.stringify(res.tempFilePaths));
					res.tempFilePaths.forEach(item => {
						this.$emit('listenMore',{name: 'photo',type:1,data:item})
						// this.sendMsg(1, item);
					});
				}
			});
		},
		
		//拍照
		tapCamera() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera'], //使用相机
				success: res => {
					// console.log(JSON.stringify(res.tempFilePaths));
					this.$emit('listenMore',{name:'camera',type:1,data:res.tempFilePaths[0]})
					// this.sendMsg(1, res.tempFilePaths[0]);
				}
			});
		},
		
		//视频
		tapVideo() {},
		
		//位置
		tapPlace() {
			uni.chooseLocation({
				success: res => {
					// console.log('位置名称：' + res.name);
					// console.log('详细地址：' + res.address);
					// console.log('纬度：' + res.latitude);
					// console.log('经度：' + res.longitude);
					let info = {
						name: res.name,
						address: res.address,
						latitude: res.latitude,
						longitude: res.longitude
					};
					// this.sendMsg(4, info);
					this.$emit('listenMore',{name: 'place',type: 4,data: info})
				}
			});
		},
		
		//文件
		tapFile() {}
	}
};
</script>

<style lang="scss" scoped>
.more {
	width: 100%;
	height: $uni-item-size-emoji;

	.swiper {
		width: 100%;
		height: 100%;

		.swiper-item {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background: $uni-bg-color-input;

			.item {
				width: 25%;
				// height: 30%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.icon {
					width: 120rpx;
					height: 120rpx;
					background: $uni-bg-color;
					border-radius: $uni-border-radius-xlg;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: $uni-item-size-xsm;
						height: $uni-item-size-xsm;
					}
				}

				.title {
					font-size: $uni-font-size-sm;
					color: $uni-text-color-placeholder;
					margin-top: $uni-spacing-col-base;
				}
			}

			.spe {
				margin-top: -60rpx;
			}
		}
	}
}
</style>
