module.exports = function(grunt) {

  grunt.registerTask('i18n', 'Internationalization init', function() {
    var done = this.async();
    var options = this.options({
      preload: ['en'],
      lng: 'en',
      fallbackLng: 'en',
      getAsync: false,
      debug: false,
      ns: {
        namespaces: ['main'],
        defaultNs: 'main'
      },
      resGetPath: 'input/i18n/__lng__/__ns__.yaml'
    });
    Handlebars = require('handlebars');

    i18n = require('i18next');

    var yamlSync = require('i18next.yaml');
    i18n.backend(yamlSync);

    i18n.init(options, function (err, t) {
      done(true);
    });
  });
  
};