<template>
	<div id="page-sidebar" :style="{'height': innerContainerHeight+'px'}">
		<div id="header-logo">
			<div class="row">
				<div class="col-xs-2 logo-container">
					L
				</div>
				<div class="col-xs-8 link-container">
					<a :href="headerHref" class="pagelink" :title="headerTitle">
						<div class="heading">{{ headerTitle }}</div>
						<div class="subheading">{{ subHeaderTitle }}</div>
					</a>
				</div>
				<div class="col-xs-2 toggle-container">
					<a @click.prevent="triggerButton" href="#" :title="closeTitle"><i :class="toggleClass"></i></a>
				</div>
			</div>
		</div>
		<div id="sidebar-menu-container" :style="{'height': (innerContainerHeight-60)+'px'}">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="less">
	@import 'navbar';
	@import '~perfect-scrollbar/dist/css/perfect-scrollbar.css';

	#page-sidebar {
    	background: @navbar-bg-dark;
		#sidebar-menu-container {
			background: @navbar-bg-bright;
			position: relative;
		}
		body, html {
			height: 100%;
		}
		.row {
			margin-left: -8px;
			margin-right: -8px;
		}
		.col-xs-2, .col-xs-8 {
			padding-left: 8px;
			padding-right: 8px;
		}
		.logo-mobile {
			display: none;
		}
		#header-logo {
			height: 60px;
			overflow: hidden;
		}
		width: 300px;
		max-width: 300px;
		transition: width 0.3s, max-width 0.3s;
		position: fixed;
		left: 0;
		left: 0;
		height: auto;
		background: @navbar-bg-dark;
		.pagelink {
			padding: 12px 0;
			display: block;
			.heading {
				color:  @navbar-link-bright;
				font-weight: bold;
				font-size: 15px;
			}
			.subheading {
				color: @navbar-link-dark;
				font-size: 11px;
			}
		}
		.toggle-container a {
			font-size: 19px;
			color: @navbar-link-dark;
    		padding: 17px 0;
    		display: block;
		}

		body.sidebar-sm & {
			transition: width 0.3s, max-width 0.3s;
			max-width: 80px;
			width: 80px;
			overflow: hidden;
			.logo-container, .link-container {
				display: none;
			}
			.toggle-container {
				width: 100%;
				a {
					font-size: 22px;
					text-align: center;
				}
			}
		}
	}
</style>

<script>
	require('font-awesome-webpack');
	window.Ps = require('perfect-scrollbar');
	var $ = require('jquery');
 
	export default {
		props: {
			'headerHref': false,
			'headerTitle': false,
			'subHeaderTitle': false,
			'closeTitle': false,
		},
		data: function() {
			return {
				innerContainerHeight: 60,
				bodyClass: false,
				userCollapsed: false
			}
		},
		watch: {
			bodyClass: function(newVal, oldVal) {
				if (oldVal == newVal) {return;}
				$('body').addClass('has-sidebar').removeClass(oldVal).addClass(newVal);
				if (newVal == 'sidebar-sm') {
					this.$events.fire('slideUpInLayer', '0');
				}
			}
		},
		computed: {
			toggleClass: function() {
				return this.bodyClass == 'sidebar-sm' ? 'fa fa-indent' : 'fa fa-outdent';
			}
		},
		methods: {
			getBodyClassFromWindow: function() {
				if (window.innerWidth > 768) {
					return 'sidebar-lg';
				}

				return 'sidebar-sm';
			},
			triggerButton: function() {
				this.userCollapsed = !this.userCollapsed;
				this.toggle();
			},
			toggle: function() {
				if (this.bodyClass == 'sidebar-sm') {
					this.bodyClass = 'sidebar-lg';
				} else {
					this.bodyClass = 'sidebar-sm';
				}
			}
		},
		mounted: function() {
			var vm = this;
			
			this.bodyClass = this.getBodyClassFromWindow();
			this.innerContainerHeight = $(window).height();
			$(window).resize(function() {
				if (!vm.userCollapsed) {
					vm.bodyClass = vm.getBodyClassFromWindow();
				}
				vm.innerContainerHeight = $(window).height();
			});

			var container = document.getElementById('sidebar-menu-container');
			Ps.initialize(container);
		}
	}
</script>
