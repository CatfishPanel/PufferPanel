Router.route('/', {
    name : 'homeIndex'
});

Router.route('/index', function() {
    this.redirect("/");
});

Router.route('/home', function() {
    this.redirect("/");
});
