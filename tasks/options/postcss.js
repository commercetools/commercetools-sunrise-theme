module.exports = {

    // 'grunt-postcss': optimizes CSS files with vendor prefixes
    
    options: {
      processors: require('autoprefixer')
    },

    dist: {
      src: 'output/assets/css/main.min.css'
    }

}