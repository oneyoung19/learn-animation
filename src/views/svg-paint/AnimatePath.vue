<template>
	<div class="bezier">
		<svg
			id="svg"
			width="100%"
			height="100%"
			version="1.1">
			<path
				fill="transparent"
				stroke="#888888"
				stroke-width="1"
				class="path"></path>
		</svg>
		<div class="ball"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		this.run()
	},
	methods: {
		run() {
			let svg = document.querySelector('#svg'),
				path = svg.querySelector('path'),
				ball = document.querySelector('.ball'),
				// TODO:这里取的是document的长宽 其实是不合理的 应该取svg自身的宽高 因为path设置的坐标是参照svg元素 而并非整个文档
				wWidth = document.documentElement.offsetWidth,
				wHeight = document.documentElement.offsetHeight
			let pathStr =
				'M50 ' +
				Math.floor(wHeight - 200) +
				' Q' +
				Math.floor(wWidth / 2) +
				' 0 ' +
				Math.floor(wWidth) +
				' ' +
				Math.floor(wHeight / 2)
			path.setAttribute('d', pathStr)
			ball.style.offsetPath = 'path("' + pathStr + '")'
			console.log({
				wWidth,
				wHeight,
				pathStr
			})
		}
	}
}
</script>

<style scoped lang="less">
.bezier {
	width: 100%;
	height: 100%;
	svg {
		display: block;
		position: absolute;
	}
	path {
		stroke: rgba(255, 0, 0, 0.1);
		stroke-dasharray: 4;
	}
	.ball {
		width: 20px;
		height: 20px;
		background-color: red;
		border-radius: 50%;
		offset-distance: 0%;

		animation: move-ball 2s ease-in-out infinite;
	}
	@keyframes move-ball {
		to {
			offset-distance: 100%;
		}
	}
}
</style>
