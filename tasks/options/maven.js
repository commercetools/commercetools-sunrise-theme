module.exports = {

  // 'grunt-maven-tasks': generates the webjar and optionally places it somewhere

  options: {
    type: "jar",
    groupId: 'io.commercetools',
    artifactId: "<%= pkg.name %>",
    version: "<%= pkg.version %>",
    destFolder: "/META-INF/resources/webjars",
    gitpush: true,
    gitpushtag: true
  },

  webjars: {
    options: {
      goal: "package"
    },
    files: [
      {
        expand: true,
        cwd: 'output/assets/',
        src: "**/*",
        filter: "isFile"
      },
      {
        expand: true,
        cwd: 'output/',
        src: "templates/**/*",
        filter: "isFile"
      },
      {
        expand: true,
        cwd: 'output/',
        src: "i18n/**/*",
        filter: "isFile"
      }
    ],
  },

  install: {
    options: {
      goal: "install"
    },
    files: "<%= maven.webjars.files %>"
  },

  release: {
    options: {
      goal: "release",
      repositoryId: "commercetools-bintray",
      url: "https://api.bintray.com/maven/commercetools/maven/<%= pkg.name %>"
    },
    files: "<%= maven.webjars.files %>"
  }

}