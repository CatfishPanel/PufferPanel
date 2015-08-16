Meteor.subscribe('servers');

Template.serverIndex.helpers({
    servers: function () {
      return Servers.find();
    }
});