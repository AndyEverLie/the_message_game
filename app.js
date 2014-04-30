var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , game = require('./server/Game.js');

var connections = {};
/**
 * Of current game instances.
 * for the reason that not a bit amount of players, we needn't 
 * optimise the data structure, such as using redis for cache.
 */
var games = {};

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
  // console.log(socket)
  socket.emit('welcome', { content: 'welcome to the message game.' });

  socket.on('disconnect', function(){
    socket['isDisconnected'] = true;
    console.log('### '+ socket.username + ' DISCONNECTED! ' + socket['isDisconnected']);
  });
  /**
   * 登陆
   */
  socket.on('set_username', function(data){
    // may cause an out-of-memory issue, since the users amount is not big, leave this to be fixed.
    if(connections[data.username] !== undefined && !connections[data.username]['isDisconnected']){
      socket.emit('username_already_exist', {status: 1, username: data.username});
      return;
    }

    // 掉线重连
    if(socket['isDisconnected']){
      // TODO some game recover stuffs
    }

    socket['isDisconnected'] = false;
    socket['username'] = data.username;
    connections[data.username] = socket;
    console.log('###### ' + connections[data.username]['id']);
  });

  socket.on('create_room', function(data){
    // data.roomname
    games[data.roomname] = new game.Game(data.roomname);
    console.log('####@@@@');
    console.log(games);
    socket.emit('create_room_done');
  });

  /**
   * 更新游戏列表
   */
  socket.on('get_game_list', function(data){
    console.log('get_game_list was emitted.');
    var ret = [];
    for(g in games){
      ret.push(g);
    }
    console.log('get_game_list ret = ' + ret);
    socket.emit('get_game_list_done', {items: ret});
  });
});


