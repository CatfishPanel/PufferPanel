Router.route('/server', {
    name: 'serverIndex'
});

Router.route('/server/:id', {
    name: 'serverView',
    data: function () {
        var server = Servers.get(this.params.id);
        console.log(server);
        return server;
    },
    waitOn: function() {
        return Meteor.subscribe('servers');
    }
});