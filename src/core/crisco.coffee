BaseAction   = require("#{__dirname}/action/base")
BaseResource = require("#{__dirname}/resource/base")
Getter       = require("#{__dirname}/../helpers/getter")
ApplicationInitializer =
    require("#{__dirname}/initializers/app")

BaseSchema =
    require("database").BaseSchema

###
  Default Middleware
###
PermissionMiddleware =
    require("#{__dirname}/middleware.default/permission")
AuthenticationMiddleware =
    require("#{__dirname}/middleware.default/authentication")

###
  Make default Database Permission object available
###
Permission = require("database").Permission

###
  Class: Crisco

  Application class that exports application level functions.

  Also exposes enriched BaseAction and BaseResource classes.
###
class Crisco

  ###
    Method: constructor


  ###

  constructor: (config) ->
    @__config = config
    @__customMiddleware = {}
    @__configCallbacks = {}

    #let's export crisco into the Global Namespace for
    #visibility in Resource and Action Controllers
    global.Crisco = @


  ###
    Method: registerMiddleware

    Allows clients to registers middleware for use in action and route
    definitions.  For now each middleware module is registered for both
    actions and resources.
  ###

  registerMiddleware: (name, middleware) ->
    @__customMiddleware[name] = middleware
    #register with Action and Resources
    BaseAction.register name, middleware
    BaseResource.register name, middleware

  ###
  ###

  options: (config) ->
    if not arguments.length
      return @__config 

    @__config = config

  ###
    Method: configure

    A configure hook that allows the client to configure
    different parts of the application initialization
    process.

    For now, the only configuration type is "server"
  ###
  configure: (type, clbk) ->
    @__configCallbacks[type] = clbk

  getMiddleware: (name) ->
    @__customMiddleware[name]

  start: (clbk) ->
    config           = @__config

    schemas    = config.schemas or require(config.schemaPath)
    plugins    = config.plugins or (new Getter(config.pluginPath)).get()
    dbSettings = config.dbSettings or require(config.dbSettingsPath)
    resources  = config.resources or (new Getter(config.resourcePath)).get()
    actions    = config.actions or (new Getter(config.actionsPath)).get()

    ###
      Register Default Middleware
        -Authentication
        -Permissions
    ###

    @registerMiddleware "verifyPermissions", PermissionMiddleware
    @registerMiddleware "authenticate", AuthenticationMiddleware

    # #Initialization a bit verbose here...let's cleanup
    app = new ApplicationInitializer(
              actions,
              resources,
              schemas,
              plugins,
              dbSettings
              )

    app.init (err, express) =>
      clbk err, express


  ###
    Convenience Getters
  ###
  @::__defineGetter__ 'BaseAction', () ->
    return BaseAction.clone()

  @::__defineGetter__ 'BaseResource', () ->
    return BaseResource.clone()

  @::__defineGetter__ 'BaseSchema', () ->
    return BaseSchema

  @::__defineGetter__ 'appConfig', () ->
    return @__config

  @::__defineGetter__ 'configuration', () ->
    return @__configCallbacks

  @::__defineGetter__ "Permission", () ->
    Permission


module.exports = Crisco
