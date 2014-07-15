var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();
        cc.log(size.width + '###');

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
//            function () {
//                cc.log("close");
//            },
            this.onStartGame,
            this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width - 20, 20);

        this.helloLabel = cc.LabelTTF.create("The Message Game (风声组织纪念版)", "FangSong", 20);
        this.helloLabel.setPosition(800, size.height - 28);
        this.addChild(this.helloLabel, 5);

        var bgSprite = cc.Sprite.create(s_bg);
        bgSprite.setAnchorPoint(0.5, 0.5);
        bgSprite.setPosition(size.width / 2, size.height / 2);
        bgSprite.setScale(size.height/bgSprite.getContentSize().height);
        this.addChild(bgSprite, 0);

        var cardSpriteRed = cc.Sprite.create(card_red);
        cardSpriteRed.setAnchorPoint(0.5, 0.5);
        cardSpriteRed.setPosition(100, 100);
        cardSpriteRed.setRotation(-45);
        cc.log(size.height);
        cardSpriteRed.runAction(cc.EaseBackIn.create(cc.MoveTo.create(1, cc.p(750, 400))));
        this.addChild(cardSpriteRed, 0);

        var cardSpriteBlue = cc.Sprite.create(card_blue);
        cardSpriteBlue.setAnchorPoint(0.5, 0.5);
        cardSpriteBlue.setPosition(800, 420);
        cc.log(size.height);
        this.addChild(cardSpriteBlue, 0);

        var cardSpriteGreen = cc.Sprite.create(card_green);
        cardSpriteGreen.setAnchorPoint(0.5, 0.5);
        cardSpriteGreen.setPosition(850, 400);
        cardSpriteGreen.setRotation(45);
        cc.log(size.height);
        this.addChild(cardSpriteGreen, 0);

        var MUSIC_FILE = "res/Sound/Why.mp3";
        cc.AudioEngine.getInstance().playMusic(MUSIC_FILE, true);
    },

    onStartGame: function(pSender){
        cc.AudioEngine.getInstance().pauseMusic();
        var scene = cc.Scene.create();
        var label = cc.LabelTTF.create('WTFFF你好', 'FangSong', 50);
        label.setPosition(50, 50);
        var layer = cc.Layer.create();
        scene.addChild(layer);
        layer.addChild(label);
        layer.init();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));

        cc.Fade
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});

cc.log($('#start_game_btn'));
$('#start_game_btn').click(function(){
    cc.log('the start game btn has been clk.');
});