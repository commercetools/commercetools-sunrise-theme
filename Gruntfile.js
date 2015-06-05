module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: ['output/'],

    copy: {
      main: {
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
      main: {
        options: {
          //join: true
        },
        files: {
          'output/assets/js/coffee.js': ['input/assets/js/*.coffee']
        }
      }
    },

    sass: {
      main: {
        options: {
         style: 'compressed'
        },
        files: {
          'output/assets/css/main.min.css': 'input/assets/css/main.scss'
        }
      }
    },

    'compile-handlebars': {
      main: {
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

    bintrayDeploy: {
      bintray: {
        options: {
          user: process.env.BINTRAY_USER,
          apikey: process.env.BINTRAY_API_KEY,
          pkg: {
            repo: "maven"
          }
        },
        files: [{
            expand: true,
            cwd: 'output/',
            src: ["assets/**/*", "templates/**/*"],
            dest: "<%= pkg.version %>",
            filter: "isFile"
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bintray-deploy');

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'coffee', 'sass', 'compile-handlebars']);
  grunt.registerTask('release', ['build', 'bintrayDeploy']);

};