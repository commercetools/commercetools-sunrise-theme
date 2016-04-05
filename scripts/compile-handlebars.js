module.exports = function(options, outputDir) {

    var fs = require('fs');
    var path = require('path');
    var glob = require('glob');

    var handlebars = require('handlebars');

    var helpers = glob.sync('input/templates/helpers/*.js');
    helpers.forEach(function(helperFile) {
        var file = path.parse(helperFile);
        var helper = require(fs.realpathSync(helperFile));

        if (helper.init) {
            handlebars.registerHelper(file.name, helper.init(options));
        } else {
            handlebars.registerHelper(file.name, helper);
        }
    });

    var partials = glob.sync('input/templates/partials/**/*.hbs');

    partials.forEach(function(partial) {
        var file = path.parse(partial.replace('input/templates/partials/', ''));
        handlebars.registerPartial(file.dir + '/' + file.name, fs.readFileSync(fs.realpathSync(partial), 'utf8'));
    });

    var files = glob.sync('input/templates/*.hbs');
    var resolvedPromises = files
        .map(function(fileName) {
            var file = path.parse(fileName);
            var source = fs.readFileSync(fileName, 'utf-8');
            var template = handlebars.compile(source);
            var context = {};
            var contextName = 'output/templates/' + file.name + '.json';
            try {
                fs.lstatSync(contextName);
                context = require(path.resolve(contextName));
            } catch(err) {
            }
            var html = template(context);
            //exec('cp -p ' + file.src + ' ' + file.dest);
            try {
                fs.lstatSync(outputDir);
            } catch(err) {
                fs.mkdirSync(outputDir);
            }
            fs.writeFile(outputDir + file.name + '.html', html);
        });
};


