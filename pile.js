module.exports = function pile(/*layers*/) {
  var args = Array.prototype.slice.call(arguments)
  var last = args.pop()
  return function (req, res, next) {
    var pending = args.length
    if (!pending) return last(req, res, next)
    args.forEach(function (layer) {
      layer(req, res, function (err) {
        if (err) return next(err)
        if (!--pending) last(req, res, next)
      }) 
    })
  }
}
