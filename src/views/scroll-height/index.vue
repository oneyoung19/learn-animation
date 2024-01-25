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
	padding: 20px;
	margin: 20px;
}
</style>
