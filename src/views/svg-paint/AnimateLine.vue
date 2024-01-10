<template>
	<div>
		<svg
			class="demo1"
			width="300px">
			<path
				ref="path1"
				fill="transparent"
				stroke-width="5"
				d="M10 80 Q77.5 10, 145 80 T280 80"
				class="path"></path>
		</svg>
		<svg
			width="300px"
			height="175px"
			class="demo2">
			<path
				ref="path2"
				fill="transparent"
				stroke="skyblue"
				stroke-width="4"
				d="M10 80 Q 77.5 10, 145 80 T 280 80"
				class="path"></path>
			<path
				fill="transparent"
				stroke="#FF2851"
				stroke-width="4"
				d="M10 80 Q 77.5 10, 145 80 T 280 80"
				class="line2"></path>
			<path
				fill="transparent"
				stroke="orange"
				stroke-width="4"
				d="M10 80 Q 77.5 10, 145 80 T 280 80"
				class="line1"></path>
		</svg>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		const { path1, path2 } = this.$refs
		console.log({
			path1: path1.getTotalLength(),
			path2: path2.getTotalLength()
		})
	},
	methods: {}
}
</script>

<style scoped lang="less">
.demo1 {
	@keyframes dash {
		from {
			stroke-dashoffset: 320;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	path {
		stroke: #000000;
		stroke-dasharray: 320;
		stroke-dashoffset: 0;
		animation: dash 2s ease-in-out infinite;
	}
}
.demo2 {
	.line1 {
		stroke-dasharray: 340;
		stroke-dashoffset: 40;
		animation: dash1 1.5s linear alternate infinite;
	}
	.line2 {
		stroke-dasharray: 320;
		stroke-dashoffset: 320;
		animation: dash2 1.5s linear alternate infinite;
	}
	@keyframes dash1 {
		from {
			stroke-dashoffset: 360;
		}
		to {
			stroke-dashoffset: 40;
		}
	}
	@keyframes dash2 {
		from {
			stroke-dashoffset: 280;
		}
		to {
			stroke-dashoffset: -40;
		}
	}
}
</style>
