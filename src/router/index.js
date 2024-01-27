import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/svg-paint',
		name: 'SvgPaint',
		component: () => import('@/views/svg-paint')
	},
	{
		path: '/conversation',
		name: 'Conversation',
		component: () => import('@/views/conversation')
	},
	{
		path: '/scroll-height',
		name: 'ScrollHeight',
		component: () => import('@/views/scroll-height')
	},
	{
		path: '/gsap',
		redirect: '/gsap/scroll-smoother',
		name: 'Gsap',
		component: () => import('@/views/gsap'),
		children: [
			{
				path: 'scroll-smoother',
				name: 'GsapScrollSmoother',
				component: () => import('@/views/gsap/ScrollSmoother')
			},
			{
				path: 'scroll-trigger',
				name: 'GsapScrollTrigger',
				component: () => import('@/views/gsap/ScrollTrigger')
			}
		]
	},
	{
		path: '/demos',
		name: 'Demos',
		component: () => import('@/views/demos'),
		children: [
			{
				path: 'demo-1',
				name: 'Demo1',
				component: () => import('@/views/demos/Demo1')
			},
			{
				path: 'demo-2',
				name: 'Demo2',
				component: () => import('@/views/demos/Demo2')
			},
			{
				path: 'demo-3',
				name: 'Demo3',
				component: () => import('@/views/demos/Demo3')
			}
		]
	},
	{
		path: '*',
		name: 'NotFound',
		component: () => import('@/views/error/NotFound')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
