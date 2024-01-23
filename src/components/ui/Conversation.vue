<template>
	<div
		ref="conversation"
		class="conversation">
		<div class="header">
			<p class="title">Conversation</p>
			<VSwatches
				v-model="themeColor"
				:swatches="swatches"
				row-length="4"
				swatch-size="38"
				show-fallback
				fallback-input-type="color">
				<ConversationMenuIcon
					slot="trigger"
					class="icon"
					@toggle="handleMenuToggle"></ConversationMenuIcon>
			</VSwatches>
		</div>
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
					<li
						v-for="item in menus"
						:key="item.id"
						class="controls-item"
						@click="handleMenuItemClick(item)">
						<SvgIcon
							:name="item.icon"
							class="icon"></SvgIcon>
						<span class="text">{{ item.text }}</span>
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
					@keydown.native.ctrl.enter.exact="handleSend"></ConversationTextarea>
				<SvgIcon
					name="aircraft"
					class="icon"
					:class="sendAble ? 'active' : ''"
					@click.native="handleSend"></SvgIcon>
			</div>
		</div>
		<ConversationContextmenu
			v-model="contextmenuVisible"
			:menus="menus"
			:position="contextmenuPosition"
			@select="handleMenuItemClick"></ConversationContextmenu>
		<ConversationDialog v-model="dialogVisible"></ConversationDialog>
	</div>
</template>

<script>
import Vue from 'vue'
import toast from '@/components/common/toast/index.js'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'

export default {
	components: {
		VSwatches
	},
	data() {
		return {
			// 主题
			themeColor: '#6f8aff',
			swatches: [
				'#C0382B',
				'#E84B3C',
				'#F39C19',
				'#F2C511',
				'#1CA085',
				'#27B99C',
				'#0C9D48',
				'#27AF60',
				'#4661DD',
				'#6F8AFF',
				'#A463BF',
				'#8E43AD',
				'#3D556E',
				'#222F3D',
				'#BDC3C8',
				'#DDE6E8'
			],
			// 对话
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
			menus: [
				// {
				// 	id: 'CHECKED_BOX',
				// 	text: '多选'
				// },
				// {
				// 	id: 'CHECKED_BOX_CANCEL',
				// 	text: '取消多选'
				// },
				{
					id: 'GENERATE',
					icon: 'aigc',
					text: 'AI生成'
				},
				{
					id: 'TRAIN',
					icon: 'train',
					text: '入库训练'
				},
				{
					id: 'CHAT',
					icon: 'chat',
					text: 'Chat'
				}
			],
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
		themeColor: {
			handler(color) {
				this.setTheme(color)
			}
		},
		// 监听对话数据变化
		conversationList: {
			handler(value) {
				this.setScroll()
			}
		}
	},
	mounted() {
		Vue.use(toast, {
			appendToElement: this.$refs.conversation
		})
		this.setTheme()
		this.setScroll()
	},
	methods: {
		setTheme(color) {
			const themeColor =
				color || window.localStorage.getItem('themeColor') || this.themeColor
			this.themeColor = themeColor
			const root = document.documentElement
			// 不能使用 root.style['--conversation-theme']
			root.style.setProperty('--conversation-theme', themeColor)
			// 持久化
			window.localStorage.setItem('themeColor', themeColor)
		},
		handleMenuToggle() {},
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
		handleSend(event) {
			event.preventDefault()
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
		handleMenuItemClick(item) {
			const { id } = item
			if (id === 'GENERATE') {
				if (!this.checkedConversationList.length) {
					this.$toast({
						message: '请选择数据'
					})
					return
				}
				// 发送消息
			} else if (id === 'CHAT') {
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
		.icon {
			font-size: 40px;
		}
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
							color: var(--conversation-theme);
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
				flex-wrap: wrap;
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
