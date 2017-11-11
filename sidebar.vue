<template>
	<div id="page-sidebar" :class="{'has-footer': footer, 'has-footerexpanded': footerExpanded}">
		<div id="header-logo">
			<div class="row">
				<div class="col-xs-2 logo-container">
					L
				</div>
				<div class="col-xs-8 link-container">
					<a :href="headerhref" class="pagelink" :title="headertitle">
						<div class="heading">{{ headertitle }}</div>
						<div class="subheading">{{ subheadertitle }}</div>
					</a>
				</div>
				<div class="col-xs-2 toggle-container">
					<a @click.prevent="triggerButton" href="#" :title="closetitle"><i :class="toggleClass"></i></a>
				</div>
			</div>
		</div>
		<div id="sidebar-menu-container">
			<slot></slot>
		</div>
		<slot  name="footer" v-if="footer"></slot>
		<div class="footer-trigger" v-if="footer && bodyClass == 'sidebar-sm'">
			<a class="footer-link" @click="footerExpanded = !footerExpanded"><span :class="['fa', {'fa-chevron-right': !footerexpanded, 'fa-chevron-left': footerexpanded}]"></span></a>
		</div>
	</div>
</template>

<style lang="less">
	@import '~sidebarStyle';
	@import '~perfect-scrollbar/css/perfect-scrollbar.css';

	#page-sidebar {
    	background: @navbar-bg-dark;
		height: 100%;
		#sidebar-menu-container {
			background: @navbar-bg-bright;
			position: relative;
    		height: calc(~"100% - 60px");
		}
		&.has-footer #sidebar-menu-container {
    		height: calc(~"100% - 50px - 60px");
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
		width: @sidebarWidth;
		max-width: @sidebarWidth;
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

		body.lazy & {
			transition: width 0.3s, max-width 0.3s;
		}

		body.sidebar-sm & {
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

		&.has-footerexpanded > ul {
		    position: absolute;
    		left: 80px;
		}

		// Sidebar footer
		& > ul {
			height: 50px;
			font-size: 0;
			min-height: 50px;
			margin-bottom: 0;
			padding-left: 0;
			justify-content: space-between;
			& > li {
				font-size: initial;
				width: 80px;
				display: inline-block;
			}
			@supports(display: flex) {
			    display: flex;
    			flex-direction: row;
    			overflow: hidden;
				& > li {
					flex: 1 0 80px;
					display: flex;
					align-items: center;
					justify-content: center;
					a {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.footer-trigger {
			position: absolute;
			bottom: 0;
			height: 50px;
			width: 80px;
			z-index: 70;
			cursor: pointer;
			* {
				display: block;
				height: 100%;
			}
			.fa:before {
				height: 100%;
				position: absolute;
				display: block;
				width: 100%;
				font-size: 25px;
				color: @navbar-link-bright;
				line-height: 50px;
				width: 80px;
				text-align: center;
			}
		}
	}
</style>

<script>
	require('font-awesome-webpack');
	import PerfectScrollbar from 'perfect-scrollbar';
 
	export default {
		props: {
			'headerhref': false,
			'headertitle': false,
			'subheadertitle': false,
			'closetitle': false,
			footer: {
				type: Boolean,
				default: false
			}
		},
		data: function() {
			return {
				bodyClass: false,
				userCollapsed: false,
				footerExpanded: false
			}
		},
		watch: {
			bodyClass: function(newVal, oldVal) {
				if (oldVal == newVal) {return;}

				$('body').addClass('has-sidebar').removeClass(oldVal).addClass(newVal);

				if (newVal == 'sidebar-sm') {
					this.$events.fire('slideUpInLayer', '0');
				} else if (newVal == 'sidebar-lg') {
					this.footerExpanded = false;
				}

				this.$nextTick(function() {
					window.setTimeout(function() {$('body').addClass('lazy');});
				});
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

			this.innerContainerHeight = $(window).height();
			vm.bodyClass = vm.getBodyClassFromWindow();
			$(window).resize(function() {
				if (!vm.userCollapsed) {
					vm.bodyClass = vm.getBodyClassFromWindow();
				}
			});

			new PerfectScrollbar('#sidebar-menu-container');
		}
	}
</script>
