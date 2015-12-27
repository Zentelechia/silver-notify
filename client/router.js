Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function () {
	this.render();
});
Router.route('settings', function () {
	this.render('settings');
});
