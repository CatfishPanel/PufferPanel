Meteor.subscribe('servers');

Template.homeIndex.helpers({
    servers: function () {
      return Servers.find();
    }
});