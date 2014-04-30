// Game.js

var card = require('./Card.js')
	, myUtils = require('./utils.js')
	, tables = require('./EligibleTable.js');

// 玩家
function Player(params){
	this._number = params.p_number;		// 玩家序号
	this._name = params.p_name;			// 玩家名称

	this._role = params.role;			// 玩家身份
	this._character = null;				// 玩家角色
	this._cards = [];					// 玩家手牌
	this._msgs = {						// 收集的情报
		'RED'	: [],
		'BLUE'	: [],
		'GRAY'	: []
	};

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

var GAME_STATUS = ['PENDING', 'PLAYING', 'FINISHED'],
	GAME_PHASES = {
		'PHASE_PICK_ROLE': 			1,	// 决定身份
		'PHASE_PICK_CHARACTER': 	2,	// 挑选角色
		'PHASE_SEND_GAME_CARD': 	3,	// 分发游戏牌
		'PHASE_ROUND_BEGIN': 		4,	// 回合开始阶段
		'PHASE_ROUND_GRAB_CARDS': 	5,	// 抽牌阶段
		'PHASE_ROUND_PLAY_CARD_1': 	6,	// 出牌阶段1
		'PHASE_ROUND_PASS_MSG_1': 	7,	// 传递情报阶段步骤1 - 情报传递
		'PHASE_ROUND_PASS_MSG_2': 	8,	// 传递情报阶段步骤2 - 情报到达
		'PHASE_ROUND_PASS_MSG_3': 	9,	// 传递情报阶段步骤3 - 情报接收
		'PHASE_ROUND_PLAY_CARD_2': 	10,	// 出牌阶段2, 跟出牌阶段1一样
		'PHASE_ROUND_END': 			11	// 回合结束阶段

	}

function Game(name){
	this._name = name;
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

Game.prototype.getPlayersCount = function(){
	return this._players.length;
}

/**
 * 初始化游戏牌
 */
Game.prototype.initGameCards = function() {
	return myUtils.shuffle(card.createGameCards());
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

// ======================

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
Game.prototype.phaseGameSetting = function(params) {
	if(params.players.length < 3 || params.players.length > 9) {
		throw 'out of player number limitation.';
	}
	this._params = params;

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
	// console.log('## ' + this._characterCards.length);
}


/**
 * 安排角色
 *
 * 返回 [{'number': 1, 'characters': [{characterCard},{characterCard}}]}, {}, ...]
 */
Game.prototype.phasePickCharacters = function(){
	if(this._status != 'PLAYING'){
		return null;
	}

	if(isNaN(this._params['numOfCharacters'])){
			this._params['numOfCharacters'] = 2;	// 默认发两张角色牌作选择
	}

	if((this._playerNum * this._params['numOfCharacters']) > this._characterCards.length) {
		throw 'error of characters per guy for choose';
	}

	var ret = [];
	for(var i=0; i<this._playerNum; i++){
		

		var tmpChars = [];
		for(var j = 0; j<this._params['numOfCharacters']; j++){
			tmpChars.push(this._characterCards.shift());
		}
		
		this._players[i]['_character'] = tmpChars;

		// return to players for choose.
		ret.push({'number': this._players[i]['_number'], 'characters': tmpChars})
		// ret.push({this._players[i]['_number']: tmpChars})
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
Game.prototype.phasePickCharacterDone = function(params){
	// TODO validate params

	for(var i=0; i<this._playerNum; i++) {
		if(this._players[i]['_number'] != i+1) {
			throw 'game error!';
		}

		this._players[i]['_character'] = this._players[i]['_character'][params[i+1]];
	}

	delete game._characterCards;	// free memory
}


/**
 * 分发3张游戏牌
 *
 * 返回 {'palyer._number': [GameCard1, GameCard2, GameCard3]}
 * e.g. {'1':[锁定#红色情报#直达, 锁定#屎#直达, 试探#红色情报#密电], '2': [...]}
 */
Game.prototype.phaseStartGameCards = function(){
	var ret = {};
	for (var i = 0; i < this._playerNum; i++) {
		this._players[i]['_cards'] = this.grapGameCard(3);
		ret[i+1] = this._players[i]['_cards'];
	}

	// console.log(ret);
	return ret;
}

// ======================

/**
 * 回合开始阶段
 */
Game.prototype.actionStartRound = function(){}

/**
 * 摸牌阶段
 */
Game.prototype.actionGrapGameCard = function(){}

/**
 * 出牌阶段。
 * 注意此阶段分为1和2，功能一样。
 */
Game.prototype.actionPlayCard = function(params){
	// where to decide if this action eligible?
	// action from .. to
	// add to action stack
}

/**
 * 出牌阶段结算
 */
Game.prototype.actionCalc = function(){}

/**
 * 传递情报阶段
 * 步骤1 - 情报传递
 */
Game.prototype.actionMsg1 = function(){}

/**
 * 传递情报阶段
 * 步骤2 - 情报到达
 */
Game.prototype.actionMsg2 = function(){}

/**
 * 传递情报阶段
 * 步骤3 - 情报接收
 */
Game.prototype.actionMsg3 = function(){}

/**
 * 回合结束阶段
 */
Game.prototype.actionEndRound = function(){}

/**
 * 判断游戏是否结束
 */
Game.prototype.isEndGame = function(){}


exports.Game = Game;

// ==========
// test data
// ==========
var gameParam = {
	'players' : [
		{'number': 1, 'name': 'Aegis'},
		{'number': 2, 'name': 'Andy'},
		{'number': 3, 'name': 'Bryan'},
		{'number': 4, 'name': 'Gary'},
		{'number': 5, 'name': 'Ryan'},
		{'number': 6, 'name': 'Sidney'},
		{'number': 7, 'name': 'SY'}
	],
	'numOfCharacters' : 2
}
// var game = new Game();
// game.phaseGameSetting(gameParam);
// game.phasePickCharacters();
// // console.log('###$$ ' + game._gameCards.length);

// console.log(game.phaseStartGameCards());

// console.log(game.getPlayer(2));
// game.phasePickCharacterDone({1:0, 2:1, 3:1, 4:0, 5:0, 6:1, 7:0});
// console.log(game.getPlayer(2));


// console.log(game._characterCards.length);
// console.log(card.CARD_TYPES)










