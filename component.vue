<template>
	<div :class="[{'lazy': lazy}]" id="page-container">
		<slot name="sidebar"></slot>
		<div id="main-component">
			<slot name="topbar" id="topbar"></slot>
			<slot name="header" id="header"></slot>
			<div class="container-fluid content-container">
				<slot name="content" id="content"></slot>
			</div>
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
			font-size: initial;
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
		#topbar-container {
			height: @topbarHeight;
		}
		.content-container {
			height: calc(100% ~"-" (@topbarHeight + 75px));
			& > div {
				height: 100%;
				& > .cp-wrap {
					height: 100%;
				}
			}
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
		props: {
			topbar: {
				type: Boolean,
				default: false
			}
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
