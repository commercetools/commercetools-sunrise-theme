module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      build: ['output/'],
      dist: ['*.jar']
    },

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
          { expand: true, cwd: 'input/templates/partials/', dest: 'output/templates/', src: '**/*.hbs' }
        ]
      }
    },

    coffee: {
      dist: {
        options: {
          //join: true
        },
        files: {
          'output/assets/js/coffee.js': 'input/assets/js/*.coffee'
        }
      }
    },

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

    'compile-handlebars': {
      dist: {
        files: [{
            expand: true,
            cwd: 'input/templates',
            src: '*.hbs',
            dest: 'output/',
            ext: '.html'
        }],
        templateData: '*.json', // compile-handlebars uses the template folder no matter what
        partials: 'input/templates/partials/**/*.hbs',
        helpers: 'input/templates/helpers/**/*.js'
      }
    },

    watch: {
      scripts: {
        files: [
          'input/**/*',
          'locales/**/*'
        ],
        tasks: ['build']
      }
    },

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

    i18next: {
      options: {
        preload: ['de', 'en'],
        lng: 'en',
        fallbackLng: 'en'
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
  grunt.registerTask('build', ['clean', 'copy', 'coffee', 'sass', 'postcss', 'i18next', 'handlebars']);
  grunt.registerTask('release-patch', ['build', 'maven', 'clean:dist']);
  grunt.registerTask('release-minor', ['build', 'maven:release:minor', 'clean:dist']);
  grunt.registerTask('release-major', ['build', 'maven:release:major', 'clean:dist']);
  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

  grunt.registerTask('handlebars', 'handlebars', function() {
    grunt.task.requires('i18next');
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
        namespaces: ['messages'],
        defaultNs: 'messages'
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
};
