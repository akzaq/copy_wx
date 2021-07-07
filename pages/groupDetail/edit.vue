<template>
	<view class="edit">
		<view class="header">
			<text>修改{{name}}</text>
		</view>
		<view class="main">
			<textarea type="text" v-model="oldValue"/>
		</view>
		<view class="bottom">
			<button type="default" @tap="edit">保存</button>
			<button type="warn" @tap="cancel">取消</button>
		</view>
	</view>
	
</template>

<script>

export default {
	props: {
		name: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			oldValue: this.value	//保存初始值
		}
	},
	watch: {
		value(newVal){
			this.$nextTick(function(){
				this.oldValue = newVal
			})
		}
	},
	methods: {
		edit(){
			// console.log(this.oldValue)
			this.$emit('listenEdit',{name:this.name,value:this.oldValue})
		},
		
		cancel(){
			this.oldValue = this.value
			// console.log(this.oldValue)
			this.$emit('listenEdit',{name:this.name,value:this.oldValue})
		},
		
	}
	
}
</script>

<style lang="scss" scoped>
.edit {
	z-index: 2;
	background: #fff;
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0; 
	left: 0;
	right: 0;
	
	.header {
		height: 80rpx;
		background: $uni-bg-color-grey;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-lg;
		font-weight: $uni-text-weight-unblod;
	}
	
	.main {
		// width: 100%;
		
		margin: 40rpx 0 ;
		textarea {
			margin: 0 auto;
			padding: 20rpx;
			background: $uni-bg-color-input;
			border-radius: $uni-border-radius-lg;
		}
	}
	
	.bottom {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
	}
}
	
</style>
