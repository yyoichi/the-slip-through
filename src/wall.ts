import * as PIXI from 'pixi.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';

class Wall {
  private sprite = new PIXI.Graphics();
  private x: number = 0;
  private y: number = 0;
  private speedX: number = 2;
  private wallWidth: number = 20;
  private innerDistance: number = 65;

  public constructor(stage: PIXI.Container) {
    stage.addChild(this.sprite);
    this.reset();
  }

  public update(): void {
    this.x -= this.speedX;
    if (this.x < -this.wallWidth) this.reset();

    this.sprite.clear();
    this.sprite.beginFill(0xffffff, 1);
    const { x, y, wallWidth, innerDistance } = this;
    this.sprite.drawRect(x, 0, wallWidth, y);
    this.sprite.drawRect(x, y + innerDistance, wallWidth, CANVAS_HEIGHT);
    this.sprite.endFill();
  }

  public reset(): void {
    this.sprite.clear();
    this.x = CANVAS_WIDTH + 20;

    const wallMinHeight = 20;
    const randomNum =
      Math.random() * (CANVAS_HEIGHT - 2 * wallMinHeight - this.innerDistance);
    this.y = wallMinHeight + randomNum;
  }

  public checkCollision(
    x: number,
    y: number,
    width: number,
    height: number
  ): boolean {
    if (!(x + width < this.x || this.x + this.wallWidth < x || this.y < y)) {
      return true;
    }
    if (
      !(
        x + width < this.x ||
        this.x + this.wallWidth < x ||
        y + height < this.y + this.innerDistance
      )
    ) {
      return true;
    }
    return false;
  }
}

export default Wall;
