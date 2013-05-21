class ActionInitializer

  constructor: (actionGetter) ->
    @_actionGetter = actionGetter

  init: (clbk) ->
    @_actionGetter.load (err) =>
      clbk err

  ###
    Method: enrich

    Takes an express instance and enriches the
    server with the appropriate models.
  ###
  enrich: (express, clbk) ->
    ActionConfigurations = @_actionGetter.get()


module.exports = ActionInitializer
