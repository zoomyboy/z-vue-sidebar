<template>
	<ul class="cp-sidebar-footer cp-wrap footer-links">
		<footerlink v-for="(entry,ind) in filteredEntries"
			:style="{width: eachWidth+'%'}"
			:key="ind"
			class="footer-link"
   			:route="entry.route"
   			:href="entry.href"
   			:title="entry.title"
   			:icon="entry.icon"
   			:tooltip="entry.tooltip"
		></footerlink>
	</ul>
</template>

<style lang="less">
	@import "~sidebarStyle";

	ul.footer-links {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 0;
		margin-bottom: 0;
		padding-left: 0;
	}
</style>

<script>
	export default {
		props: {
			entries: {
				type: Array,
				required: true
			}
		},
		components: {
			footerlink: require('./footerlink.vue')
		},
		computed: {
			eachWidth: function() {
				return 100 / this.filteredEntries.length;
			},
			filteredEntries: function() {
				var vm = this;

				return this.entries.filter(function(entry) {
					return vm.$user == undefined || !entry.right || vm.$user.hasRight(entry.right);
				});
			}
		}
	}
</script>
