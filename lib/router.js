Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});

Router.route('/', {
    name : 'homeIndex'
});