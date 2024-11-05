

const devMode = !process.env.PORT
const port = devMode ? 3000 : process.env.PORT

if (devMode) require = require('up2require')(require)

const fn = require('./folder/subfolder/newModule.js', devMode)

const handleAPI = require.cache.untilUpdate('./handleAPI.js')

require('http').createServer((request, response) => {
  if (request.url.startsWith('/api/')) {
    const route = request.url.slice(5)

    return handleAPI(route, response)
  }

  response.end('hello world')
}).listen(port)

// const fn = require.fresh('./module.js')

setInterval(fn, 1500)
