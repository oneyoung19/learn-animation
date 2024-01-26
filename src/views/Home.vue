<template>
	<div class="home">
		<RouterButton
			v-for="item in routeList"
			:key="item.name"
			:to="item.name">
			{{ item.text }}
		</RouterButton>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			routeList: [
				{
					name: 'SvgPaint',
					text: 'Svg Paint'
				},
				{
					name: 'Demos',
					text: 'Demos'
				},
				{
					name: 'Conversation',
					text: 'Conversation'
				},
				{
					name: 'GsapScrollSmoother',
					text: 'GsapScrollSmoother'
				}
			]
		}
	},
	methods: {}
}
</script>
