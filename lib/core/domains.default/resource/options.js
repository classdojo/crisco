// Generated by CoffeeScript 1.6.2
(function() {
  var OPTIONS,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  OPTIONS = (function() {
    function OPTIONS(crisco, r) {
      this.handler = __bind(this.handler, this);      this.__c = crisco;
      this.__r = r;
    }

    OPTIONS.prototype.handler = function(req, res, next) {
      var Aux, CriscoModel,
        _this = this;

      CriscoModel = req.__crisco.model;
      Aux = req.__crisco.aux;
      return this.__r.handler(CriscoModel, Aux, function(runDefault, clbk) {
        if (runDefault == null) {
          runDefault = false;
        }
        return next();
      });
    };

    OPTIONS.prototype.__defineGetter__('route', function() {
      return this.__r.route;
    });

    return OPTIONS;

  })();

  module.exports = OPTIONS;

}).call(this);