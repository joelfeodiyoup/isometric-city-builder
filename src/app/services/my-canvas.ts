import { CanvasRotation } from './canvas-rotation';
import { Cell } from './cell';
import { Assets } from './draw/assets';
import { Grid } from './grid';
import { IsoProjection } from './iso-projection';

export class MyCanvas {
  height = 490;
  width = 990;

  yPosition = -10;
  xPosition = -10;

  public canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  isoProjection: IsoProjection;
  private canvasRotation!: CanvasRotation;

  private centreTranslation = { x: 0, y: 0 };

  constructor(gridDimensions: { rows: number; cols: number }) {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this.width}`);
    canvas.setAttribute('height', `${this.height}`);
    canvas.style.border = '1px dashed black';
    this.canvas = canvas;

    // this can be null if you have already requested a different type of context.
    // because we've just created this canvas element, I think it should be safe to assume it won't be null here.
    // https://stackoverflow.com/questions/6796194/canvas-getcontext2d-returns-null
    this.ctx = this.canvas.getContext('2d')!;

    this.isoProjection = new IsoProjection();

    this.canvasRotation = new CanvasRotation(gridDimensions);
  }

  /**
   * Provide ability to move everything an x and y amount in order to keep a particular cell in the centre.
   * @param centre
   */
  private translationToCentre(p: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    const diff = {
      x: this.width / 2 - p.x,
      y: this.height / 2 - p.y,
    };
    console.log(diff);
    return diff;
  }

  public drawGrid(grid: Grid, assets: Assets, centre: Cell) {
    this.ctx.fillStyle = '#3A5B2E';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const r = this.canvasRotation.rowAndColIndexes();
    this.centreTranslation = this.translationToCentre(this.getP(centre));
    grid.eachCell(r.rows, r.cols, (cell) => {
      if (cell.south) {
        this.drawBetweenCells(cell, cell.south);
      }
      if (cell.east) {
        this.drawBetweenCells(cell, cell.east);
      }
      const down = cell.south?.west;
      if (down) {
        // this.drawBetweenCells(cell, down);
      }

      const asset = cell.image && assets.getAsset(cell.image);

      // todo: fix last two parameters
      asset && this.drawImage(this.scaledIso(cell), asset.image, 0, 0);
    });
  }
  private drawBetweenCells(c1: Cell, c2: Cell) {
    const p1 = this.scaledIso(c1);
    const p2 = this.scaledIso(c2);
    this.drawLine(p1, p2);
  }

  private scaledIso(cell: Cell) {
    const p = this.getP(cell);
    return {
      x: p.x + this.centreTranslation.x,
      y: p.y + this.centreTranslation.y,
    };
  }

  private getP(cell: Cell) {
    const rotatedRowCol = this.canvasRotation.rotatedGridPosition(
      cell.column,
      cell.row
    );
    return this.translateScreenPosition(
      this.scaleVector(
        this.isoProjection.pointToIso(rotatedRowCol[0], rotatedRowCol[1])
      )
      // this.scaleVector(this.isoProjection.pointToIso(cell.column, cell.row))
    );
  }

  private translateScreenPosition(p: { x: number; y: number }) {
    return {
      x: p.x - this.xPosition * this.isoProjection.cellWidth,
      y: p.y - this.yPosition * this.isoProjection.cellHeight,
    };
  }

  private scaleVector(p: { x: number; y: number }) {
    const c = this.isoProjection.cellScaling;
    return { x: c * p.x, y: c * p.y };
  }

  private drawLine(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    this.ctx.strokeStyle = '#34472D';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  private drawImage(
    p: { x: number; y: number },
    image: HTMLImageElement,
    cellWidth: number,
    height: number
  ) {
    const h = this.isoProjection.cellHeight;
    const w = this.isoProjection.cellWidth;

    // todo: need to modify this for arbitrary image sizes / cell coverings.
    this.ctx.drawImage(image, p.x - w, p.y - 6 * h, w * 2, h * 8);
  }

  public rotate() {
    this.canvasRotation.rotateRight();
    this.clear();
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public zoomIn() {
    this.isoProjection.cellScaling *= 2;
  }
  public zoomOut() {
    this.isoProjection.cellScaling = Math.floor(
      this.isoProjection.cellScaling / 2
    );
  }
}
