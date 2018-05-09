// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        heroSprite:cc.Animation,
        chanButton:cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.chanButton.node.on(cc.Node.EventType.TOUCH_START, this.chanTouchStart, this);
        this.chanButton.node.on(cc.Node.EventType.TOUCH_END, this.chanTouchEnd, this);
        this.chanButton.node.on(cc.Node.EventType.TOUCH_CANCEL, this.chanTouchEnd, this);
    },

    start () {
        this.heroSprite.play('Run');
    },

    //点击跳
    tiaoAction:function(target, data){
        
        //向上移动
        var moveUp = cc.moveTo(0.7, cc.p(-255, -30)).easing(cc.easeCubicActionOut());
        //向下移动
        var moveDown = cc.moveTo(0.7, cc.p(-255, -152)).easing(cc.easeCubicActionIn());
        //动画执行完毕回调
        var tiaoAnimationCallBack = cc.callFunc(this.TiaoEndAnimation, this.heroSprite, this);
        //组合队列动画
        var animationQueue = cc.sequence(moveUp, moveDown, tiaoAnimationCallBack);
        this.heroSprite.node.runAction(animationQueue);
        this.playHeroAnimation('Tiao');
    },

    //跳结束动画
    TiaoEndAnimation:function(){
        this.play('Run');
    },

    //点击铲开始
    chanTouchStart:function(){
        if(this.heroSprite.currentClip.name == 'Tiao'){
            cc.log(this.heroSprite.currentClip.name);
            return;
        }
        var moveDown = cc.moveTo(0, cc.p(-255, -166));
        this.heroSprite.node.runAction(moveDown);
        this.playHeroAnimation('Chan');
    },

    //点击铲结束
    chanTouchEnd:function(){
        if(this.heroSprite.currentClip.name == 'Tiao'){
            cc.log(this.heroSprite.currentClip.name);
            return;
        }
        var moveDown = cc.moveTo(0, cc.p(-255, -152));
        this.heroSprite.node.runAction(moveDown);
        this.playHeroAnimation('Run');
    },

    //主角动画
    playHeroAnimation:function(animationName){
        this.heroSprite.play(animationName);
    }

    // update (dt) {},
});
