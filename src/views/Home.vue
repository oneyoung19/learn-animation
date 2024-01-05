<template>
	<div class="home">
		<el-link
			type="primary"
			@click="handleClick">
			Demos
		</el-link>
	</div>
</template>

<script>
export default {
	name: 'Home',
	methods: {
		handleClick() {
			this.$router.push({
				name: 'Demos'
			})
		}
	}
}
</script>
