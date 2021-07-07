<template>
	<view class="chat">
		<!-- 头部 -->
		<v-header class="header" 
		title="小明" 
		:show="false" 
		:back="true" 
		@listenRouter="listenRouter"></v-header>
		<!-- 消息框 -->
		<scroll-view
			class="chat-view"
			scroll-y="true"
			:style="{ height: chatViewHeight + 'px' }"
			:scroll-into-view="current"
			@scrolltoupper="addData"
		>
			<view class="loading" v-show="false">
				<image class="loading-img" src="../../static/chat/loadding.png" :animation="animationData"></image>
			</view>
			<view
				:id="'item' + index"
				:class="{ 'msg-left': item.id === 'a', 'msg-right': item.id !== 'a' }"
				v-for="(item, index) in setDate1"
				:key="index"
			>
				<view class="time">{{  item.time | format}}</view>
				<view class="content">
					<view class="img"><image :src="item.imgUrl" mode="aspectFill"></image></view>
					<view class="msg">
						<!-- 文本消息 -->
						<view class="" v-if="item.type === 0">{{ item.message }}</view>
						<!-- 图片 -->
						<view class="msg-img" v-if="item.type === 1">
							<image :src="item.message" mode="widthFix" @tap="priviewImage(item.message)"></image>
						</view>
						<!-- 语音消息 -->
						<view
							class="msg-voice"
							v-if="item.type === 2 && item.message.time !== 0"
							:style="{ width: item.message.time * 5 + 'rpx' }"
							@tap="recordPlay(item.message.voice)"
						>
							<image src="../../static/chat/audio_voice.png" mode="widthFix"></image>
							<text>{{ item.message.time }}″</text>
						</view>
						<!-- 视频消息 -->
						<view class="" v-if="item.type === 3"><view>这是视频文件</view></view>
						<!-- 地图定位 -->
						<view
							class="msg-map"
							v-if="item.type === 4"
							@tap="tapMsgPlace(item.message)"
						>
							<view class="name">{{ item.message.name }}</view>
							<view class="address">{{ item.message.address }}</view>
							<image class="map" src="../../static/chat/map.png" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 输入面板 -->
		<view class="input">
			<view class="left" @tap="show('showVoice1')">
				<image src="../../static/chat/keyboard.png" mode="widthFix" v-show="showVoice1"></image>
				<image src="../../static/chat/voice.png" mode="widthFix" v-show="!showVoice1"></image>
			</view>
			<view class="center">
				<textarea maxlength="140" auto-height="true" v-model="msg" cursor="500" v-if="!showVoice1" />
				<view class="voice" v-else @longtap="record" @touchend="touchend" @touchmove="recordMove">
					按住说话
				</view>
			</view>
			<view class="right">
				<image src="../../static/chat/meme.png" mode="widthFix" @tap="show('showEmoji')"></image>
				<image
					src="../../static/header/add.png"
					mode="widthFix"
					@tap="show('showMore')"
					v-if="showSend"
				></image>
				<button class="send" type="default" size="default" v-else @tap="sendMsg()">发送</button>
			</view>
		</view>

		<!-- 录音 -->
		<Audio :showVoice2="showVoice2" :showVoice3="showVoice3"></Audio>

		<!-- 表情与更多 -->
		<view class="other">
			<!-- 表情 -->
			<Emoji :emoji="emoji" :showEmoji="showEmoji" :msg="msg" @listenEmoji="listenEmoji"></Emoji>

			<!-- 更多功能 -->
			<More :showMore="showMore" @listenMore="listenMore"></More>
			
		</view>
	</view>
</template>

<script>
import vHeader from '../../components/vHeader.vue';
import Input from './input.vue'
import More from './more.vue'
import Emoji from './emoji.vue'
import Audio from './audio.vue'
import { formatDate } from '../../utils/formatDate.js';
import { chatData, emoji } from '../data.js';

//录音
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
export default {
	data() {
		return {
			data: [],
			dataImage: [], //消息中的图片
			emoji: emoji,
			msg: '', //输入框中的消息
			animationData: {}, //动画
			page:0,	//分页
			showVoice1: false, //语音显示开关
			showVoice2: false, //录音面板开关
			showVoice3: false, //录音面板提示
			voiceTimer: null, //录音计时器
			voiceTime: 0, //录音时长
			startPageY: '', //长按时Y方向初始位置
			endPageY: '', //Y方向结束位置
			showEmoji: false, //表情面板开关
			showMore: false, //更多功能面板开关
			chatHeight: '', //.chat高度
			headerHeight: '', //头部高度
			inputHeight: '', //input面板高度
			chatViewHeight: 0, //.chat-view的高度
			otherHeight: 0, //表情面板高度,
			current: '', //最后一条消息的id
			
		};
	},
	watch: {
		data(newVal) {
			this.$nextTick(function() {
				//data变化后current待下次dom渲染更新,使每次发送消息后滚动到最后
				this.current = 'item' + (newVal.length - 1)
				
				// this.lastTime = this.data[this.data.length-1].time
			});
		}
	},
	filters: {
		format(time) {
			if(time){
				return formatDate(time);
			}
		}
	},
	components: {
		vHeader,
		Input,
		More,
		Emoji,
		Audio
	},
	onLoad(e) {
		//获取fid
		// console.log(e)
		//获取数据
		this.getData(this.page)
		//排序
		this.sortData();
		//处理消息间隔时间
		// this.setDate();
		// this.queryDom('.chat-view')
		
		this.loadding()
	},
	onshow(){
		
	},
	async mounted() {
		//获取页面，头部，input面板的高度
		this.chatHeight = await this.queryDom('.chat');
		this.headerHeight = await this.queryDom('.header');
		this.inputHeight = await this.queryDom('.input');
		

		//设置.chat-view面板的初始高度
		this.setHeight();
	},
	computed: {
		//设置时间
		setDate1(){
			let arr = JSON.parse(JSON.stringify(this.data))
			let length = arr.length;
			let now = new Date().getTime()
			// let time1 = new Date().getTime()
			// let a = []
			// for (let i = arr.length-1; i >= 0 ; i--) {
			// 	if(time1 - arr[i].time > 1000 * 60 * 5){
			// 		time1 = arr[i].time
			// 		a.unshif(i)	
			// 	}
			// }
			
			// if(now-arr[length-1].time>1000 * 60 * 5){
			// 	a.push(length-1)
			// }
			// if(arr[0].time-a[0].time){
				
			// }
			// for(let j=0;j<a.length-1;j++){
			// 	for(let k = 0; k < arr.length ; k++){
					
			// 	}
			// }
			
			for(let i=0;i<arr.length-1;i++){
				
				if(arr[length-1].time-arr[i].time<1000 * 60 * 5){
					arr[i].time = ''
				}
			}
			
			// if(now - arr[length-1] <  1000 * 60 * 5) {
			// 	arr[length - 1].time = ''
			// 	console.log('11')
			// }
			
			return arr
		},
		
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
		//监听v-header组件
		listenRouter(){
			uni.switchTab({
			    url: '/pages/index/index'
			});
		},
		
		//获取数据
		getData(page){
			this.data = chatData
			// for(let i=page*10;i<(page+1)*10;i++){
			// 	console.log(chatData[i])
			// 	this.data.push(chatData[i])
			// }
		},
		//时间排序 升序
		sortData() {
			this.data.sort((a, b) => {
				return a.time - b.time;
			});
		},
		//设置消息间隔5分钟内不显示时间
		setDate() {
			let length = this.data.length;
			let time1 = this.data[length - 1].time;
			for (let i = 0; i < this.data.length; i++) {
				if (time1 - this.data[i].time < 1000 * 60 * 5) {
					this.data[i].time = '';
				}
			}
		},	
		
		//上拉加载更多
		addData(){
			console.log('上拉加载更多')
		},
		
		//loadding动画
		loadding(){
			var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				this.animation = animation
				let i = 1
				let timer = setInterval(()=>{
				  animation.rotate(i*30).step()
				  this.animationData = animation.export()
				  i++
				}, 100)
				
		},
		
		//获取图片
		getImage() {
			this.dataImage = [];
			this.data.map(item => {
				if (item.type == 1) {
					this.dataImage.push(item.message);
				}
			});
		},

		//预览图片
		priviewImage(imgUrl) {
			this.getImage();
			let index = this.dataImage.indexOf(imgUrl);
			// console.log(this.dataImage);
			// console.log(imgUrl)
			// console.log(index);

			uni.previewImage({
				urls: this.dataImage,
				current: index
			});
		},

		//获取节点
		queryDom(name) {
			//移动端是异步
			return new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(name)
					.boundingClientRect(data => {
						// console.log("得到布局位置信息" + JSON.stringify(data));
						// console.log(name+"的高度" + data.height);
						resolve(data.height);
					})
					.exec();
			});
		},

		//设置.chat-view的高度
		setHeight() {
			this.chatViewHeight = this.chatHeight - this.headerHeight - this.inputHeight - this.otherHeight;
		},

		//发送消息
		sendMsg(type, info) {
			let types = type === undefined ? 0 : type;
			let msgObj = {
				id: 'a',
				imgUrl: '/static/test/1.jpg',
				message: '',
				type: types,
				time: new Date().getTime(),
				tip: 1
			};
			if (types === 0) {
				msgObj.message = this.msg;
				this.data.push(msgObj);
				this.msg = '';
			} else if (types === 1) {
				// console.log('图片')
				msgObj.message = info;
				this.data.push(msgObj);
			} else if (types === 2) {
				// console.log('录音');
				msgObj.message = info;
				this.data.push(msgObj);
			} else if (types === 3) {
				msgObj.message = '这是视频';
				this.data.push(msgObj);
			} else {
				// console.log('定位')
				msgObj.message = info;
				this.data.push(msgObj);
			}
		},

		//长按录音
		record(e) {
			// console.log('开始')
			this.showVoice2 = true;
			this.startPageY = e.changedTouches[0].pageY;
			this.voiceTime = 0;
			
			//录音计时
			this.voiceTimer = setInterval(() => {
				this.voiceTime++;
				if (this.voiceTime >= 60) {
					//录音最大长度为60s
					// console.log(this.voiceTime)
					this.touchend(e);
				}
			}, 1000);
			
			//开始录音
			recorderManager.start();
		},

		//取消长按
		touchend(e) {
			// console.log('结束')
			//关闭录音面板
			this.showVoice2 = false;
			clearInterval(this.voiceTimer);
			//结束录音
			recorderManager.stop();
			if (this.voiceTime < 1) {
				uni.showToast({
					title: '说话时间太短',
					image: '/static/chat/warning.png',
					duration: 2000
				});
				//录音面板提示信息复位
				this.showVoice3 = false;
			} else {
				recorderManager.onStop(res => {
					//判断是否在取消了录音
					if (this.showVoice3) {
						// console.log('取消录音')
					} else {
						this.sendMsg(2, { voice: res.tempFilePath, time: this.voiceTime });
					}

					//录音面板提示信息复位
					this.showVoice3 = false;
				});
			}
		},

		//录音时移动手指
		recordMove(e) {
			this.endPageY = e.changedTouches[0].pageY;
			if (this.startPageY - this.endPageY > 100) {
				//取消录音
				this.showVoice3 = true;
			} else {
				this.showVoice3 = false;
			}
		},

		//播放录音
		recordPlay(voice) {
			innerAudioContext.src = voice;
			innerAudioContext.play();
		},

		//点击表情或更多图标
		show(name) {
			let showName = ['showEmoji', 'showMore', 'showVoice1'];
			this.$data[name] = !this.$data[name];
			for (let i = 0; i < showName.length; i++) {
				if (showName[i] !== name) {
					this.$data[showName[i]] = false;
				}
			}

			//$nextTick保证节点下一次渲染后再触发queryDom
			this.$nextTick(async () => {
				this.otherHeight = await this.queryDom('.other');
				this.setHeight();
			});
		},

		/* 监听Emoji组件 */
		listenEmoji(e){
			this[e.name](e.data)
		},
		//点击表情
		tapEmoji(emoji) {
			this.currentEmoji = emoji;
			this.msg += emoji;
		},
		//逐字删除消息
		delMsg() {
			let status = false;
			let length = this.msg.length;
			let sub = this.msg.substring(length - 2);

			//判断是否为表情
			this.emoji.forEach(item => {
				if (item.includes(sub)) {
					status = true;
				}
			});
			if (status) {
				this.msg = this.msg.substring(0, length - 2);
			} else {
				this.msg = this.msg.substring(0, length - 1);
			}
		},

		/* 监听More组件 */
		listenMore(e){
			// console.log(e.name)
			if(e.name==='photo' || e.name==='camera'){
				this.sendMsg(1, e.data)
			}
			else if(e.name==='place'){
				this.sendMsg(4, e.data)
			}
		},

		
		//查看位置
		tapMsgPlace(e) {
			 uni.openLocation({
				name: e.name,
				address: e.address,
				latitude: e.latitude,
				longitude: e.longitude,
				success: function () {
					console.log('success');
				},
				fail: (err)=>{
					console.log(err)
				}
			});
		},
		
	}
};
</script>

<style lang="scss" scoped>
.chat {
	height: 100vh;
	background: $uni-bg-color-message;
	// padding-bottom: constant(safe-area-inset-bottom);
	// padding-bottom: env(safe-area-inset-bottom);
	// box-sizing: border-box;
	// padding-bottom:var(--status-bar-height);

	.chat-view {
		box-sizing: border-box;
		padding: 0 $uni-spacing-row-sm $uni-spacing-col-sm $uni-spacing-row-sm;
		
		.loading {
			text-align: center;
			.loading-img {
				width: $uni-img-size-smx;
				height: $uni-img-size-smx;
			}
		}
		
		.msg-left {
			font-size: $uni-font-size-base;
			margin-bottom: $uni-spacing-col-lg;
			.time {
				width: 100%;
				text-align: center;
				font-size: $uni-font-size-sm;
				padding: $uni-spacing-col-base 0;
			}

			.content {
				display: flex;
				flex-direction: row;
				padding-bottom: $uni-spacing-col-lg;
				.img {
					display: flex;
					margin-right: $uni-spacing-row-sm;
					image {
						align-items: center;
						width: $uni-img-size-xlg;
						height: $uni-img-size-xlg;
						border-radius: $uni-border-radius-lg;
					}
				}
				.msg {
					/* box-sizing: border-box; */
					display: flex;
					align-items: center;
					padding: $uni-spacing-col-base $uni-spacing-row-base;
					max-width: $uni-item-size-lg;
					background: $uni-bg-color-base;
					border-radius: $uni-border-radius-lg;

					.msg-img {
						image {
							width: $uni-img-size-xxlg;
							height: $uni-img-size-xxlg;
						}
					}

					.msg-voice {
						display: flex;
						min-width: $uni-item-size-sm;
						image {
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
							margin-right: $uni-spacing-row-sm;
						}
					}

					.msg-map {
						display: flex;
						flex-direction: column;
						width: $uni-item-size-map;
						background: $uni-bg-color;
						margin: -12rpx -20rpx;
						border-radius: $uni-border-radius-lg;
						overflow: hidden;

						.name {
							font-size: $uni-font-size-base;
							// font-weight: $uni-text-weight-unblod;
							padding: 20rpx 20rpx 5rpx 20rpx;
						}

						.address {
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;
							padding: 0 20rpx;

							/* 单行显示,溢出隐藏 */
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
					
						.map {
							margin-top: 10rpx;
							width: 100%;
							height: 200rpx;
							// background: grey;
						}
				}
				}
			}
		}

		.msg-right {
			font-size: $uni-font-size-base;
			margin-bottom: $uni-spacing-col-lg;

			.time {
				width: 100%;
				text-align: center;
				font-size: $uni-font-size-sm;
			}

			.content {
				display: flex;
				flex-direction: row-reverse;
				.img {
					display: flex;
					margin-left: $uni-spacing-row-sm;
					image {
						align-items: center;
						width: $uni-img-size-xlg;
						height: $uni-img-size-xlg;
						border-radius: $uni-border-radius-lg;
					}
				}
				.msg {
					/* box-sizing: border-box; */
					display: flex;
					align-items: center;
					padding: $uni-spacing-col-base $uni-spacing-row-base;
					max-width: $uni-item-size-lg;
					background: $uni-bg-color;
					border-radius: $uni-border-radius-lg;

					.msg-img {
						image {
							width: $uni-img-size-xxlg;
							height: $uni-img-size-xxlg;
						}
					}

					.msg-voice {
						display: flex;
						flex-direction: row-reverse;
						min-width: $uni-item-size-sm;

						image {
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
							margin-left: $uni-spacing-row-sm;
							transform: rotateY(180deg);
						}
					}

					.msg-map {
						display: flex;
						flex-direction: column;
						width: $uni-item-size-map;
						background: $uni-bg-color;
						margin: -12rpx -20rpx;
						border-radius: $uni-border-radius-lg;
						overflow: hidden;

						.name {
							font-size: $uni-font-size-base;
							// font-weight: $uni-text-weight-unblod;
							padding: 20rpx 20rpx 5rpx 20rpx;
						}

						.address {
							font-size: $uni-font-size-sm;
							color: $uni-text-color-grey;
							padding: 0 20rpx;

							/* 单行显示,溢出隐藏 */
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
						
						.map {
							margin-top: 10rpx;
							width: 100%;
							height: 200rpx;
							// background: grey;
						}	
					}
				}
			}
		}
	}

	
	.input {
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

}
</style>
