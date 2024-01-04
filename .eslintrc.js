const { lintExtends, lintRules } =
	require('@cbibank/vue-cli-plugin-format/lib/lintConfig')('prettier')

module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [...lintExtends],
	parserOptions: {
		// @babel/eslint-parser can transform new grammar better than default espree
		parser: '@babel/eslint-parser'
	},
	rules: {
		...lintRules
	}
}
