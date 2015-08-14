Meteor.methods({
    isUserAuthed: function () {
        return Meteor.user() != null;
    }
});