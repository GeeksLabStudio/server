var fs      = require('fs');
var path    = require('path');


// Что б пропустить - юзать имя test.* модуля
var TEST_MODULES_REGEX = /test\.\w+/;


class ModuleController {
    constructor(options){
        this.options = options;
        this.actions = [];
    }


    scan(){
        return new Promise((resolve,reject) => {
            fs.readdir(__dirname, (err, modules) => {
                if (err){
                    return reject(err)
                }
                let apiModules = modules.filter(moduleName => {
                    var moduleStats = fs.statSync(path.join(__dirname, moduleName));

                    return moduleStats.isDirectory() && !TEST_MODULES_REGEX.test(moduleName)
                })

                this.actions = apiModules;

                resolve(apiModules);
            })
        })
    }

    init(){
        return this.scan()
            .then((apiModules) => {
                log.dev('Using API modules: %j', apiModules)

                return apiModules
            })
            .then(null,(err) => {
                log.error('There was an error, while loading API modules', err)

                return err
            })
    }

    load(apiModules){
        let route = this.options.router;

        this.actions.forEach(action => {
            route.use(`/${action}`, require(`./${action}`))
        })
    }
}

module.exports = ModuleController