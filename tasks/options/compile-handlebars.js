module.exports = {

  // 'grunt-compile-handlebars': converts Handlebars files and JSON into HTML

  dist: {
    files: [
      {
        expand: true,
        cwd: 'output/templates',
        src: '*.hbs',
        dest: "output/site/<%= lng %>/",
        ext: '.html'
      }
    ],
    templateData: '*.json', // compile-handlebars uses the template folder no matter what
    partials: 'input/templates/partials/**/*.hbs',
    helpers: 'input/templates/helpers/**/*.js'
  }

}