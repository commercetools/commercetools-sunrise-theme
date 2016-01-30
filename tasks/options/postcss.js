module.exports = {

    // 'grunt-postcss': optimizes CSS files with vendor prefixes
    
    options: {
      map: true,
      //diff: true,
      processors: require('autoprefixer')
    },

    dist: {
      src: 'output/assets/css/main.min.css'
    }

}