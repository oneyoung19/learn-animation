<template>
	<div class="conversation">
		<div class="header">Speech Synthesis</div>
	</div>
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
	--coversation-color-background: rgb(245, 248, 251);
	--coversation-color-title: rgb(255, 255, 255);
	--coversation-color-question: rgb(255, 255, 255);
	--coversation-color-answer: rgb(74, 74, 74);
}
</style>

<style scoped lang="less">
.conversation {
	position: relative;
	z-index: 999;
	width: 100%;
	height: 100%;
	// color: var(--coversation-theme);
	font: var(--conversation-font);
	background: var(--coversation-color-background);
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 12px 24px 0px;
	overflow: hidden;
	inset: initial;
	transition: transform 0.3s ease 0s;
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 56px;
		background: var(--coversation-theme);
		color: rgb(255, 255, 255);
		padding: 0px 10px;
		font-weight: bold;
	}
}
</style>
