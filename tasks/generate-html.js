module.exports = function(grunt) {

  grunt.registerTask('generate-html', 'Generates HTML files from the Handlebars templates for every defined language', function() {
    grunt.config('languages').forEach(function(language) {
      grunt.task.run('generate-localized-html:' + language);
    })
  });

  grunt.registerTask('generate-localized-html', 'Generates HTML files from the Handlebars templates for the given language', function(language) {
      grunt.log.debug("Building site for language " + language);
      grunt.config.set("lng", language);
      grunt.task.run('i18n');
      grunt.task.run('compile-handlebars');
  });
  
};