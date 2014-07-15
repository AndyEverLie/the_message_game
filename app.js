var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , game = require('./server/Game.js');

app.listen(8008);

// connections[data.username] = socket;
// connections[data.username]['id']
// connections[data.username]['isDisconnected']
var connections = {};

console.log('testing');

/**
 * Of current game instances.
 * for the reason that not a big amount of players, we needn't
 * optimise the data structure, such as using redis for cache.
 */
var games = {};

// init rooms
games['月圆之夜'] = new game.Game('月圆之夜');
games['紫禁之颠'] = new game.Game('紫禁之颠');
games['一剑西来'] = new game.Game('一剑西来');
games['天外飞仙'] = new game.Game('天外飞仙');

games['月圆之夜']['tmpPlayers'] = [];
games['紫禁之颠']['tmpPlayers'] = [];
games['一剑西来']['tmpPlayers'] = [];
games['天外飞仙']['tmpPlayers'] = [];

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
    update_game_list();
  });

  function update_game_list(){
    var ret = [];
    for(g in games){
      ret.push({name:g, count:games[g]['tmpPlayers'].length});
    }
    console.log('get_game_list ret = ' + ret);
    socket.emit('get_game_list_done', {items: ret});
  }

  /**
   * 玩家进入房间
   */
  socket.on('enter_room', function(data){
    var roomname = data.roomname,
        username = socket['username'];
    // console.log('roomname = ' + roomname);
    // console.log('username = ' + username);
    if(games[roomname]['tmpPlayers'].indexOf(username) == -1){
      games[roomname]['tmpPlayers'].push(username);
    }
    socket.join(roomname);  // join a room.
    socket['roomname'] = roomname;
    socket.emit('enter_room_done', {});

    socket.broadcast.to(roomname).emit('some_one_entered_room', {roomname: roomname});
  });

  /**
   * 房间里的玩家
   */
  socket.on('get_room_players', function(data){
    // console.log('### get_room_players was emitted. ###');
    // console.log(data);
    var tmpPlayers = games[data.roomname]['tmpPlayers'];
    // console.log(tmpPlayers);
    socket.emit('get_room_players_done', {players: tmpPlayers, username: socket['username']});
  });

  /**
   * 返回大厅
   */
  socket.on('back_to_hall', function(data){
    // console.log('########### WTF');
    // console.log(socket['roomname']);
    var roomname = socket['roomname'];
    var idx = games[roomname]['tmpPlayers'].indexOf(socket['username']);
    // console.log(games[roomname]['tmpPlayers']);
    games[roomname]['tmpPlayers'].splice(idx, 1);
    socket.leave(roomname); // leave the socket broadcast room.
    socket['roomname'] = undefined;

    socket.broadcast.to(roomname).emit('some_one_left_room', {roomname: roomname});
    socket.emit('back_to_hall_done');
  })
});


