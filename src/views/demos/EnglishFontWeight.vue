<template>
	<div>
		<!-- font-weight加粗会导致英文宽度变化 此时可以使用text-shadow来代替效果 See more at:https://juejin.cn/post/7110499802676199455 -->
		<Quote>
			<Markdown>
				`font-weight` 加粗会导致英文宽度变化，此时可以使用 `text-shadow`
				来代替效果。 `See more
				at`:[https://juejin.cn/post/7110499802676199455](https://juejin.cn/post/7110499802676199455)
			</Markdown>
		</Quote>
		<a
			class="font-weight"
			href="">
			English
		</a>
		<a
			class="font-weight-shadow"
			href="">
			English
		</a>
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
a {
	text-decoration: none;
	color: #3370ff;
	&.font-weight {
		&:hover {
			font-weight: bold;
		}
	}
	&.font-weight-shadow {
		&:hover {
			text-shadow: 0 0 0.65px #3370ff;
		}
	}
}
</style>
