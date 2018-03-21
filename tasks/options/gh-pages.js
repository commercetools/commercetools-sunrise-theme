module.exports = {

  // 'grunt-gh-pages': deploys the output to the GitHub Pages

  options: {
    message: "Deploy to GitHub Pages",
    user: {
      name: "<%= pkg.config.github.username %>",
      email: "<%= pkg.config.github.email %>"
    },
    repo: 'https://<%= env.GH_TOKEN %>@github.com/<%= pkg.config.github.repoSlug %>.git',
    silent: false,
    base: 'output'
  },
  src: ['**/*']

}