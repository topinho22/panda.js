/**
    Timer engine.

    @module timer
    @namespace game
**/
game.module(
    'engine.timer'
)
.body(function(){ 'use strict';

/**
    Game timer.
    
    __Example__

        var timer = new game.Timer(2);
        if(timer.delta() >= 0) {
            timer.set(2);
        }
    @class Timer
    @extends game.Class
    @constructor
    @param {Number} ms
**/
game.Timer = game.Class.extend({
    target: 0,
    base: 0,
    last: 0,
    pauseTime: 0,
    
    init: function(ms) {
        this.last = game.Timer.time;
        this.set(ms);
    },
    
    /**
        Set time for timer.
        @method set
        @param {Number} ms
    **/
    set: function(ms) {
        if(typeof(ms) !== 'number') ms = 0;
        this.target = ms || 0;
        this.reset();
    },
    
    /**
        Reset timer.
        @method reset
    **/
    reset: function() {
        this.base = game.Timer.time;
        this.pauseTime = 0;
    },
    
    /**
        Get time since last delta.
        @method delta
    **/
    delta: function() {
        var delta = game.Timer.time - this.last;
        this.last = game.Timer.time;
        return this.pauseTime ? 0 : delta;
    },
    
    /**
        Get time since start.
        @method delta
    **/
    time: function() {
        var time = (this.pauseTime || game.Timer.time) - this.base - this.target;
        if(game.Timer.seconds) time /= 1000;
        return time;
    },

    /**
        Pause timer.
        @method pause
    **/
    pause: function() {
        if(!this.pauseTime) this.pauseTime = game.Timer.time;
    },

    /**
        Resume paused timer.
        @method unpause
    **/
    unpause: function() {
        if(this.pauseTime) {
            this.base += game.Timer.time - this.pauseTime;
            this.pauseTime = 0;
        }
    }
});

game.Timer.last = 0;
game.Timer.time = Number.MIN_VALUE;
game.Timer.speedFactor = 1;
game.Timer.maxStep = 50;
game.Timer.seconds = false;

game.Timer.update = function() {
    var now = Date.now();
    game.Timer.time += Math.min((now - game.Timer.last), game.Timer.maxStep) * game.Timer.speedFactor;
    game.Timer.last = now;
};

});