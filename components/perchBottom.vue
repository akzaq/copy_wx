<template>
	<view :style="{'width':'100%','height': height}">
		
	</view>
</template>

<script>
	export default {
		name:"perchBottom",
		data() {
			return {
				
			};
		},
		computed: {
			height(){
				return this.$safeBottom + 'px'
			}
		},
		mounted(){
			
			
		},
	}
</script>

<style >

</style>