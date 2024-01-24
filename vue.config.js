const path = require('path')
const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	devServer: {
		// 测试 gsap-trail
		allowedHosts: ['learn.animation.com'],
		proxy: {
			'^/test': {
				target: 'http://test.devcbi.com',
				changeOrigin: true
			}
		}
	},
	/* svg 相关配置 */
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))

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

		config.when(process.env.NODE_ENV !== 'development', config => {
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial' // only package third parties that are initially dependent
					},
					elementUI: {
						name: 'chunk-elementUI', // split elementUI into a single package
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true
					}
				}
			})
			config.optimization.runtimeChunk('single')
		})
	}
}
