<template>
	<div class="sidebar-menu">
		<div class="menu-heading">{{ title }}</div>
		<entry :items="entries"></entry>
	</div>
</template>

<style lang="less">
	@import '~sidebarStyles';

	.sidebar-menu {
		.menu-heading {
			text-transform: uppercase;
			font-size: 12px;
			padding: 20px 12px 0;
			font-weight: 700;
			color: @link-dark;
			body.sidebar-sm & {
				font-size: 10px;
				text-align: center;
				padding: 20px 4px 0;
			}
		}
		&:last-of-type ul.link-list.menu-depth0 {
			padding-bottom: 0;
		}
	}
</style>

<script>
	export default {
		props: ['title', 'entries'],
		components: {
			entry: require('./menuEntry.vue')
		},
		methods: {
			getActiveSubmenu(entries, chain) {
				var vm = this;

				var found = 0;

				entries.forEach((entry, key) => {
					if (entry.children != undefined && entry.children.length) {
						found = vm.getActiveSubmenu(entry.children, chain+'-'+key);
					} else if(entry.route != undefined && entry.route == vm.$route.name) {
						vm.$events.fire('toggleSubmenu', chain);
					}
				});
			}
		},
		mounted: function() {
		}
	};
</script>
