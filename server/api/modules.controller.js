var fs      = require('fs');
var path    = require('path');


// Что б пропустить - юзать имя test.* модуля
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