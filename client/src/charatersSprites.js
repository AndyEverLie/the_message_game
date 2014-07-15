var CharatersSprite = cc.Sprite.extend({

    ctor: function(fileName) {
        this._super();
        this.initWithFile(fileName);
    },

    other: function(){
        // TBC
    }
});