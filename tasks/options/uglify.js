module.exports = {      

  // 'grunt-contrib-uglify': minifies JS files

  dist: {
    files: [
      { 'output/assets/js/main.min.js': 'output/assets/js/main.js' },
      { 'output/assets/js/jqzoom.min.js': 'output/assets/js/jqzoom.js' }
    ]
  }

}