module.exports = {

  options: {
    manifestPath: "output/assets.json",
    findAndReplaceFiles: [
      "output/assets/css/**/*.{css,map}",
      "output/assets/js/**/*.js",
      "output/templates/**/*.{hbs,json}",
      "output/i18n/**/*.yaml",
      "output/site/**/*.html"
    ],
    keepOriginalFiles: false
  },

  dist: {
    files: [
      {
        expand: true,
        cwd: "output/assets",
        src: [
          "img/**/*",
          "!img/cms/**/*",
          "!img/favicon.ico",
          "fonts/**/*",
          "js/**/*.js"
        ],
        dest: "output/assets"
      },
      {
        expand: true,
        cwd: "output/assets/css",
        src: [
          "**/*.css"
        ],
        dest: "output/assets/css"
      }
    ]
  }

}