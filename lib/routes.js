/*
 * PufferPanel — Reinventing the way game servers are managed.
 * Copyright (c) 2015 PufferPanel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
var Rfr = require('rfr');
var Logger = Rfr('lib/logger.js');
var Hapi = require('hapi');
var Nunjucks = require('nunjucks');
var server = new Hapi.Server();
var Path = require('path');
var Configuration = Rfr('lib/config.js');
var Routes = Rfr('lib/routes/core.js');

var serverConfig = Configuration.server || { port: 3000 };
var yarConfig = Configuration.yar || { password: 'default' };

server.connection({ port: serverConfig.port });

server.register(require('inert'), function (err) {
  if (err) {
    Logger.error('Failed to register \'inert\' plugin in server.');
  }
});

server.register({
  register: require('crumb'),
  options: {
    cookieOptions: {
      isSecure: false
    }
  }
}, function (err) {
  if (err) {
    Logger.error('Failed to register \'crumb\' plugin in server.');
  }
});

server.register({
  register: require('yar'),
  options: {
    cookieOptions: {
      password: yarConfig.password,
      isSecure: false,
      isHttpOnly: true
    }
  }
}, function (err) {
  if (err) {
    Logger.error('Failed to register \'yar\' plugin in server.');
  }
});

server.register(require('hapi-auth-cookie'), function (err) {

  if (err) {
    Logger.error('Failed to register \'hapi-auth-cookie\' plugin in server.');
  }

  server.auth.strategy('session', 'cookie', {
    password: yarConfig.password,
    cookie: 'pp_session',
    redirectTo: '/auth/login',
    isSecure: false
  });

});

server.register(require('vision'), function (err) {

  if (err) {
    Logger.error('Failed to register \'vision\' plugin in server.');
  }

  server.views({
    engines: {
      html: {
        compile: function (src, options) {
          var template = Nunjucks.compile(src, options.environment);
          return function (context) {
            return template.render(context);
          };
        },
        prepare: function (options, next) {
          options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false });
          return next();
        }
      }
    },
    path: Path.join(__dirname, '../app/views')
  });

});

// Handle public folder
server.route({
  method: 'GET',
  path: '/public/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

// Base Routes
server.route([
  {
    method: 'GET',
    path: '/index',
    config: {
      handler: Routes.Base.get.index,
      auth: 'session'
    }
  }
]);

// Server Routes
server.route([
  {
    method: 'GET',
    path: '/server/{server}',
    config: {
      handler: Routes.Server.get.index,
      auth: 'session'
    }
  }
]);

// Routes for Authentication
server.route([
  {
    method: 'GET',
    path: '/auth/login',
    config: {
      handler: Routes.Authentication.get.login,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    config: {
      handler: Routes.Authentication.post.login,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/logout',
    config: {
      handler: Routes.Authentication.get.logout,
      auth: 'session'
    }
  },
  {
    method: 'POST',
    path: '/auth/login/totp',
    config: {
      handler: Routes.Authentication.post.totp,
      auth: {
        mode: 'try',
        strategy: 'session'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/auth/register/{token*}',
    config: {
      handler: Routes.Authentication.get.register
    }
  },
  {
    method: 'POST',
    path: '/auth/register',
    config: {
      handler: Routes.Authentication.post.register
    }
  },
  {
    method: 'GET',
    path: '/auth/password',
    config: {
      handler: Routes.Authentication.get.password
    }
  },
  {
    method: 'POST',
    path: '/auth/password',
    config: {
      handler: Routes.Authentication.get.password
    }
  }
]);

server.route({
  method: '*',
  path: '/{p*}', // catch-all path
  handler: function (request, reply) {
    reply.view('code/404').code(404);
  }
});

server.start(function () {
  Logger.info('Server running at: ' + server.info.uri);
});
