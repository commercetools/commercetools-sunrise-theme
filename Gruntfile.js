module.exports = function(grunt) {
  grunt.initConfig({

    clean: ['output/'],

    copy: {
      main: {
        files: [
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/css/*.css' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/js/*.js' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'assets/img/**' },
          { expand: true, cwd: 'input/', dest: 'output/', src: 'templates/**' }
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-compile-handlebars');

  grunt.option('verbose', true);

  grunt.registerTask('default', ['clean', 'copy', 'coffee', 'sass', 'compile-handlebars']);

};