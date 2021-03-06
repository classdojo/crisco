_ = require("underscore")
myAsync = require("#{__dirname}/../../../helpers/async")

class POST

  constructor: (crisco, r) ->
  	@__c = crisco
  	@__r = r

  handler: (req, res, next) =>
    CriscoModel = req.__crisco.model
    Aux = req.__crisco.aux
    @__r.handler CriscoModel, Aux, (runDefault=false) =>
      #require users to call this function and pass in some
      #optional flag for 
      if runDefault
        console.log "Running default POST handler..."
        @_default CriscoModel, Aux, () ->
          #done
      else
        next()


  _default: (CriscoModel, Aux, next) ->
    clientClbk = @__c.getMiddleware("resource:default:post")
    if not clientClbk?
      Aux.error "No default post logic supplied by client. Skipping..."
      return next()
    targets = CriscoModel.targets()
    childCollection = targets[0]
    if targets.length > 1
      parentCollection = CriscoModel.targets()[1]
    if parentCollection?
      parent =
        collection: parentCollection
        id: CriscoModel.getParam(parentCollection)
    else
      #this is a 1st degree child of Actor.
      parent = null

    targetNode = CriscoModel.database.nodeManager.find(CriscoModel.targets()[0])
    if _.isArray(Aux.body)
      unpack = true
      body = Aux.body
    else
      unpack = false
      body = [Aux.body]
    tasks = _.map body, (e) -> 
      child =
        collection: childCollection
        properties: e
      return clientClbk.bind(clientClbk, CriscoModel, Aux, parent, child) 
    myAsync.parallel tasks, (err, results) =>
      if not err?
        Aux.response.success().pack(results[Object.keys(results).shift()]).send()
        # Aux.res.send 200, {data: payload}

    # clientClbk targetNode, Aux.body, (err, result) ->


  @::__defineGetter__ 'route', () ->
    @__r.route

module.exports = POST
