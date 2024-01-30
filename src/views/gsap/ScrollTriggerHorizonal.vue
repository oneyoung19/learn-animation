<template>
	<div>
		<h1 class="header-section">
			Scroll down to see a horizontal scroll section
		</h1>

		<div class="massiveImage"></div>

		<h1 class="header-section">Now we're back to regular scrolling</h1>

		<header>
			<a href="https://greensock.com/scrolltrigger">
				<img
					class="greensock-icon"
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/scroll-trigger-logo-light.svg"
					width="200"
					height="64" />
			</a>
		</header>
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
			backgroundImage: `url(https://source.unsplash.com/random/${
				innerWidth * 3
			}x${innerHeight})`
		})

		gsap.to('.massiveImage', {
			xPercent: -100,
			x: () => innerWidth,
			ease: 'none',
			scrollTrigger: {
				trigger: '.massiveImage',
				start: 'top top',
				end: () => innerWidth * 3,
				scrub: true,
				pin: true,
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
	text-align: center;
	padding: 0px 15px;
	margin: 40vh auto 50vh;
	padding-bottom: 50vh;
	margin-bottom: 0;
	font-size: 2em;
}
header {
	position: fixed;
	top: 0px;
	left: 0px;
	border-bottom-right-radius: 26px;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.5);
	will-change: transform;
	padding: 6px 10px 10px;
}
</style>
