module.exports = {

  // 'grunt-contrib-sass': compiles SASS files into CSS

  dist: {
    options: {
     style: 'compressed'
    },
    files: {
      'output/assets/css/main.min.css' : 'input/assets/css/main.scss'
    }
  }

}