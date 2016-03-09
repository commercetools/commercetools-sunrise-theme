module.exports = {
  dev: {
    bsFiles: {
      src : [
        'output/site/<%= lng %>/**/*.css',
        'output/site/<%= lng %>/**/*.js',
        'output/site/<%= lng %>/*.html'
      ]
    },
    options: {
      watchTask: true,
      server: './output/site/<%= lng %>'
    }
  }

};
