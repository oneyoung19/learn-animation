module.exports = {
	/* svg 相关配置 */
	chainWebpack: config => {
		const svgRule = config.module.rule('svg')
		// 清空默认svg规则
		svgRule.uses.clear()
		//针对svg文件添加svg-sprite-loader规则
		svgRule
			.test(/\.svg$/)
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
	}
}
