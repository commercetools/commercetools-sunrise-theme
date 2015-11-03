module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    // Configuration of 'grunt-contrib-clean' task, to remove all output folder
    clean: {
      build: ['output/', '**/*.json-resolved'],
      resolved : ['input/**/*.json-resolved'],
      dist: ['*.jar']
    },

    // Configuration of 'grunt-contrib-copy' task, to move files into the output folder
    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/css/*.css' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/js/*.js' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/img/**/*' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/fonts/**/*' },
          { expand: true, cwd: 'input/', dest: 'output/', src: '*.html' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/*.json' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/*.hbs' },
          { expand: true, cwd: 'locales/', dest: 'output/locales', src: '**/*.yaml' },
          { expand: true, cwd: 'input/templates/partials/', dest: 'output/templates/', src: '**/*.json' },
          { expand: true, cwd: 'input/templates/partials/', dest: 'output/templates/', src: '**/*.hbs' }
        ]
      },
      resolved: {
        files: { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/*.json-resolved' }
      }
    },

    // Configuration of 'grunt-contrib-coffee' task, to compile Coffeescript files into Javascript
    coffee: {
      dist: {
        options: {
          // fails when no coffee file found
          //join: true
        },
        files: {
          'output/assets/js/coffee.js': 'input/assets/js/*.coffee'
        }
      }
    },

    // Configuration of 'grunt-contrib-sass' task, to compile SASS files into CSS
    sass: {
      dist: {
        options: {
         style: 'compressed'
        },
        files: {
          'output/assets/css/main.min.css': 'input/assets/css/main.scss'
        }
      }
    },

    // Configuration of 'grunt-postcss' task, to optimize CSS files with vendor prefixes
    postcss: {
      options: {
        map: true,
        //diff: true,
        processors: require('autoprefixer-core')
      },
      dist: {
        src: 'output/assets/css/main.min.css'
      }
    },

    // Configuration of 'grunt-compile-handlebars' task, to compile Handlebars files and JSON into HTML
    'compile-handlebars': {
      dist: {
        files: [{
            expand: true,
            cwd: 'input/templates',
            src: '*.hbs',
            dest: 'output/',
            ext: '.html'
        }],
        templateData: '*.json-resolved', // compile-handlebars uses the template folder no matter what
        partials: 'input/templates/partials/**/*.hbs',
        helpers: 'input/templates/helpers/**/*.js'
      }
    },

    // Configuration of 'grunt-contrib-watch' task, to watch for changes in order to run the build task again
    watch: {
      scripts: {
        files: [
          'input/**/*',
          'locales/**/*',
          '!input/**/*.json-resolved'
        ],
        tasks: ['build']
      }
    },

    // Configuration of 'grunt-maven-tasks' task, to generate the webjar and then install locally or deploy to bintray
    maven: {
      options: {
        type: "jar",
        groupId: 'io.sphere',
        artifactId: "<%= pkg.name %>",
        version: "<%= pkg.version %>",
        destFolder: "/META-INF/resources/webjars",
        gitpush: true,
        mode: "patch"
      },
      install : {
        options : {
          goal: "install"
        },
        files: [
          { expand: true, cwd: 'output/assets/', src: "**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "templates/**/*", filter: "isFile" }
        ]
      },
      release : {
        options : {
          goal: "release",
          repositoryId: "commercetools-bintray",
          url: "https://api.bintray.com/maven/commercetools/maven/<%= pkg.name %>"
        },
        files: [
          { expand: true, cwd: 'output/assets/', src: "**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "templates/**/*", filter: "isFile" }
        ]
      }
    },

    // Configuration of the 'grunt-gh-pages', to deploy the output to the GitHub Pages
    'gh-pages': {
      options: {
        message: "Deploy to GitHub Pages",
        user: {
          name: 'automation-commercetools',
          email: 'automation@commercetools.de'
        },
        repo: 'https://' + process.env.GH_TOKEN + '@github.com/sphereio/sphere-sunrise-design.git',
        silent: true,
        base: 'output'
      },
      src: ['**/*']
    },

    // Configuration of the 'i18next' task, to support internationalization in Handlebars
    i18next: {
      options: {
        preload: ['de', 'en'],
        lng: 'en',
        fallbackLng: 'en'
      }
    },

    // Configuration of 'json-refs' task, to resolve JSON references
    'json-refs': {
      dist: {
        files: [{
          expand: true,
          cwd: 'input/templates',
          src: '*.json',
          dest: 'input/templates',
          ext: '.json-resolved'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-maven-tasks');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:dist', 'coffee', 'sass', 'postcss', 'pre-handlebars', 'handlebars', 'clean:resolved']);
  grunt.registerTask('release-patch', ['build', 'maven', 'clean:dist']);
  grunt.registerTask('release-minor', ['build', 'maven:release:minor', 'clean:dist']);
  grunt.registerTask('release-major', ['build', 'maven:release:major', 'clean:dist']);
  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

  grunt.registerTask('pre-handlebars', 'Tasks to be run before Handlebars', function() {
    grunt.task.run('json-refs');
    //grunt.task.run('copy:resolved');
    grunt.task.run('i18next');
  });

  grunt.registerTask('handlebars', 'Compiles Handlebars templates using JSON data', function() {
    grunt.task.requires('pre-handlebars');
    grunt.task.run('compile-handlebars');
  });

  grunt.registerTask('i18next', 'Internationalization init', function() {
    var done = this.async();
    var options = this.options({
      preload: ['en'],
      lng: 'en',
      fallbackLng: 'en',
      getAsync: false,
      debug: false,
      ns: {
        namespaces: ['translations'],
        defaultNs: 'translations'
      },
      resGetPath: 'locales/__lng__/__ns__.yaml'
    });
    Handlebars = require('handlebars');

    i18n = require('i18next');

    var yamlSync = require('i18next.yaml');
    i18n.backend(yamlSync);

    i18n.init(options, function (err, t) {
      done(true);
    });
  });

  grunt.registerMultiTask('json-refs', 'Resolves all JSON References and returns a fully resolved equivalent', function() {
    var done = this.async();
    // Default task configuration
    var options = this.options({
      partials: "input/templates/partials/"
    });
    // 'json-refs' configuration
    var jsonRefsOptions = {
      location: options.partials
    };

    var jsonRefs = require('json-refs');
    var path = require('path');

    var resolvedRefsPromises = this.files
    .filter(removeInvalidFiles)
    .filter(removeInexistentFiles)
    .map(function(file) {
      // Resolve JSON references
      var json = grunt.file.readJSON(file.src[0]);
      return jsonRefs.resolveRefs(json, jsonRefsOptions)
      .then(function(result) {
        return writeResolvedFile(file, result);
      });
    });
    
    Promise.all(resolvedRefsPromises)
    .then(function(result) {
      done(true);
    });
  });

  var removeInvalidFiles = function(file) {
    if (file.src.length != 1) {
      grunt.fail.warn("Only a single source file is currently supported.");
      return false;
    } else {
      return true;
    }
  };

  var removeInexistentFiles = function(file) {
    var filepath = file.src[0];
    if(!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

  var writeResolvedFile = function(file, result) {
    var written = false;
    parseMetadata(result.metadata);
    // Write the resolved JSON to a new file
    written = grunt.file.write(file.dest, stringifyJson(result.resolved, 2));
    if (written) {
      grunt.log.debug('File "' + file.dest + '" created');
    } else {
      grunt.log.error('File "' + file.dest + '" failed on creation');
    }
    return written;
  };

  var parseMetadata = function(json) {    
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        var value = json[key];
        if (json[key].hasOwnProperty("err")) {
          grunt.log.error(stringifyJson(value, 2));
        } else {
          grunt.verbose.writeln(stringifyJson(value, 0));
        }
      }
    }
  }

  var stringifyJson = function(json, space) {
    return JSON.stringify(json, null, space);
  }
};
