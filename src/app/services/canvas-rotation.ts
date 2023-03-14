import { LinearAlgebra } from '../utilities.ts/linear-algebra';

export class CanvasRotation {
  // todo: remove. Comes from the state. Wire it up.
  private rotationAtTop = 1;
  private rotations;

  constructor(private gridDimensions: { rows: number; cols: number }) {
    this.rotations = [
      LinearAlgebra.arrayMToN(0, this.gridDimensions.rows),
      LinearAlgebra.arrayMToN(0, this.gridDimensions.cols),
      LinearAlgebra.arrayMToN(this.gridDimensions.rows, 0),
      LinearAlgebra.arrayMToN(this.gridDimensions.cols, 0),
    ];
  }

  public rotateRight() {
    this.rotationAtTop = (this.rotationAtTop + 1) % 4;
  }

  /**
   * this returns two arrays. One is the indexes for rows, and the other for cols
   * This abstracts rotation rendering.
   * i.e., rotation is:
   * normal - rows: [0, rows], cols: [0, cols]
   * +1 - rows: [0, cols], rows: [rows, 0]
   * +2 - rows: [rows, 0], cols: [cols, 0]
   * +3 - rows: [cols, 0], cols: [0, rows]
   */
  public rowAndColIndexes() {
    return {
      rows: this.rotations[this.rotationAtTop % 4],
      cols: this.rotations[(this.rotationAtTop + 1) % 4],
    };
  }

  /**
   * When visually rotating the grid, then there are a couple ways to handle visually displaying the rotation.
   * This is to experiment with a transform for the rotated values.
   * @param x
   * @param y
   */
  public rotatedGridPosition(x: number, y: number) {
    // https://en.wikipedia.org/wiki/Rotation_matrix
    const rotationMatrices = [
      [
        [1, 0],
        [0, 1],
      ], // 0 rotation
      [
        [0, -1],
        [1, 0],
      ], // 90 degrees
      [
        [-1, 0],
        [0, -1],
      ], // 180 degrees
      [
        [0, 1],
        [-1, 0],
      ], // 270 degrees
    ];
    return LinearAlgebra.ArrayMultiply(
      rotationMatrices[(-1 * this.rotationAtTop + 3 * 4) % 4],
      [x, y]
    );
  }
}
