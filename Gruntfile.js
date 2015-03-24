module.exports = function(grunt) {

	var src = 'scripts/seeka/'

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	,	concat: {
			'bin/seeka.js': [
				src + 'detectOverflow.js'
			,	src + 'detectTrailingScrollPadding.js'
			]
		}
	});

	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat']);

};