/*
 * PufferPanel - Reinventing the way game servers are managed.
 * Copyright (c) 2015 PufferPanel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
var Fs = require('fs-extra');
var Rfr = require('rfr');
var _ = require('underscore');

var Configuration = {};

Fs.ensureFileSync('config.json');
if (/^\s*$/.test(Fs.readFileSync('config.json'))) {
    Fs.writeFileSync('config.json', '{}');
}

var config = Rfr('config.json');

Configuration.get = function (path, def) {

    var result = _.property(path)(config);
    return result === undefined ? def : _.clone(result);
};

module.exports = Configuration;
