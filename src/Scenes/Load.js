class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    // Contributed by both Jocelyn and Phineas 
    preload() {
        this.load.setPath("./assets/");

        this.load.bitmapFont('classic_font', 'atari-smooth.png', 'atari-smooth.xml');

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        /*
        // Loading the character tilemap::
        this.load.spritesheet("charactermap_sheet", "tilemap-characters-packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        */
        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
        this.load.audio("bongbong", "laserRetro_001.ogg");
    }

    // Contributed by Jocelyn 
    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

        /*
        this.anims.create({
            key: 'spin',
            defaultTextureKey: "tilemap_sheet",
            frames: [
                {frame: "coin"}
            ],
        });
        */

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}