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
var Configuration = Rfr('lib/config.js');

var config = Configuration.get('rethinkdb', {
    host: 'localhost',
    port: 28015,
    database: 'pufferpanel'
});

var Rethink = require('rethinkdbdash')({
    host: config.host,
    port: config.port,
    db: config.database,
    silent: true
});

Rethink.getPoolMaster().on('log', console.error);

module.exports = Rethink;
