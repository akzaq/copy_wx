<template>
	<view class="create_group">
		<vHeader :back="true" title="发起群聊" :show="false" @listenRouter="listenRouter"/>
		<view class="group_header">
			<view class="group_img">
				<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>

				<image :src="cropFilePath" @tap="upload" class="meslist_img"></image>
				<!-- <image src="../../static/group/group_default.png" mode="aspectFit"></image> -->
			</view>
			<view class="group_title"><input type="text" v-model="title" placeholder="请输入群名称" /></view>
		</view>
		<view class="group_main">
			<view class="main_title">用户</view>
			<scroll-view
				class="main_friend"
				:style="{ height: mainFriendH }"
				:scroll-y="true"
				:scroll-with-animation="true"
			>
				<item-block :data="data" :showContent="false" :showCheck="true" @checkItem="checkFriendItem" />
			</scroll-view>
		</view>
		<view class="group_bottom">
			<button 
			:class="{ btn_active: sum > 0 && showBtn }" 
			type="default"
			@tap="tapOk">
				完成
				<text v-show="sum > 0">({{ sum }})</text>
			</button>
		</view>
	</view>
</template>

<script>
import vHeader from '../../components/vHeader.vue';
import itemBlock from '../../components/itemBlock.vue';
import { friendData } from '../data.js';

import ImageCropper from "@/components/ling-imgcropper/ling-imgcropper.vue";
export default {
	data() {
		return {
			title: '', //群名
			sum: 0, //选择建立群聊的好友数
			data: friendData,	//好友列表
			mainFriendH: '',	//main_friend的高度
			tempFilePath: "",
			cropFilePath: "/static/group/group_default.png", //默认图片
		};
	},
	components: {
		vHeader,
		itemBlock,
		ImageCropper
	},
	computed: {
		showBtn(){
			let count = 0
			for(let i=0;i<this.title.length;i++){
				if(this.title[i] === ' '){
					count++
				}
			}

			return this.title.length > count ? true : false
		}
	},
	onLoad(){

	},
	mounted(){
		this.setHeight();
	},
	methods: {
		//监听vHeader组件
		listenRouter(){
			uni.navigateBack({
			    delta: 1
			});
		},
		
		//点击完成
		tapOk(){
			if( this.sum > 0 && this.showBtn){
				uni.redirectTo({
				    url: '/pages/chat/chat'
				});
			}
			
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

		//设置main_friend高度
		async setHeight() {
			// console.log(1)
			let create_group = await this.queryDom('.create_group')
			let group_header = await this.queryDom('.group_header');
			let main_title = await this.queryDom('.main_title')
			let group_bottom = await this.queryDom('.group_bottom')
			this.mainFriendH = create_group - group_header - main_title - group_bottom + 'px'
		},

		//当前选中的好友索引数组
		checkFriendItem(item){
			this.sum = item.length
		},

		/* 图片裁剪 */
		upload() {
		  uni.chooseImage({
			count: 1, //默认9
			sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ["album","camera"], //从相册选择或拍照
			success: (res) => {
			  this.tempFilePath = res.tempFilePaths.shift();
			},
		  });
		},
		confirm(e) {
		  this.tempFilePath = "";
		  this.cropFilePath = e.detail.tempFilePath;

		  // #ifdef APP-PLUS||MP
		  //除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
		  //按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
		  //待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了
		  
		  uni.uploadFile({
			url: "后端地址上传图片接口地址",
			filePath: this.cropFilePath,
			name: "file",
			fileType: "image",
			//formData:{},传递参数
			success: (uploadFileRes) => {
			  var backstr = uploadFileRes.data;
			  //自定义操作
			},

			fail(e) {
			  console.log("this is errormes " + e.message);
			},
		  });

		  // #endif
		},
		cancel() {
		  console.log("canceled");
		  this.tempFilePath = "";
		},
	}
};
</script>

<style lang="scss" scoped>
.create_group {
	height: 100vh;

	.group_header {
		padding: 60rpx 0 100rpx 0;

		.group_img {
			text-align: center;
			margin: 0 auto 60rpx auto;
			width: 200rpx;
			height: 200rpx;
			border-radius: $uni-border-radius-xlg;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 30rpx;
			}
		}

		.group_title {
			width: 80%;
			margin: 0 10%;
			// min-height: 80rpx;
			background: $uni-bg-color-message;
			border-radius: $uni-border-radius-xlg;

			input {
				padding: $uni-spacing-col-base $uni-spacing-col-lg;
			}
		}
	}

	.group_main {
		.main_title {
			font-weight: $uni-text-weight-unblod;
			font-size: $uni-font-size-xlg;
			padding-left: 20rpx;
			margin-bottom: 40rpx;
		}
	}

	.group_bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: $uni-bg-color-input;
		text-align: right;
		padding: 10rpx 0 var(--status-bar-height) 10rpx; //底部安全距离

		button {
			margin-right: 20rpx;
		}

		.btn_active {
			background: $uni-bg-color-base;
		}
	}
}
</style>
