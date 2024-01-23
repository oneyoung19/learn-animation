<template>
	<transition
		name="fade"
		mode="out-in">
		<div
			v-show="value"
			class="conversation-dialog"
			@click.self="handleOverlayClick">
			<div class="conversation-wrapper">
				<div class="conversation-form question">
					<ConversationTextarea
						:min-rows="5"
						:max-rows="10"></ConversationTextarea>
					<div class="conversation-form-footer">
						<ConversationLoading></ConversationLoading>
						<p title="AIGC">
							<SvgIcon
								name="AI"
								class="icon"></SvgIcon>
						</p>
					</div>
				</div>
				<div class="conversation-form answer">
					<ConversationTextarea
						placeholder="Generated message"
						:min-rows="5"
						:max-rows="10"></ConversationTextarea>
					<div class="conversation-form-footer">
						<p title="copy">
							<SvgIcon
								title="copy"
								name="copy"
								class="icon"></SvgIcon>
						</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	methods: {
		handleOverlayClick() {
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>

<style scoped lang="less">
.conversation-dialog {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	.conversation-wrapper {
		width: 80%;
		min-height: 300px;
		margin: 0 auto;
		padding: 20px 15px;
		background: #fff;
		border-radius: 10px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		.conversation-form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 164px;
			border-radius: 8px;
			overflow: hidden;
			+ .conversation-form {
				margin-top: 15px;
			}
			&.question {
				border: 1px solid rgba(0, 0, 0, 0.12);
				.conversation-form-footer {
					justify-content: space-between;
				}
			}
			&.answer {
				background-color: #f5f5f5;
				.conversation-form-footer {
					justify-content: flex-end;
				}
			}
			.conversation-form-footer {
				display: flex;
				padding: 0 16px 10px;
				color: var(--conversation-theme);
				font-size: 18px;
				.icon {
					cursor: pointer;
				}
			}
		}
	}
}
</style>
