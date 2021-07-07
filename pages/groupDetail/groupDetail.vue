<template>
	<view class="group_detail">
		<v-header class="v_height" title="群聊信息" :back="true" :show="false" />
		<view class="main" :style="{'height': mainH}">
			<member  @memberAll="memberAll"/>
			<member-all v-if="showMemberAll" @closeMemberAll="closeMemberAll"/>
			<view class="info">
				<view class="info_item">
					<text>群聊名称</text>
					<view class="des" @tap="edit('群聊名称',groupInfo.name)">
						<text>{{groupInfo.name}}</text>
						<image src="/static/img/right.png" mode="width"></image>
					</view>
				</view>
				<view class="info_item">
					<text>头像</text>
					<view class="des">
						<image-cropper :src="tempFilePath" @confirm="confirm" @cancel="cancel"></image-cropper>
			
						<image :src="cropFilePath" @tap="upload" class="meslist_img icon"></image>
						<image src="/static/img/right.png" mode="width"></image>
					</view>
				</view>
				<view class="info_item info_ad">
					<text class="it">群公告</text>
					<view class="des it" @tap="edit('群公告',groupInfo.ad)">
						<text>{{groupInfo.ad}}</text>
						<image src="/static/img/right.png" mode="width"></image>
					</view>
				</view>
				<view class="info_item">
					<text>群昵称</text>
					<view class="des" @tap="edit('群昵称',groupInfo.diyName)">
						<text>{{groupInfo.diyName}}</text>
						<image src="/static/img/right.png" mode="width"></image>
					</view>
				</view>
			</view>
			<view class="bottom"><button type="warn">退出群聊</button></view>
			<edit v-show="showEdit" 
			class="edit" 
			:name="editName" 
			:value="editValue"
			@listenEdit="listenEdit"/>
		</view>
	</view>
</template>

<script>
import vHeader from '../../components/vHeader.vue';
import member from './member.vue';
import ImageCropper from '@/components/ling-imgcropper/ling-imgcropper.vue';
import edit from './edit.vue'
import memberAll from './memberAll.vue'
export default {
	data() {
		return {
			groupInfo: {
				name: '测试群', //群名
				ad: '获取当前帐号信息，可以返回小程序的Appid。如果使用了微信小程序的云端插件，还可以反馈插件的id和版本，获取当前帐号信息，可以返回小程序的Appid。如果使用了微信小程序的云端插件，还可以反馈插件的id和版本，获取当前帐号信息，可以返回小程序的Appid。如果使用了微信小程序的云端插件，还可以反馈插件的id和版本', //群公告
				diyName: '测试昵称',  //群昵称
			},
			mainH: '', //main的高度
			tempFilePath: '',
			cropFilePath: '/static/group/group_default.png' ,//群头像默认图片
			showMemberAll: false, //member-all页开关
			showEdit: false, //修改页开关
			editName: '', //修改项字段
			editValue: '', //修改项值
		};
	},
	components: {
		vHeader,
		member,
		ImageCropper,
		edit,
		memberAll
	},
	mounted(){
		this.setHeight()
	},
	methods: {
		//监听member组件是否传递打开memberAll
		memberAll(){
			this.showMemberAll = !this.showMemberAll
		},
		
		//监听member_all组件是否传递关闭
		closeMemberAll(){
			this.showMemberAll = !this.showMemberAll
		},
		
		//修改信息
		edit(name,value){
			this.editName = name
			this.editValue = value
			setTimeout(()=>{
				this.showEdit = true
			},200)
			
		},
		
		//监听edit
		listenEdit(e){
			this.showEdit = false
			if(e.name === '群聊名称'){
				this.$set(this.groupInfo,'name',e.value)
			}
			else if(e.name === '群公告') {
				this.$set(this.groupInfo,'ad',e.value)
			}
			else {
				this.$set(this.groupInfo,'diyName',e.value)
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
		
		//设置main高度
		async setHeight(){
			let group_detail = await this.queryDom('.group_detail')
			let vHeight = await this.queryDom('.v_height')
			this.mainH = await group_detail - vHeight + 'px'
		},
		
		
		/* 图片裁剪 */
		upload() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择或拍照
				success: res => {
					this.tempFilePath = res.tempFilePaths.shift();
				}
			});
		},
		confirm(e) {
			this.tempFilePath = '';
			this.cropFilePath = e.detail.tempFilePath;

			// #ifdef APP-PLUS||MP
			//除了H5端返回base64数据外，其他端都是返回临时地址，所以你要判断base64还是临时文件名，（用条件编译APP-PLUS||MP执行编译。）
			//按我这里是先上传裁剪得来的临时文件地址然后得到临时文件名，
			//待活你要判断是H5还是其他端传给后端类型参数让后端判断执行何种情况代码就OK了

			uni.uploadFile({
				url: '后端地址上传图片接口地址',
				filePath: this.cropFilePath,
				name: 'file',
				fileType: 'image',
				//formData:{},传递参数
				success: uploadFileRes => {
					var backstr = uploadFileRes.data;
					//自定义操作
				},

				fail(e) {
					console.log('this is errormes ' + e.message);
				}
			});

			// #endif
		},
		cancel() {
			console.log('canceled');
			this.tempFilePath = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.group_detail {
	background: $uni-text-color-disable;
	position: relative;
	height: 100vh;
	
	.main {
		overflow-y: auto;

		.info {
			background: #fff;
			padding: 20rpx;
			margin-bottom: 20rpx;
			box-shadow: $uni-view-shadow-base;

			.info_item {
				min-height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid $uni-border-color;
				
				.des {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #777;

					.icon {
						width: 100rpx;
						height: 100rpx;
					}

					image {
						border-radius: 50%;
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

			.info_ad {
				min-height: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 10rpx;

				.it {
					width: 100%;
					margin-bottom: 10rpx;
				}

				.des {
					display: flex;
					justify-content: space-between;

					text {
						width: 80%;
						/* 显示两行，溢出隐藏 */
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}
		}

		.bottom {
			background: #fff;
		}
		
		.edit {
			// position: absolute;
		}
	}
}
</style>
