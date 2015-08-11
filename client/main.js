Template.navbar.events({
    'click .language-button': function(e) {
        e.preventDefault();
        //get language from selected html and set into session
        Meteor.call('changeLanguage', $(e.currentTarget).attr('language'), function(err, response) {});
    }
});