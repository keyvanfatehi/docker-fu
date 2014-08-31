var _ = require('lodash')


module.exports = function(dropName, argv, ydm) {
  var factory = ydm.drops[dropName]
  var Drop = null;
  var drop = null;

  function build() {
    if (drop) return;
    Drop = factory(argv, ydm)
    drop = new Drop()
  }

  this.canPerform = function(action) {
    var res = {}
    if (factory) {
      build()
      if (drop[action]) res.ok = true;
      else {
        res.ok = false
        res.reason = "Drop does not define "+action;
      }
    } else {
      res.ok = false
      res.reason = "Drop '"+dropName+"' has no factory. Ydm does not define a remote repository [yet]."
    }
    return res;
  }

  this.perform = function(action, cb) {
    build()
    drop[action](cb)
  }
}