<template>
	<div
		ref="container"
		class="container">
		<ul
			ref="block"
			class="block">
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
			<li>6</li>
			<li>7</li>
			<li>8</li>
			<li>9</li>
			<li>10</li>
		</ul>
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
		const {
			scrollHeight: blockScrollHeight,
			clientHeight: blockClientHeight,
			offsetHeight: blockOffsetHeight
		} = this.$refs.block
		console.log({
			blockScrollHeight,
			blockClientHeight,
			blockOffsetHeight
		})
		/*
			https://github1s.com/LucasBassetti/react-simple-chatbot/blob/HEAD/lib/ChatBot.jsx#L180-L181
			之所以能够设置 top: scrollHeight，因为这时向上滚动尺寸是远远不抵scrollHeight的。这样由于设置距离偏大，而实际距离并不够，那么就会展示最底部了。
		*/
		setTimeout(() => {
			this.$refs.container.scrollTo({
				// top: 100,
				top: scrollHeight,
				left: 0,
				behavior: 'smooth'
			})
		}, 1000)
	},
	methods: {}
}
</script>

<style scoped lang="less">
.container {
	width: 600px;
	height: 600px;
	padding: 100px;
	border: 10px solid lightgray;
	overflow: auto; // 注意这个属性
	.block {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 2000px;
		background-color: skyblue;
		border: 10px solid red;
		padding: 20px;
		// margin: 20px;
		> li {
			flex: 1;
		}
	}
}
</style>
