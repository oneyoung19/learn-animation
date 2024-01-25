<template>
	<div
		ref="container"
		class="container">
		<div
			ref="block"
			class="large_block"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		/*
			参考：https://segmentfault.com/a/1190000016554851

			clientHeight: content + padding
			offsetHeight: content + padding + border (与css的box-sizing 无关)
			scrollHeight: content(内部元素滚动 scrollHeight) + padding

			谨记非常重要的一点，scrollHeight 不包含 border
		*/
		const { scrollHeight, clientHeight, offsetHeight } = this.$refs.container
		console.log({
			scrollHeight,
			clientHeight,
			offsetHeight
		})
		console.log(this.$refs.block.scrollHeight)
	},
	methods: {}
}
</script>

<style scoped lang="less">
.container {
	width: 600px;
	height: 600px;
	padding: 10px;
	border: 10px solid lightgray;
	overflow: auto; // 注意这个属性
}
.large_block {
	width: 1000px;
	height: 2000px;
	background-color: lightblue;
	border: 10px solid red;
	padding: 20px;
	margin: 20px;
}
</style>
