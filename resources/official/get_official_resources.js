var fs = require('fs'),
	http = require('http')

var htmlPathPrefix = 'http://www.cncgcg.com/fs/card/',
	htmlPathSufix = '?page.pageNum=',
	pages = [8, 7, 1]

var processHtml = function(dest) {
console.log(dest);
	var pattern = /http:\/\/www\.cncgcg\.com\/fs\/upload\/\d+\.png/gi;
	fs.readFile(dest, function(err, data){
		data = data.toString('utf8');
		var res = data.match(pattern);
		for (var i = 0; i < res.length; i++) {
			// download(res[i], res[i].substr(res[i].lastIndexOf('/')+1), function(){
			// });
			data = data.replace(res[i], res[i].substr(res[i].lastIndexOf('/')+1));
		}
		fs.writeFile(dest, data, {'encoding':'utf8'});
	});

}

var downloadHtml = function(cardType, page) {
	var dest = 'cardType_' + cardType + '_' + page + '.html',
		path = htmlPathPrefix + cardType + htmlPathSufix + page;
	console.log('processing cardType_' + cardType + '_' + page)
// console.log(processHtml);
	download(path, dest, processHtml);
}

var download = function(path, dest, cb) {
	console.log('PATH: ' + path);
	console.log('DEST: ' + dest);
	var file = fs.createWriteStream(dest, {'encoding': 'utf8'});
	var request = http.get(path, function(resp){
		resp.pipe(file);
		file.on('finish', function(){
			console.log('DOWNLOADED ' + dest);
			// cb(dest);
			file.close(cb(dest));
		});
	})
}

for (var i = 1; i <= pages.length; i++) {
	for (var j = 1; j <= pages[i-1]; j++) {
		downloadHtml(i, j);
	}
};

// downloadHtml(3,1);