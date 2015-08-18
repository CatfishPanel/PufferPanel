Router.route('/auth/totp', {
    name: 'authTotp'
});

Router.route('/auth/login', {
    name: 'authLogin'
});

Router.route('/auth/logout', {
    name: 'authLogout'
});

Router.route('/auth/resetpw', {
    name: 'authPassword'
});

Router.route('/auth/create', {
    name: 'authCreate'
});

Router.onBeforeAction(function () {
    if (!Auth.isUserAuthed()) {
        this.render('authLogin');
    } else {
        this.next();
    }
});