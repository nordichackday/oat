module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'bookmarklet/dist/oat-loader.js': 'bookmarklet/index.js'
        }
      }
    }
  });

  grunt.registerTask('default', ['babel']);
};