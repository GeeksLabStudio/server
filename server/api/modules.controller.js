// module dependencies
const fs      = require('fs');
const path    = require('path');

// To skip use name test.* of a module
const TEST_MODULES_REGEX = /test\.\w+/;

/**
 * Module controller
 */
class ModuleController {
  constructor(){
    let modules = fs.readdirSync(__dirname)

    this.actions = modules.filter(moduleName => {
      let moduleStats = fs.statSync(path.join(__dirname, moduleName));

      return moduleStats.isDirectory() && !TEST_MODULES_REGEX.test(moduleName)
    })
  }
}

module.exports = ModuleController