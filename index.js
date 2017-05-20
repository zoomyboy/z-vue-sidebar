import Events from 'vue-events';

export default {
	install: function(Vue, options) {
		Vue.use(Events);
		Vue.component('sidebar', require('./sidebar.vue'));
		Vue.component('sidebarMenu', require('./menu.vue'));
		Vue.component('comp', require('./component.vue'));
	}
};
