Router.route('/', function() {
    this.redirect("/home");
});

Router.route('/index', function() {
    this.redirect("/home");
});

Router.route('/home', {
    name: 'homeIndex'
});
