<template>
	<div class="demo-3">
		<Quote>
			<Markdown>
				See more at:
				[https://acgtofe.com/posts/2016/11/arc-path-movement](https://acgtofe.com/posts/2016/11/arc-path-movement)
			</Markdown>
		</Quote>
		<div class="box">
			<img
				class="avatar"
				src="http://localhost:3000/_nuxt/assets/image/home/eur.png"
				alt="" />
		</div>
		<div class="box">
			<img
				class="avatar2"
				src="http://localhost:3000/_nuxt/assets/image/home/eur.png"
				alt="" />
		</div>
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
html,
body {
	width: 100%;
	height: 100%;
}
.box {
	margin: 200px auto;
	width: 100px;
	height: 100px;
	/* background-color: skyblue; */
	/* transform: rotate(-90deg); */
}
.avatar,
.avatar2 {
	width: 44px;
	height: 30px;
	/* transform: rotate(-270deg); */
	/* 以下两条transform等价 因为rotate会变换坐标轴 */
	/* transform: rotate(180deg);
      transform-origin: 200px 200px; */
	/* transform: translate(200px, 200px) rotate(180deg)  translate(-200px, -200px);
      transform-origin: 0 0; */
}
/* @keyframes spin {
        from {
          transform: rotate(0turn) translateY(-200px) translateY(0)
            rotate(1turn);
        }
        to {
          transform: rotate(1turn) translateY(-200px) translateY(0)
            rotate(0turn);
        }
      } */
@keyframes spin1 {
	0% {
		transform: translateX(50px) rotate(-270deg) translateY(50px) rotate(270deg);
	}
	100% {
		transform: translateX(50px) rotate(-90deg) translateY(50px) rotate(90deg);
	}
}
@keyframes spin2 {
	0% {
		transform: translateX(-50px) rotate(-90deg) translateY(50px) rotate(90deg);
	}
	100% {
		transform: translateX(-50px) rotate(90deg) translateY(50px) rotate(-90deg);
	}
}
.avatar {
	animation: spin1 2s infinite linear;
}
.avatar2 {
	animation: spin2 2s infinite linear;
}
/* @keyframes spin {
        to {
          transform: rotate(1turn);
        }
      }
      @keyframes spin-reverse {
        from {
          transform: rotate(1turn);
        }
      }
      .box {
        animation: spin 10s infinite linear;
        transform-origin: 50% 150px;
      }
      .box > img {
        animation: spin-reverse 10s infinite linear;
      } */
</style>
