module.exports = function(grunt) {
  
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    languages: ["en", "de"]
  };
   
  grunt.util._.extend(config, loadConfig('./tasks/options/')); 
  grunt.initConfig(config);

  grunt.loadTasks('tasks');
  require('load-grunt-tasks')(grunt);

  /* TASKS */

  grunt.registerTask('default', ['build', 'watch']);

  grunt.registerTask('build', ['clean', 'build-images', 'build-assets', 'build-templates']);
  grunt.registerTask('build-images', ['clean:images', 'copy:images', 'imagemin']);
  grunt.registerTask('build-assets', ['clean:assets', 'copy:assets', 'sass', 'postcss', 'uglify']);
  grunt.registerTask('build-templates', ['clean:templates', 'copy:templates', 'copy:others', 'json-refs', 'generate-html']);

  grunt.registerTask('webjars', ['build', 'maven:webjars']);
  grunt.registerTask('install', ['build', 'maven:install', 'clean:dist']);
  grunt.registerTask('release', ['build', 'maven:release', 'clean:dist']);

  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

};

function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;
 
  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });
 
  return object;
}