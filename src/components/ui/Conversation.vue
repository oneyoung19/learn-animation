<template>
	<div
		ref="conversation"
		class="conversation">
		<div class="header">Conversation</div>
		<div
			ref="conversationWrapper"
			class="conversation-wrapper">
			<ul
				ref="conversationList"
				class="conversation-list">
				<li
					v-for="(item, index) in conversationList"
					:key="index"
					class="conversation-row">
					<div
						v-if="item.type === 'question'"
						class="conversation-item question">
						<div class="conversation-form">
							<input
								v-show="showCheckedBox"
								type="checkbox"
								class="checkbox"
								:value="item.text"
								@change="event => handleCheck(event, item, index)" />
							<SvgIcon
								name="avatar"
								class="icon"
								:class="item.animation ? 'animation' : ''"></SvgIcon>
						</div>
						<div
							class="bubble"
							:class="item.animation ? 'animation' : ''"
							@contextmenu="handleContextMenu">
							<ConversationLoading v-if="item.loading"></ConversationLoading>
							<span v-else>{{ item.text }}</span>
						</div>
					</div>
					<div
						v-else
						class="conversation-item answer">
						<div
							class="bubble"
							:class="item.animation ? 'animation' : ''"
							@contextmenu="handleContextMenu">
							<ConversationLoading v-if="item.loading"></ConversationLoading>
							<span v-else>{{ item.text }}</span>
						</div>
						<div class="conversation-form">
							<SvgIcon
								name="robot"
								class="icon"
								:class="item.animation ? 'animation' : ''"></SvgIcon>
							<input
								v-show="showCheckedBox"
								type="checkbox"
								class="checkbox"
								:value="item.text"
								@change="event => handleCheck(event, item, index)" />
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div
			ref="footer"
			class="footer">
			<div class="footer-controls">
				<ul class="controls-list">
					<li class="controls-item">
						<SvgIcon
							name="aigc"
							class="icon"></SvgIcon>
						<span class="text">AI生成</span>
					</li>
					<li class="controls-item">
						<SvgIcon
							name="train"
							class="icon"></SvgIcon>
						<span class="text">入库训练</span>
					</li>
					<li
						class="controls-item"
						@click="dialogVisible = true">
						<SvgIcon
							name="chat"
							class="icon"></SvgIcon>
						<span class="text">Chat</span>
					</li>
				</ul>
			</div>
			<div class="footer-form">
				<ConversationTextarea
					v-model="textareaText"
					class="textarea"
					placeholder="Type your message..."
					:min-rows="1"
					:max-rows="8"
					@size-change="handleTextareaSizeChange"
					@keydown.native.ctrl.enter="handleSend"></ConversationTextarea>
				<SvgIcon
					name="aircraft"
					class="icon"
					:class="sendAble ? 'active' : ''"
					@click.native="handleSend"></SvgIcon>
			</div>
		</div>
		<ConversationContextmenu
			v-model="contextmenuVisible"
			:position="contextmenuPosition"
			@select="handleContextmenuSelect"></ConversationContextmenu>
		<ConversationDialog v-model="dialogVisible"></ConversationDialog>
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
				},
				{
					type: 'question',
					text: 'Please type a number',
					loading: true
				},
				{
					type: 'answer',
					text: '123',
					loading: true
				},
				{
					type: 'question',
					text: 'Please type a number'
				},
				{
					type: 'answer',
					text: '123'
				},
				{
					type: 'question',
					text: 'Please type a number'
				},
				{
					type: 'answer',
					text: '123'
				},
				{
					type: 'question',
					text: 'Please type a number'
				},
				{
					type: 'answer',
					text: '123'
				}
			],
			textareaText: '',
			// 多选
			showCheckedBox: true,
			checkedConversationList: [],
			// contextmenu
			contextmenuVisible: false,
			contextmenuPosition: {},
			// dialog
			dialogVisible: false
		}
	},
	computed: {
		sendAble() {
			return !!this.textareaText
		}
	},
	watch: {
		// 监听对话数据变化
		conversationList: {
			handler(value) {
				this.setScroll()
			}
		}
	},
	mounted() {
		this.setScroll()
	},
	methods: {
		// 设置对话区域滚动
		setScroll() {
			this.$nextTick(() => {
				const { scrollHeight } = this.$refs.conversationList
				this.$refs.conversationWrapper.scrollTo({
					top: scrollHeight,
					left: 0,
					behavior: 'smooth'
				})
			})
		},
		// 根据textarea变化 重新设置对话表高度
		handleTextareaSizeChange({ height }) {
			this.$refs.conversationWrapper.style.height = `calc(100% - var(--conversation-header-height) - var(--conversation-footer-controls-height) - ${height})`
			this.setScroll()
		},
		// 发送消息
		handleSend() {
			if (!this.sendAble) return
			this.conversationList.push({
				type: 'answer',
				text: this.textareaText,
				animation: true
			})
			this.textareaText = ''
		},
		// 唤起菜单
		handleContextMenu(event) {
			event.preventDefault()
			this.contextmenuVisible = true
			// 视口尺寸 - 容器尺寸
			const { clientX, clientY } = event
			const { conversation } = this.$refs
			const rect = conversation.getBoundingClientRect()
			this.contextmenuPosition = {
				top: `${clientY - rect.top}px`,
				left: `${clientX - rect.left}px`
			}
		},
		// 选定contextmenu
		handleContextmenuSelect(selectItem) {
			const { type } = selectItem
			if (type === 'SEND') {
				if (!this.checkedConversationList.length) return
				// 发送消息
			} else if (type === 'AI') {
				// 唤起AI对话框
				this.dialogVisible = true
				// if (this.checkedConversationList.length) {
				// } else {}
			}
		},
		// 消息多选
		handleCheck(event, item, index) {
			const { checked } = event.target
			if (checked) {
				this.checkedConversationList.push({
					index,
					...item
				})
			} else {
				const checkedIndex = this.checkedConversationList.findIndex(
					checkedItem => checkedItem.index === index
				)
				if (checkedIndex > -1) {
					this.checkedConversationList.splice(checkedIndex, 1)
				}
			}
		}
	}
}
</script>

<style lang="less">
:root {
	// --conversation-theme: rgb(110, 72, 170);
	--conversation-theme: #6f8aff;
	// [font-style] [font-variant] [font-weight] [font-size]/[line-height] [font-family]
	--conversation-font: 16px monospace;
	--conversation-color-background: rgb(245, 248, 251);
	--conversation-color-title: rgb(255, 255, 255);
	--conversation-color-question: rgb(255, 255, 255);
	--conversation-color-answer: rgb(74, 74, 74);
	--conversation-color-white: rgb(255, 255, 255);
	--conversation-color-inactived: #b5b6bd;
	--conversation-header-height: 56px;
	--conversation-footer-controls-height: 35px;
	--conversation-footer-form-height: 48px;
	--conversation-border-color: #b5b6bd;
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
	.conversation-wrapper {
		width: 100%;
		height: calc(
			100% - var(--conversation-header-height) -
				var(--conversation-footer-controls-height) -
				var(--conversation-footer-form-height)
		);
		overflow-y: scroll;
		.conversation-list {
			width: 100%;
			padding: 6px;
			.conversation-row {
				margin-bottom: 10px;
				.conversation-item {
					display: flex;
					align-items: flex-end;
					@keyframes scale {
						0% {
							transform: scale(0);
						}
						100% {
							transform: scale(1);
						}
					}
					.conversation-form {
						display: flex;
						align-items: center;
						.checkbox {
							position: relative;
							cursor: pointer;
							// appearance: none;
						}
						.icon {
							font-size: 46px;
							height: 40px;
							min-width: 40px;
							padding: 3px;
							box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
							&.animation {
								animation: 0.3s ease 0s 1 normal forwards running scale;
							}
						}
					}
					.bubble {
						position: relative;
						padding: 12px;
						box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
						font-size: 14px;
						max-width: 60%;
						overflow: hidden;
						word-break: break-word;
						&.animation {
							animation: 0.3s ease 0s 1 normal forwards running scale;
						}
					}
					&.question {
						justify-content: flex-start;
						.conversation-form {
							margin-right: 6px;
							.checkbox {
								margin-right: 6px;
							}
							.icon {
								border-radius: 50% 50% 0px;
								transform-origin: right bottom;
							}
						}
						.bubble {
							background: var(--conversation-theme);
							border-radius: 18px 18px 18px 0px;
							color: var(--conversation-color-question);
							transform-origin: left bottom;
						}
					}
					&.answer {
						justify-content: flex-end;
						.conversation-form {
							margin-left: 6px;
							.checkbox {
								margin-left: 6px;
							}
							.icon {
								border-radius: 50% 50% 50% 0px;
								transform-origin: left bottom;
							}
						}
						.bubble {
							background: var(--conversation-color-white);
							border-radius: 18px 18px 0px;
							color: var(--conversation-color-answer);
							transform-origin: right bottom;
						}
					}
				}
			}
		}
	}
	.footer {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		background-color: var(--conversation-color-white);
		border-radius: 10px 10px 0 0;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		.footer-controls {
			display: flex;
			align-items: center;
			width: 100%;
			height: var(--conversation-footer-controls-height);
			padding: 0 10px;
			border-bottom: 1px solid var(--conversation-border-color);
			.controls-list {
				display: flex;
				align-items: center;
				.controls-item {
					display: flex;
					align-items: center;
					min-height: 26px;
					font-size: 14px;
					border: 1px solid var(--conversation-border-color);
					border-radius: 5px;
					color: var(--conversation-border-color);
					transition: all 0.2s ease-in-out;
					cursor: pointer;
					&:hover {
						color: var(--conversation-color-answer);
						border-color: var(--conversation-color-answer);
					}
					+ .controls-item {
						margin-left: 5px;
					}
					> .icon {
						padding: 2px 3px 2px 4px;
					}
					> .text {
						padding: 2px 4px 2px 3px;
					}
				}
			}
		}
		.footer-form {
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.textarea {
				flex: 1;
				padding-right: 0;
			}
			.icon {
				font-size: 20px;
				padding: 14px 16px;
				color: var(--conversation-color-inactived);
				cursor: not-allowed;
				transition: color 0.2s ease-in-out;
				&.active {
					color: var(--conversation-color-answer);
					cursor: pointer;
				}
			}
		}
	}
}
</style>
