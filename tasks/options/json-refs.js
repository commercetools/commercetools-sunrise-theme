module.exports = {

  // 'json-refs': resolves JSON references

  dist: {
    files: [{
      expand: true,
      cwd: 'input/templates',
      src: '*.json',
      dest: 'output/templates',
      ext: '.json'
    }]
  }

}