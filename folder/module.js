// require = require('up2require')(require)
require('up2require')(require)

// const fn = require('./subfolder/submodule.js', true)
// const fn = require.fresh('./subfolder/submodule.js')
const fn = require.cache.untilUpdate('./subfolder/submodule.js')

module.exports = fn


global.Class = require.fresh('./class.js')


console.log(11)
