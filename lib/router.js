Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});

Router.route('/', {
    name : 'homeIndex'
});

Router.route('/settings', {
    name : 'homeSettings'
});

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