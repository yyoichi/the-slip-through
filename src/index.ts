import * as PIXI from 'pixi.js';
import Wall from './wall';
import Player from './player';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

const app = new PIXI.Application({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT
});

const mainDOM = document.querySelector('#main');
if (mainDOM) {
  mainDOM.appendChild(app.view);
}

class Game {
  public isPlaying: boolean = false;

  private player: Player;
  private wall: Wall;

  private stage: PIXI.Container;
  private ticker: PIXI.Ticker;

  public constructor() {
    this.stage = new PIXI.Container();
    this.ticker = new PIXI.Ticker();
    this.ticker.autoStart = false;

    this.wall = new Wall(this.stage);
    this.player = new Player(this.stage, this.wall, this.onCollide);

    this.init();
  }

  private init = (): void => {
    app.stage.addChild(this.stage);
    this.ticker.add(this.draw);
  };

  private draw = (): void => {
    this.wall.update();
    this.player.update();
  };

  public start = (): void => {
    this.ticker.start();
    this.isPlaying = true;
  };

  public reset = (): void => {
    this.wall.reset();
    this.player.reset();
  };

  private onCollide = (): void => {
    this.ticker.stop();
    this.isPlaying = false;
  };
}

const game = new Game();

const startButton = document.createElement('button');
startButton.textContent = 'START';
startButton.onclick = (): void => {
  game.reset();
  game.start();
};
document.body.appendChild(startButton);
