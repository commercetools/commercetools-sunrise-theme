module.exports = {

  // 'grunt-contrib-imagemin': compresses images

  dist: {
    files: [{
      expand: true,
      cwd: 'output/assets/img/',
      src: ['**/*.{png,jpg,gif,svg}'],
      dest: 'output/assets/img/'
    }]
  }

}