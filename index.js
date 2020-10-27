upgradeRequire()

const fn = require('./module.js', true)

setInterval(fn, 1500)


function upgradeRequire() {
  const originalRequire = require
  const reloadingWrappers = {}

  require = function require(module, watchToReload) {
    if (watchToReload) {
      if (module in reloadingWrappers) {
        return reloadingWrappers[module]
      } else {
        originalRequire("fs").watch(
          originalRequire("path").resolve(module),
          () => delete require.cache[require.resolve(module)]
        )

        reloadingWrappers[module] = function (...args) {
          return originalRequire(module).apply(this, args)
        }

        return Object.assign(reloadingWrappers[module], originalRequire(module))
      }
    }

    return originalRequire(module)
  }

  Object.assign(require, originalRequire)

  upgradeRequire = () => {}
}
