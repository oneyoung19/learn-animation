<template>
	<div style="width: 100vw; height: 100vh">
		<div
			id="one"
			class="description panel blue">
			<div>
				<h1>Navigation links with smooth scrolling</h1>
				<p>
					ScrollTrigger works great with navigation links within the page! Try
					clicking one of the links above and see how ScrollTrigger stays
					perfectly synced.
				</p>
				<div class="scroll-down">
					Scroll down
					<div class="arrow"></div>
				</div>
			</div>
		</div>

		<section
			id="two"
			class="panel red">
			<p>
				<span class="line line-1"></span>
				This line's animation will begin when it enters the viewport and finish
				when its top edge hits the top of the viewport, staying perfectly in
				sync with the scrollbar because it has
				<code>scrub:&nbsp;true</code>
			</p>
		</section>

		<section
			id="three"
			class="panel orange">
			<p>
				<span class="line line-2"></span>
				This orange panel gets pinned when its top edge hits the top of the
				viewport, then the line's animation is linked with the scroll position
				until it has traveled 100% of the viewport's height (
				<code>end: "+=100%"</code>
				), then the orange panel is unpinned and normal scrolling resumes.
				Padding is added automatically to push the rest of the content down so
				that it catches up with the scroll when it unpins. You can set
				<code>pinSpacing: false</code>
				to prevent that if you prefer.
			</p>
		</section>

		<section
			id="four"
			class="panel purple">
			<p>
				<span class="line line-3"></span>
				This panel gets pinned in a similar way, and has a more involved
				animation that's wrapped in a timeline, fading the background color and
				animating the transforms of the paragraph in addition to the line, all
				synced with the scroll position perfectly.
			</p>
		</section>

		<section
			id="five"
			class="panel gray">
			DONE!
		</section>

		<nav>
			<div><a href="#one">Section one</a></div>
			<div><a href="#two">Section two</a></div>
			<div><a href="#three">Section three</a></div>
			<div><a href="#four">Section four</a></div>
			<div><a href="#five">Section five</a></div>
		</nav>
	</div>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default {
	data() {
		return {}
	},
	mounted() {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

		// --- RED PANEL ---
		gsap.from('.line-1', {
			scrollTrigger: {
				trigger: '.line-1',
				scrub: true,
				start: 'top bottom',
				end: 'top top'
			},
			scaleX: 0,
			transformOrigin: 'left center',
			ease: 'none'
		})

		// --- ORANGE PANEL ---
		gsap.from('.line-2', {
			scrollTrigger: {
				trigger: '.orange',
				scrub: true,
				pin: true,
				start: 'top top',
				end: '+=100%'
			},
			scaleX: 0,
			transformOrigin: 'left center',
			ease: 'none'
		})

		// --- PURPLE/GREEN PANEL ---
		var tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.purple',
				scrub: true,
				pin: true,
				start: 'top top',
				end: '+=100%'
			}
		})

		tl.from('.purple p', {
			scale: 0.3,
			rotation: 45,
			autoAlpha: 0,
			ease: 'power2'
		})
			.from(
				'.line-3',
				{ scaleX: 0, transformOrigin: 'left center', ease: 'none' },
				0
			)
			.to('.purple', { backgroundColor: '#28a92b' }, 0)

		let links = gsap.utils.toArray('nav a')
		links.forEach(a => {
			let element = document.querySelector(a.getAttribute('href')),
				linkST = ScrollTrigger.create({
					trigger: element,
					start: 'top top'
				})
			ScrollTrigger.create({
				trigger: element,
				start: 'top center',
				end: 'bottom center',
				onToggle: self => self.isActive && setActive(a)
			})
			a.addEventListener('click', e => {
				e.preventDefault()
				gsap.to(window, {
					duration: 1,
					scrollTo: linkST.start,
					overwrite: 'auto'
				})
			})
		})

		function setActive(link) {
			links.forEach(el => el.classList.remove('active'))
			link.classList.add('active')
		}
	},
	methods: {}
}
</script>

<style scoped lang="less">
.line {
	width: 100%;
	max-width: 800px;
	height: 8px;
	margin: 0 0 10px 0;
	position: relative;
	display: inline-block;
	background-color: rgba(255, 255, 255, 1);
}

/* Not great browser support :(
html {
  scroll-behavior: smooth;
}
*/
nav {
	position: fixed;
	top: 10px;
	right: 10px;
	background: black;
	padding: 0px 10px;
}
nav a {
	color: white;
	font-size: 1.3em;
	line-height: 1.7;
	text-decoration: none;
}
nav a:hover {
	text-decoration: underline;
}

nav a.active {
	color: red;
}
.panel.align-top {
	align-items: flex-start;
}

.panel h1 {
	font-size: 1.8em;
	color: white;
	font-weight: 300;
	margin: 0 auto;
}
.panel.description {
	padding-bottom: 60px;
}
.panel p,
.panel li {
	color: black;
	font-weight: 400;
	text-align: left;
	font-size: 0.8em;
	line-height: 1.5em;
	margin: 0.3em 0 1em 0;
}
.panel p strong,
.panel li strong {
	color: white;
	font-weight: 400;
}
.panel p code,
.panel li code {
	background-color: rgba(255, 255, 255, 0.15);
	padding: 2px 4px;
	border-radius: 5px;
}
.panel li {
	margin: 0;
}
.gray {
	background-color: #777;
	background-image: radial-gradient(
			circle at 47% 14%,
			rgba(205, 205, 205, 0.04) 0%,
			rgba(205, 205, 205, 0.04) 43%,
			transparent 43%,
			transparent 100%
		),
		radial-gradient(
			circle at 35% 12%,
			rgba(215, 215, 215, 0.04) 0%,
			rgba(215, 215, 215, 0.04) 4%,
			transparent 4%,
			transparent 100%
		),
		radial-gradient(
			circle at 1% 35%,
			rgba(24, 24, 24, 0.04) 0%,
			rgba(24, 24, 24, 0.04) 37%,
			transparent 37%,
			transparent 100%
		),
		radial-gradient(
			circle at 21% 1%,
			rgba(0, 0, 0, 0.04) 0%,
			rgba(0, 0, 0, 0.04) 26%,
			transparent 26%,
			transparent 100%
		),
		radial-gradient(
			circle at 23% 82%,
			rgba(249, 249, 249, 0.04) 0%,
			rgba(249, 249, 249, 0.04) 60%,
			transparent 60%,
			transparent 100%
		),
		radial-gradient(
			circle at 11% 54%,
			rgba(251, 251, 251, 0.04) 0%,
			rgba(251, 251, 251, 0.04) 23%,
			transparent 23%,
			transparent 100%
		),
		radial-gradient(
			circle at 69% 68%,
			rgba(234, 234, 234, 0.04) 0%,
			rgba(234, 234, 234, 0.04) 10%,
			transparent 10%,
			transparent 100%
		),
		linear-gradient(90deg, #777, #606060);
}
.blue {
	background-color: #2c7ad2;
	background-image: radial-gradient(
			circle at 47% 14%,
			rgba(205, 205, 205, 0.04) 0%,
			rgba(205, 205, 205, 0.04) 43%,
			transparent 43%,
			transparent 100%
		),
		radial-gradient(
			circle at 35% 12%,
			rgba(215, 215, 215, 0.04) 0%,
			rgba(215, 215, 215, 0.04) 4%,
			transparent 4%,
			transparent 100%
		),
		radial-gradient(
			circle at 1% 35%,
			rgba(24, 24, 24, 0.04) 0%,
			rgba(24, 24, 24, 0.04) 37%,
			transparent 37%,
			transparent 100%
		),
		radial-gradient(
			circle at 21% 1%,
			rgba(0, 0, 0, 0.04) 0%,
			rgba(0, 0, 0, 0.04) 26%,
			transparent 26%,
			transparent 100%
		),
		radial-gradient(
			circle at 23% 82%,
			rgba(249, 249, 249, 0.04) 0%,
			rgba(249, 249, 249, 0.04) 60%,
			transparent 60%,
			transparent 100%
		),
		radial-gradient(
			circle at 11% 54%,
			rgba(251, 251, 251, 0.04) 0%,
			rgba(251, 251, 251, 0.04) 23%,
			transparent 23%,
			transparent 100%
		),
		radial-gradient(
			circle at 69% 68%,
			rgba(234, 234, 234, 0.04) 0%,
			rgba(234, 234, 234, 0.04) 10%,
			transparent 10%,
			transparent 100%
		),
		linear-gradient(90deg, #2c7ad2, #1568c6);
}
.orange {
	background-color: #e77614;
	background-image: radial-gradient(
			circle at 46% 40%,
			rgba(228, 228, 228, 0.06) 0%,
			rgba(228, 228, 228, 0.06) 13%,
			transparent 13%,
			transparent 100%
		),
		radial-gradient(
			circle at 11% 41%,
			rgba(198, 198, 198, 0.06) 0%,
			rgba(198, 198, 198, 0.06) 19%,
			transparent 19%,
			transparent 100%
		),
		radial-gradient(
			circle at 52% 23%,
			rgba(14, 14, 14, 0.06) 0%,
			rgba(14, 14, 14, 0.06) 69%,
			transparent 69%,
			transparent 100%
		),
		radial-gradient(
			circle at 13% 85%,
			rgba(148, 148, 148, 0.06) 0%,
			rgba(148, 148, 148, 0.06) 44%,
			transparent 44%,
			transparent 100%
		),
		radial-gradient(
			circle at 57% 74%,
			rgba(232, 232, 232, 0.06) 0%,
			rgba(232, 232, 232, 0.06) 21%,
			transparent 21%,
			transparent 100%
		),
		radial-gradient(
			circle at 59% 54%,
			rgba(39, 39, 39, 0.06) 0%,
			rgba(39, 39, 39, 0.06) 49%,
			transparent 49%,
			transparent 100%
		),
		radial-gradient(
			circle at 98% 38%,
			rgba(157, 157, 157, 0.06) 0%,
			rgba(157, 157, 157, 0.06) 24%,
			transparent 24%,
			transparent 100%
		),
		radial-gradient(
			circle at 8% 6%,
			rgba(60, 60, 60, 0.06) 0%,
			rgba(60, 60, 60, 0.06) 12%,
			transparent 12%,
			transparent 100%
		),
		linear-gradient(90deg, #ff7600, #ff7600);
}

.red {
	background-color: #c82736;
	background-image: radial-gradient(
			circle at 19% 90%,
			rgba(190, 190, 190, 0.04) 0%,
			rgba(190, 190, 190, 0.04) 17%,
			transparent 17%,
			transparent 100%
		),
		radial-gradient(
			circle at 73% 2%,
			rgba(78, 78, 78, 0.04) 0%,
			rgba(78, 78, 78, 0.04) 94%,
			transparent 94%,
			transparent 100%
		),
		radial-gradient(
			circle at 45% 2%,
			rgba(18, 18, 18, 0.04) 0%,
			rgba(18, 18, 18, 0.04) 55%,
			transparent 55%,
			transparent 100%
		),
		radial-gradient(
			circle at 76% 60%,
			rgba(110, 110, 110, 0.04) 0%,
			rgba(110, 110, 110, 0.04) 34%,
			transparent 34%,
			transparent 100%
		),
		radial-gradient(
			circle at 68% 56%,
			rgba(246, 246, 246, 0.04) 0%,
			rgba(246, 246, 246, 0.04) 16%,
			transparent 16%,
			transparent 100%
		),
		radial-gradient(
			circle at 71% 42%,
			rgba(156, 156, 156, 0.04) 0%,
			rgba(156, 156, 156, 0.04) 47%,
			transparent 47%,
			transparent 100%
		),
		radial-gradient(
			circle at 46% 82%,
			rgba(247, 247, 247, 0.04) 0%,
			rgba(247, 247, 247, 0.04) 39%,
			transparent 39%,
			transparent 100%
		),
		radial-gradient(
			circle at 50% 47%,
			rgba(209, 209, 209, 0.04) 0%,
			rgba(209, 209, 209, 0.04) 45%,
			transparent 45%,
			transparent 100%
		),
		linear-gradient(90deg, #e53949, #cc2232);
}

.purple {
	background-color: #8d3dae;
	background-image: radial-gradient(
			circle at 47% 14%,
			rgba(205, 205, 205, 0.04) 0%,
			rgba(205, 205, 205, 0.04) 43%,
			transparent 43%,
			transparent 100%
		),
		radial-gradient(
			circle at 35% 12%,
			rgba(215, 215, 215, 0.04) 0%,
			rgba(215, 215, 215, 0.04) 4%,
			transparent 4%,
			transparent 100%
		),
		radial-gradient(
			circle at 1% 35%,
			rgba(24, 24, 24, 0.04) 0%,
			rgba(24, 24, 24, 0.04) 37%,
			transparent 37%,
			transparent 100%
		),
		radial-gradient(
			circle at 21% 1%,
			rgba(0, 0, 0, 0.04) 0%,
			rgba(0, 0, 0, 0.04) 26%,
			transparent 26%,
			transparent 100%
		),
		radial-gradient(
			circle at 23% 82%,
			rgba(249, 249, 249, 0.04) 0%,
			rgba(249, 249, 249, 0.04) 60%,
			transparent 60%,
			transparent 100%
		),
		radial-gradient(
			circle at 11% 54%,
			rgba(251, 251, 251, 0.04) 0%,
			rgba(251, 251, 251, 0.04) 23%,
			transparent 23%,
			transparent 100%
		),
		radial-gradient(
			circle at 69% 68%,
			rgba(234, 234, 234, 0.04) 0%,
			rgba(234, 234, 234, 0.04) 10%,
			transparent 10%,
			transparent 100%
		),
		linear-gradient(90deg, #8d3dae, #8d3dae);
}
.green {
	background-color: #28a92b;
	background-image: radial-gradient(
			circle at 46% 40%,
			rgba(228, 228, 228, 0.06) 0%,
			rgba(228, 228, 228, 0.06) 13%,
			transparent 13%,
			transparent 100%
		),
		radial-gradient(
			circle at 11% 41%,
			rgba(198, 198, 198, 0.06) 0%,
			rgba(198, 198, 198, 0.06) 19%,
			transparent 19%,
			transparent 100%
		),
		radial-gradient(
			circle at 52% 23%,
			rgba(14, 14, 14, 0.06) 0%,
			rgba(14, 14, 14, 0.06) 69%,
			transparent 69%,
			transparent 100%
		),
		radial-gradient(
			circle at 13% 85%,
			rgba(148, 148, 148, 0.06) 0%,
			rgba(148, 148, 148, 0.06) 44%,
			transparent 44%,
			transparent 100%
		),
		radial-gradient(
			circle at 57% 74%,
			rgba(232, 232, 232, 0.06) 0%,
			rgba(232, 232, 232, 0.06) 21%,
			transparent 21%,
			transparent 100%
		),
		radial-gradient(
			circle at 59% 54%,
			rgba(39, 39, 39, 0.06) 0%,
			rgba(39, 39, 39, 0.06) 49%,
			transparent 49%,
			transparent 100%
		),
		radial-gradient(
			circle at 98% 38%,
			rgba(157, 157, 157, 0.06) 0%,
			rgba(157, 157, 157, 0.06) 24%,
			transparent 24%,
			transparent 100%
		),
		radial-gradient(
			circle at 8% 6%,
			rgba(60, 60, 60, 0.06) 0%,
			rgba(60, 60, 60, 0.06) 12%,
			transparent 12%,
			transparent 100%
		),
		linear-gradient(90deg, #28a92b, #10a614);
}

html,
body {
	margin: 0;
	height: 100%;
	-webkit-overflow-scrolling: touch;
	font-family: 'Signika Negative', sans-serif, Arial;
}

.panel {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	font-size: 1.5em;
	text-align: center;
	color: white;
	position: relative;
	box-sizing: border-box;
	padding: 10px;
}

body {
	overflow-x: hidden;
	overflow-y: scroll;
}

h1,
h2,
p,
li {
	max-width: 800px;
}

/* HEADER */
header {
	position: fixed;
	top: 0px;
	left: 0px;
	padding: 6px 10px 10px 10px;
	border-bottom-right-radius: 26px;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.5);
	will-change: transform;
}

/* HEADINGS */
.header-section {
	padding: 0 15px;
	text-align: center;
	margin: 40vh auto 50vh;
}

/* SCROLL DOWN */
.scroll-down {
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translate(-50%, 0);
	color: black;
	font-weight: 400;
	text-transform: uppercase;
	font-size: 16px;
	overflow: visible;
}
.scroll-down .arrow {
	position: relative;
	top: -4px;
	margin: 0 auto;
	width: 20px;
	height: 20px;
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+);
	background-size: contain;
}

.arrow-right {
	transform: rotate(-90deg);
	position: relative;
	top: -4px;
	margin: 1rem auto;
	width: 20px;
	height: 20px;
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+);
	background-size: contain;
}
</style>
