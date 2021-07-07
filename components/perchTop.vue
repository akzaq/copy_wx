<template>
	<view :style="{'width':'100%', 'height': height}">
		
	</view>
</template>

<script>
	export default {
		name:"perchTop",
		data() {
			return {
				
			};
		},
		computed: {
			height(){
				return this.$safeTop + 'px'
			}
		},
		mounted(){
			
		},
	}
</script>

<style >

</style>
