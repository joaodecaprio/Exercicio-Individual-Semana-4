

// Definindo a cena de boas-vindas usando a biblioteca Phaser
class Welcome extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({
            key: 'Welcome',
            backgroundColor: '#000', // Configuração da cor de fundo da cena
        });
    }

 preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('welcome', './assets/welcome.2.png');
    this.load.image('start', 'assets/start.png'); 
    this.load.image('setas', 'assets/setas.png');


}

 create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(200, 500, 'setas').setScale(0.5);
    this.add.image(400, 150, 'welcome');
    let startButton = this.add.image(400, 400, 'start').setInteractive();

    // Definindo a ação quando o botão "start" for clicado
    startButton.on('pointerdown', () => {
        // Inicia a cena 'WagDragon'
        this.scene.start('WagDragon');
    });
}

 update ()
{

}
}