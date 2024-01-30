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
					name: 'Conversation',
					text: 'Conversation'
				},
				{
					name: 'ScrollHeight',
					text: 'ScrollHeight'
				},
				{
					name: 'ScrollHorizonal',
					text: 'ScrollHorizonal'
				},
				{
					name: 'GsapScrollSmoother',
					text: 'GsapScrollSmoother'
				},
				{
					name: 'GsapScrollTrigger',
					text: 'GsapScrollTrigger'
				},
				{
					name: 'GsapScrollTriggerCustom',
					text: 'GsapScrollTriggerCustom'
				},
				{
					name: 'GsapScrollTriggerHorizonal',
					text: 'GsapScrollTriggerHorizonal'
				},
				{
					name: 'GsapScrollTriggerSnap',
					text: 'GsapScrollTriggerSnap'
				},
				{
					name: 'Demos',
					text: 'Demos'
				}
			]
		}
	},
	methods: {}
}
</script>
