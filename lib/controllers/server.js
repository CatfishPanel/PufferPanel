/*
 * PufferPanel � Reinventing the way game servers are managed.
 * Copyright (c) 2015 PufferPanel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
var Rfr = require('rfr');
var ServerModels = Rfr('lib/models/servers.js');

var Server = {};

/**
 * Gets all servers this user has access to.
 * This would include servers they are owner of, and are a sub-user of.
 *
 * @param {String} userId - User's id
 * @param {callback} callback - Callback to handle response
 */
Server.getServersFor = function (userId, callback) {

    var userServers = [];

    ServerModels.getByOwner(userId, function (err, servers) {

        if (err !== undefined) {
            return callback(err);
        }

        userServers = servers;

        //TODO: get servers the user is a sub-user of and append to userServers

        return callback(undefined, userServers);
    });
};

module.exports = Server;

