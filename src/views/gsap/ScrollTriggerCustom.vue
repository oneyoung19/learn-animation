<template>
	<div>
		<div class="header">Header</div>
		<ul class="card-list">
			<li class="card-item">A</li>
			<li class="card-item">B</li>
			<li class="card-item">C</li>
			<li class="card-item">D</li>
		</ul>
		<div class="footer">Footer</div>
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
		const cards = gsap.utils.toArray('.card-item')
		gsap.to(cards, {
			// xPercent: -100 * (cards.length - 1),
			// x: -800 * (cards.length - 1),
			x: -2400,
			ease: 'none',
			scrollTrigger: {
				trigger: '.card-list',
				pin: true,
				scrub: 1
				// snap: 1 / (cards.length - 1),
				// base vertical scrolling on how wide the container is so it feels more natural.
				// end: '+=5200'
			}
		})
	},
	methods: {}
}
</script>

<style scoped lang="less">
.header {
	width: 100vw;
	height: 100vh;
	padding-top: 50vh;
	text-align: center;
	background-color: skyblue;
}
.card-list {
	display: flex;
	overflow: hidden;
	.card-item {
		width: 800px;
		min-width: 800px;
		// min-width: 100vw;
		// width: 100vw;
		height: 600px;
		text-align: center;
		&:nth-child(1) {
			background-color: #3b7953;
		}
		&:nth-child(2) {
			background-color: #b0da17;
		}
		&:nth-child(3) {
			background-color: #aa3030;
		}
		&:nth-child(4) {
			background-color: #bc2c6f;
		}
	}
}
.footer {
	width: 100vw;
	height: 100vh;
	padding-top: 50vh;
	text-align: center;
	background-color: orange;
}
</style>
