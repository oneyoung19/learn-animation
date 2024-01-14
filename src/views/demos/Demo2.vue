<template>
	<div class="demo-2">
		<Quote>
			<Markdown>
				See more at:
				[https://juejin.cn/post/7246935481615925303](https://juejin.cn/post/7246935481615925303)
			</Markdown>
		</Quote>
		<!-- TODO: -->
		<!-- <img
			class="right"
			src="http://localhost:3000/_nuxt/assets/image/corporbank/efficiency-bg.png"
			alt="" /> -->
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
}
</script>

<style scoped lang="less">
img {
	--s: 200px; /*图片尺寸*/

	width: var(--s);
	height: var(--s);
	box-sizing: border-box;
	cursor: pointer;
	transition: 0.5s;
	background: #542437;
	object-fit: cover;
}
img.left {
	object-position: right;
	padding-left: var(--s);
	background: #542437;
}
img.right {
	object-position: left;
	padding-right: var(--s);
	background: #8a9b0f;
}
img.top {
	object-position: bottom;
	padding-top: var(--s);
	background: #e94e77;
}
img.bottom {
	object-position: top;
	padding-bottom: var(--s);
	background: #7a6a53;
}
img:hover {
	padding: 0;
}
body {
	margin: 0;
	min-height: 100vh;
	display: grid;
	place-content: center;
	gap: 50px;
	grid-auto-flow: column;
	background: #c6e5d9;
}
</style>
