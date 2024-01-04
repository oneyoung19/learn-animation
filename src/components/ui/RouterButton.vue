<template>
	<div
		class="router-button"
		@click="handleClick">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		// Route Name
		to: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	methods: {
		handleClick() {
			const { to: name } = this
			this.$router.push({
				name
			})
		}
	}
}
</script>

<style scoped lang="less">
.router-button {
	display: inline-flex;
	padding: 10px;
	border: 1px solid #ccc;
	cursor: pointer;
}
</style>
