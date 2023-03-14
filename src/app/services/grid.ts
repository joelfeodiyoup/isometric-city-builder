import { LinearAlgebra } from '../utilities.ts/linear-algebra';
import { Cell } from './cell';
import { Assets } from './draw/assets';
import { Trees } from './draw/trees';

export class Grid {
  grid: Cell[][] = [];
  private trees?: Trees;

  public get centre(): Cell {
    const centreRowN = Math.floor(this.gridDimensions.rows / 2);
    const centreColN = Math.floor(this.gridDimensions.cols / 2);
    return this.grid[centreRowN][centreColN];
  }

  constructor(
    assets: Assets,
    public readonly gridDimensions: { rows: number; cols: number }
  ) {
    this.trees = assets.trees;
    this.prepareGrid();
    this.configureCells();
  }

  public eachCell(
    rows: number[] = LinearAlgebra.arrayMToN(0, this.gridDimensions.rows),
    cols: number[] = LinearAlgebra.arrayMToN(0, this.gridDimensions.cols),
    fn: (cell: Cell) => void
  ) {
    rows.forEach((rowIndex) => {
      cols.forEach((colIndex) => {
        fn(this.grid[rowIndex][colIndex]);
      });
    });
  }

  private prepareGrid() {
    const height = this.gridDimensions.rows;
    const width = this.gridDimensions.cols;
    this.grid = Array.from(Array(height), (_, row) => {
      return Array.from(Array(width), (_, column) => {
        return new Cell(row, column);
      });
    });
  }

  private configureCells() {
    this.eachCell(undefined, undefined, (cell) => {
      cell.north = this.grid[cell.row - 1]?.[cell.column];
      cell.south = this.grid[cell.row + 1]?.[cell.column];
      cell.west = this.grid[cell.row]?.[cell.column - 1];
      cell.east = this.grid[cell.row]?.[cell.column + 1];

      const isBoundary =
        cell.column + 1 === this.gridDimensions.cols ||
        cell.row + 1 === this.gridDimensions.rows;
      if (!isBoundary && Math.random() < 0.5) {
        cell.image = {
          image: 'tree',
          // index: cell.column % (this.trees?.nTrees() ?? 0),
          index: Math.floor(Math.random() * (this.trees?.nTrees() ?? 0)),
        };
      }
    });
  }
}
