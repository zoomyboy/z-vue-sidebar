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
			padding-right: 40px;
		}
		.topbar-left {
			padding-left: 40px;
		}
		ul.dropdown-menu {
			margin-top: 0;
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
</style>

<script>

</script>
