var CARD_TYPES = {'CARD_TYPE_ROLE' : '身份牌', 'CARD_TYPE_GAME' : '游戏牌', 'CARD_TYPE_CHARACTER' : '角色牌'}
	, ROLES = {'ROLE_RED':'潜伏战线', 'ROLE_BLUE':'军情处', 'ROLE_GREEN':'打酱油的'}
	, MSG_TYPES = {'MSG_RED':'红色情报', 'MSG_BLUE':'蓝色情报', 'MSG_GRAY':'屎'}
	, MSG_PASS = {'MSG_PASS_SECRET':'密电', 'MSG_PASS_DIRECT':'直达', 'MSG_PASS_TEXT':'文本'}
	, GAME_CARD_FUNC = {
		'GAME_CARD_FUNC_LOCK': 		'锁定',
		'GAME_CARD_FUNC_PASS': 		'调虎离山',
		'GAME_CARD_FUNC_BACK': 		'退回',
		'GAME_CARD_FUNC_INTERCEPT': '截获',
		'GAME_CARD_FUNC_DECODE':	'破译',
		'GAME_CARD_FUNC_BURN':		'烧毁',
		'GAME_CARD_FUNC_BREAK':		'识破',
		'GAME_CARD_FUNC_TEST': 		'试探',
		'GAME_CARD_FUNC_AOE': 		'真伪莫辨'
	};
var CHARACTERS = {	// 25个角色
		'CHARACTER_GHOST': 			{'name':'老鬼', 		'gender':'F', 'isHide':true},
		'CHARACTER_FLOAT': 			{'name':'浮萍', 		'gender':'F', 'isHide':true},
		'CHARACTER_GUN': 			{'name':'老枪', 		'gender':'M', 'isHide':true},
		'CHARACTER_SHINING': 		{'name':'闪灵', 		'gender':'F', 'isHide':true},
		'CHARACTER_BLACKROSE': 		{'name':'黑玫瑰', 	'gender':'F', 'isHide':true},
		'CHARACTER_WIND': 			{'name':'峨眉风', 	'gender':'M', 'isHide':true},
		'CHARACTER_GOLD': 			{'name':'老金', 		'gender':'M', 'isHide':true},
		'CHARACTER_INTERPRETOR':	{'name':'译电员', 	'gender':'F', 'isHide':true},
		'CHARACTER_BIRD': 			{'name':'黄雀', 		'gender':'F', 'isHide':true},
		'CHARACTER_IRONAGENT':		{'name':'钢铁特工', 	'gender':'M', 'isHide':true},
		'CHARACTER_DAILY': 			{'name':'戴笠', 		'gender':'M', 'isHide':false},
		'CHARACTER_KILLER': 		{'name':'职业杀手', 	'gender':'M', 'isHide':false},
		'CHARACTER_MASKMAN': 		{'name':'礼服蒙面人', 'gender':'M', 'isHide':false},
		'CHARACTER_KNIFE': 			{'name':'刀锋', 		'gender':'M', 'isHide':false},
		'CHARACTER_SEVEN': 			{'name':'柒佰', 		'gender':'M', 'isHide':false},
		'CHARACTER_MARK': 			{'name':'小马哥', 	'gender':'M', 'isHide':false},
		'CHARACTER_SIX': 			{'name':'六姐', 		'gender':'F', 'isHide':false},
		'CHARACTER_BEAUTY': 		{'name':'大美女', 	'gender':'F', 'isHide':false},
		'CHARACTER_NINE': 			{'name':'怪盗九九', 	'gender':'M', 'isHide':false},
		'CHARACTER_SNAKE': 			{'name':'蝮蛇', 		'gender':'M', 'isHide':false},
		'CHARACTER_WHITE': 			{'name':'小白', 		'gender':'?', 'isHide':false},
		'CHARACTER_HAT': 			{'name':'贝雷帽', 	'gender':'M', 'isHide':false},
		'CHARACTER_AGENTMASTER':	{'name':'情报处长', 	'gender':'M', 'isHide':false},
		'CHARACTER_HOLMES':			{'name':'福尔摩斯', 	'gender':'M', 'isHide':false},
		'CHARACTER_PERFUME': 		{'name':'致命香水', 	'gender':'F', 'isHide':false}
	}

function Card(type) {
	if(CARD_TYPES[type] === undefined) {
		throw 'card type wrong!';
	}
	this._type = type;
	this._info = CARD_TYPES[type];
}
Card.prototype.description = function(){
	for (prop in this) {
		console.log(prop + ':' + this[prop]);
	};
}
// var c = new Card('CARD_TYPE_CHARACTER');
// console.log(c._type)

// 身份牌
function RoleCard(role) {
	if(ROLES[role] === undefined) {
		throw 'role type wrong!';
	}
	Card.call(this, 'CARD_TYPE_ROLE');
	this._role = role;
	this._info = ROLES[role];
}
RoleCard.prototype = Object.create(Card.prototype);
RoleCard.prototype.constructor = RoleCard;

// var rcard = new RoleCard('ROLE_GREEN');
// rcard.description();


// 游戏牌
function GameCard(gameCard) {
	if(!_valide(gameCard)){
		throw 'game card wrong!';
	}
	Card.call(this, 'CARD_TYPE_GAME');
	gameCard['name'] = GAME_CARD_FUNC[gameCard.func];
	this._info = gameCard['name'] + "#" + MSG_TYPES[gameCard.type] + "#" + MSG_PASS[gameCard.pass]
	this._gamecard = gameCard;
	this._id = gameCard.id;	// for tracing game card.

	function _valide(gameCard){
		var ret = true;
		if(MSG_TYPES[gameCard.type] === undefined){
			ret = false;
		}
		if(MSG_PASS[gameCard.pass] === undefined){
			ret = false;
		}
		if(GAME_CARD_FUNC[gameCard.func] === undefined){
			ret = false;
		}
		if(!ret){	// for debug
			console.log(gameCard);
		}

		return ret;
	}
}
GameCard.prototype = Object.create(Card.prototype);
GameCard.prototype.constructor = GameCard;

// var gamecard = new GameCard({'type': 'MSG_RED', 'pass': 'MSG_PASS_TEXT', 'func': 'GAME_CARD_FUNC_LOCK'})
// gamecard.description();
// console.log(gamecard._gamecard.name);


// 角色牌
function CharacterCard(who) {
	if(!_valide(who)){
		throw 'character card wrong!';
	}
	Card.call(this, 'CARD_TYPE_CHARACTER');
	this._characterCard = CHARACTERS[who];
	this._info = this._characterCard['name'];

	function _valide(who){
		var ret = true;
		if(CHARACTERS[who] === undefined){
			ret = false;
		}
		return ret;
	}
}
CharacterCard.prototype = Object.create(Card.prototype);
CharacterCard.prototype.constructor = CharacterCard;

// var ccard = new CharacterCard('CHARACTER_PERFUME');
// ccard.description();


module.exports = {
	createRoleCard : function(role){
		return new RoleCard(role);
	},
	createGameCard : function(gameCard){
		return new GameCard(gameCard);
	},
	createCharacterCard : function(who){
		return new CharacterCard(who);
	},
	CARD_TYPES : CARD_TYPES,
	ROLES: ROLES,
	MSG_TYPES: MSG_TYPES,
	MSG_PASS: MSG_PASS,
	GAME_CARD_FUNC: GAME_CARD_FUNC,
	CHARACTERS: CHARACTERS
}

