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

Router.route('/server/:id/subusers/add', {
    name: 'serverSubuserAdd'
});

Router.route('/server/:id/subusers/edit/:email', {
    name: 'serverSubuserEdit'
});

Router.route('/server/:id/subusers', {
    name: 'serverSubuserIndex'
});

Router.route('/server/:id/settings', {
    name: 'serverSettings',
    data: function () {
        var server = Servers.get(this.params.id);
        console.log(server);
        return server;
    },
    waitOn: function() {
        return Meteor.subscribe('servers');
    }
});