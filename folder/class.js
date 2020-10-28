function Class(param) {
  this.param2 = param
  return 'boo'
}

Class.meth = num => num/3
Class.prop = 43

module.exports = Class
