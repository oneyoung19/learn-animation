<template>
	<textarea
		ref="textarea"
		:value="value"
		class="textarea"
		:placeholder="placeholder"
		@input="handleInput"></textarea>
</template>

<script>
import calcTextareaHeight from '@/utils/calcTextareaHeight'

export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: 'Type your message...'
		},
		minRows: {
			type: Number,
			default: 1
		},
		maxRows: {
			type: Number,
			default: 3
		}
	},
	data() {
		return {}
	},
	watch: {
		value: {
			handler() {
				this.setTextareaSize()
			}
		}
	},
	mounted() {
		this.setTextareaSize()
	},
	methods: {
		setTextareaSize() {
			this.$nextTick(() => {
				const { textarea } = this.$refs
				const textareaCalcStyle = calcTextareaHeight(
					textarea,
					this.minRows,
					this.maxRows
				)
				const { height } = textareaCalcStyle
				this.$refs.textarea.style.height = height
				this.$emit('size-change', {
					height
				})
			})
		},
		handleInput(event) {
			this.$emit('input', event.target.value)
		}
	}
}
</script>

<style scoped lang="less">
.textarea {
	display: inline-block;
	width: 100%;
	height: var(--conversation-footer-height);
	padding: 14px 16px;
	box-sizing: border-box;
	border-width: 0;
	background-color: transparent;
	appearance: none;
	resize: none;
	&::placeholder {
		color: rgba(0, 0, 0, 0.5);
	}
}
</style>
