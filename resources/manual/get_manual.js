// get_manual.js

var fs = require('fs'),
	http = require('http'),
	async = require('async')

var imgPathPrefix = 'http://www.cncgcg.com/fs/rules/images/',
	imgPathSufis = '_large.jpg'

var download = function(i) {
	var file = fs.createWriteStream(i + '.jpg'),
		path = imgPathPrefix + i + imgPathSufis
	console.log('processing ' + imgPathPrefix + i + imgPathSufis)

	var request = http.get(path, function(resp){
		resp.pipe(file)
		file.on('finish', function(){
			file.close(function(){console.log('DONE.')});
		})
	})
}

for (var i = 1; i <= 36; i++) {
	download(i)
};