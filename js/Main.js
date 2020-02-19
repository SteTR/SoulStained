const AssetHandler = new AssetManager();
AssetHandler.queueImage("./res/img/openworld.png");
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
AssetHandler.queueImage("./res/img/letters.png");
AssetHandler.queueImage("./res/img/death.png");
AssetHandler.queueImage("./res/img/hit.png");
AssetHandler.queueTextFile("./res/text/test.txt");
AssetHandler.startDownload()
    .then(() => {
        const gameCanvas = document.getElementById("gameWorld");
        const uiCanvas = document.getElementById("uiWorld");
        const gameContext = gameCanvas.getContext("2d");
        const myGame = new GameEngine(gameContext, AssetHandler.assets);
        myGame.init();
        myGame.run();
    });
