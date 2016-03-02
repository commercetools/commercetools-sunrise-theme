module.exports = {

  // 'grunt-maven-tasks': generates the webjar and optionally places it somewhere

  options: {
    type: "jar",
    groupId: "<%= pkg.config.maven.groupId %>",
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
      repositoryId: "<%= pkg.config.maven.repositoryId %>",
      url: "<%= pkg.config.maven.url %>"
    },
    files: "<%= maven.webjars.files %>"
  }

}