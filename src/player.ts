import * as PIXI from 'pixi.js';
import Wall from './wall';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GRAVITY } from './constants';

class Player {
  private sprite = new PIXI.Graphics();
  private speedY: number = 0;
  private wall: Wall;
  private onCollide?: () => void;

  public constructor(
    stage: PIXI.Container,
    wall: Wall,
    onCollide?: () => void
  ) {
    this.reset();

    this.wall = wall;
    this.onCollide = onCollide;

    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);

    document.addEventListener('keydown', (event: KeyboardEvent): void => {
      event.preventDefault();
      if (event.key === ' ') {
        this.addSpeed(-GRAVITY / 5);
      }
    });
    document.addEventListener('mousedown', (event: MouseEvent): void => {
      event.preventDefault();
      this.addSpeed(-GRAVITY / 5);
    });
    stage.addChild(this.sprite);
  }

  public update = (): void => {
    this.speedY += GRAVITY / 400;
    this.sprite.y += this.speedY;

    if (this.isCollide && this.onCollide) {
      this.onCollide();
    }
  };

  public reset = (): void => {
    this.sprite.clear();
    this.sprite.beginFill(0xaabbcc);
    this.sprite.drawRect(0, 0, 30, 30);
    this.sprite.endFill();
    this.sprite.position.set(CANVAS_WIDTH / 6, CANVAS_HEIGHT / 2.5);
    this.speedY = 0;
  };

  private addSpeed(speed: number): void {
    this.speedY += speed;
    this.speedY = Math.max(-GRAVITY, this.speedY);
  }

  private get isCollide(): boolean {
    const { x, y, width, height } = this.sprite;
    if (this.wall.checkCollision(x - width / 2, y - height / 2, width, height))
      return true;

    if (y < -height / 2 || y > CANVAS_HEIGHT + height / 2) return true;
    return false;
  }
}

export default Player;
