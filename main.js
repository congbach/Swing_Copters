var cb = {};

cb.resources = {};

cb.resources.backgrounds = [ "bg_01", "bg_02", "bg_03" ];
cb.resources.clouds = [ "cloud_01", "cloud_02", "cloud_03" ];
cb.resources.buildings = "buildings";
cb.resources.ground = "ground";
cb.resources.platform = "platform";
cb.resources.hammer = "hammer";
cb.resources.hammer_string = "hammer_string";
cb.resources.swing_copters_title = "swing_copters_title";
cb.resources.play_button = "play_button";
cb.resources.play_button_selected = "play_button_selected";
cb.resources.rate_button = "rate_button";
cb.resources.rate_button_selected = "rate_button_selected";
cb.resources.leaderboard_button = "leaderboard_button";
cb.resources.leaderboard_button_selected = "leaderboard_button_selected";
cb.resources.player1 = "player1";
cb.resources.player1_blink = "player1_blink";
cb.resources.player1_idle = "player1_idle";
cb.resources.player_copter = "copter";
cb.resources.broken_copter_left_wing = "broken_copter_left_wing";
cb.resources.broken_copter_right_wing = "broken_copter_right_wing";
cb.resources.tap_to_play = "tap_to_play";
cb.resources.get_ready = "get_ready";
cb.resources.zero = "zero";
cb.resources.one = "one";
cb.resources.two = "two";
cb.resources.three = "three";
cb.resources.four = "four";
cb.resources.five = "five";
cb.resources.six = "six";
cb.resources.seven = "seven";
cb.resources.eight = "eight";
cb.resources.nine = "nine";
cb.resources.game_over = "game_over";
cb.resources.score_board_bg = "score_board_bg";
cb.resources.back_button = "back_button";
cb.resources.back_button_selected = "back_button_selected";
cb.resources.new_high_score = "new_high_score";
cb.resources.medal_prefix = "medal_";
cb.resources.sparkle_particle_01 = "sparkle_particle_01";
cb.resources.sparkle_particle_02 = "sparkle_particle_02";
cb.resources.sparkle_particle_03 = "sparkle_particle_03";

(function() {
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    for (var name in cb.resources)
        if (isArray(cb.resources[name])) {
            for (var i = 0; i < cb.resources[name].length; i++)
                cb.resources[name][i] = "#" + cb.resources[name][i];
        }
        else {
            cb.resources[name] = "#" + cb.resources[name];
        }
}());

cb.resources.atlas = "images/atlas.png";
cb.resources.atlas_plist = "images/atlas.plist";

window.onload = function(){
    function createCanvas(id, width, height) {
        var gameCanvas = document.createElement("canvas");
        gameCanvas.id = id;
        gameCanvas.width = width;
        gameCanvas.height = height;
        document.body.appendChild(gameCanvas);
    }

    var gameWidth = 432, gameHeight = 768;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        var screenWidth, screenHeight;
        if (document.fullscreenEnabled) {
            screenWidth = screen.availWidth;
            screenHeight = screen.availHeight;
        }
        else {
            screenWidth = $(window).width();
            screenHeight = $(window).height();
        }
        var widthHeightRatio = screenWidth / screenHeight;
        gameWidth = widthHeightRatio * gameHeight;
    }

    createCanvas("gameCanvas", gameWidth, gameHeight);

    cc.game.onStart = function(){
        if (isMobile) {
            cc.view.adjustViewPort(true);
            cc.view.setDesignResolutionSize(gameWidth,gameHeight,cc.ResolutionPolicy.SHOW_ALL);
            cc.view.resizeWithBrowserSize(true);
            cc.director.setProjection(cc.Director.PROJECTION_2D);
        }

        //load resources
        cc.LoaderScene.preload([cb.resources.atlas_plist, cb.resources.atlas], function () {
            cc.spriteFrameCache.addSpriteFrames(cb.resources.atlas_plist, cb.resources.atlas);

            cc.director.runScene(cb.MainMenuScene.create());
        }, this);
    };
    cc.game.run("gameCanvas");
};