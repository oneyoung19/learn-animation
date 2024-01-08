<template>
	<div class="demos">
		<div class="menus">
			<div class="navigation">
				<RouterButton
					type="primary"
					to="Home">
					首页
				</RouterButton>
				<RouterButton
					v-show="$route.name !== 'Demos'"
					type="primary"
					to="Back">
					上一页
				</RouterButton>
			</div>
			<div
				v-show="$route.name === 'Demos'"
				class="menu">
				<RouterButton to="Demo1">文字加粗不影响整体布局宽度</RouterButton>
				<RouterButton to="Demo2">图片揭露动画</RouterButton>
				<RouterButton to="Demo3">环形平移动画</RouterButton>
			</div>
		</div>
		<router-view />
	</div>
</template>

<style lang="less">
.demos {
	display: flex;
	.menus {
		.navigation {
			width: 200px;
		}
	}
}
</style>
