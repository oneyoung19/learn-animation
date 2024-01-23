import Vue from 'vue'
import Toast from '@/components/common/toast/Toast'

Vue.prototype.$toast = (options = {}) => {
	generateInstance(options)
}

const ToastConstructor = Vue.extend(Toast)

let zIndex = 9999

function generateInstance(options) {
	options =
		typeof options === 'object'
			? options
			: {
					message: String(options)
			  }
	const instance = new ToastConstructor({
		propsData: options
	})
	const { appendToElement, top, left } = options
	// 父级元素
	const mountTarget = appendToElement || document.querySelector('body')
	const { position } = window.getComputedStyle(mountTarget)
	if (position !== 'fixed' && position !== 'absolute') {
		mountTarget.style.position = 'relative'
	}
	// 挂载
	instance.$mount()
	const dom = instance.$el
	// 支持更改定位
	if (appendToElement) {
		dom.style.position = 'absolute'
	} else {
		dom.style.position = 'fixed'
	}
	// 判断元素宽度 重设dom尺寸
	if (mountTarget.offsetWidth <= 750) {
		dom.classList.add('small')
	}
	typeof top !== 'undefined' && (dom.style.top = top)
	typeof left !== 'undefined' && (dom.style.top = left)
	dom.style.zIndex = zIndex
	zIndex++
	// 插入
	mountTarget.appendChild(dom)
	return instance
}
