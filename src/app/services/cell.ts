import { ImageAssetReference } from './draw/assets';

export class Cell {
  public row: number;
  public column: number;
  public north?: Cell;
  public south?: Cell;
  public east?: Cell;
  public west?: Cell;

  public image?: ImageAssetReference;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    // this.links = [];
  }
}
