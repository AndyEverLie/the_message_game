var fs = require('fs');

var files = fs.readdirSync('.')

console.log(files);

files.forEach(function(item){
	if(/\.html/.test(item)){
		var pattern = /http:\/\/www\.cncgcg\.com\/fs\/upload\/\d+\.png/gi;
		fs.readFile(item, function(err, data){
			// data = data.toString();
			var res = data.match(pattern);
			for (var i = 0; i < res.length; i++) {
				data.replace(res[i], res[i].substr(res[i].lastIndexOf('/')+1))
			};
			fs.writeFile(item, data);
		});
	}
})