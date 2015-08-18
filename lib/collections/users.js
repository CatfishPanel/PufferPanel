Users = new Mongo.Collection('users');

Users.getByMeteorId = function (id) {
    return _.find(Users.find().fetch(), function (user) {
        return user.meteorId == id;
    });
};