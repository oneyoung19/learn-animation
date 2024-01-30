<template>
	<div>
		<h1 class="header-section">
			Scroll down to see a horizontal scroll section
		</h1>

		<div class="massiveImage"></div>

		<h1 class="header-section">Now we're back to regular scrolling</h1>
	</div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
	data() {
		return {}
	},
	mounted() {
		gsap.set('.massiveImage', {
			// backgroundImage: `url(https://source.unsplash.com/random/${
			// 	innerWidth * 3
			// }x${innerHeight})`
			backgroundImage: `url(https://plus.unsplash.com/premium_photo-1664382465062-beb842dac1ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=929&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNjU4NjgyMA&ixlib=rb-4.0.3&q=80&w=3252)`
		})

		gsap.to('.massiveImage', {
			// 向左移动100%
			xPercent: -100,
			// 向右移动一个屏幕宽度
			x: () => innerWidth,
			// 动效
			ease: 'none',
			scrollTrigger: {
				trigger: '.massiveImage',
				// 当元素顶部与viewport顶部重合时 开始动画
				start: 'top top',
				// 此距离会影响pin区域的高度
				end: () => innerWidth * 3,
				// 渐进条形式
				scrub: true,
				// 固定
				pin: true,
				// 快照
				// snap: 1,
				invalidateOnRefresh: true,
				anticipatePin: 1
			}
		})
	},
	methods: {}
}
</script>

<style scoped lang="less">
.massiveImage {
	height: 100vh;
	width: 400vw;
	background-size: cover;
	background-position: center;
}
.header-section {
	height: 100vh;
	text-align: center;
	padding: 40vh 0 0;
	font-size: 2em;
}
</style>
