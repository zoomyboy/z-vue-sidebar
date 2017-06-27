import Events from 'vue-events';

export default {
	install: function(Vue, options) {
		Vue.use(Events);
		Vue.component('sidebar', require('./sidebar.vue'));
		Vue.component('sidebarfooter', require('./footer.vue'));
		Vue.component('sidebarmenu', require('./menu.vue'));
		Vue.component('comp', require('./component.vue'));
		Vue.component('topbar', require('./topbar.vue'));
	}
};
