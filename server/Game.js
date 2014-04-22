// Game.js

var card = require('./Card.js')
	, myUtils = require('./utils.js');

// 玩家
function Player(params){
	this._id = params.p_id;
	this._name = params.p_name;

	this._role = params.role;
	this._character = params.character;
	this._cards = [];

	this._isAlive = true;
}
Player.prototype.role = function(){
	return this._role;
}
Player.prototype.character = function(){
	return this._character;
}
Player.prototype.isAlive = function(){
	return this._isAlive;
}
Player.prototype.cards = function(param){	// getter and setter
	if(Array.isArray(param)) {
		this._cards = this._cards.concat(param);	// TODO validate param IS-A GameCard
	}
	return this._cards;
}

// 按玩家人数决定身份
var assignRole = function(num){
	var ret = [];
	switch(num){
		case 3:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 4:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 5:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 6:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 7:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 8:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		case 9:
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_RED'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_BLUE'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			ret.push(card.createRoleCard('ROLE_GREEN'));
			break;
		// default:
		// 	throw
	}
	return myUtils.shuffle(ret);
}

var GAME_STATUS = ['PENDING', 'PLAYING', 'FINISHED'];

function Game(){
	// 游戏牌
	this._gameCards = [];	// 可用的游戏牌
	this._usedCards = [];	// 打出的牌
	this._testCards = [];	// 试探牌堆
	
	// 玩家
	this._players = [];

	// 游戏状态
	this._status = 'PENDING';
}
// 初始化游戏牌
Game.prototype.initGameCards = function() {	// 81张游戏牌
	var cards = [];	// TODO 确定哪些游戏牌
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET',	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT',	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET',	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET',	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET',	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT',	'func':'GAME_CARD_FUNC_AOE'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_LOCK'}));
	return myUtils.shuffle(cards);
}

// 洗牌
Game.prototype.shuffeGameCards = function(){
	this._gameCards = this._gameCards.concat(myUtils.shuffle(this._usedCards));
	this._usedCards = [];
}

// 摸牌
Game.prototype.grapGameCard = function(num) {
	// 如果牌不够，则重新洗牌，不包括'测试牌'
	if(num > this._gameCards.length) {
		this.shuffeGameCards();
	}
	var ret = [];
	for (var i = 0; i < num; i++) {
		ret.push(this._gameCards.shift());
	}
	return ret;
}
Game.prototype.getPlayers = function(){
	return this._players;
}
Game.prototype.startGame = function(params) {
	if(params.playerNum < 3 || params.playerNum > 9) {
		throw 'out of player number limitation.';
	}
	this._playerNum = params.playerNum;

	this._status = 'PLAYING';

	this._gameCards = this.initGameCards();

	// 安排身份
	var roles = assignRole(params.playerNum);
	for (var i = 0; i < roles.length; i++) {
		var p = new Player({'p_id': i, 'p_name': 'x', 'role': roles[i]});
		p.cards(this.grapGameCard(2));
		this._players.push(p);
		p = null;
	}
}


var game = new Game();
game.startGame(5);
console.log(game.getPlayers()[0]);
// console.log(game.getPlayers()[0].cards());
// console.log(card.CARD_TYPES)









