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
    },
    connect: {
      server: {
        options: {
          port: 9000,
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', ['babel', 'connect']);
};