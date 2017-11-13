<template>
	<div class="cp-wrap cp-z-vue-sidebar-pagefooter">
		<slot></slot>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	.cp-wrap.cp-z-vue-sidebar-pagefooter {
		text-align: center;
		height: @footerHeight;
		background: @footer-bg;
		box-shadow: @footerShadow;
	}
</style>

<script>
	export default {
		data: function() {
			return  {

			};
		},
		mounted: function() {

		}
	}
</script>
