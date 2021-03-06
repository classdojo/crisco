// Generated by CoffeeScript 1.6.2
/*
  Explain this...
*/


(function() {
  var CriscoWrapper,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CriscoWrapper = (function() {
    function CriscoWrapper(fn) {
      this.handler = __bind(this.handler, this);      this.__fn = fn;
    }

    CriscoWrapper.prototype.handler = function() {
      var _this = this;

      return function(req, res, next) {
        var Aux, CriscoModel;

        CriscoModel = req.__crisco.model;
        Aux = req.__crisco.aux;
        return _this.__fn(CriscoModel, Aux, function() {
          return next();
        });
      };
    };

    return CriscoWrapper;

  })();

  module.exports = CriscoWrapper;

}).call(this);
