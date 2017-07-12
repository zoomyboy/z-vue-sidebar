<template>
	<div :class="['main-component', {'lazy': lazy}]">
		<slot></slot>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	body {
		background: @bg-body;
	}

	.main-component {
		body.lazy & {
			transition: margin-left 0.3s;
		}
		body.sidebar-lg & {
			margin-left: 300px;
		}

		body.sidebar-sm & {
			margin-left: 80px;
		}
	}
</style>

<script>
	export default {
		data: function() {
			return {
				lazy: false,
				windowWidth: 0
			};
		},
		mounted: function() {
			var vm = this;

			$(window).resize(function() {
				var width = $(window).width();
				if (width != vm.windowWidth) {
					vm.$events.fire('windowwidth', width);
					vm.windowWidth = width;
				}
			});
		}
	}
</script>
