module.exports = function(grunt) {
  grunt.initConfig({

    languages: ["en", "de"],

    pkg: grunt.file.readJSON("package.json"),

    // Configuration of 'grunt-contrib-clean' task, to remove all output folder
    clean: {
      output: ['output/'],
      images: ['output/assets/img/'],
      assets: ['output/assets/css/', 'output/assets/js/', 'output/assets/fonts/'],
      templates: ['output/templates/', 'output/locales', 'output/*.html'],
      dist: ['*.jar']
    },

    // Configuration of 'grunt-contrib-copy' task, to move files into the output folder
    copy: {
      images: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/img/**/*' }
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/css/*.css' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/js/*.js' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/fonts/**/*' }
        ]
      },
      templates: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/*.hbs' },
          { expand: true, cwd: 'locales/', dest: 'output/locales', src: '**/*.yaml' },
          { expand: true, cwd: 'input/templates/partials/', dest: 'output/templates/', src: '**/*.{hbs,json}' }
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'output/assets/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'output/assets/img/'
        }]
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
            cwd: 'output/templates',
            src: '*.hbs',
            dest: "output/<%= lng %>/",
            ext: '.html'
        }],
        templateData: '*.json', // compile-handlebars uses the template folder no matter what
        partials: 'input/templates/partials/**/*.hbs',
        helpers: 'input/templates/helpers/**/*.js'
      }
    },

    // Configuration of the 'i18next' task, to support internationalization in Handlebars
    i18next: {
      options: {
        preload: ['de', 'en'],
        lng: "<%= lng %>",
        fallbackLng: 'en',
        ns: {
          namespaces: ['translations', 'home', 'catalog', 'checkout', 'my-account-login', 'no-search-result', 'mix-match', 'my-account'],
          defaultNs: 'translations'
        }
      }
    },

    // Configuration of 'json-refs' task, to resolve JSON references
    'json-refs': {
      dist: {
        files: [{
          expand: true,
          cwd: 'input/templates',
          src: '*.json',
          dest: 'output/templates',
          ext: '.json'
        }]
      }
    },

    // Configuration of 'grunt-contrib-watch' task, to watch for changes in order to run the build tasks again
    watch: {
      images: {
        files: ['input/assets/img/**/*'],
        tasks: ['build-images']
      },
      assets: {
        files: ['input/assets/css/**/*', 'input/assets/js/**/*', 'input/assets/fonts/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: ['input/templates/**/*', 'locales/**/*'],
        tasks: ['build-templates']
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
        gitpushtag: true
      },
      install: {
        options: {
          goal: "install"
        },
        files: [
          { expand: true, cwd: 'output/assets/', src: "**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "templates/**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "locales/**/*", filter: "isFile" }
        ]
      },
      release: {
        options: {
          goal: "release",
          repositoryId: "commercetools-bintray",
          url: "https://api.bintray.com/maven/commercetools/maven/<%= pkg.name %>"
        },
        files: [
          { expand: true, cwd: 'output/assets/', src: "**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "templates/**/*", filter: "isFile" },
          { expand: true, cwd: 'output/', src: "locales/**/*", filter: "isFile" }
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
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-maven-tasks');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean', 'build-images', 'build-assets', 'build-templates']);
  grunt.registerTask('build-images', ['clean:images', 'copy:images', 'imagemin']);
  grunt.registerTask('build-assets', ['clean:assets', 'copy:assets', 'sass', 'postcss']);
  grunt.registerTask('build-templates', ['clean:templates', 'copy:templates', 'json-refs', 'generate-html']);
  grunt.registerTask('release', ['build', 'maven:release', 'clean:dist']);
  grunt.registerTask('install', ['build', 'maven:install', 'clean:dist']);
  grunt.registerTask('publish', ['gh-pages-clean', 'build', 'gh-pages']);

  grunt.registerTask('generate-html', 'Generates HTML files from the Handlebars templates for every defined language', function() {
    grunt.config('languages').forEach(function(language) {
      grunt.task.run('generate-localized-html:' + language);
    })
  });

  grunt.registerTask('generate-localized-html', 'Generates HTML files from the Handlebars templates for the given language', function(language) {
      grunt.log.debug("Building site for language " + language);
      grunt.config.set("lng", language);
      grunt.task.run('i18next');
      grunt.task.run('compile-handlebars');
  });
};
