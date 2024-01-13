<template>
	<el-tabs
		class="tabs"
		tab-position="left">
		<el-tab-pane label="AnimateLine">
			<AnimateLine></AnimateLine>
		</el-tab-pane>
		<el-tab-pane label="AnimatePath">
			<AnimatePath></AnimatePath>
		</el-tab-pane>
		<el-tab-pane label="SvgHamburger">
			<SvgHamburger></SvgHamburger>
		</el-tab-pane>
		<el-tab-pane label="SvgHandwriting">
			<SvgHandwriting></SvgHandwriting>
		</el-tab-pane>
		<el-tab-pane label="SvgWps">
			<SvgWps></SvgWps>
		</el-tab-pane>
		<el-tab-pane label="SvgPoorHi">
			<SvgPoorHi></SvgPoorHi>
		</el-tab-pane>
		<el-tab-pane label="SvgHi">
			<SvgHi></SvgHi>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import AnimateLine from './AnimateLine'
import AnimatePath from './AnimatePath'
import SvgHamburger from './SvgHamburger'
import SvgHandwriting from './SvgHandwriting'
import SvgWps from './SvgWps'
import SvgPoorHi from './SvgPoorHi'
import SvgHi from './SvgHi'

export default {
	components: {
		AnimateLine,
		AnimatePath,
		SvgHamburger,
		SvgHandwriting,
		SvgWps,
		SvgPoorHi,
		SvgHi
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
