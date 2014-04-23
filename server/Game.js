// Game.js

var card = require('./Card.js')
	, myUtils = require('./utils.js');

// 玩家
function Player(params){
	this._number = params.p_number;		// 玩家序号
	this._name = params.p_name;			// 玩家名称

	this._role = params.role;			// 玩家身份
	this._character = null;				// 玩家角色
	this._cards = [];					// 玩家手牌

	this._isAlive = true;				// 玩家活着?
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

/**
 * 按玩家人数决定身份
 */
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
	this._usedCards = [];	// 打出的牌堆
	this._testCards = [];	// 试探牌堆堆
	
	// 玩家
	this._players = [];
	this._characterCards = [];	// 角色牌堆

	// 游戏状态
	this._status = 'PENDING';
}

/**
 * 初始化游戏牌
 */
Game.prototype.initGameCards = function() {	// 81张游戏牌
	var cards = [];
	// 真假莫辨	从自己开始逆时针每位玩家抽取一张牌作为情报	文本	1+1+1=3
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_AOE'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_AOE'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_AOE'}));

	// 调虎离山	指定一位玩家不参与此次情报传递	文本	2+2+2=6
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));

	// 截获	获得一张传递中的情报	密电	1+1+6=8
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));

	// 退回	当情报到达玩家面前时使用，改变情报的传递方向	文本	3+3+2=8
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));

	// 破译	检视传递到玩家面前的情报	破译	2+2+2=6
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));

	// 烧毁	烧毁一份假情报	直达	2+2+2=6
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));

	// 识破	使一张卡牌无效	直达	5+5+4=14
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));

	// 试探	试探一位玩家是否为某一身份，成功则可令对方弃一张手牌或摸两张牌，根据牌面文字而定	密电	6+6+6=18
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));

	// 锁定	指定一位玩家必须接受此回合传递的情报	直达	3+3+6=12
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(card.createGameCard({'type':'MSG_GRAY',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));

	return myUtils.shuffle(cards);
}

/**
 * 洗牌
 */
Game.prototype.shuffeGameCards = function(){
	this._gameCards = this._gameCards.concat(myUtils.shuffle(this._usedCards));
	this._usedCards = [];
}

/**
 * 摸牌
 */
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

/**
 * 按照玩家顺序player._number返回玩家.
 * 玩家顺序为game._players的idx+1
 */
Game.prototype.getPlayer = function(num){
	return (num > 0 && num < this._playerNum) ? this._players[num-1] : null
}

/**
 * 开始游戏
 * params = {
 * 	'players' : [
 * 		{'number': 1, 'name': 'Aegis'},
 * 		{'number': 2, 'name': 'Andy'},
 * 		{'number': 3, 'name': 'Bryan'},
 * 		{'number': 4, 'name': 'Gary'},
 * 		{'number': 5, 'name': 'Ryan'},
 * 		{'number': 6, 'name': 'Sidney'},
 * 		{'number': 7, 'name': 'SY'}
 * 	]
 * }
 */
Game.prototype.startGame = function(params) {
	if(params.players.length < 3 || params.players.length > 9) {
		throw 'out of player number limitation.';
	}
	this._playerNum = params.players.length;

	this._status = 'PLAYING';

	this._gameCards = this.initGameCards();

	// 安排身份
	var roles = assignRole(this._playerNum);
	for (var i = 0; i < this._playerNum; i++) {
		var p = new Player({
			'p_number': params.players[i]['number'],
			'p_name': params.players[i]['name'],
			'role': roles[i]});

		// p.cards(this.grapGameCard(2));
		this._players.push(p);
		p = null;
	}

	this._characterCards = this.initCharacterCards();
}

/**
 * 分发3张游戏牌
 *
 * 返回 {'palyer._number': [GameCard1, GameCard2, GameCard3]}
 * e.g. {'1':[锁定#红色情报#直达, 锁定#屎#直达, 试探#红色情报#密电], '2': [...]}
 */
Game.prototype.startGameCards = function(){
	var ret = {};
	for (var i = 0; i < this._playerNum; i++) {
		this._players[i]['_cards'] = this.grapGameCard(3);
		ret[i+1] = this._players[i]['_cards'];
	}

	// console.log(ret);
	return ret;
}

/**
 * 初始化角色牌
 */
Game.prototype.initCharacterCards = function(){
	var ret = [];
	for(character in card.CHARACTERS) {
		ret.push(card.createCharacterCard(character));
	}
	return myUtils.shuffle(ret);
}

/**
 * 安排角色
 *
 * 返回 [{'number': 1, 'characters': [{characterCard},{characterCard}}]}, {}, ...]
 */
Game.prototype.getCharacters = function(){
	if(this._status != 'PLAYING'){
		return null;
	}

	var ret = [];
	for(var i=0; i<this._playerNum; i++){
		var tmpTwoChar = [];
		tmpTwoChar.push(this._characterCards.shift());
		tmpTwoChar.push(this._characterCards.shift());
		this._players[i]['_character'] = tmpTwoChar;

		// return to players for choose.
		ret.push({'number': this._players[i]['_number'], 'characters': tmpTwoChar})
	}

	return ret;
}

/**
 * 选定角色
 * 从player._character里挑一个，设置回去player._character里。
 *
 * params: {'player number 1': '0 or 1', 'player number 2': '0 or 1', ....}
 * for example {1:0, 2:1, 3:1, 4:0, 5:0, 6:1, 7:0}
 */
Game.prototype.setCharacters = function(params){
	// TODO validate params

	for(var i=0; i<this._playerNum; i++) {
		if(this._players[i]['_number'] != i+1) {
			throw 'game error!';
		}

		this._players[i]['_character'] = this._players[i]['_character'][params[i+1]];
	}

	delete game._characterCards;	// free memory
}


// ==========
// test data
// ==========
var gameParam = {
	'players' : [
		{'number': 1, 'name': 'Aegis'},
		{'number': 2, 'name': 'Andy'},
		{'number': 3, 'name': 'Bryan'},
		{'number': 4, 'name': 'Gary'}
	]
}
var game = new Game();
game.startGame(gameParam);
game.getCharacters();
// console.log('###$$ ' + game._gameCards.length);

game.startGameCards();

console.log(game.getPlayer(2));
game.setCharacters({1:0, 2:1, 3:1, 4:0, 5:0, 6:1, 7:0});
console.log(game.getPlayer(2));
// console.log(game._characterCards.length);


// console.log(card.CARD_TYPES)









