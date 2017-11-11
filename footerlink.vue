<template>
	<li class="footer-link" ref="footerlink">
		<a v-if="href" :href="href" :data-toggle="toggle" data-original-title="" :title="realTitle">
			<div v-if="icon"><span :class="'fa fa-'+icon"></span></div>
			<div v-if="title">{{ title }}</div>
		</a>
		<router-link v-if="route" :to="{'name': route}" :data-toggle="toggle" data-original-title="" :title="realTitle">
			<div v-if="icon"><span :class="'fa fa-'+icon"></span></div>
			<div v-if="title">{{ entry.title }}</div>
		</router-link>
	</li>
</template>

<style lang="less">
	@import "~sidebarStyle";

	.footer-link {
		background-color: @navbar-bg-dark;
		&:hover {
			background-color: @navbar-bg-very-bright;
		}
		& > a {
			display: block;
			text-align: center;
			color: @link-dark;
			font-size: 10px;
			padding: 8px;
			&:hover, &:focus, &:active {
				text-decoration: none;
			}
			.fa {
				font-size: 20px;
			}
		}
	}
</style>

<script>
	require('bootstrap');

	export default {
		props: ['href', 'icon', 'title', 'route', 'tooltip'],
		computed: {
			toggle: function() {
				if (this.tooltip) {return 'tooltip';}
				return '';
			},
			realTitle: function() {
				if (this.tooltip) {return this.tooltip;}
				return '';
			},
			tooltipClass: function() {
				if (this.tooltip) {return 'linkTooltip';}
				return '';
			}
		},
		mounted: function() {
			$(this.$refs.footerlink).find('[data-toggle="tooltip"]').tooltip({container: 'body'});
		}
	}
</script>
