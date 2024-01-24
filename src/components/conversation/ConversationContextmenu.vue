<template>
	<ul
		v-show="value"
		class="context-menu"
		:style="position">
		<li
			v-for="(item, index) in menus"
			:key="index"
			class="context-menu-item"
			@click="handleSelect(item)">
			{{ item.text }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		menus: {
			type: Array,
			default() {
				return []
			}
		},
		position: {
			type: Object,
			default() {
				return {
					top: 0,
					left: 0
				}
			}
		}
	},
	data() {
		return {}
	},
	mounted() {
		document.addEventListener('click', () => {
			this.$emit('input', false)
		})
	},
	methods: {
		handleSelect(item) {
			this.$emit('select', item)
		}
	}
}
</script>

<style scoped lang="less">
.context-menu {
	position: absolute;
	background-color: #ffffff;
	border: 1px solid #e1e1e1;
	border-radius: 5px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	font-size: 14px;
	padding: 2px 0;
	.context-menu-item {
		padding: 5px 10px;
		cursor: pointer;
		transition: background-color 0.3s;
		&:hover {
			background-color: #f5f5f5;
		}
	}
}
</style>
