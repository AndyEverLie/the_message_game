// EligibleTable.js

// GAME_CARD_FUNC = {
// 	'GAME_CARD_FUNC_LOCK': 		'锁定',
// 	'GAME_CARD_FUNC_PASS': 		'调虎离山',
// 	'GAME_CARD_FUNC_BACK': 		'退回',
// 	'GAME_CARD_FUNC_INTERCEPT':	'截获',
// 	'GAME_CARD_FUNC_DECODE':	'破译',
// 	'GAME_CARD_FUNC_BURN':		'烧毁',
// 	'GAME_CARD_FUNC_BREAK':		'识破',
// 	'GAME_CARD_FUNC_TEST': 		'试探',
// 	'GAME_CARD_FUNC_AOE': 		'真伪莫辨'
// }

// USER = {
// 	0: '自己',
// 	1: '他人'
// }

/**
use this pattern to make the table works on both server/client side

(function(exports) {
	var oo = function() {};
	exports.xx = oo;
})(typeof global === "undefined" ? window : exports);
*/

(function(exports) {
	exports.FUNC_CARD_TABLE = {
		'GAME_CARD_FUNC_LOCK' : {
			'PHASE': [6, 7, 10],
			'USER': [0]
		},
		'GAME_CARD_FUNC_PASS' : {
			'PHASE': [7],
			'USER': [0, 1]
		},
		'GAME_CARD_FUNC_BACK' : {
			'PHASE': [8],
			'USER': [1]
		},
		'GAME_CARD_FUNC_INTERCEPT' : {
			'PHASE': [7],
			'USER': [1]
		},
		'GAME_CARD_FUNC_DECODE' : {
			'PHASE': [8],
			'USER': [0, 1]
		},
		'GAME_CARD_FUNC_BURN' : {
			'PHASE': [4, 6, 10],
			'USER': [0, 1]
		},
		'GAME_CARD_FUNC_BREAK' : {
			'PHASE': [4, 6, 10],
			'USER': [0, 1]
		},
		'GAME_CARD_FUNC_TEST' : {
			'PHASE': [6, 10],
			'USER': [0]
		},
		'GAME_CARD_FUNC_AOE' : {
			'PHASE': [6, 10],
			'USER': [0]
		}
	}

	exports.SKILL_TABLE = {
		
	}

})(typeof global === "undefined" ? window : exports);	




