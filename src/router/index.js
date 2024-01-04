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
		path: '/demos',
		name: 'Demos',
		component: () => import('@/views/demos'),
		children: [
			{
				path: 'english-font-weight',
				name: 'EnglishFontWeight',
				component: () => import('@/views/demos/EnglishFontWeight')
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
