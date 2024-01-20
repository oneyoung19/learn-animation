<template>
	<div class="conversation">
		<div class="header">Speech Synthesis</div>
		<ul class="conversation-list">
			<li
				v-for="(item, index) in conversationList"
				:key="index"
				class="conversation-row">
				<div
					v-if="item.type === 'question'"
					class="conversation-item question">
					<SvgIcon
						name="avatar"
						class="icon"></SvgIcon>
					<div class="bubble">{{ item.text }}</div>
				</div>
				<div
					v-else
					class="conversation-item answer">
					<div class="bubble">{{ item.text }}</div>
					<SvgIcon
						name="robot"
						class="icon"></SvgIcon>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			conversationList: [
				{
					type: 'question',
					text: 'Please type a number'
				},
				{
					type: 'answer',
					text: '123'
				}
			]
		}
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
	--coversation-color-white: rgb(255, 255, 255);
	--conversation-header-height: 56px;
	--conversation-footer-height: 56px;
}
</style>

<style scoped lang="less">
.conversation {
	position: relative;
	z-index: 999;
	width: 100%;
	height: 100%;
	margin: 0 auto;
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
		height: var(--conversation-header-height);
		background: var(--coversation-theme);
		color: var(--coversation-color-white);
		padding: 0px 10px;
		font-weight: bold;
	}
	.conversation-list {
		width: 100%;
		height: calc(
			100% - var(--conversation-header-height) -
				var(--conversation-footer-height)
		);
		padding-top: 6px;
		overflow-y: scroll;
		.conversation-row {
			margin-bottom: 10px;
			.conversation-item {
				display: flex;
				align-items: flex-end;
				.icon {
					font-size: 46px;
					// animation: 0.3s ease 0s 1 normal forwards running Lmuha;
					height: 40px;
					min-width: 40px;
					padding: 3px;
					// transform: scale(0);
					// transform-origin: right bottom;
					box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
				}
				.bubble {
					position: relative;
					padding: 12px;
					// animation: 0.3s ease 0s 1 normal forwards running Lmuha;
					box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
					// display: inline-block;
					font-size: 14px;
					max-width: 60%;
					// margin: 0px 0px 10px;
					overflow: hidden;
					// transform: scale(0);
					// transform-origin: left bottom;
				}
				&.question {
					justify-content: flex-start;
					.icon {
						margin-right: 6px;
						border-radius: 50% 50% 0px;
					}
					.bubble {
						background: var(--coversation-theme);
						border-radius: 18px 18px 18px 0px;
						color: var(--coversation-color-question);
					}
				}
				&.answer {
					justify-content: flex-end;
					.icon {
						margin-left: 6px;
						border-radius: 50% 50% 50% 0px;
					}
					.bubble {
						background: var(--coversation-color-white);
						border-radius: 18px 18px 0px;
						color: var(--coversation-color-answer);
					}
				}
			}
		}
	}
}
</style>
