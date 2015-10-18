/*
 * PufferPanel - Reinventing the way game servers are managed.
 * Copyright (c) 2015 PufferPanel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
var Rfr = require('rfr');
var Rethink = Rfr('lib/rethink.js');

/** @namespace */
var ServerModels = {};

ServerModels.getByOwner = function (ownerId, next) {

    Rethink.table('servers').filter(Rethink.row('owner').eq(ownerId)).eqJoin('node', Rethink.table('nodes')).run().then(function (servers) {

        return next(null, servers);
    }).error(next);
};

ServerModels.select = function (criteria, next) {

    Rethink.table('servers').filter(criteria).run().then(function (servers) {

        return next(null, servers);
    }).error(next);

};

ServerModels.create = function (fields, next) {

    Rethink.table('servers').insert(fields).run().then(next).error(next);
};

ServerModels.update = function (id, fields, next) {

    Rethink.table('servers').get(id).update(fields).run().then(next).error(next);
};

ServerModels.delete = function (id, next) {

    Rethink.table('servers').get(id).delete().run().then(next).error(next);
};

module.exports = ServerModels;
