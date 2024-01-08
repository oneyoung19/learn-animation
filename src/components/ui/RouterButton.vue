<template>
	<el-button
		v-bind="$attrs"
		v-on="$listeners"
		@click="handleClick">
		<slot></slot>
	</el-button>
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
			if (name === 'Back') {
				this.$router.go(-1)
			} else {
				this.$router.push({
					name
				})
			}
		}
	}
}
</script>

<style scoped lang="less"></style>
