<template>
	<div :class="[{'lazy': lazy}]" id="page-container">
		<slot name="sidebar"></slot>
		<div id="main-component">
			<slot id="topbar"></slot>
		</div>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	body {
		background: @bg-body;
	}

	#page-container {
		height: 100%;
		min-height: 100%;
		font-size: 0;
		& > * {
			height: 100%;
			min-height: 100%;
			display: inline-block;
			vertical-align: top;
		}

	}

	#main-component {
		display: inline-block;
		body.lazy & {
			transition: width 0.3s;
		}
		body.sidebar-lg & {
			width: calc(100% ~"-" @sidebarWidth);
		}

		body.sidebar-sm & {
			width: calc(~"100% - 80px");
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
