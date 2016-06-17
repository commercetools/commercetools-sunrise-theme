module.exports = {

  // 'grunt-contrib-clean': remove files

  output: [
    'output/'
  ],

  images: [
    'output/assets/img/'
  ],

  assets: [
    'output/assets/css/',
    'output/assets/js/',
    'output/assets/fonts/'
  ],

  templates: [
    'output/templates/',
    'output/i18n/',
    'output/*.html',
    'output/*.json'
  ],

  dist: [
    '*.jar',
    'composer/'
  ]

}
