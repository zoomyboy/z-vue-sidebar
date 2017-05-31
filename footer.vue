<template>
	<div class="cp-sidebar-footer cp-wrap">
		<div v-for="entry in entries" :style="{width: eachWidth+'%'}">
			<a v-if="entry.href" :href="entry.href">
				<div v-if="entry.icon"><span :class="'fa fa-'+entry.icon"></span></div>
				<div v-if="entry.title">{{ entry.title }}</div>
			</a>
			<router-link v-if="entry.route" :to="entry.route">
				<div v-if="entry.icon"><span :class="'fa fa-'+entry.icon"></span></div>
				<div v-if="entry.title">{{ entry.title }}</div>
			</router-link>
		</div>
	</div>
</template>

<style lang="less">
	@import "~sidebarStyle";

	.cp-sidebar-footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 0;
		& > div {
			padding: 10px;
			background-color: @bg-dark;
			display: inline-block;
			&:hover {
				background-color: @bg-very-bright;
			}
			& > a {
				text-align: center;
				color: @link-dark;
				font-size: 12px;
				&:hover, &:focus, &:active {
					text-decoration: none;
				}
			}
		}
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
		computed: {
			eachWidth: function() {
				return 100 / this.entries.length;
			}
		}
	}
</script>
