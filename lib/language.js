if (Meteor.isClient) {

    getUserLanguage = function () {
        // Put here the logic for determining the user language
        return localStorage.getItem("language");
    };

    Meteor.methods({
        changeLanguage: function (newLang) {
            if(newLang == null) {
                localStorage.setItem("language", 'en');
            } else {
                localStorage.setItem("language", newLang);
            }
            Session.set("showLoadingIndicator", true);
            TAPi18n.setLanguage(getUserLanguage())
                .done(function () {
                    Session.set("showLoadingIndicator", false);
                })
                .fail(function (error_message) {
                    // Handle the situation
                    console.log(error_message);
                });
        }
    });
}

Meteor.startup(function () {

    if(Meteor.isClient) {
        Session.set("showLoadingIndicator", true);

        Meteor.call("changeLanguage", localStorage.getItem("language"), function (err, response) {
        });
    }
});