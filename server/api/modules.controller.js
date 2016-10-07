var fs      = require('fs');
var path    = require('path');

// To skip use name test.* of a module
var TEST_MODULES_REGEX = /test\.\w+/;

class ModuleController {
  constructor(){
    let modules = fs.readdirSync(__dirname)

    this.actions = modules.filter(moduleName => {
      var moduleStats = fs.statSync(path.join(__dirname, moduleName));

      return moduleStats.isDirectory() && !TEST_MODULES_REGEX.test(moduleName)
    })
  }
}

module.exports = ModuleController