module.exports = {
  dev: {
    bsFiles: {
      src : [
        'output/site/<%= lng %>/assets/css/**/*.css',
        'output/site/<%= lng %>/assets/js/**/*.js',
        'output/site/<%= lng %>/*.html'
      ]
    },
    options: {
      watchTask: true,
      server: './output/site/<%= lng %>'
    }
  }

};
