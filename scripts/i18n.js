module.exports = function(lng, callback) {
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var languages = fs.readdirSync('input/i18n');
  var namespaces = glob.sync('input/i18n/en/*.yaml');

  namespaces = namespaces.map(function (file) {
    file = path.parse(file);
    return file.name;
  });
  var options = {
    preload: languages,
    lng: 'en',
    fallbackLng: 'en',
    getAsync: false,
    debug: false,
    ns: {
      namespaces: namespaces,
      defaultNs: 'main'
    },
    resGetPath: 'input/i18n/__lng__/__ns__.yaml'
  };
  var i18n = require('i18next');

  var yamlSync = require('i18next.yaml');

  i18n.backend(yamlSync);
  i18n.init(options, function () {
    i18n.setLng(lng);
    callback({i18n: i18n}, 'output/site/' + lng + '/')
  });
};
