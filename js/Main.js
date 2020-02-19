const AssetHandler = new AssetManager();

AssetHandler.queueImage("./res/img/worlds/openworld.png");
AssetHandler.queueImage("./res/img/worlds/openworld2.png");
AssetHandler.queueImage("./res/img/hero.png");
AssetHandler.queueImage("./res/img/zombie.png");
AssetHandler.queueImage("./res/img/whip.png");
AssetHandler.queueImage("./res/img/crab.png");
AssetHandler.queueImage("./res/img/NecroDungeon.png");
AssetHandler.queueImage("./res/img/shinyHeart.png");
AssetHandler.queueImage("./res/img/currency.png");
AssetHandler.queueImage("./res/img/digits.png");
AssetHandler.queueImage("./res/img/keyJ.png");
AssetHandler.queueImage("./res/img/keyK.png");
AssetHandler.queueImage("./res/img/whipPrototype.png");
AssetHandler.queueImage("./res/img/swordPrototype.png");
AssetHandler.queueImage("./res/img/fire.png");
AssetHandler.queueJSON('./res/jsonderulo/section5_2.json');
AssetHandler.queueJSON('./res/jsonderulo/section4_2.json');
AssetHandler.queueJSON('./res/jsonderulo/section3_2.json');
AssetHandler.queueJSON('./res/jsonderulo/section5_1.json');
AssetHandler.queueJSON('./res/jsonderulo/section4_1.json');
AssetHandler.queueJSON('./res/jsonderulo/section3_1.json');
AssetHandler.startDownload()
    .then(() => {
        const gameCanvas = document.getElementById("gameWorld"); // Get the
        const gameContext = gameCanvas.getContext("2d");
        const myGame = new GameEngine(gameContext, AssetHandler.assets);

        myGame.init();
        myGame.run();
    });
