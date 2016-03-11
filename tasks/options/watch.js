module.exports = {

  // 'grunt-contrib-watch': watches for changes in order to run the build tasks again

  images: {
    files: ['input/assets/img/**/*'],
    tasks: ['build:<%= lng %>:true']
  },
  assets: {
    files: ['input/assets/css/**/*', 'input/assets/js/**/*', 'input/assets/fonts/**/*'],
    tasks: ['build:<%= lng %>:true']
  },
  templates: {
    files: ['input/templates/**/*', 'input/i18n/**/*'],
    tasks: ['build:<%= lng %>:true']
  }

};
