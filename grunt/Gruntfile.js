'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    'compile-handlebars': {
      globbedTemplateAndOutput: {
        files: [{
            expand: true,
            src: 'templates/*.hbs',
            dest: 'html/',
            ext: '.html'
        }],
        templateData: 'data/*.json'//,
        //helpers: 'test/helpers/**/*.js',
        //partials: 'test/fixtures/deep/shared/**/*.handlebars'
      }
    }//,

    // Unit tests.
    //nodeunit: {
    //  tests: ['test/*_test.js']
    //}
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'compile-handlebars']);
};