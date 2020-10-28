// require = require('up2require')(require)
require('up2require')(require)

// const fn = require('./folder/module.js', true)
// const fn = require.fresh('./folder/module.js')
const fn = require.cache.untilUpdate('./folder/module.js')

setInterval(fn, 1500)
