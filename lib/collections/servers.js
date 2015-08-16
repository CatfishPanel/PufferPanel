Servers = new Mongo.Collection('servers');

console.log("Created Server collection");

Servers.get = function (id) {
    return _.find(Servers.find().fetch(), function (server) {
        return server.id == id;
    });
};