Router.route('/auth/totp', {
    name : 'authTotp'
});

Router.route('/auth/login', {
    name : 'authLogin'
});

Router.route('/auth/logout', {
    name : 'authLogout'
});

Router.route('/auth/reset-password', {
    name : 'authReset'
});

Router.onBeforeAction(function() {
   if(!Meteor.call('isUserAuthed')) {
       this.render('authLogin');
   } else {
       this.next();
   }
});