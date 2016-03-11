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
  function build (language) {
    grunt.config.set('lng', language);
    grunt.task.run('internal-build-images');
    grunt.task.run('internal-build-assets');
    grunt.task.run('internal-build-templates');
    grunt.task.run('generate-html:' + language);
    grunt.task.run('assetFingerprint');
    grunt.task.run('copy:site-assets');
  }

  grunt.registerTask('build', 'build the site versions', function(language, skip) {
    if (!skip) {
      grunt.task.run('clean');
    }
    
    if (language) {
      build(language);
    } else {
      grunt.config('languages').forEach(build);
    }
  });

  grunt.registerTask('dev', '', function(language) {
    language = language || 'en';
    grunt.config.set('lng', language);
    grunt.task.run('browserSync');
    grunt.task.run('watch');
  });

  grunt.registerTask('build-images', ['clean:images', 'internal-build-images', 'assetFingerprint:images']);
  grunt.registerTask('build-assets', ['clean:assets', 'internal-build-assets', 'assetFingerprint:assets']);
  grunt.registerTask('build-templates', ['clean:templates', 'internal-build-templates', 'assetFingerprint']);

  grunt.registerTask('release-composer', ['build', 'copy:composer']);

  grunt.registerTask('build-webjar', ['build', 'maven:webjars']);
  grunt.registerTask('install-webjar', ['build', 'maven:install', 'clean:dist']);
  grunt.registerTask('release-webjar', ['build', 'maven:release', 'clean:dist']);

  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

  grunt.registerTask('internal-build-images', ['copy:images', 'imagemin']);
  grunt.registerTask('internal-build-assets', ['copy:assets', 'sass', 'postcss', 'uglify']);
  grunt.registerTask('internal-build-templates', ['copy:templates', 'copy:others', 'json-refs']);

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
