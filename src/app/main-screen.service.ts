import { Injectable } from '@angular/core';
import { Assets } from './services/draw/assets';
import { Cell } from './services/cell';
import { Grid } from './services/grid';
import { IsoProjection } from './services/iso-projection';
import { MyCanvas } from './services/my-canvas';
import { LinearAlgebra } from './utilities.ts/linear-algebra';

@Injectable({
  providedIn: 'root',
})
export class MainScreenService {
  private myCanvas!: MyCanvas;
  private grid!: Grid;
  private rows = 10;
  private cols = 10;

  private assetLoader: Assets;
  private treeAssets = [
    'assets/tree1.png',
    'assets/tree2.png',
    'assets/tree3.png',
    'assets/tree4.png',
  ];

  public get canvas(): HTMLCanvasElement {
    return this.myCanvas.canvas;
  }

  constructor() {
    this.myCanvas = new MyCanvas({ rows: this.rows, cols: this.cols });
    this.assetLoader = new Assets();
  }

  public initCanvas() {
    return new Promise<boolean>((resolve, reject) => {
      this.assetLoader.load([...this.treeAssets]).then(() => {
        this.setup();
        resolve(true);
      });
    });
  }

  private setup() {
    this.grid = new Grid(this.assetLoader, {
      rows: this.rows,
      cols: this.cols,
    });
  }

  public draw() {
    this.myCanvas.drawGrid(this.grid, this.assetLoader, this.grid.centre);
  }

  public rotate() {
    this.myCanvas.rotate();
    this.draw();
  }

  public zoomIn() {
    this.myCanvas.zoomIn();
    this.draw();
  }

  public zoomOut() {
    this.myCanvas.zoomOut();
    this.draw();
  }
}
