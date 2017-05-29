<template>
	<div class="main-component">
		<div id="topbar">
		</div>

		<slot></slot>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	#topbar {
		height: 60px;
		background: white;
		border-bottom:1px #eeeeee solid;
	}

	body {
		background: @bg-body;
	}

	.main-component {
		transition: margin-left 0.3s;
		body.sidebar-lg & {
			margin-left: 300px;
		}

		body.sidebar-sm & {
			margin-left: 80px;
		}
	}
</style>

<script>
	require('style-loader!css-loader!less-loader!bootstrap/less/bootstrap.less')
</script>
