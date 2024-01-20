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
		<div class="footer">
			<textarea
				ref="input"
				v-model="inputText"
				class="input"
				placeholder="Type your message..."></textarea>
			<SvgIcon
				name="aircraft"
				class="icon"></SvgIcon>
		</div>
	</div>
</template>

<script>
import calcTextareaHeight from '@/utils/calcTextareaHeight'

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
			],
			inputText: ''
		}
	},
	watch: {
		inputText: {
			handler(value) {
				this.setTextareaSize()
			}
		}
	},
	mounted() {
		this.setTextareaSize()
	},
	methods: {
		setTextareaSize() {
			const { input } = this.$refs
			const textareaCalcStyle = calcTextareaHeight(input)
			const { height } = textareaCalcStyle
			this.$refs.input.style.height = height
		}
	}
}
</script>

<style lang="less">
:root {
	--conversation-theme: rgb(110, 72, 170);
	// [font-style] [font-variant] [font-weight] [font-size]/[line-height] [font-family]
	--conversation-font: 16px monospace;
	--conversation-color-background: rgb(245, 248, 251);
	--conversation-color-title: rgb(255, 255, 255);
	--conversation-color-question: rgb(255, 255, 255);
	--conversation-color-answer: rgb(74, 74, 74);
	--conversation-color-white: rgb(255, 255, 255);
	--conversation-header-height: 56px;
	--conversation-footer-height: 48px;
}
::-webkit-scrollbar {
	display: none;
	width: 0;
	height: 0;
}
</style>

<style scoped lang="less">
.conversation {
	position: relative;
	z-index: 999;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	font: var(--conversation-font);
	background: var(--conversation-color-background);
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
		background: var(--conversation-theme);
		color: var(--conversation-color-white);
		padding: 0px 10px;
		font-weight: bold;
	}
	.conversation-list {
		width: 100%;
		// height: calc(
		// 	100% - var(--conversation-header-height) -
		// 		var(--conversation-footer-height)
		// );
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
						background: var(--conversation-theme);
						border-radius: 18px 18px 18px 0px;
						color: var(--conversation-color-question);
					}
				}
				&.answer {
					justify-content: flex-end;
					.icon {
						margin-left: 6px;
						border-radius: 50% 50% 50% 0px;
					}
					.bubble {
						background: var(--conversation-color-white);
						border-radius: 18px 18px 0px;
						color: var(--conversation-color-answer);
					}
				}
			}
		}
	}
	.footer {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 100%;
		height: auto;
		background-color: var(--conversation-color-white);
		overflow: hidden;
		.input {
			flex: 1;
			box-sizing: border-box;
			padding: 14px 16px;
			height: var(--conversation-footer-height);
			max-height: 200px;
			border-width: 0;
			appearance: none;
			resize: none;
			&::placeholder {
				color: rgba(0, 0, 0, 0.5);
			}
		}
		.icon {
			font-size: 20px;
			padding: 14px 16px;
			cursor: pointer;
		}
	}
}
</style>
