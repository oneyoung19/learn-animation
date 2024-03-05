<template>
	<div class="cover bg-blur">
		<h1>我是需要突出显示的内容</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="less">
.cover {
	width: 600px;
	height: 300px;
	position: relative;
	text-align: center;
	line-height: 300px;
	color: white;
	background: transparent url(https://picsum.photos/seed/picsum/600/300) center
		center no-repeat;
	background-size: cover;
}

.bg-blur {
	position: relative;
	z-index: 1;
	overflow: hidden;
	* {
		position: relative;
		z-index: 3;
	}
	&:after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: inherit;
		filter: blur(10px);
		z-index: 2;
	}
}
</style>
