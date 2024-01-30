<template>
	<div class="container">
		<div class="emptybox">empty</div>
		<div class="emptybox">empty</div>
		<div class="scrollbox">
			<div class="scrollbox_container">
				<div class="scrollbox_container_card">
					<p>card one</p>
					<img
						class="scc_city scc_city1"
						src="@/assets/image/city.svg" />
					<img
						class="scc_truck scc_truck1"
						src="@/assets/image/truck.svg" />
				</div>
				<div class="scrollbox_container_card">
					<p>card two</p>
					<img
						class="scc_city scc_city2"
						src="@/assets/image/city.svg" />
					<img
						class="scc_truck scc_truck2"
						src="~assets/image/truck.svg" />
				</div>
				<div class="scrollbox_container_card">
					<p>card three</p>
					<img
						class="scc_city scc_city3"
						src="~assets/image/city.svg" />
					<img
						class="scc_truck scc_truck3"
						src="~@/assets/image/truck.svg" />
				</div>
			</div>
		</div>
		<div class="emptybox">empty</div>
		<div class="emptybox">empty</div>
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
	mounted() {},
	methods: {}
}
</script>

<style scoped lang="less">
div {
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background-color: #171717;
}
.emptybox {
	width: 65rem;
	height: 40rem;
	background-color: #17f700;
	border-radius: 5rem;
	margin-bottom: 8rem;
	font-family: sans-serif;
	font-size: 8rem;
	color: #f7f7f7;
	font-weight: 900;
	text-transform: uppercase;
}

.scrollbox {
	justify-content: start;
	align-items: start;
	width: 100%;
	overflow: hidden;
}

.scrollbox_container {
	justify-content: start;
	height: 100vh;
	flex-shrink: 0;
}

.scrollbox_container_card {
	position: relative;
	// width: 65rem;
	// height: 40rem;
	width: 1040px;
	height: 640px;
	background-color: #f7f7f7;
	border-radius: 5rem;
	margin-left: 5rem;
	flex-shrink: 0;
	overflow: hidden;
}

.scrollbox_container_card p {
	font-family: sans-serif;
	font-size: 6rem;
	color: #171717;
	font-weight: 900;
	text-transform: uppercase;
	z-index: 1;
}

.scc_city {
	position: absolute;
	bottom: 0;
	width: auto;
	height: 100%;
	opacity: 0.7;
}

.scc_truck {
	position: absolute;
	bottom: 0;
	height: 6rem;
}
.scc_city1,
.scc_truck1 {
	left: 0;
}

.scc_city2,
.scc_truck2 {
	left: calc(-100% + -5rem);
}

.scc_city3,
.scc_truck3 {
	left: calc(-200% + -10rem);
}
</style>
