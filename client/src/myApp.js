/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();
        console.log(size.width + '###');

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("close");
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(0, 0);
        // this.addChild(menu, 1);
        closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("The Message Game (风声组织纪念版)", "FangSong", 20);
        // position the label on the center of the screen
        this.helloLabel.setPosition(800, size.height - 28);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        var mySprite = cc.Sprite.create(s_bg);
        mySprite.setAnchorPoint(0.5, 0.5);
        mySprite.setPosition(size.width / 2, size.height / 2);
        mySprite.setScale(size.height/mySprite.getContentSize().height);
        this.addChild(mySprite, 0);

        var cardSpriteRed = cc.Sprite.create(card_red);
        cardSpriteRed.setAnchorPoint(0.5, 0.5);
        cardSpriteRed.setPosition(750, 400);
        cardSpriteRed.setRotation(-45);
        console.log(size.height);
        this.addChild(cardSpriteRed, 0);

        var cardSpriteBlue = cc.Sprite.create(card_blue);
        cardSpriteBlue.setAnchorPoint(0.5, 0.5);
        cardSpriteBlue.setPosition(800, 420);
        console.log(size.height);
        this.addChild(cardSpriteBlue, 0);

        var cardSpriteGreen = cc.Sprite.create(card_green);
        cardSpriteGreen.setAnchorPoint(0.5, 0.5);
        cardSpriteGreen.setPosition(850, 400);
        cardSpriteGreen.setRotation(45);
        console.log(size.height);
        this.addChild(cardSpriteGreen, 0);


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
