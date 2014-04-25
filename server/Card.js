var CARD_TYPES = {
		'CARD_TYPE_ROLE' : '身份牌',
		'CARD_TYPE_GAME' : '游戏牌',
		'CARD_TYPE_CHARACTER' : '角色牌'
	}
	, ROLES = {
		'ROLE_RED':'潜伏战线',
		'ROLE_BLUE':'军情处', 
		'ROLE_GREEN':'打酱油的'
	}
	, MSG_TYPES = {
		'MSG_RED':'红色情报',
		'MSG_BLUE':'蓝色情报',
		'MSG_BLACK':'屎'
	}
	, MSG_PASS = {
		'MSG_PASS_SECRET':'密电',
		'MSG_PASS_DIRECT':'直达',
		'MSG_PASS_TEXT':'文本'
	}
	, GAME_CARD_FUNC = {
		'GAME_CARD_FUNC_LOCK': 		'锁定',
		'GAME_CARD_FUNC_PASS': 		'调虎离山',
		'GAME_CARD_FUNC_BACK': 		'退回',
		'GAME_CARD_FUNC_INTERCEPT':	'截获',
		'GAME_CARD_FUNC_DECODE':	'破译',
		'GAME_CARD_FUNC_BURN':		'烧毁',
		'GAME_CARD_FUNC_BREAK':		'识破',
		'GAME_CARD_FUNC_TEST': 		'试探',
		'GAME_CARD_FUNC_AOE': 		'真伪莫辨'
	}
	, CHARACTERS = {	// 25个角色
		'CHARACTER_GHOST': 			{'id': 1, 	'name':'老鬼', 		'gender':'F', 'isHidden':1, 'skills':[1,2,3]	},
		'CHARACTER_BIRD': 			{'id': 2, 	'name':'黄雀', 		'gender':'F', 'isHidden':1, 'skills':[4,5]		},
		'CHARACTER_GUN': 			{'id': 3, 	'name':'老枪', 		'gender':'M', 'isHidden':1, 'skills':[1,6]		},
		'CHARACTER_SHINING': 		{'id': 4, 	'name':'闪灵', 		'gender':'F', 'isHidden':1, 'skills':[7]		},
		'CHARACTER_BLACKROSE': 		{'id': 5, 	'name':'黑玫瑰', 		'gender':'F', 'isHidden':1, 'skills':[8]		},
		'CHARACTER_WIND': 			{'id': 6, 	'name':'峨眉风', 		'gender':'M', 'isHidden':1, 'skills':[9,10]		},
		'CHARACTER_GOLD': 			{'id': 7, 	'name':'老金', 		'gender':'M', 'isHidden':1, 'skills':[11,12]	},
		'CHARACTER_FLOAT': 			{'id': 8, 	'name':'浮萍', 		'gender':'F', 'isHidden':1, 'skills':[13,14]	},
		'CHARACTER_INTERPRETOR':	{'id': 9, 	'name':'译电员', 		'gender':'F', 'isHidden':1, 'skills':[15,16]	},
		'CHARACTER_IRONAGENT':		{'id': 10, 	'name':'钢铁特工',	'gender':'M', 'isHidden':1, 'skills':[17,18]	},
		'CHARACTER_DAILY': 			{'id': 11, 	'name':'戴笠', 		'gender':'M', 'isHidden':0, 'skills':[19,20]	},
		'CHARACTER_KILLER': 		{'id': 12, 	'name':'职业杀手', 	'gender':'M', 'isHidden':0, 'skills':[21,22]	},
		'CHARACTER_MASKMAN': 		{'id': 13, 	'name':'礼服蒙面人', 	'gender':'M', 'isHidden':0, 'skills':[23,24]	},
		'CHARACTER_KNIFE': 			{'id': 14, 	'name':'刀锋', 		'gender':'M', 'isHidden':0, 'skills':[25,26]	},
		'CHARACTER_SEVEN': 			{'id': 15, 	'name':'柒佰', 		'gender':'M', 'isHidden':0, 'skills':[27,28,29]	},
		'CHARACTER_MARK': 			{'id': 16, 	'name':'小马哥', 		'gender':'M', 'isHidden':0, 'skills':[30]		},
		'CHARACTER_SIX': 			{'id': 17, 	'name':'六姐', 		'gender':'F', 'isHidden':0, 'skills':[31,32]	},
		'CHARACTER_BEAUTY': 		{'id': 18, 	'name':'大美女', 		'gender':'F', 'isHidden':0, 'skills':[33,34]	},
		'CHARACTER_NINE': 			{'id': 19, 	'name':'怪盗九九', 	'gender':'M', 'isHidden':0, 'skills':[35,36]	},
		'CHARACTER_SNAKE': 			{'id': 20, 	'name':'蝮蛇', 		'gender':'M', 'isHidden':0, 'skills':[37,38]	},
		'CHARACTER_WHITE': 			{'id': 21, 	'name':'小白', 		'gender':'?', 'isHidden':0, 'skills':[39,40,41]	},
		'CHARACTER_HAT': 			{'id': 22, 	'name':'贝雷帽', 		'gender':'M', 'isHidden':0, 'skills':[42,43]	},
		'CHARACTER_AGENTMASTER':	{'id': 23, 	'name':'情报处长', 	'gender':'M', 'isHidden':0, 'skills':[44,45]	},
		'CHARACTER_HOLMES':			{'id': 24, 	'name':'福尔摩斯', 	'gender':'M', 'isHidden':0, 'skills':[46,47]	},
		'CHARACTER_PERFUME': 		{'id': 25, 	'name':'致命香水', 	'gender':'F', 'isHidden':0, 'skills':[48,49]	}
	}
	, SKILLS = {
		// type: 蓝0 红1
		// 老鬼
		1: 	{'name': '就计', 	'type': 1, 'action': null},	// 老枪也有这个
		2: 	{'name': '城府', 	'type': 1, 'action': null},
		3: 	{'name': '遗志', 	'type': 1, 'action': null},

		// 黄雀
		4: 	{'name': '潜藏伏击', 	'type': 0, 'action': null},
		5: 	{'name': '黄雀在后', 	'type': 1, 'action': null},

		// 老枪
		// 就计 同id 1
		6: 	{'name': '合谋', 	'type': 0, 'action': null},

		// 闪灵
		7: 	{'name': '狙击', 	'type': 0, 'action': null},

		// 黑玫瑰
		8: 	{'name': '血染玫瑰', 	'type': 0, 'action': null},

		// 峨眉风
		9: 	{'name': '截上截', 	'type': 0, 'action': null},
		10: {'name': '计中计', 	'type': 1, 'action': null},

		// 老金
		11: {'name': '弃卒保帅', 	'type': 1, 'action': null},
		12: {'name': '釜底抽薪', 	'type': 1, 'action': null},

		// 浮萍
		13: {'name': '先机', 	'type': 0, 'action': null},
		14: {'name': '后著', 	'type': 1, 'action': null},

		// 译电员
		15: {'name': '速译', 	'type': 0, 'action': null},
		16: {'name': '洞悉', 	'type': 1, 'action': null},

		// 钢铁特工
		17: {'name': '警觉', 	'type': 0, 'action': null},
		18: {'name': '掩护', 	'type': 0, 'action': null},

		// 戴笠
		19: {'name': '笑里藏刀', 	'type': 1, 'action': null},
		20: {'name': '运筹帷幄', 	'type': 1, 'action': null},

		// 职业杀手
		21: {'name': '连击', 	'type': 1, 'action': null},
		22: {'name': '预谋', 	'type': 1, 'action': null},

		// 礼服蒙面人
		23: {'name': '英雄', 	'type': 1, 'action': null},
		24: {'name': '救美', 	'type': 1, 'action': null},

		// 刀锋
		25: {'name': '亮剑', 	'type': 1, 'action': null},
		26: {'name': '嗜血', 	'type': 1, 'action': null},

		// 柒佰
		27: {'name': '敏锐', 	'type': 1, 'action': null},
		28: {'name': '联动', 	'type': 1, 'action': null},
		29: {'name': '风度', 	'type': 1, 'action': null},

		// 小马哥
		30: {'name': '英雄本色', 	'type': 1, 'action': null},

		// 六姐
		31: {'name': '拷问', 	'type': 1, 'action': null},
		32: {'name': '搜取', 	'type': 1, 'action': null},

		// 大美女
		33: {'name': '精明', 	'type': 1, 'action': null},
		34: {'name': '爱情', 	'type': 0, 'action': null},

		// 怪盗九九
		35: {'name': '阴谋', 	'type': 1, 'action': null},
		36: {'name': '阳谋', 	'type': 1, 'action': null},

		// 蝮蛇
		37: {'name': '声东击西', 	'type': 0, 'action': null},
		38: {'name': '弹药无限', 	'type': 0, 'action': null},

		// 小白
		39: {'name': '乔装', 	'type': 1, 'action': null},
		40: {'name': '收买', 	'type': 0, 'action': null},
		41: {'name': '败露', 	'type': 1, 'action': null},

		// 贝雷帽
		42: {'name': '换日', 	'type': 1, 'action': null},
		43: {'name': '偷天', 	'type': 1, 'action': null},

		// 情报处长
		44: {'name': '隔墙有耳', 	'type': 1, 'action': null},
		45: {'name': '偷龙转凤', 	'type': 1, 'action': null},

		// 福尔摩斯
		46: {'name': '揭露', 	'type': 0, 'action': null},
		47: {'name': '真相', 	'type': 1, 'action': null},

		// 致命香水
		48: {'name': '攻守兼备', 	'type': 1, 'action': null},
		49: {'name': '临危受命', 	'type': 1, 'action': null},

	}

function Card(type) {
	if(CARD_TYPES[type] === undefined) {
		throw 'card type wrong!';
	}
	// this._type = type;
	// this._info = CARD_TYPES[type];
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
	// // gameCard['name'] = GAME_CARD_FUNC[gameCard.func];
	// // this._info = gameCard['name'] + "#" + MSG_TYPES[gameCard.type] + "#" + MSG_PASS[gameCard.pass]
	// // this._gamecard = gameCard;
	this._id = gameCard.id;	// for tracing game card.
	// this._func = GAME_CARD_FUNC[gameCard.func];
	// this._pass = MSG_PASS[gameCard.pass];
	// this._type = MSG_TYPES[gameCard.type];

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
	// this._characterCard = CHARACTERS[who];
	this._info = CHARACTERS[who]['name'];
	this._id = CHARACTERS[who]['id'];

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

var createGameCards = function(){	// 81张游戏牌
	var cards = [];
	// 真假莫辨	从自己开始逆时针每位玩家抽取一张牌作为情报	文本	1+1+1=3
	cards.push(new GameCard({'id':1, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_AOE'}));
	cards.push(new GameCard({'id':2, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_AOE'}));
	cards.push(new GameCard({'id':3, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_AOE'}));

	// 调虎离山	指定一位玩家不参与此次情报传递	文本	2+2+2=6
	cards.push(new GameCard({'id':4, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(new GameCard({'id':5, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(new GameCard({'id':6, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(new GameCard({'id':7, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(new GameCard({'id':8, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));
	cards.push(new GameCard({'id':9, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_PASS'}));

	// 截获	获得一张传递中的情报	密电	1+1+6=8
	cards.push(new GameCard({'id':10, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':11, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':12, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':13, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':14, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':15, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':16, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));
	cards.push(new GameCard({'id':17, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_INTERCEPT'}));

	// 退回	当情报到达玩家面前时使用，改变情报的传递方向	文本	3+3+2=8
	cards.push(new GameCard({'id':18, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':19, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':20, 	'type':'MSG_RED',	'pass':'MSG_PASS_TEXT', 	'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':21, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':22, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':23, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':24, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));
	cards.push(new GameCard({'id':25, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_TEXT',		'func':'GAME_CARD_FUNC_BACK'}));

	// 破译	检视传递到玩家面前的情报	破译	2+2+2=6
	cards.push(new GameCard({'id':26, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(new GameCard({'id':27, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(new GameCard({'id':28, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(new GameCard({'id':29, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(new GameCard({'id':30, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));
	cards.push(new GameCard({'id':31, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_DECODE'}));

	// 烧毁	烧毁一份假情报	直达	2+2+2=6
	cards.push(new GameCard({'id':32, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(new GameCard({'id':33, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(new GameCard({'id':34, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(new GameCard({'id':35, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(new GameCard({'id':36, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));
	cards.push(new GameCard({'id':37, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BURN'}));

	// 识破	使一张卡牌无效	直达	5+5+4=14
	cards.push(new GameCard({'id':38, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':39, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':40, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':41, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':42, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':43, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':44, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':45, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':46, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':47, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':48, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':49, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':50, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));
	cards.push(new GameCard({'id':51, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_BREAK'}));

	// 试探	试探一位玩家是否为某一身份，成功则可令对方弃一张手牌或摸两张牌，根据牌面文字而定	密电	6+6+6=18
	cards.push(new GameCard({'id':52, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':53, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':54, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':55, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':56, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':57, 	'type':'MSG_RED',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':58, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':59, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':60, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':61, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':62, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':63, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':64, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':65, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':66, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':67, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':68, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));
	cards.push(new GameCard({'id':69, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_SECRET', 	'func':'GAME_CARD_FUNC_TEST'}));

	// 锁定	指定一位玩家必须接受此回合传递的情报	直达	3+3+6=12
	cards.push(new GameCard({'id':70, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':71, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':72, 	'type':'MSG_RED',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':73, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':74, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':75, 	'type':'MSG_BLUE',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':76, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':77, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':78, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':79, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':80, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));
	cards.push(new GameCard({'id':81, 	'type':'MSG_BLACK',	'pass':'MSG_PASS_DIRECT', 	'func':'GAME_CARD_FUNC_LOCK'}));

	return cards;
}


module.exports = {
	createRoleCard : function(role){
		return new RoleCard(role);
	},
	createGameCards : createGameCards,
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

