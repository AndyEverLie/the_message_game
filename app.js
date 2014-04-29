var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , game = require('server/Game.js')

app.listen(8008);

function handler (req, res) {
  fs.readFile(__dirname + '/client/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', { content: 'welcome to the message game.' });

  socket.on('startGame', function (data) {
    console.log(data);
  });

  socket.on('getCards', function (data) {
    console.log(data);	// { player: 1, num: 2 }
    socket.emit('getCardsDone', { cards: [12,34] })
  });

  socket.on('playCard', function (data) {
    console.log(data);	// { player: 1, num: 2 }
    socket.emit('playCardDone', { cards: [12,34] })
  });
});