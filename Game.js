// Game.js

var card 	= require('./Card.js');
var utils 	= require('./utils.js');

// 玩家
function Player(params){
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
Player.prototype.cards = function(param){
	if(Array.isArray(param)) {
		this._cards = param;
	}
	this._cards = this._cards.concat(param);	// TODO validate param IS-A GameCard
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
	return utils.shuffle(ret);
}

function Game(playerNum){
	if(playerNum < 3 || playerNum > 9) {
		throw 'out of player number limitation.';
	}

	// 游戏牌
	this._gameCards = this.initGameCards();	// 可用的游戏牌
	this._usedCards = [];	// 打出的牌
	this._testCards = [];	// 试探牌堆
	
	// 玩家
	this._players = [];
	this._playerNum = playerNum;

	var roles = assignRole(playerNum);
	for (var i = 0; i < roles.length; i++) {
		var p = new Player({'role': roles[i], 'character': null});	// 角色牌未定所以是null
		p.cards(this.grapGameCard(2));
		this._players.push(p);
		p = null;
	}
}
// 洗牌
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
	return utils.shuffle(cards);
}
Game.prototype.shuffeGameCards = function(){
	this._gameCards = this._gameCards.concat(utils.shuffle(this._usedCards));
	this._usedCards = [];
}
Game.prototype.grapGameCard = function(num) {
	// 如果牌不够，则重新洗牌，不包括'测试牌'
	if(num > this._gameCards.length) {
		this.shuffeGameCards();
	}
	var ret = [];
	for (var i = 0; i < num; i++) {
		var c = this._gameCards.shift();
		console.log(c);
		ret.push(c);
	}
	console.log(this._gameCards.length + ' ##' + ret);
	return ret;
}
Game.prototype.getPlayers = function(){
	return this._players;
}

var game = new Game(5);
console.log(game.getPlayers()[0]);
// console.log(card.CARD_TYPES)









