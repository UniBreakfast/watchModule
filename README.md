# [watchModule](https://github.com/UniBreakfast/watchModule)

## Usage Demo for my npm-module [`up2require`](https://github.com/UniBreakfast/up2require) 

On a screenshot below app is started with `index.js`, then it calls a function every 1.5 seconds. 
That function is imported from a custom module which uses another function imprted from another module. 
Then right while the program is running I change the file open on the right (`'abc'` to `'abd'`) and save it.
That submodule is immediately reimported automatically without restart and function is replaced internally with the updated version.
Then I change the file in the center (`11` to `12`) and save it.
That module is immediately reimported automatically too so the `console.log(12)` is called.
But the function is still working as it was before.

![image](https://github.com/user-attachments/assets/dd80abbc-70c1-4ac7-91b2-d4f5904b055f)

On a next screenshot again while the app is running I change the API handler function, save the file and reload the page in browser to immediately see the changes without restarting node process.

![image](https://github.com/user-attachments/assets/2221dfea-4c91-476e-8aeb-b40e7c8134fc)

And here is the `up2require` function module code itself:

```javascript
const {watch} = require('fs')
const reloadingWrappers = {}

module.exports = function upgradeToUpdate(require) {
  function watchfulRequire(module, reloadUpdated) {
    if (reloadUpdated) {
      module = require.resolve(module)
      if (module in reloadingWrappers) {
        return reloadingWrappers[module]
      } else {
        watch(module, () => delete require.cache[module])

        const wrapperFn = function (...args) {
          if (new.target) return new (require(module))(...args)
          return require(module).apply(this, args)
        }

        const wrapperProxy = new Proxy(wrapperFn, {get(_, prop) {
          return require(module)[prop]
        }})
        return reloadingWrappers[module] = wrapperProxy
      }
    }
    return require(module)
  }

  require.fresh = require.cache.untilUpdate =
    module => watchfulRequire(module, true)

  Object.assign(watchfulRequire, require)

  return watchfulRequire
}
```
