<template>
	<view class="add_friend">
		<perchTop />
		<view class="header">
			<search class="search" placeholder="根据邮箱查询" @listenSearch="listenSearch" />
			<text @tap="cancel">取消</text>
		</view>

		<view class="main">
			<view class="none" v-show="!searchData.length">该用户不存在</view>
			<item-block :data="searchData" :showContent="false" />
		</view>
	</view>
</template>

<script>
import perchTop from '@/components/perchTop.vue';
import perchBottom from '@/components/perchBottom.vue';
import search from '@/components/search.vue';
import itemBlock from '@/components/itemBlock.vue';
import { usersData } from 'pages/data.js';
export default {
	data() {
		return {
			data: usersData,
			searchStr: '' //保存search组件传递的str
		};
	},
	components: {
		perchTop,
		perchBottom,
		search,
		itemBlock
	},
	computed: {
		searchData() {
			return this.data.filter(item => {
				if (item.name.search(this.searchStr) != -1 || item.mail.search(this.searchStr) != -1) {
					return item;
				}
			});
		}
	},
	methods: {
		//监听search组件
		listenSearch(e) {
			this.searchStr = e;
		},
		
		//点击取消
		cancel(){
			uni.navigateBack({
			    delta: 1
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.add_friend {
	// background: $uni-bg-color-message;
	height: 100vh;

	.header {
		display: flex;
		padding: 10rpx;
		justify-content: space-between;
		align-items: center;
		background: $uni-bg-color-message;

		.search {
			background: #fff;
		}

		text {
			width: 80rpx;
			text-align: center;
			color: $uni-color-primary;
		}
	}

	.main {
		.none {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 400rpx;
			color: $uni-text-color-grey;
		}
	}
}
</style>
