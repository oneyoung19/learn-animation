<template>
	<el-tabs
		class="tabs"
		tab-position="left">
		<el-tab-pane label="Bezier">
			<Bezier></Bezier>
		</el-tab-pane>
		<el-tab-pane label="B">B</el-tab-pane>
		<el-tab-pane label="C">C</el-tab-pane>
		<el-tab-pane label="D">D</el-tab-pane>
	</el-tabs>
</template>

<script>
import Bezier from './Bezier'

export default {
	components: {
		Bezier
	},
	data() {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="less">
.tabs {
	height: 100vh;
	min-height: 100vh;
	:deep(.el-tabs__content) {
		height: 100%;
		.el-tab-pane {
			height: 100%;
		}
	}
}
</style>
