<template>
	<div class="demos">
		<div class="menu">
			<Markdown>[文字加粗不影响整体布局宽度](./demo-1)</Markdown>
			<Markdown>[图片揭露动画](./demo-2)</Markdown>
			<Markdown>[环形平移动画](./demo-3)</Markdown>
		</div>
		<router-view />
	</div>
</template>

<style lang="less">
.demos {
	display: flex;
}
</style>
