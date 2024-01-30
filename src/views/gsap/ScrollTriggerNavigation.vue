<template>
	<div>
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
</style>
