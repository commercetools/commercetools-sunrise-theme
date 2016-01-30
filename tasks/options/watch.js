module.exports = {

  // 'grunt-contrib-watch': watches for changes in order to run the build tasks again

  images: {
    files: ['input/assets/img/**/*'],
    tasks: ['build-images']
  },
  assets: {
    files: ['input/assets/css/**/*', 'input/assets/js/**/*', 'input/assets/fonts/**/*'],
    tasks: ['build-assets']
  },
  templates: {
    files: ['input/templates/**/*', 'input/i18n/**/*'],
    tasks: ['build-templates']
  }

}