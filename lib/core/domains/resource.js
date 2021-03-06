// Generated by CoffeeScript 1.6.2
/*
  Default Resourceful Implementations
*/


(function() {
  var MWareTransformer, MiddlewareWrapper, ResourceDomain, routeHandlers;

  routeHandlers = {
    "GET": {
      method: "get",
      klass: require("" + __dirname + "/../domains.default/resource/get")
    },
    "PUT": {
      method: "put",
      klass: require("" + __dirname + "/../domains.default/resource/put")
    },
    "POST": {
      method: "post",
      klass: require("" + __dirname + "/../domains.default/resource/post")
    },
    "DEL": {
      method: "delete",
      klass: require("" + __dirname + "/../domains.default/resource/del")
    }
  };

  /*
    Crisco Middleware Wrapper
  */


  MiddlewareWrapper = require("" + __dirname + "/../middleware/criscowrapper");

  /*
    Helpers
  */


  MWareTransformer = require("" + __dirname + "/../../helpers/middleware");

  /*
    Class: ResourceDomain
  
    Responsible for configuring an express
    server instance with a single resource
    domain.
  */


  ResourceDomain = (function() {
    /*
      Method: constructor
      
      @param - crisco - an instance of the crisco
               application
      @param - express - instance of express
      @param - config - An object describing a 
               resource domain.
               See resource/base for more information.
      @param - resourceInitializer - A Getter class
               that returns an array of express compliant
               middleware that initializes our Crisco
               primitives.
        {
          domain: "resourceDomain Name",
          beforeHooks: {"hookName": "opts"},
          afterHooks: {"hookName": "opts"},
          routes: <a route object>,
          m: {"mName": mObject}
        }
    
        Where a route object is defined as:
        {
          tag: "routeTag"
          route: "/route"
          method: "GET|PUT|POST|DEL"
          handler: RouteFn
        }
    */
    function ResourceDomain(crisco, express, config, resourceInitializer) {
      this.__c = crisco;
      this.__e = express;
      this.__config = config;
      this.__rInit = resourceInitializer;
    }

    ResourceDomain.prototype.enrich = function() {
      var afterHooks, args, beforeHooks, clbk, fn, r, routeHandler, routeKeyedAfter, routeKeyedBefore, wrappedAfterHooks, wrappedBeforeHooks, _i, _len, _ref, _ref1, _results,
        _this = this;

      routeKeyedBefore = MWareTransformer.transform(this.__config.beforeHooks);
      routeKeyedAfter = MWareTransformer.transform(this.__config.afterHooks);
      _ref = this.__config.routes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        beforeHooks = routeKeyedBefore[r.tag] || routeKeyedBefore["default"];
        afterHooks = routeKeyedAfter[r.tag] || routeKeyedAfter["default"];
        _ref1 = this._constructRouteHandler(r), fn = _ref1[0], routeHandler = _ref1[1];
        clbk = function(req, res, next) {};
        beforeHooks = _.filter(_.map(beforeHooks, function(n) {
          return _this.__config.m[n];
        }), function(z) {
          return _.isFunction(z);
        });
        afterHooks = _.filter(_.map(afterHooks, function(n) {
          return _this.__config.m[n];
        }), function(z) {
          return _.isFunction(z);
        });
        wrappedBeforeHooks = _.map(beforeHooks, function(bh) {
          var z;

          z = new MiddlewareWrapper(bh);
          return z.handler();
        });
        wrappedAfterHooks = _.map(afterHooks, function(ah) {
          var z;

          z = new MiddlewareWrapper(ah);
          return z.handler();
        });
        args = [routeHandler.route].concat(this.__rInit.get(this.__config.domain, r)).concat(wrappedBeforeHooks).concat([routeHandler.handler]).concat(wrappedAfterHooks).concat([clbk]);
        _results.push(fn.apply(this.__e, args));
      }
      return _results;
    };

    ResourceDomain.prototype._constructRouteHandler = function(r) {
      var routeInfo;

      routeInfo = routeHandlers[r.method];
      if (routeInfo == null) {
        console.error("Invalid HTTP Route " + routeDef.method + " for " + routeDef.route);
        return [];
      }
      return [this.__e[routeInfo.method], new routeInfo.klass(this.__c, r)];
    };

    return ResourceDomain;

  })();

  module.exports = ResourceDomain;

}).call(this);
