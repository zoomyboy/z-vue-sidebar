module.exports = {
	install: function(Vue, options) {
		Vue.use('vue-events');
		Vue.component('sidebar', require('./sidebar.vue'));
		Vue.component('sidebarMenu', require('./menu.vue'));
		Vue.component('comp', require('./component.vue'));
	}
};
