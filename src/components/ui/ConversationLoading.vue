<template>
	<div class="loading">
		<span
			v-for="item in sum"
			:key="item"
			:style="`animation-delay: ${item * 0.2}s`">
			.
		</span>
	</div>
</template>

<script>
export default {
	props: {
		sum: {
			type: Number,
			default: 3
		}
	},
	data() {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="less">
@keyframes loading {
	0% {
		opacity: 0.2;
	}
	20% {
		opacity: 1;
	}
	100% {
		opacity: 0.2;
	}
}
.loading {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	> span {
		animation: loading 1.4s infinite both;
	}
}
</style>
