<template>
	<div class="conversation">conversation</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
}
</script>

<style lang="less">
:root {
	--coversation-theme: rgb(110, 72, 170);
	// [font-style] [font-variant] [font-weight] [font-size]/[line-height] [font-family]
	--conversation-font: 16px monospace;
	--coversation-color-white: rgb(245, 248, 251);
}
</style>

<style scoped lang="less">
.conversation {
	position: relative;
	z-index: 999;
	width: 100%;
	height: 100%;
	color: var(--coversation-theme);
	font: var(--conversation-font);
	background: var(--coversation-color-white);
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 12px 24px 0px;
	overflow: hidden;
	inset: initial;
	transition: transform 0.3s ease 0s;
}
</style>
