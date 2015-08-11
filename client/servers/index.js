Meteor.subscribe('servers');

Template.serversIndex.helpers({
    servers: function () {
      return Servers.find();
    }
});