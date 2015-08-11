Router.route('/authentication/totp', {
    name : 'authenticationTotp'
});

Router.route('/authentication/login', {
    name : 'authenticationLogin'
});

Router.route('/authentication/logout', {
    name : 'authenticationLogout'
});

Router.route('/authentication/reset-password', {
    name : 'authenticationReset'
});