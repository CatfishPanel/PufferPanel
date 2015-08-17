Servers = new Mongo.Collection('servers');

Servers.get = function (id) {
    return _.find(Servers.find().fetch(), function (server) {
        return server.id == id;
    });
};