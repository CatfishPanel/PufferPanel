/*
 * PufferPanel - Reinventing the way game servers are managed.
 * Copyright (c) 2015 PufferPanel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
var _ = require('underscore');
var Rfr = require('rfr');
var Rethink = Rfr('lib/rethink.js');

/** @namespace */
var ActionsModel = {};

ActionsModel.select = function (data, next) {

    Rethink.table('userActions').filter(data).run().then(function (response) {

        return next(null, _.first(response));
    }).error(next);
};

ActionsModel.create = function (data, next) {

    Rethink.table('userActions').insert(data).run().then(function (response) {

        return next(null, response.generated_keys[0]);
    }).error(next);
};

ActionsModel.deleteId = function (id, next) {

    Rethink.table('userActions').get(id).delete().run().then(function () {

        return next();
    }).error(next);
};

module.exports = ActionsModel;
