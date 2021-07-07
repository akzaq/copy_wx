<template>
	<view class="search">
		<image src="/static/header/search.png" mode="widthFix"></image>
		<input type="text" v-model="str" :placeholder="placeholder" @blur="search"/>
	</view>
</template>="search"
<script>
export default {
	name: 'search',
	props: {
		placeholder: {
			type: String,
			default: ''
		},
	},
	data() {
		return {
			str: ''
		};
	},
	methods: {
		search(){
			let count = 0
			for(let i in this.str){
				if(this.str[i] === ' '){
					count++
				}
			}
			
			if(this.str.length>0 && this.str.length>count){
				// console.log(this.str)
				this.$emit('listenSearch',this.str)
			}
		},
	},
};
</script>

<style lang="scss">
.search {
	z-index: 2;
	width: 100%;
	height: 100rpx;
	position: relative;
	border: 1rpx solid #ccc;

	image {
		position: absolute;
		width: 46rpx;
		height: 46rpx;
		top: 50%;
		left: 17rpx;
		transform: translateY(-50%);
	}

	input {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 40rpx 0 80rpx;
	}
}
</style>
