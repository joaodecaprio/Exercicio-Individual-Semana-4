let knight;
let cursors;
let kame;
let coin;
let coin2;
let coin3;
let coin4;
let coin5;
let plataforma;
let score = 0; // Variável de contagem de moedas
let scoreText; // Texto para exibir o placar

class WagDragon extends Phaser.Scene {

    constructor() {
        super({
            key: 'WagDragon',
            backgroundColor: '#000', // Configuração da cor de fundo da cena
        });
    }

    preload() {
        // Carregar recursos
        this.load.image('cenario', './assets/background.png');
        this.load.spritesheet('knight', './assets/knight.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('kame', './assets/kamekame.png'); 
        this.load.image('coin', './assets/coincup.png');
        this.load.image('coin2', './assets/coincup.png');
        this.load.image('coin3', './assets/coincup.png');
        this.load.image('coin4', './assets/coincup.png');
        this.load.image('coin5', './assets/coincup.png');
        this.load.image('plataforma', './assets/plataforma.png'); 
    }

    create() {
        // Configuração inicial da cena
        this.add.image(400, 300, 'cenario');

        // Criar a plataforma
        plataforma = this.physics.add.staticImage(300, 200, 'plataforma').setScale(0.5);

        // Criar o knight
        knight = this.physics.add.sprite(400, 300, 'knight').setScale(2.5).setSize(16, 26);
        knight.setCollideWorldBounds(true); // Impede que o knight saia da tela

        // Criar moedas
        coin = this.physics.add.image(600, 300, 'coin').setScale(0.22).setBounce(0.8);   
        coin2 = this.physics.add.image(500, 300, 'coin2').setScale(0.22).setBounce(0.8);
        coin3 = this.physics.add.image(700, 300, 'coin3').setScale(0.22).setBounce(0.8);
        coin4 = this.physics.add.image(300, 300, 'coin4').setScale(0.22).setBounce(0.8);
        coin5 = this.physics.add.image(100, 300, 'coin5').setScale(0.22).setBounce(0.8);
        
        // Adicionar colisões para as moedas com o knight
        this.physics.add.collider(knight, coin, collectCoin, null, this);
        this.physics.add.collider(knight, coin2, collectCoin, null, this);
        this.physics.add.collider(knight, coin3, collectCoin, null, this);
        this.physics.add.collider(knight, coin4, collectCoin, null, this);
        this.physics.add.collider(knight, coin5, collectCoin, null, this);

        // Criar o chão invisível (parte inferior)
        let floor = this.physics.add.staticGroup();
        floor.create(400, 500, null).setSize(800, 10).setVisible(false);  // Chão inferior
        this.physics.add.collider(knight, floor);  // Colisão com o knight
        this.physics.add.collider(coin, floor);
        this.physics.add.collider(coin2, floor);
        this.physics.add.collider(coin3, floor);
        this.physics.add.collider(coin4, floor);
        this.physics.add.collider(coin5, floor);

        // Chão superior invisível (para que o knight não suba fora da tela)
        let ceiling = this.physics.add.staticGroup();
        ceiling.create(400, 10, null).setSize(800, 10).setVisible(false); // Parte superior
        this.physics.add.collider(knight, ceiling);  // Colisão com o knight

        // Teclas de controle
        cursors = this.input.keyboard.createCursorKeys();

        // Definir a tecla de espaço para pulo
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Criar o kame
        kame = this.add.sprite(400, 300, 'kame').setScale(0.30).setFlipY(false);
        kame.setVisible(false);

        // Exibir o placar na tela
        scoreText = this.add.text(16, 16, 'Moedas: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

    }

    update() {
        // Movimentação do knight
        if (cursors.left.isDown) {
            knight.setVelocityX(-160); // Move para a esquerda
            knight.play('run', true);  // Reproduz a animação de corrida
            knight.flipX = true;  // Inverte a sprite para a direção esquerda
        }
        else if (cursors.right.isDown) {
            knight.setVelocityX(160); // Move para a direita
            knight.play('run', true);  // Reproduz a animação de corrida
            knight.flipX = false;  // Não inverte a sprite (direção normal)
        }
        else {
            knight.setVelocityX(0); // Para o movimento horizontal
            knight.play('idle', true);  // Reproduz a animação de "idle" (parado)
        }

        // Pulo (pressionando a tecla de espaço)
        if (this.spaceKey.isDown && knight.body.touching.down) {
            knight.setVelocityY(-330);  // Aplica uma força negativa para o pulo (quanto maior o valor, mais alto o pulo)
        }

        // Movimentação para cima
        if (cursors.up.isDown) {
            knight.setVelocityY(-160);  // Move para cima
            ativarTurbo();
        } 
        else {
            semTurbo();
        }

        kame.setPosition(knight.x, knight.y + 31 + knight.height / 2);

        function ativarTurbo() {
            kame.setVisible(true);
        }

        function semTurbo() {
            kame.setVisible(false);
        }
    }
}

// Função de callback que será chamada quando o knight colidir com a moeda
function collectCoin(knight, coin) {
    coin.setVisible(false);  // Torna a moeda invisível
    coin.disableBody(true, true);  // Desativa o corpo da moeda (fazendo ela desaparecer)

    // Aumentar o placar
    score += 1; // Incrementa o número de moedas coletadas
    scoreText.setText('Moedas: ' + score); // Atualiza o placar na tela
    console.log("Moeda coletada! Placar: " + score);
    
}

// lista pra imprimir no console
var lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// for para percorrer a lista
for (var i = 0; i < lista.length; i++) {
    // se o número for par
    if (lista[i] % 2 == 0) {
        // imprime o número
        console.log(lista[i]);
    }
}


 



