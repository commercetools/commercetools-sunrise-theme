module.exports = {

  // 'grunt-gh-pages': deploys the output to the GitHub Pages

  options: {
    message: "Deploy to GitHub Pages",
    user: {
      name: 'automation-commercetools',
      email: 'automation@commercetools.de'
    },
    repo: 'https://' + process.env.GH_TOKEN + '@github.com/sphereio/commercetools-sunrise-design.git',
    silent: true,
    base: 'output'
  },
  src: ['**/*']

}