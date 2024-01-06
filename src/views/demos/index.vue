<template>
	<div class="demos">
		<div
			v-show="$route.name === 'Demos'"
			class="menu">
			<RouterButton to="Demo1">文字加粗不影响整体布局宽度</RouterButton>
			<RouterButton to="Demo2">图片揭露动画</RouterButton>
			<RouterButton to="Demo3">环形平移动画</RouterButton>
		</div>
		<router-view />
	</div>
</template>

<style lang="less">
.demos {
	display: flex;
}
</style>
