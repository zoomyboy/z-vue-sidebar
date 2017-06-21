<template>
	<div class="cp-wrap cp-topbarprofile">
		<div class="dropdown" ref="container">
			<div class="dropdown-toggle" type="button" data-toggle="dropdown">
				Dropdown Example <span :class="['fa', caret]"></span>
			</div>
			<ul class="dropdown-menu">
				<li><a href="#">JavaScript</a></li>
			</ul>
		</div>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	.cp-wrap {
		.dropdown {
			line-height: 60px;
			.dropdown-toggle {
				cursor: pointer;
				padding: 0 10px;
				&:hover {
					background: darken(@topbar-bg, 5%);
				}
			}
			&.open .dropdown-toggle {
				background: darken(@topbar-bg, 5%);
			}
		}
	}
</style>

<script>
	require('font-awesome-webpack');

	export default {
		data: function() {
			return {
				open: false
			};
		},
		computed: {
			caret: function() {
				return (this.open) ? 'fa-angle-up' : 'fa-angle-down';
			}
		},
		mounted: function() {
			var vm = this;

			$(this.$refs.container).on('shown.bs.dropdown', function() {
				vm.open = true;
			});

			$(this.$refs.container).on('hidden.bs.dropdown', function() {
				vm.open = false;
			});
		}
	}
</script>
