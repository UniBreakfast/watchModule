upgradeRequire()

setInterval(() => require('./module.js', true)(), 1500)


function upgradeRequire() {
  const originalRequire = require
  const reloadingModules = []

  require = function require(module, watchToReload) {
    if (watchToReload && !reloadingModules.includes(module)) {
      reloadingModules.push(module)

      originalRequire("fs").watch(
        originalRequire("path").resolve(module),
        () => delete require.cache[require.resolve(module)]
      )
    }

    return originalRequire(module)
  }

  Object.assign(require, originalRequire)
}
