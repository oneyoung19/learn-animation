<template>
	<textarea
		ref="textarea"
		:value="value"
		class="textarea"
		placeholder="Type your message..."
		@input="handleInput"></textarea>
</template>

<script>
import calcTextareaHeight from '@/utils/calcTextareaHeight'

export default {
	props: {
		value: {
			type: String,
			default: ''
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
				const textareaCalcStyle = calcTextareaHeight(textarea)
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
</style>
