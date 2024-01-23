<template>
	<transition
		name="fade"
		@after-leave="handleAfterLeave">
		<div
			v-show="visible"
			class="toast">
			<span>{{ message }}</span>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Toast',
	props: {
		autoClose: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 3000
		},
		message: {
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			visible: false
		}
	},
	mounted() {
		// 需要自动关闭时，调用startTimer
		if (this.autoClose) this.startTimer()
	},
	beforeDestroy() {
		this.stopTimer()
	},
	methods: {
		startTimer() {
			this.visible = true
			if (this.duration > 0) {
				this.timer = setTimeout(() => {
					this.visible = false
					// this.$nextTick(() => {
					//   this.$el.parentNode.removeChild(this.$el)
					// })
				}, this.duration)
			}
		},
		stopTimer() {
			if (this.timer) clearTimeout(this.timer)
		},
		// 动画结束之后 如果在定时器结束时removeChild，那么将不会触发leave动画
		handleAfterLeave() {
			// 触发 beforeDestroy 和 destroyed 的钩子
			this.$destroy(true)
			this.$el.parentNode.removeChild(this.$el)
		}
	}
}
</script>

<style lang="less" scoped>
.toast {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.8);
	border-radius: 10px;
	font-size: 14px;
	color: #ffffff;
	line-height: 14px;
	padding: 16px 46px;
	white-space: nowrap;
	text-align: center;
	&.small {
		border-radius: 4px;
		font-size: 12px;
		line-height: 12px;
		padding: 14px 30px;
	}
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
	transform: translateY(calc(-50% - 10px)) translateX(-50%);
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
	transform: translateY(-50%) translateX(-50%);
}
.fade-enter-active,
.fade-leave-active {
	transition: all ease 0.5s;
}
</style>
