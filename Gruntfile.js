module.exports = function(grunt) {

  grunt.initConfig({
    'compile-handlebars': {
      globbedTemplateAndOutput: {
        files: [{
            expand: true,
            cwd: 'templates',
            src: '**/*.hbs',
            dest: 'html/',
            ext: '.html'
        }],
        templateData: 'templates/data/**/*.json'
        //helpers: 'test/helpers/**/*.js',
        //partials: 'test/fixtures/deep/shared/**/*.handlebars'
      }
    }
  });

  grunt.loadNpmTasks('grunt-compile-handlebars');

  grunt.registerTask('default', ['compile-handlebars']);
};