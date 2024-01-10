<template>
	<div class="home">
		<RouterButton to="SvgPaint">Svg Paint</RouterButton>
		<RouterButton to="Demos">Demos</RouterButton>
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
