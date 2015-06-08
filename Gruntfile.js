module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: ['output/'],

    copy: {
      dist: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/css/*.css' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/js/*.js' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/img/**/*' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/fonts/**/*' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/**/*' },
          { expand: true, cwd: 'input/', dest: 'output/', src: '*.html' }
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
        partials: 'input/templates/partials/**/*.hbs'
        //helpers: 'input/templates/helpers/**/*.js'
      }
    },

    watch: {
      scripts: {
        files: ['input/**/*'],
        tasks: ['build']
      },
    },

    maven: {
      options: {
        type: "jar",
        groupId: 'io.sphere',
        artifactId: "<%= pkg.name %>",
        version: "<%= pkg.version %>",
        destFolder: "/META-INF/resources/webjars"
      },
      deploy : {
        options : {
          goal: "deploy",
          repositoryId: "commercetools-bintray",
          url: "https://api.bintray.com/maven/commercetools/maven/<%= pkg.name %>"
        },
        files: [
          {
            expand: true,
            cwd: 'output/assets/',
            src: "**/*",
            filter: "isFile"
          },
          {
            expand: true,
            cwd: 'output/',
            src: "templates/**/*",
            filter: "isFile"
          }
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
        repo: 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF,
        silent: true
      },
      dist: {
        expand: true,
        cwd: 'output/',
        src: ["**/*"]
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
  grunt.loadNpmTasks('grunt-bintray-deploy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'coffee', 'sass', 'postcss', 'compile-handlebars']);
  grunt.registerTask('release', ['build', 'maven']);
  grunt.registerTask('publish', ['build', 'gh-pages']);

};