<template>
	<ul class="link-list" :class="[menuDepthClass]" :ref="'menuentry-'+parent">
		<li v-for="(menuentry, id) in items" :class="{'has-children': hasChildren(id), 'openChild': isOpen(id)}">
			<a v-if="routerLinks == false || hasChildren(id)" @click.prevent="toggleCollapse(id)" :class="['menu-link']" :href="getHref(menuentry)" :title="menuentry.label">
				<span :class="'fa fa-'+menuentry.icon" v-if="menuentry.icon != false"></span><span class="link-label">{{ menuentry.label }}</span>
			</a>
			<router-link v-if="routerLinks == true && !hasChildren(id)" @click.native="toggleCollapse(id)" :class="['menu-link', {'openChild': isOpen(id)}]" :to="getHref(menuentry)" :title="menuentry.label">
				<span :class="'fa fa-'+menuentry.icon" v-if="menuentry.icon"></span><span class="link-label">{{ menuentry.label }}</span>
			</router-link>
			<entry v-if="hasChildren(id)" :items="menuentry.children" :depth="depth + 1" :parent="chain(id)"></entry>
		</li>
	</ul>
</template>

<style lang="less">
	@import '~sidebarStyle';

	.hasCaret() {
		&.has-children.openChild > a:after { 
			transform: rotate(90deg);
			transition: transform 0.2s;
		}
		&.has-children > a:after {
			transition: transform 0.2s;
			content: "\F0DA";
			padding: 8px 0;
			font: normal normal normal 14px/1 FontAwesome;
			display: block;
			position: absolute;
			right: 12px;
			top: 10px;
			body.sidebar-sm & {
				display: none;
			}
		}
	}

	.menuDepthBg(@depth, @bg) when (@depth > 0) {
		background: @bg;
	}

	.menuDepth(@depth, @bg) {
		list-style-type: none;
		padding: 5px 0;
		.menuDepthBg(@depth, @bg);
		.menuHidden(@depth);
	}

	.menuHidden(@depth) when (@depth > 0) {
		display: none;
	}

	.bg-hover(@depth, @color, @activeClass) when (@depth > 0) {
		&:hover, &.@{activeClass} {background: @color;}
	}

	.menuLink(@depth) {
		font-size: 14px - 1px * @depth;
		line-height: 32px - 6px * @depth;
		height: 32px - 6px * @depth;
		font-weight: 400;
		color: @link-dark;
		box-sizing: content-box;
		display: block;
		position: relative;
		padding: 12px - 3px * @depth 24px 12px - 3px * @depth 12px + 12px * @depth;
		.bg-hover(@depth, darken(@bg-dark, 1% * @depth), router-link-exact-active);
		&:hover, &:active, &:focus {
			text-decoration: none;
		}
		//center icon of link in small sidebar
		body.sidebar-sm & {
			text-align: center;			
			padding: 4px 0;
		}
	}

	.icon(@depth) {
		& > .fa {
			background: rgba(0,0,0,.31);
			font-size: 16px - 4px * @depth;
			line-height: 31px - 4px * @depth;
			width: 32px - 6px * @depth;
			height: 32px - 6px * @depth;
			margin-right: 10px;
			border-radius: 3px;
			text-align: center;
			body.sidebar-sm & {margin: 0;}
		}
		&:hover {
			color: lighten(@link-dark, 20%);
		}
		body.sidebar-sm & .link-label {
			display: none;
		}
	}
	
	.hasMargin(@depth) when (@depth > 0) {
		 margin-bottom: 4px;
		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.hasOpenClass(@depth) when (@depth = 0) {
		& > a {
			border-bottom: @bg-bright solid 1px;
			border-top: @bg-bright solid 1px;
		}
		&.openChild > a, & > a.router-link-exact-active {
			background: lighten(@bg-bright, 5%);
			border-bottom: darken(@bg-bright, 4%) solid 1px;
			border-top: lighten(@bg-bright, 10%) solid 1px;
		}
	}

	.buildMenu(@depth, @currentDepth: 0) when (@currentDepth <= @depth) {
		ul.link-list.menu-depth@{currentDepth} {
			.menuDepth(@currentDepth, darken(@bg-bright, 2% * @currentDepth));
			& > li {
				.hasCaret();
				.hasMargin(@currentDepth);
				.hasOpenClass(@currentDepth);
				& > a.menu-link {
					.menuLink(@currentDepth);
					.icon(@currentDepth);
				}
			}
		}
		.buildMenu(@depth, @currentDepth + 1);
	}

	.buildMenu(3);
</style>

<script>
	import List from 'z-js-list';

	export default {
		name: 'entry',
		props: {
			parent: {
				default: '0'
			},
			maxOpen: {
				default: 1
			},
			items: {},
			router: {
				default: false
			}
		},
		data: function() {
			return {
				routerLinks: true,
				openEntries: []
			};
		},
		computed: {
			menuDepthClass: function() {
				return 'menu-depth' + this.depth;
			},
			depth: function() {
				return this.parent.split('-').length - 1;
			}
		},
		components: {
			entry: require('./menuEntry.vue')
		},
		methods: {
			getActiveRouteObject: function() {
				console.log(router);
			},
			getHref: function(entry) {
				if (entry.href != undefined) {
					return entry.href;
				}
				if (entry.route != undefined) {
					return {name: entry.route};
				}

				return '#';
			},
			isOpen: function(key) {
				return this.openEntries.contains(key);
			},
			updateOpenState: function(key) {
				if (this.isOpen(key)) {
					this.openEntries.remove(key);
				} else {
					this.openEntries.enqueue(key);
				}
			},
			chain: function(key) {
				return this.parent + '-' + key;
			},
			toggleCollapse: function(key) {
				var vm = this;
				vm.$events.fire('toggleSubmenu', this.chain(key));
				while(this.openEntries.length() > this.maxOpen) {
					vm.$events.fire('toggleSubmenu', this.chain(this.openEntries.firstExcept(key)));
				}
			},
			hasChildren: function(key) {
				return this.items[key].children != undefined && this.items[key].children.length > 0;
			},
		},
		created () {
			this.openEntries = new List();
		},
		mounted () {
			var vm = this;

			this.items.forEach(function(item, key) {
				vm.$events.listen('updateOpenState-'+vm.chain(key), function() {
					vm.updateOpenState(key);
				});
			});

			vm.$events.listen('toggleSubmenu', function(parent) {
				if (parent != vm.parent && parent != 'all') {return;} 

				vm.items.forEach((item, key) => {
					if (vm.hasChildren(key) && vm.isOpen(key)) {
						vm.$events.fire('toggleSubmenu', vm.chain(key));
					}
				});
				$(vm.$refs['menuentry-'+vm.parent]).slideToggle();
				vm.$events.fire('updateOpenState-'+vm.parent);
			});

			vm.$events.listen('slideUpInLayer', function(depth) {
				if (vm.depth == depth) {
					vm.items.forEach((item, key) => {
						if (vm.hasChildren(key) && vm.isOpen(key)) {
							vm.$events.fire('toggleSubmenu', vm.chain(key));
						}
					});
				}
			});
		}
	}
</script>
