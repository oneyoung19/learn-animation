<template>
	<div>
		<svg
			class="svg"
			:class="active ? 'active' : ''"
			width="100"
			height="100"
			viewBox="0 0 100 100"
			@click="active = !active">
			<path
				ref="line1"
				class="line line1"
				d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"></path>
			<path
				ref="line2"
				class="line line2"
				d="M 20,50 H 80"></path>
			<path
				ref="line3"
				class="line line3"
				d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"></path>
		</svg>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: false
		}
	},
	mounted() {
		const { line1, line2, line3 } = this.$refs
		console.log({
			line1: line1.getTotalLength(),
			line2: line2.getTotalLength(),
			line3: line3.getTotalLength()
		})
	},
	methods: {}
}
</script>

<style scoped lang="less">
.svg {
	cursor: pointer;
	.line {
		fill: none;
		stroke: black;
		stroke-width: 4;
		transition: all 0.8s ease-in-out;
		&.line1 {
			stroke-dasharray: 60 147;
			stroke-dashoffset: 0;
		}
		&.line2 {
			stroke-dasharray: 60;
			stroke-dashoffset: 0;
		}
		&.line3 {
			stroke-dasharray: 60 147;
			stroke-dashoffset: 0;
		}
	}
	&.active {
		.line {
			&.line1 {
				stroke-dashoffset: -140;
			}
			&.line2 {
				stroke-dasharray: 1 60;
				stroke-dashoffset: -30;
			}
			&.line3 {
				stroke-dashoffset: -140;
			}
		}
	}
}
</style>
