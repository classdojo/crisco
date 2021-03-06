// Generated by CoffeeScript 1.6.2
/*
  This stub initializes the application state...also allows state serialization
  and deserialization so that clients can easily use and inspect the state of
  this action class instance.
*/


(function() {
  var BaseResource;

  BaseResource = (function() {
    function BaseResource() {}

    BaseResource.register = function(name, middleware) {
      this._m = this._m || {};
      return this._m[name] = middleware;
    };

    BaseResource.clone = function(crisco) {
      var f;

      f = function() {};
      f._routes = [];
      f.__vars = {};
      f._d = "default";
      /*
        Before and After hooks
      */

      f.before = function(beforeHooks) {
        return this.__vars.bh = beforeHooks;
      };
      f.after = function(afterHooks) {
        return this.__vars.ah = afterHooks;
      };
      f.tag = function(tag) {
        return this.__vars.t = tag;
      };
      f.app = function() {};
      f.domain = function(d) {
        return this.__vars.d = d;
      };
      f.app.get = function(route, routeHandler) {
        /*
          store app routes as tuples with
          {
            tag: "SomeTag",
            route: "SomeRoute",
            handler: "SomeHandler",
            getOne: Boolean //whether this route should return a single object or not.
          }
        */
        f._routes.push({
          tag: f.__vars.t,
          route: f.utils._prefixRoute(route),
          method: "GET",
          handler: routeHandler,
          getOne: false
        });
        return f._reset();
      };
      f.app.getOne = function(route, routeHandler) {
        /*
          store app routes as tuples with
          {
            tag: "SomeTag",
            route: "SomeRoute",
            handler: "SomeHandler",
            getOne: Boolean //whether this route should return a single object or not.
          }
        */
        f._routes.push({
          tag: f.__vars.t,
          route: f.utils._prefixRoute(route),
          method: "GET",
          handler: routeHandler,
          getOne: true
        });
        return f._reset();
      };
      f.app.post = function(route, routeHandler) {
        f._routes.push({
          tag: f.__vars.t,
          route: f.utils._prefixRoute(route),
          method: "POST",
          handler: routeHandler
        });
        return f._reset();
      };
      f.app.put = function(route, routeHandler) {
        f._routes.push({
          tag: f.__vars.t,
          route: f.utils._prefixRoute(route),
          method: "PUT",
          handler: routeHandler
        });
        return f._reset();
      };
      f.app.del = function(route, routeHandler) {
        f._routes.push({
          tag: f.__vars.t,
          route: f.utils._prefixRoute(route),
          method: "DEL",
          handler: routeHandler
        });
        return f._reset();
      };
      f._reset = function() {
        return f.__vars._t = null;
      };
      f.utils = {};
      f.utils._prefixRoute = function(r) {
        var pre;

        if (crisco.appConfig.routes != null) {
          pre = crisco.appConfig.routes.prefix || "";
        } else {
          pre = "";
        }
        return "" + pre + r;
      };
      f.serialize = function() {
        var o;

        o = {
          domain: f.__vars.d || "default",
          beforeHooks: f.__vars.bh,
          afterHooks: f.__vars.ah,
          routes: f._routes,
          m: BaseResource._m
        };
        return o;
      };
      f.deserialize = function(conf) {
        this.__vars.d = conf.domain || this.__vars.d;
        this.__vars.bh = conf.beforeHooks || this.__vars.bh;
        this.__vars.ah = conf.afterHooks || this.__vars.ah;
        return this._routes = conf.routes || this._routes;
      };
      return f;
    };

    return BaseResource;

  })();

  module.exports = BaseResource;

}).call(this);
