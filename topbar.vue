<template>
	<div id="topbar">
		<div class="topbar-left">
			<slot name="left"></slot>
		</div>
		<div class="topbar-right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	#topbar {
		height: 60px;
		background: @topbar-bg;
		border-bottom:1px @topbar-border solid;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.topbar-right {
			padding-right: 15px;
		}
		.topbar-left {
			padding-left: 15px;
		}
		.dropdown {
			line-height: 60px;
			display: inline-block;
			margin-right: 4px;
			&:last-child {
				margin-right: 0;
			}
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
			ul.dropdown-menu {
				border: 2px solid @topbar-border;
				border-top: 0;
				background-color: @topbar-bg;
				border-radius: 0;
				li {
					a {
						&:hover, &:active, &:focus {
							background-color: darken(@topbar-bg, 5%);
						}
					}
				}
			}
		}
	}
</style>

<script>

</script>
