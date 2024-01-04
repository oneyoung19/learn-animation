import Vue from 'vue'

const modulesFiles = require.context('../components', true, /\.vue$/)

modulesFiles.keys().forEach(modulePath => {
	const moduleName = modulePath.replace(/\.\/[\w|/]+\/(.*)\.vue$/, '$1')
	// 以index.vue来命名的组件 直接忽略
	if (moduleName.toUpperCase() !== 'INDEX') {
		const value = modulesFiles(modulePath)
		Vue.component(moduleName, value.default)
	}
})
